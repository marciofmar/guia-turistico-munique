"""
Gera as narrações em pt-BR para os 18 POIs do roteiro de Munique.
Usa Microsoft Edge TTS (gratuito, sem API key) com voz neural multilingue
pt-BR-ThalitaMultilingualNeural — tranquila, clara, tom "documentário de viagem".

Pré-processamentos aplicados antes da síntese:
  • Numerais romanos após nomes próprios → ordinais em português
    (ex.: "Ludwig II" → "Ludwig Segundo", "Gregório VII" → "Gregório Sétimo")

Nota sobre pronúncia estrangeira:
  O endpoint Edge TTS não suporta elementos SSML adicionais (<lang>, <phoneme>,
  <break>, etc.) — qualquer tag extra resulta em NoAudioReceived silencioso.
  A voz pt-BR-ThalitaMultilingualNeural é multilíngue por treinamento e
  pronuncia nomes alemães, italianos e austríacos automaticamente.

Uso:
    python scripts/generate_narrations.py                # gera intro de todos
    python scripts/generate_narrations.py marienplatz    # gera intro de poi(s) específicos
    python scripts/generate_narrations.py --all-sections # gera intro + imersivo de todos
    python scripts/generate_narrations.py --immersive    # gera só seções imersivas
    python scripts/generate_narrations.py alte-pinakothek --all-sections --force
    python scripts/generate_narrations.py --force        # regenera tudo

Saída:
    public/media/routes/munique/audio/<poi-id>.mp3            (intro)
    public/media/routes/munique/audio/<poi-id>-immersive.mp3  (modo imersivo)
"""
import asyncio
import json
import os
import re
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "src" / "data" / "routes" / "munique.json"
OUT_DIR = ROOT / "public" / "media" / "routes" / "munique" / "audio"

VOICE = "pt-BR-ThalitaMultilingualNeural"
# Ligeiramente mais lento para cadência contemplativa de guia turístico.
RATE = "-8%"
VOLUME = "+0%"


# ─────────────────────────────────────────────────────────────────────────────
# Numerais romanos → ordinais em português
# Aplicado em contexto de "NomePróprio Numeral" (ex.: Ludwig II → Ludwig Segundo)
# ─────────────────────────────────────────────────────────────────────────────

ROMAN_TO_ORDINAL = {
    "I":     "Primeiro",
    "II":    "Segundo",
    "III":   "Terceiro",
    "IV":    "Quarto",
    "V":     "Quinto",
    "VI":    "Sexto",
    "VII":   "Sétimo",
    "VIII":  "Oitavo",
    "IX":    "Nono",
    "X":     "Décimo",
    "XI":    "Décimo Primeiro",
    "XII":   "Décimo Segundo",
    "XIII":  "Décimo Terceiro",
    "XIV":   "Décimo Quarto",
    "XV":    "Décimo Quinto",
    "XVI":   "Décimo Sexto",
    "XVII":  "Décimo Sétimo",
    "XVIII": "Décimo Oitavo",
    "XIX":   "Décimo Nono",
    "XX":    "Vigésimo",
    "XXI":   "Vigésimo Primeiro",
    "XXII":  "Vigésimo Segundo",
    "XXIII": "Vigésimo Terceiro",
    "XXIV":  "Vigésimo Quarto",
    "XXV":   "Vigésimo Quinto",
}

# Numerais romanos suportados (I–XXV): listados do mais longo para o mais curto
# para garantir correspondência gulosa (ex.: "XVIII" antes de "VIII" antes de "I").
_ROMAN_NUM = (
    r"(XXV|XXIV|XXIII|XXII|XXI|XX|XIX|XVIII|XVII|XVI|XV|XIV|XIII|XII|XI|X"
    r"|IX|VIII|VII|VI|V|IV|III|II|I)"
)
_SENTINEL = r"(?=[\s,\.!?;:\)—–]|$)"

# ── Padrão 1: "século(s) ROMAN" → group(1)=século(s), group(2)=numeral
_CENTURY_PAT = re.compile(
    r"\b(séculos?)\s+" + _ROMAN_NUM + _SENTINEL,
    re.UNICODE | re.IGNORECASE,
)
# ── Padrão 2: "ao ROMAN" em intervalos → group(1)=ao, group(2)=numeral
_RANGE_PAT = re.compile(
    r"\b(ao?)\s+" + _ROMAN_NUM + _SENTINEL,
    re.UNICODE,
)
# ── Padrão 3: nome próprio + ROMAN → group(1)=nome, group(2)=numeral
_PROPER_PAT = re.compile(
    r"\b([A-ZÁÉÍÓÚÀÂÊÎÔÃÕÇÄÖÜ][a-záéíóúàâêîôãõçäöüA-ZÁÉÍÓÚÀÂÊÎÔÃÕÇÄÖÜ]*)"
    r"\s+" + _ROMAN_NUM + _SENTINEL,
    re.UNICODE,
)


def replace_roman_numerals(text: str) -> str:
    """
    Converte numerais romanos para ordinais em português em três contextos:
      1. Séculos   → "século XVIII"   → "século décimo oitavo"
      2. Intervalos → "XIV ao XVIII"  → "décimo quarto ao décimo oitavo"
      3. Títulos   → "Ludwig II"      → "Ludwig Segundo"
    """
    def _ordinal(numeral: str) -> str:
        return ROMAN_TO_ORDINAL.get(numeral, numeral)

    # 1. "século(s) ROMAN" — ordinal em minúsculas
    def _century(m: re.Match) -> str:
        return f"{m.group(1)} {_ordinal(m.group(2)).lower()}"

    text = _CENTURY_PAT.sub(_century, text)

    # 2. "ao ROMAN" em intervalos de séculos — ordinal em minúsculas
    def _range(m: re.Match) -> str:
        return f"{m.group(1)} {_ordinal(m.group(2)).lower()}"

    text = _RANGE_PAT.sub(_range, text)

    # 3. "NomePróprio ROMAN" — ordinal preserva capitalização do nome
    def _proper(m: re.Match) -> str:
        return f"{m.group(1)} {_ordinal(m.group(2))}"

    return _PROPER_PAT.sub(_proper, text)


def preprocess_text(text: str) -> str:
    """Aplica pré-processamentos no texto antes da síntese de voz."""
    text = replace_roman_numerals(text)
    return text


# ─────────────────────────────────────────────────────────────────────────────
# Funções auxiliares de dados
# ─────────────────────────────────────────────────────────────────────────────

def load_pois():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data["pois"]


def build_intro_text(poi) -> str:
    """Monta o texto da narração de introdução (description + significance)."""
    name = poi["name"]
    description = (poi.get("description") or "").strip()
    significance = (poi.get("significance") or "").strip()

    parts = [name + "."]
    if description:
        parts.append(description)
    if significance and significance not in description:
        parts.append("Importância: " + significance)

    return "\n\n".join(parts)


def build_immersive_text(poi) -> str | None:
    """Monta o texto do capítulo Modo Imersivo."""
    name = poi["name"]
    immersive = (poi.get("immersiveText") or "").strip()
    if not immersive:
        return None

    intro = f"Modo Imersivo — {name}."
    return f"{intro}\n\n{immersive}"


# ─────────────────────────────────────────────────────────────────────────────
# Síntese
# ─────────────────────────────────────────────────────────────────────────────

async def synthesize_text(text: str, out_path: Path, label: str, force: bool = False):
    """Pré-processa e sintetiza texto para mp3, salvando em out_path."""
    if out_path.exists() and not force:
        size_kb = out_path.stat().st_size // 1024
        print(f"  [skip] {out_path.name} já existe ({size_kb} KB)")
        return False

    processed = preprocess_text(text)
    word_count = len(processed.split())
    print(f"  [gen]  {label}  ({word_count} palavras)")

    communicate = edge_tts.Communicate(
        processed,
        voice=VOICE,
        rate=RATE,
        volume=VOLUME,
    )
    await communicate.save(str(out_path))
    size_kb = out_path.stat().st_size // 1024
    print(f"         → {out_path.name} ({size_kb} KB)")
    return True


async def process_poi(poi, sections: set, force: bool = False):
    """Gera os arquivos de áudio solicitados para um POI."""
    poi_id = poi["id"]

    if "intro" in sections:
        text = build_intro_text(poi)
        out_path = OUT_DIR / f"{poi_id}.mp3"
        try:
            await synthesize_text(text, out_path, f"{poi_id} [intro]", force)
        except Exception as e:
            print(f"  [ERRO] {poi_id} intro: {e}", file=sys.stderr)

    if "immersive" in sections:
        if not poi.get("immersiveMode"):
            print(f"  [skip] {poi_id}-immersive (sem imersivo)")
            return
        text = build_immersive_text(poi)
        if not text:
            print(f"  [skip] {poi_id}-immersive (immersiveText vazio)")
            return
        out_path = OUT_DIR / f"{poi_id}-immersive.mp3"
        try:
            await synthesize_text(text, out_path, f"{poi_id} [imersivo]", force)
        except Exception as e:
            print(f"  [ERRO] {poi_id} imersivo: {e}", file=sys.stderr)


# ─────────────────────────────────────────────────────────────────────────────
# Entrypoint
# ─────────────────────────────────────────────────────────────────────────────

async def main():
    args = sys.argv[1:]
    force = "--force" in args
    all_sections = "--all-sections" in args
    only_immersive = "--immersive" in args
    filter_ids = [a for a in args if not a.startswith("--")]

    if all_sections:
        sections = {"intro", "immersive"}
    elif only_immersive:
        sections = {"immersive"}
    else:
        sections = {"intro"}

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    pois = load_pois()
    if filter_ids:
        pois = [p for p in pois if p["id"] in filter_ids]
        if not pois:
            print(f"Nenhum POI encontrado com ids: {filter_ids}", file=sys.stderr)
            sys.exit(1)

    section_label = "+".join(sorted(sections))
    print(f"Voz: {VOICE}  |  rate={RATE}  |  seções={section_label}  |  {len(pois)} POI(s)")
    print(f"Saida: {OUT_DIR}")
    print()

    for poi in pois:
        await process_poi(poi, sections, force=force)

    print()
    print("Concluido.")


if __name__ == "__main__":
    asyncio.run(main())
