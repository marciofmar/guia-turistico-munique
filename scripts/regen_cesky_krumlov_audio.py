#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
"""
Gera áudios de narração para os POIs de Český Krumlov.
Voz: pt-BR-FranciscaNeural (consistente com Praga, Budapeste, Bratislava)

Uso:
    python scripts/regen_cesky_krumlov_audio.py              # apenas novos POIs
    python scripts/regen_cesky_krumlov_audio.py --all        # todos
    python scripts/regen_cesky_krumlov_audio.py egon-schiele-centrum  # POI específico
    python scripts/regen_cesky_krumlov_audio.py --force      # força regeneração
"""

import re, json, asyncio, os, tempfile, subprocess
import edge_tts
import imageio_ffmpeg

VOICE  = "pt-BR-FranciscaNeural"
RATE   = "-5%"
ROUTES = os.path.join(os.path.dirname(__file__), "..", "src", "data", "routes")
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

NEW_POIS = {
    "egon-schiele-centrum",
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

async def generate_one(raw_text, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    text = replace_roman_numerals(raw_text.replace("\n\n", " ").replace("\n", " "))
    c = edge_tts.Communicate(text, VOICE, rate=RATE)
    await c.save(output_path)

async def main():
    args = sys.argv[1:]
    force = "--force" in args
    all_pois = "--all" in args
    filter_ids = [a for a in args if not a.startswith("--")]

    json_path = os.path.join(ROUTES, "cesky-krumlov.json")
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
            print(f"[SKIP] {poi['id']} — ja existe ({kb} KB), use --force para regenerar")
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
    print(f"Gerando {len(tasks)} narracao(oes) de Cesky Krumlov...\n")

    for i, (poi_id, text, out) in enumerate(tasks, 1):
        print(f"[{i}/{len(tasks)}] cesky-krumlov/{poi_id}")
        try:
            await generate_one(text, out)
            kb = os.path.getsize(out) // 1024
            print(f"         OK  {kb} KB  ->  {os.path.basename(out)}")
        except Exception as e:
            print(f"         ERR {e}")

    print("\nConcluido!")

if __name__ == "__main__":
    asyncio.run(main())
