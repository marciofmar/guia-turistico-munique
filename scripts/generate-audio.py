"""
Gera arquivos de áudio MP3 para cada POI usando edge-tts.
Voz: pt-BR-FranciscaNeural (feminina, natural)
"""
import asyncio
import json
import os
import edge_tts

VOICE = "pt-BR-FranciscaNeural"
ROUTE_JSON = os.path.join(os.path.dirname(__file__), "..", "src", "data", "routes", "urbanizacao-rio.json")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "media", "routes", "urbanizacao-rio", "audio")

async def generate_audio(text, output_path):
    communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
    await communicate.save(output_path)
    size_kb = os.path.getsize(output_path) / 1024
    print(f"  -> {os.path.basename(output_path)} ({size_kb:.0f} KB)")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with open(ROUTE_JSON, "r", encoding="utf-8") as f:
        route = json.load(f)

    # Intro audio
    intro_text = (
        f"{route['title']}. {route['subtitle']}. "
        f"{route['description']} "
        f"Este roteiro tem aproximadamente {len(route['pois'])} pontos de interesse "
        f"e pode ser percorrido em cerca de {route['estimatedDuration'] // 60} horas. "
        f"Vamos começar!"
    )
    print("Gerando: intro.mp3")
    await generate_audio(intro_text, os.path.join(OUTPUT_DIR, "intro.mp3"))

    # POI audios
    for poi in route["pois"]:
        poi_id = poi["id"]
        filename = f"{poi_id}.mp3"
        output_path = os.path.join(OUTPUT_DIR, filename)

        # Build narration text
        text_parts = [
            f"Ponto {poi['order']}: {poi['name']}.",
        ]

        if poi.get("yearBuilt"):
            text_parts.append(f"Construído em {poi['yearBuilt']}.")

        if poi.get("architecturalStyle"):
            text_parts.append(f"Estilo: {poi['architecturalStyle']}.")

        text_parts.append(poi["description"])

        if poi.get("walkingNotes"):
            text_parts.append(f"Dica de caminhada: {poi['walkingNotes']}")

        full_text = " ".join(text_parts)

        print(f"Gerando: {filename} ({len(full_text)} chars)")
        await generate_audio(full_text, output_path)

    print(f"\nTodos os {len(route['pois']) + 1} áudios gerados em {OUTPUT_DIR}")

if __name__ == "__main__":
    asyncio.run(main())
