#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
"""
Organiza e faz download de imagens para POIs de Budapeste.
1. Move imagens soltas para as subpastas corretas como main.jpg + thumb.jpg
2. Baixa imagens de sub-atrações do Wikimedia Commons
"""
import os, requests, time, shutil
from PIL import Image
from io import BytesIO

BASE     = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "public", "media", "routes", "budapeste"))
PHOTOS   = os.path.join(BASE, "photos")
SUBS     = os.path.join(BASE, "sub-attractions")
COMMONS  = "https://commons.wikimedia.org/w/api.php"
HEADERS  = {"User-Agent": "BudapestGuide/1.0 (educational/non-commercial)"}

# ─── 1. Mapeia arquivos soltos → pasta/main.jpg ───────────────────────────────
LOOSE_TO_MAIN = {
    "Budapest Gellért Hill Citadel panorama Danube.jpg":                      "gellert-hegy",
    "Dohány Street Synagogue Budapest facade towers.jpg":                     "sinagoga-dohany",
    "Nagy Vásárcsarnok Budapest Great Market Hall interior iron roof.jpg":    "mercado-central",
    "Szabadság tér Budapest Freedom Square memorial.jpg":                     "praca-liberdade",
    "Café Gerbeaud Budapest interior chandelier marble.jpg":                  "almoco-andrassy",
    "Szimpla Kert Budapest ruin bar garden night.jpg":                        "jantar-bairro-judio",
    "Budapest M1 metro Operaház station 1896 yellow tiles.jpg":               "metro-m1-milenio",
    "Margit sziget Margaret Island Budapest aerial Danube.jpg":               "ilha-margarida",
    "Borkonyha Budapest restaurant interior Wine Kitchen.jpg":                "jantar-despedida",
    "Rivalda Restaurant Budapest Castle District vaulted ceiling.jpg":        "jantar-buda",
}

# Arquivo solto que vira sub-atração de praca-liberdade
LOOSE_TO_SUB = {
    "7_monument-victims-german-occupation-budapest.jpg": ("praca-liberdade", "contramemorial.jpg"),
}

# ─── 2. Sub-atrações a baixar do Wikimedia Commons ───────────────────────────
# (poi_id, filename, wikimedia_file_title)
# Fonte: Commons file titles verificados
WIKIMEDIA_SUBS = [
    # gellert-hegy
    ("gellert-hegy", "panorama-citadela.jpg",
     "Budapest from Gellert Hill.jpg"),

    # sinagoga-dohany — salgueiro memorial de Imre Varga
    ("sinagoga-dohany", "salgueiro-memorial.jpg",
     "Emanuel tree - Dohány Street Synagogue.jpg"),

    # mercado-central — paprica + lángos
    ("mercado-central", "paprica-langos.jpg",
     "Paprika in Budapest.jpg"),

    # almoco-andrassy — Gerbeaud-szelet
    ("almoco-andrassy", "gerbeaud-szelet.jpg",
     "Gerbeaud cakes.jpg"),

    # jantar-bairro-judio — interior Szimpla
    ("jantar-bairro-judio", "szimpla-jardim.jpg",
     "Szimpla kert Budapest 2013.jpg"),

    # metro-m1-milenio — estação Operaház
    ("metro-m1-milenio", "estacao-operahaz.jpg",
     "Budapest Metro Operahaz station.jpg"),

    # ilha-margarida — ruínas/jardim
    ("ilha-margarida", "anfiteatro-margit.jpg",
     "Margaret Island ruins Budapest.jpg"),

    # jantar-despedida — Tokaji Aszú
    ("jantar-despedida", "borkonyha-tokaji.jpg",
     "Tokaj wine.jpg"),

    # jantar-buda — nave Rivalda / ex-Igreja Carmelita
    ("jantar-buda", "rivalda-nave.jpg",
     "Carmelite church Buda Castle Budapest.jpg"),
]

# Sub-atrações já existentes (7 POIs originais) — skip
EXISTING_SUBS = {
    "public/media/routes/budapeste/sub-attractions/budavari-palota/fonte-matias-corvino.jpg",
    "public/media/routes/budapeste/sub-attractions/budavari-palota/panorama-buda-danubio.jpg",
    "public/media/routes/budapeste/sub-attractions/halaszbastya-matyas/bastiao-vista-danubio.jpg",
    "public/media/routes/budapeste/sub-attractions/halaszbastya-matyas/matyas-teto-zsolnay.jpg",
    "public/media/routes/budapeste/sub-attractions/parlamento-budapeste/coroa-estevao.jpg",
    "public/media/routes/budapeste/sub-attractions/parlamento-budapeste/sapatos-danubio.jpg",
    "public/media/routes/budapeste/sub-attractions/basilica-santo-estevao/cupola-panorama-bp.jpg",
    "public/media/routes/budapeste/sub-attractions/andrassy-opera/opera-estado-budapest.jpg",
    "public/media/routes/budapeste/sub-attractions/heroes-square/monumento-milenio.jpg",
    "public/media/routes/budapeste/sub-attractions/szechenyi-furdok/piscina-xadrez.jpg",
}

# ─── Helpers ─────────────────────────────────────────────────────────────────

def save_image(img: Image.Image, path: str, max_width=1200, quality=85):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    rgb = img.convert("RGB")
    if rgb.width > max_width:
        h = int(rgb.height * max_width / rgb.width)
        rgb = rgb.resize((max_width, h), Image.LANCZOS)
    rgb.save(path, "JPEG", quality=quality, optimize=True)
    kb = os.path.getsize(path) // 1024
    return kb

def make_thumb(src_path: str, thumb_path: str, size=(480, 320)):
    img = Image.open(src_path).convert("RGB")
    img.thumbnail(size, Image.LANCZOS)
    os.makedirs(os.path.dirname(thumb_path), exist_ok=True)
    img.save(thumb_path, "JPEG", quality=80, optimize=True)
    kb = os.path.getsize(thumb_path) // 1024
    return kb

def wikimedia_download(file_title: str) -> bytes | None:
    """Obtém URL de download de um arquivo do Wikimedia Commons e baixa."""
    params = {
        "action": "query",
        "titles": f"File:{file_title}",
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json",
    }
    r = requests.get(COMMONS, params=params, headers=HEADERS, timeout=20)
    r.raise_for_status()
    pages = r.json().get("query", {}).get("pages", {})
    url = None
    for p in pages.values():
        info = p.get("imageinfo", [])
        if info:
            url = info[0]["url"]
            break
    if not url:
        return None
    img_r = requests.get(url, headers=HEADERS, timeout=60)
    img_r.raise_for_status()
    return img_r.content

def wikimedia_search_download(query: str) -> bytes | None:
    """Busca no Wikimedia Commons e baixa o primeiro resultado."""
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrnamespace": 6,
        "gsrlimit": 3,
        "prop": "imageinfo",
        "iiprop": "url|mime",
        "format": "json",
    }
    r = requests.get(COMMONS, params=params, headers=HEADERS, timeout=20)
    r.raise_for_status()
    pages = r.json().get("query", {}).get("pages", {})
    for p in pages.values():
        info = p.get("imageinfo", [])
        if info and "image/" in info[0].get("mime", ""):
            url = info[0]["url"]
            img_r = requests.get(url, headers=HEADERS, timeout=60)
            img_r.raise_for_status()
            return img_r.content
    return None

# ─── Main ─────────────────────────────────────────────────────────────────────

def step1_organize_loose():
    print("\n=== STEP 1: Organizar imagens soltas → subpastas ===\n")
    for filename, poi_id in LOOSE_TO_MAIN.items():
        src = os.path.join(PHOTOS, filename)
        if not os.path.exists(src):
            print(f"  [SKIP] {filename} — não encontrado")
            continue
        dest_main  = os.path.join(PHOTOS, poi_id, "main.jpg")
        dest_thumb = os.path.join(PHOTOS, poi_id, "thumb.jpg")
        if os.path.exists(dest_main):
            print(f"  [OK]   {poi_id}/main.jpg já existe")
        else:
            img = Image.open(src)
            kb = save_image(img, dest_main)
            print(f"  ✓ {poi_id}/main.jpg  ({kb} KB)")
        if os.path.exists(dest_thumb):
            print(f"  [OK]   {poi_id}/thumb.jpg já existe")
        else:
            kb = make_thumb(dest_main, dest_thumb)
            print(f"  ✓ {poi_id}/thumb.jpg ({kb} KB)")

    for filename, (poi_id, sub_name) in LOOSE_TO_SUB.items():
        src  = os.path.join(PHOTOS, filename)
        dest = os.path.join(SUBS, poi_id, sub_name)
        if not os.path.exists(src):
            print(f"  [SKIP] {filename} — não encontrado")
            continue
        if os.path.exists(dest):
            print(f"  [OK]   {poi_id}/{sub_name} já existe")
        else:
            img = Image.open(src)
            kb = save_image(img, dest)
            print(f"  ✓ {poi_id}/{sub_name}  ({kb} KB)")

def step2_download_subs():
    print("\n=== STEP 2: Baixar sub-atrações do Wikimedia Commons ===\n")
    for poi_id, fname, wm_title in WIKIMEDIA_SUBS:
        dest = os.path.join(SUBS, poi_id, fname)
        if os.path.exists(dest):
            kb = os.path.getsize(dest) // 1024
            print(f"  [OK]   {poi_id}/{fname} já existe ({kb} KB)")
            continue
        print(f"  ↓  {poi_id}/{fname}  ← Commons: {wm_title}")
        try:
            data = wikimedia_download(wm_title)
            if not data:
                print(f"       arquivo não encontrado, tentando busca...")
                query = wm_title.replace(".jpg", "").replace("_", " ")
                data = wikimedia_search_download(query)
            if not data:
                print(f"       [ERR] não encontrado no Commons")
                continue
            img = Image.open(BytesIO(data))
            kb  = save_image(img, dest)
            print(f"       ✓ {kb} KB")
            time.sleep(0.5)
        except Exception as e:
            print(f"       [ERR] {e}")

if __name__ == "__main__":
    step1_organize_loose()
    step2_download_subs()
    print("\nConcluido!")
