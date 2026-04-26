#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
"""
Baixa imagens para os novos POIs e sub-atrações de Český Krumlov.
Novos arquivos necessários:
  photos/egon-schiele-centrum/main.jpg + thumb.jpg
  sub-attractions/historicke-centrum-ck/sao-vito-ck.jpg
  sub-attractions/historicke-centrum-ck/plastyovy-most.jpg
  sub-attractions/egon-schiele-centrum/die-tote-stadt.jpg
  sub-attractions/egon-schiele-centrum/autorretratos-schiele.jpg
"""
import os, requests, time, shutil
from PIL import Image
from io import BytesIO

BASE    = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "public", "media", "routes", "cesky-krumlov"))
PHOTOS  = os.path.join(BASE, "photos")
SUBS    = os.path.join(BASE, "sub-attractions")
COMMONS = "https://commons.wikimedia.org/w/api.php"
HEADERS = {"User-Agent": "CeskyKrumlovGuide/1.0 (educational/non-commercial)"}

# ─── Downloads do Wikimedia Commons ──────────────────────────────────────────
# (dest_rel, wikimedia_file_title, fallback_search_query)
DOWNLOADS = [
    # Egon Schiele Art Centrum — foto principal (fachada da cervejaria renascentista)
    (
        "photos/egon-schiele-centrum/main.jpg",
        "Egon Schiele Art Centrum Cesky Krumlov.jpg",
        "Egon Schiele Art Centrum Ceský Krumlov building"
    ),
    # Igreja de São Vito
    (
        "sub-attractions/historicke-centrum-ck/sao-vito-ck.jpg",
        "Cesky Krumlov church St Vitus.jpg",
        "Kostel sv. Víta Český Krumlov gothic church"
    ),
    # Plášťový most — vista de baixo (a foto icônica)
    (
        "sub-attractions/historicke-centrum-ck/plastyovy-most.jpg",
        "Cesky Krumlov Plasty most cloak bridge arcade.jpg",
        "Plášťový most Český Krumlov covered bridge arcade"
    ),
    # Die tote Stadt — Schiele painting
    (
        "sub-attractions/egon-schiele-centrum/die-tote-stadt.jpg",
        "Egon Schiele - Die tote Stadt III.jpg",
        "Egon Schiele dead city painting expressionist"
    ),
    # Auto-retrato de Schiele
    (
        "sub-attractions/egon-schiele-centrum/autorretratos-schiele.jpg",
        "Egon Schiele - Selbstbildnis mit gesenktem Kopf.jpg",
        "Egon Schiele self portrait expressionist"
    ),
]

def get_commons_url(file_title):
    r = requests.get(COMMONS, params={
        "action": "query", "titles": f"File:{file_title}",
        "prop": "imageinfo", "iiprop": "url", "format": "json"
    }, headers=HEADERS, timeout=20)
    r.raise_for_status()
    for p in r.json().get("query", {}).get("pages", {}).values():
        info = p.get("imageinfo", [])
        if info:
            return info[0]["url"]
    return None

def search_commons(query):
    r = requests.get(COMMONS, params={
        "action": "query", "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrnamespace": 6, "gsrlimit": 5,
        "prop": "imageinfo", "iiprop": "url|mime|size",
        "format": "json"
    }, headers=HEADERS, timeout=20)
    r.raise_for_status()
    pages = r.json().get("query", {}).get("pages", {})
    best, best_sz = None, 0
    for p in pages.values():
        info = p.get("imageinfo", [])
        if info and "image/jpeg" in info[0].get("mime", ""):
            sz = info[0].get("size", 0)
            if sz > best_sz:
                best_sz = sz
                best = info[0]["url"]
    return best

def save_image(data_bytes, path, max_width=1200):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img = Image.open(BytesIO(data_bytes)).convert("RGB")
    if img.width > max_width:
        h = int(img.height * max_width / img.width)
        img = img.resize((max_width, h), Image.LANCZOS)
    img.save(path, "JPEG", quality=85, optimize=True)
    return os.path.getsize(path) // 1024

def make_thumb(src_path, thumb_path, size=(480, 320)):
    img = Image.open(src_path).convert("RGB")
    img.thumbnail(size, Image.LANCZOS)
    os.makedirs(os.path.dirname(thumb_path), exist_ok=True)
    img.save(thumb_path, "JPEG", quality=80, optimize=True)
    return os.path.getsize(thumb_path) // 1024

print("=== Download imagens Cesky Krumlov ===\n")

for dest_rel, wm_title, fallback_query in DOWNLOADS:
    dest = os.path.join(BASE, dest_rel.replace("/", os.sep))

    if os.path.exists(dest):
        print(f"[OK]  {dest_rel} ja existe ({os.path.getsize(dest)//1024} KB)")
        continue

    print(f"[DL]  {dest_rel}")
    time.sleep(1.5)

    try:
        url = get_commons_url(wm_title)
        if url:
            print(f"      titulo exato encontrado")
        else:
            print(f"      nao encontrado, buscando: {fallback_query[:50]}...")
            time.sleep(1)
            url = search_commons(fallback_query)

        if not url:
            print(f"      [ERR] nao encontrado no Commons")
            continue

        r = requests.get(url, headers=HEADERS, timeout=60)
        r.raise_for_status()
        kb = save_image(r.content, dest)
        print(f"      OK  {kb} KB")

        # Gera thumb para main.jpg
        if dest_rel.endswith("/main.jpg"):
            thumb = dest.replace("main.jpg", "thumb.jpg")
            if not os.path.exists(thumb):
                kb_t = make_thumb(dest, thumb)
                print(f"      thumb OK  {kb_t} KB")

    except Exception as e:
        print(f"      [ERR] {e}")

# Verifica se precisamos usar fallback do arquivo existente de sub-atracao antiga
# egon-schiele-centrum.jpg ja existe como sub-atracao de historicke-centrum
old_schiele = os.path.join(SUBS, "historicke-centrum-ck", "egon-schiele-centrum.jpg")
main_schiele = os.path.join(PHOTOS, "egon-schiele-centrum", "main.jpg")
if not os.path.exists(main_schiele) and os.path.exists(old_schiele):
    print(f"\n[COPY] Usando imagem existente de sub-atracao como main.jpg do Schiele Centrum")
    os.makedirs(os.path.dirname(main_schiele), exist_ok=True)
    shutil.copy2(old_schiele, main_schiele)
    kb = os.path.getsize(main_schiele) // 1024
    print(f"       OK  {kb} KB")
    thumb = main_schiele.replace("main.jpg", "thumb.jpg")
    if not os.path.exists(thumb):
        kb_t = make_thumb(main_schiele, thumb)
        print(f"       thumb OK  {kb_t} KB")

print("\n=== Verificacao final ===")
needed = [
    "photos/egon-schiele-centrum/main.jpg",
    "photos/egon-schiele-centrum/thumb.jpg",
    "sub-attractions/historicke-centrum-ck/sao-vito-ck.jpg",
    "sub-attractions/historicke-centrum-ck/plastyovy-most.jpg",
    "sub-attractions/egon-schiele-centrum/die-tote-stadt.jpg",
    "sub-attractions/egon-schiele-centrum/autorretratos-schiele.jpg",
]
for f in needed:
    path = os.path.join(BASE, f.replace("/", os.sep))
    if os.path.exists(path):
        print(f"  [OK] {f} ({os.path.getsize(path)//1024} KB)")
    else:
        print(f"  [MISS] {f}")

print("\nConcluido!")
