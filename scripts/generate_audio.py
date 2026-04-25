#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
"""
Gerador de narrações TTS para o guia turístico.

Estratégia de pronúncia multilíngue:
  - Texto em português → voz pt-BR-FranciscaNeural
  - Nomes próprios em língua estrangeira → voz nativa (de-DE, hu-HU, es-ES)
  - Segmentos concatenados com ffmpeg (imageio-ffmpeg)
  - Números romanos (séculos, monarcas) → ordinal em português antes de narrar
"""

import re
import json
import asyncio
import os
import tempfile
import subprocess

import edge_tts
import imageio_ffmpeg

VOICE   = "pt-BR-FranciscaNeural"
RATE    = "-5%"
BASE    = os.path.join(os.path.dirname(__file__), "..", "public", "media", "routes")
ROUTES  = os.path.join(os.path.dirname(__file__), "..", "src", "data", "routes")
FFMPEG  = imageio_ffmpeg.get_ffmpeg_exe()

LANG_VOICE = {
    "pt-BR": VOICE,
    "de-DE": "de-DE-KatjaNeural",
    "hu-HU": "hu-HU-NoemiNeural",
    "es-ES": "es-ES-ElviraNeural",
}

# ─── Números romanos → ordinal em pt-BR ─────────────────────────────────────

ROMAN_ORDINAL_PT = {
    "I":    "Primeiro",
    "II":   "Segundo",
    "III":  "Terceiro",
    "IV":   "Quarto",
    "V":    "Quinto",
    "VI":   "Sexto",
    "VII":  "Sétimo",
    "VIII": "Oitavo",
    "IX":   "Nono",
    "X":    "Décimo",
    "XI":   "Décimo Primeiro",
    "XII":  "Décimo Segundo",
    "XIII": "Décimo Terceiro",
    "XIV":  "Décimo Quarto",
    "XV":   "Décimo Quinto",
    "XVI":  "Décimo Sexto",
    "XVII": "Décimo Sétimo",
    "XVIII":"Décimo Oitavo",
    "XIX":  "Décimo Nono",
    "XX":   "Vigésimo",
    "XXI":  "Vigésimo Primeiro",
    "XXII": "Vigésimo Segundo",
}

_ROM_PAT = r"(?:X{0,2}(?:IX|IV|V?I{0,3}))"
_CENTURY_RE = re.compile(
    r"\bséculo\s+(" + _ROM_PAT + r")\b", re.IGNORECASE | re.UNICODE
)
_MONARCH_RE = re.compile(
    r"\b([A-ZÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇÑ][a-záéíóúãõâêîôûàèìòùçñ]+"
    r"(?:\s+[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇÑ][a-záéíóúãõâêîôûàèìòùçñ]*)*)"
    r"\s+(" + _ROM_PAT + r")\b",
    re.UNICODE
)

def replace_roman_numerals(text: str) -> str:
    def _century(m):
        return f"século {ROMAN_ORDINAL_PT.get(m.group(1).upper(), m.group(1))}"
    def _monarch(m):
        return f"{m.group(1)} {ROMAN_ORDINAL_PT.get(m.group(2).upper(), m.group(2))}"
    text = _CENTURY_RE.sub(_century, text)
    text = _MONARCH_RE.sub(_monarch, text)
    return text

# ─── Nomes próprios em língua estrangeira ────────────────────────────────────
# Ordenados do mais longo para o mais curto (evita substituição parcial).

FOREIGN_LANG_TAGS: list[tuple[str, str]] = [
    # ── Alemão ──────────────────────────────────────────────────────────────
    ("Kunsthistorisches Museum",  "de-DE"),
    ("Naturhistorisches Museum",  "de-DE"),
    ("Schloss Schönbrunn",        "de-DE"),
    ("Schönbrunn",                "de-DE"),
    ("Stephansdom",               "de-DE"),
    ("Ringstraße",                "de-DE"),
    ("Ringstrasse",               "de-DE"),
    ("Staatsoper",                "de-DE"),
    ("Hofburg",                   "de-DE"),
    ("Schatzkammer",              "de-DE"),
    ("Gloriette",                 "de-DE"),
    ("Belvedere",                 "de-DE"),
    ("Michaelerplatz",            "de-DE"),
    ("Heldenplatz",               "de-DE"),
    ("Neuschwanstein",            "de-DE"),
    ("Hohenschwangau",            "de-DE"),
    ("Zugspitze",                 "de-DE"),
    ("Nürnberg",                  "de-DE"),
    ("Kaiserburg",                "de-DE"),
    ("Hauptmarkt",                "de-DE"),
    ("Schwarzenberg",             "de-DE"),
    ("Egon Schiele",              "de-DE"),
    ("Pressburg",                 "de-DE"),
    # ── Húngaro ─────────────────────────────────────────────────────────────
    ("Budavári Palota",           "hu-HU"),
    ("Halászbástya",              "hu-HU"),
    ("Mátyás-templom",            "hu-HU"),
    ("Országház",                 "hu-HU"),
    ("Hősök tere",                "hu-HU"),
    ("Széchenyi",                 "hu-HU"),
    ("Andrássy",                  "hu-HU"),
    ("Budavár",                   "hu-HU"),
    ("Mátyás",                    "hu-HU"),
    # ── Espanhol ────────────────────────────────────────────────────────────
    ("Museo del Prado",           "es-ES"),
    ("Parque del Retiro",         "es-ES"),
    ("Palacio de Cristal",        "es-ES"),
    ("Puerta del Sol",            "es-ES"),
    ("Plaza Mayor",               "es-ES"),
    ("Velázquez",                 "es-ES"),
    ("Las Meninas",               "es-ES"),
    ("El Prado",                  "es-ES"),
]

# ─── Segmentação de texto por idioma ─────────────────────────────────────────

def segment_text(raw_text: str) -> list[tuple[str, str]]:
    """
    Retorna lista de (texto, lang) onde lang é 'pt-BR', código de idioma, ou 'break'.
    Parágrafos duplos viram segmento 'break' (600ms de silêncio).
    """
    text = replace_roman_numerals(raw_text)
    text = text.replace("\r\n", "\n")
    paragraphs = text.split("\n\n")

    result = []
    for i, para in enumerate(paragraphs):
        if i > 0:
            result.append(("", "break"))
        result.extend(_segment_paragraph(para))
    return result

def _segment_paragraph(text: str) -> list[tuple[str, str]]:
    """Divide um parágrafo em segmentos por idioma."""
    matches: list[tuple[int, int, str, str]] = []
    for term, lang in FOREIGN_LANG_TAGS:
        pattern = re.compile(r"(?<!\w)" + re.escape(term) + r"(?!\w)", re.UNICODE)
        for m in pattern.finditer(text):
            matches.append((m.start(), m.end(), term, lang))

    # Ordenar e eliminar sobreposições (mantém o primeiro)
    matches.sort(key=lambda x: x[0])
    non_overlapping: list[tuple[int, int, str, str]] = []
    last_end = 0
    for start, end, term, lang in matches:
        if start >= last_end:
            non_overlapping.append((start, end, term, lang))
            last_end = end

    if not non_overlapping:
        t = text.strip()
        return [(t, "pt-BR")] if t else []

    _has_word = re.compile(r"\w", re.UNICODE)

    segs: list[tuple[str, str]] = []
    pos = 0
    for start, end, term, lang in non_overlapping:
        if start > pos:
            chunk = text[pos:start]
            if _has_word.search(chunk):  # skip pure-punctuation chunks
                segs.append((chunk, "pt-BR"))
        segs.append((term, lang))
        pos = end

    if pos < len(text):
        chunk = text[pos:]
        if _has_word.search(chunk):
            segs.append((chunk, "pt-BR"))

    return segs

# ─── Utilitários de áudio ────────────────────────────────────────────────────

def generate_silence(duration_ms: int, output_path: str) -> None:
    """Gera um clip MP3 de silêncio com o mesmo formato que o edge-tts."""
    subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error",
         "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
         "-t", str(duration_ms / 1000),
         "-c:a", "libmp3lame", "-b:a", "48k",
         output_path],
        check=True
    )

def concatenate_mp3s(input_files: list[str], output_path: str) -> None:
    """Concatena múltiplos arquivos MP3 em um único arquivo."""
    list_file = None
    try:
        with tempfile.NamedTemporaryFile(
            "w", suffix=".txt", delete=False, encoding="utf-8"
        ) as f:
            for p in input_files:
                f.write(f"file '{p}'\n")
            list_file = f.name

        subprocess.run(
            [FFMPEG, "-y", "-loglevel", "error",
             "-f", "concat", "-safe", "0", "-i", list_file,
             "-c:a", "libmp3lame", "-b:a", "48k",  # reencoda para timestamps limpos
             output_path],
            check=True
        )
    finally:
        if list_file and os.path.exists(list_file):
            os.unlink(list_file)

# ─── Geração com edge-tts ────────────────────────────────────────────────────

async def generate_one(raw_text: str, output_path: str) -> None:
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    segments = segment_text(raw_text)

    # Caso simples: tudo em português — geração direta, sem ffmpeg
    foreign = {lang for _, lang in segments if lang not in ("pt-BR", "break")}
    if not foreign:
        text_only = raw_text.replace("\n\n", " ").replace("\n", " ")
        text_only = replace_roman_numerals(text_only)
        c = edge_tts.Communicate(text_only, VOICE, rate=RATE)
        await c.save(output_path)
        return

    # Caso multilíngue: gerar cada segmento separadamente e concatenar
    tmp_dir = tempfile.mkdtemp()
    clips: list[str] = []
    try:
        for i, (text, lang) in enumerate(segments):
            clip_path = os.path.join(tmp_dir, f"{i:04d}.mp3")
            if lang == "break":
                generate_silence(600, clip_path)
            else:
                voice = LANG_VOICE.get(lang, VOICE)
                # Texto limpo (sem tags) para o TTS
                clean = text.strip().replace("\n", " ")
                c = edge_tts.Communicate(clean, voice, rate=RATE)
                await c.save(clip_path)
            clips.append(clip_path)

        if len(clips) == 1:
            import shutil
            shutil.copy2(clips[0], output_path)
        else:
            concatenate_mp3s(clips, output_path)

    finally:
        for f in clips:
            try:
                os.unlink(f)
            except OSError:
                pass
        try:
            os.rmdir(tmp_dir)
        except OSError:
            pass

async def main() -> None:
    cities = [
        "nuremberg", "praga", "cesky-krumlov",
        "budapeste", "bratislava", "viena", "madri"
    ]
    tasks: list[tuple[str, str, str, str]] = []

    for city in cities:
        json_path = os.path.join(ROUTES, f"{city}.json")
        if not os.path.exists(json_path):
            print(f"[SKIP] {json_path} não encontrado")
            continue
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        for poi in data.get("pois", []):
            poi_id    = poi["id"]
            text      = poi.get("description", "")
            audio_rel = poi.get("media", {}).get("audio", "")
            if not audio_rel:
                print(f"[SKIP] {city}/{poi_id} sem campo audio")
                continue

            output_path = os.path.normpath(os.path.join(
                os.path.dirname(__file__), "..",
                "public" + audio_rel.replace("/", os.sep)
            ))
            tasks.append((city, poi_id, text, output_path))

    total = len(tasks)
    print(f"Gerando {total} narrações (pt-BR + vozes nativas para nomes estrangeiros)…\n")

    for i, (city, poi_id, text, out) in enumerate(tasks, 1):
        print(f"[{i:02d}/{total}] {city}/{poi_id} → {os.path.basename(out)}")
        try:
            await generate_one(text, out)
            kb = os.path.getsize(out) // 1024
            print(f"         OK  {kb} KB")
        except Exception as e:
            print(f"         ERR {e}")

    print("\nConcluído!")

if __name__ == "__main__":
    asyncio.run(main())
