#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
"""
Gera áudios de narração para os POIs de Viena.
Voz: pt-BR-FranciscaNeural (consistente com Budapest e Bratislava)
Nomes alemães: de-DE-KatjaNeural via segmentação

Uso:
    python scripts/regen_viena_audio.py              # apenas novos POIs
    python scripts/regen_viena_audio.py --all        # todos
    python scripts/regen_viena_audio.py karlskirche  # POI específico
    python scripts/regen_viena_audio.py --force      # força regeneração
"""

import re, json, asyncio, os, tempfile, subprocess
import edge_tts
import imageio_ffmpeg

VOICE  = "pt-BR-FranciscaNeural"
RATE   = "-5%"
ROUTES = os.path.join(os.path.dirname(__file__), "..", "src", "data", "routes")
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

NEW_POIS = {
    "naschmarkt",
    "karlskirche",
    "stadtpark",
    "hundertwasserhaus",
    "graben-kohlmarkt",
    "prater-riesenrad",
}

LANG_VOICE = {
    "pt-BR": VOICE,
    "de-DE": "de-DE-KatjaNeural",
    "hu-HU": "hu-HU-NoemiNeural",
}

ROMAN_ORDINAL_PT = {
    "I": "Primeiro", "II": "Segundo", "III": "Terceiro", "IV": "Quarto",
    "V": "Quinto", "VI": "Sexto", "VII": "Sétimo", "VIII": "Oitavo",
    "IX": "Nono", "X": "Décimo", "XI": "Décimo Primeiro", "XII": "Décimo Segundo",
    "XIII": "Décimo Terceiro", "XIV": "Décimo Quarto", "XV": "Décimo Quinto",
    "XVI": "Décimo Sexto", "XVII": "Décimo Sétimo", "XVIII": "Décimo Oitavo",
    "XIX": "Décimo Nono", "XX": "Vigésimo", "XXI": "Vigésimo Primeiro",
}

_ROM_PAT = r"(?:X{0,2}(?:IX|IV|V?I{0,3}))"
_CENTURY_RE = re.compile(r"\bséculo\s+(" + _ROM_PAT + r")\b", re.IGNORECASE | re.UNICODE)
_MONARCH_RE = re.compile(
    r"\b([A-ZÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇÑ][a-záéíóúãõâêîôûàèìòùçñ]+"
    r"(?:\s+[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇÑ][a-záéíóúãõâêîôûàèìòùçñ]*)*)"
    r"\s+(" + _ROM_PAT + r")\b", re.UNICODE
)

def replace_roman_numerals(text):
    text = _CENTURY_RE.sub(
        lambda m: f"século {ROMAN_ORDINAL_PT.get(m.group(1).upper(), m.group(1)).lower()}", text
    )
    text = _MONARCH_RE.sub(
        lambda m: f"{m.group(1)} {ROMAN_ORDINAL_PT.get(m.group(2).upper(), m.group(2))}", text
    )
    return text

FOREIGN_LANG_TAGS = [
    ("Kunsthistorisches Museum", "de-DE"),
    ("Naturhistorisches Museum", "de-DE"),
    ("Schloss Schönbrunn", "de-DE"),
    ("Schönbrunn", "de-DE"),
    ("Stephansdom", "de-DE"),
    ("Ringstraße", "de-DE"),
    ("Ringstrasse", "de-DE"),
    ("Staatsoper", "de-DE"),
    ("Hofburg", "de-DE"),
    ("Schatzkammer", "de-DE"),
    ("Glorieta", "de-DE"),
    ("Belvedere", "de-DE"),
    ("Naschmarkt", "de-DE"),
    ("Karlskirche", "de-DE"),
    ("Karlsplatz", "de-DE"),
    ("Rathaus", "de-DE"),
    ("Votivkirche", "de-DE"),
    ("Pestsäule", "de-DE"),
    ("Riesenrad", "de-DE"),
    ("Hauptallee", "de-DE"),
    ("Wurstelprater", "de-DE"),
    ("Stadtpark", "de-DE"),
    ("Kohlmarkt", "de-DE"),
    ("Kärntner Straße", "de-DE"),
    ("Figarohaus", "de-DE"),
    ("Parlamentsgebäude", "de-DE"),
    ("Michaelerplatz", "de-DE"),
    ("Hundertwasserhaus", "de-DE"),
    ("Kursalon", "de-DE"),
    ("Graben", "de-DE"),
    ("Würstelstand", "de-DE"),
    ("käsekrainer", "de-DE"),
    ("bratwurst", "de-DE"),
    ("Prater", "de-DE"),
    ("Praterstern", "de-DE"),
    ("Vindobona", "de-DE"),
    ("Wienfluss", "de-DE"),
    ("Melange", "de-DE"),
    ("Kipferl", "de-DE"),
    ("Apfelstrudel", "de-DE"),
    ("Stehplätze", "de-DE"),
    ("Flohmarkt", "de-DE"),
    ("Kursalon", "de-DE"),
]

_has_word = re.compile(r"\w", re.UNICODE)

def _segment_paragraph(text):
    matches = []
    for term, lang in FOREIGN_LANG_TAGS:
        pattern = re.compile(r"(?<!\w)" + re.escape(term) + r"(?!\w)", re.UNICODE)
        for m in pattern.finditer(text):
            matches.append((m.start(), m.end(), term, lang))
    matches.sort(key=lambda x: x[0])
    non_overlapping, last_end = [], 0
    for start, end, term, lang in matches:
        if start >= last_end:
            non_overlapping.append((start, end, term, lang))
            last_end = end
    if not non_overlapping:
        t = text.strip()
        return [(t, "pt-BR")] if t else []
    segs, pos = [], 0
    for start, end, term, lang in non_overlapping:
        if start > pos:
            chunk = text[pos:start]
            if _has_word.search(chunk):
                segs.append((chunk, "pt-BR"))
        segs.append((term, lang))
        pos = end
    if pos < len(text):
        chunk = text[pos:]
        if _has_word.search(chunk):
            segs.append((chunk, "pt-BR"))
    return segs

def segment_text(raw_text):
    text = replace_roman_numerals(raw_text)
    text = text.replace("\r\n", "\n")
    paragraphs = text.split("\n\n")
    result = []
    for i, para in enumerate(paragraphs):
        if i > 0:
            result.append(("", "break"))
        result.extend(_segment_paragraph(para))
    return result

def generate_silence(duration_ms, output_path):
    subprocess.run([FFMPEG, "-y", "-loglevel", "error",
        "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
        "-t", str(duration_ms / 1000),
        "-c:a", "libmp3lame", "-b:a", "48k", output_path], check=True)

def concatenate_mp3s(input_files, output_path):
    list_file = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f:
            for p in input_files:
                f.write(f"file '{p}'\n")
            list_file = f.name
        subprocess.run([FFMPEG, "-y", "-loglevel", "error",
            "-f", "concat", "-safe", "0", "-i", list_file,
            "-c:a", "libmp3lame", "-b:a", "48k", output_path], check=True)
    finally:
        if list_file and os.path.exists(list_file):
            os.unlink(list_file)

async def generate_one(raw_text, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    segments = segment_text(raw_text)
    foreign = {lang for _, lang in segments if lang not in ("pt-BR", "break")}
    if not foreign:
        text_only = replace_roman_numerals(raw_text.replace("\n\n", " ").replace("\n", " "))
        c = edge_tts.Communicate(text_only, VOICE, rate=RATE)
        await c.save(output_path)
        return
    tmp_dir = tempfile.mkdtemp()
    clips = []
    try:
        for i, (text, lang) in enumerate(segments):
            clip_path = os.path.join(tmp_dir, f"{i:04d}.mp3")
            if lang == "break":
                generate_silence(600, clip_path)
            else:
                voice = LANG_VOICE.get(lang, VOICE)
                clean = text.strip().replace("\n", " ")
                c = edge_tts.Communicate(clean, voice, rate=RATE)
                await c.save(clip_path)
            clips.append(clip_path)
        if len(clips) == 1:
            import shutil; shutil.copy2(clips[0], output_path)
        else:
            concatenate_mp3s(clips, output_path)
    finally:
        for f in clips:
            try: os.unlink(f)
            except OSError: pass
        try: os.rmdir(tmp_dir)
        except OSError: pass

async def main():
    args = sys.argv[1:]
    force = "--force" in args
    all_pois = "--all" in args
    filter_ids = [a for a in args if not a.startswith("--")]

    json_path = os.path.join(ROUTES, "viena.json")
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    pois = data.get("pois", [])

    if filter_ids:
        pois = [p for p in pois if p["id"] in filter_ids]
    elif not all_pois:
        pois = [p for p in pois if p["id"] in NEW_POIS]

    tasks = []
    for poi in pois:
        audio_rel = poi.get("media", {}).get("audio", "")
        if not audio_rel:
            print(f"[SKIP] {poi['id']} — sem campo audio")
            continue
        output_path = os.path.normpath(os.path.join(
            os.path.dirname(__file__), "..",
            "public" + audio_rel.replace("/", os.sep)
        ))
        if os.path.exists(output_path) and not force:
            kb = os.path.getsize(output_path) // 1024
            print(f"[SKIP] {poi['id']} — já existe ({kb} KB), use --force para regenerar")
            continue
        text = poi.get("description", "")
        if not text.strip():
            print(f"[SKIP] {poi['id']} — description vazia")
            continue
        tasks.append((poi["id"], text, output_path))

    if not tasks:
        print("Nada a gerar.")
        return

    print(f"Voz: {VOICE}  |  rate={RATE}")
    print(f"Gerando {len(tasks)} narração(ões) de Viena...\n")

    for i, (poi_id, text, out) in enumerate(tasks, 1):
        print(f"[{i}/{len(tasks)}] viena/{poi_id}")
        try:
            await generate_one(text, out)
            kb = os.path.getsize(out) // 1024
            print(f"         OK  {kb} KB  →  {os.path.basename(out)}")
        except Exception as e:
            print(f"         ERR {e}")

    print("\nConcluido!")

if __name__ == "__main__":
    asyncio.run(main())
