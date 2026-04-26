#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
"""
Baixa imagens para os novos POIs e sub-atrações de Nuremberg.
Novos arquivos necessários:
  photos/durer-haus/main.jpg + thumb.jpg
  photos/st-lorenz-kirche/main.jpg + thumb.jpg
  photos/handwerkerhof/main.jpg + thumb.jpg
  photos/memorial-julgamentos/main.jpg + thumb.jpg
  sub-attractions/kaiserburg/kettensteg.jpg
  sub-attractions/durer-haus/atelier-durer.jpg
  sub-attractions/durer-haus/durer-selbstportrat.jpg
  sub-attractions/st-lorenz-kirche/engelsgruss-stoss.jpg
  sub-attractions/st-lorenz-kirche/sakramenthaus-kraft.jpg
  sub-attractions/handwerkerhof/cerveja-franconia.jpg
  sub-attractions/handwerkerhof/lebkuchen-handwerk.jpg
  sub-attractions/memorial-julgamentos/sala-600.jpg
  sub-attractions/memorial-julgamentos/crimes-humanidade.jpg
"""
import os, requests, time
from PIL import Image
from io import BytesIO

BASE    = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "public", "media", "routes", "nuremberg"))
PHOTOS  = os.path.join(BASE, "photos")
SUBS    = os.path.join(BASE, "sub-attractions")
COMMONS = "https://commons.wikimedia.org/w/api.php"
HEADERS = {"User-Agent": "NurembergGuide/1.0 (educational/non-commercial)"}

# (dest_rel, wikimedia_file_title, fallback_search_query)
DOWNLOADS = [
    # Dürer-Haus — fachada exterior
    (
        "photos/durer-haus/main.jpg",
        "Duerer-Haus Nuernberg.jpg",
        "Albrecht Durer house Nuremberg exterior fachwerk"
    ),
    # St. Lorenzkirche — fachada oeste
    (
        "photos/st-lorenz-kirche/main.jpg",
        "Nuremberg St Lorenz.jpg",
        "St Lorenz Nuremberg gothic church facade exterior"
    ),
    # Handwerkerhof — pátio interior
    (
        "photos/handwerkerhof/main.jpg",
        "Handwerkerhof Nürnberg 2010.jpg",
        "Handwerkerhof Nuremberg courtyard craftsmen"
    ),
    # Memorial dos Julgamentos — Justizpalast exterior
    (
        "photos/memorial-julgamentos/main.jpg",
        "Memorium Nuremberg Trials.jpg",
        "Nuremberg trials courthouse Justizpalast exterior"
    ),
    # Kettensteg — ponte de correntes
    (
        "sub-attractions/kaiserburg/kettensteg.jpg",
        "Kettensteg Nuremberg.jpg",
        "Kettensteg Nuremberg iron bridge Pegnitz river"
    ),
    # Ateliê Dürer — janela de norte interior
    (
        "sub-attractions/durer-haus/atelier-durer.jpg",
        "Albrecht Duerer Haus Nuernberg interior.jpg",
        "Durer house Nuremberg interior workshop atelier"
    ),
    # Selbstbildnis Dürer 1500
    (
        "sub-attractions/durer-haus/durer-selbstportrat.jpg",
        "Albrecht Dürer - 1500 self-portrait.jpg",
        "Durer self portrait 1500 Selbstbildnis painting"
    ),
    # Engelsgruß Veit Stoss
    (
        "sub-attractions/st-lorenz-kirche/engelsgruss-stoss.jpg",
        "Veit Stoss - Engel der Verkündigung.jpg",
        "Veit Stoss Engelsgruss Nuremberg St Lorenz Annunciation"
    ),
    # Sakramentshaus Adam Kraft
    (
        "sub-attractions/st-lorenz-kirche/sakramenthaus-kraft.jpg",
        "Sakramentshaus St. Lorenz Nuremberg.jpg",
        "Adam Kraft Sakramentshaus St Lorenz Nuremberg tabernacle"
    ),
    # Cerveja Francônia — Schlenkerla
    (
        "sub-attractions/handwerkerhof/cerveja-franconia.jpg",
        "Schlenkerla Rauchbier Bamberg.jpg",
        "Schlenkerla Rauchbier Bamberg Franconia beer"
    ),
    # Lebkuchen
    (
        "sub-attractions/handwerkerhof/lebkuchen-handwerk.jpg",
        "Nürnberger Lebkuchen.jpg",
        "Nürnberger Lebkuchen Nuremberg gingerbread traditional"
    ),
    # Sala 600 — interior do tribunal
    (
        "sub-attractions/memorial-julgamentos/sala-600.jpg",
        "Nuremberg tribunal room 600.jpg",
        "Nuremberg trials courtroom 600 Justizpalast interior"
    ),
    # Crimes contra a humanidade — exposição
    (
        "sub-attractions/memorial-julgamentos/crimes-humanidade.jpg",
        "Memorium Nuremberg Trials exhibition.jpg",
        "Nuremberg trials memorial exhibition documentation center"
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
        "gsrnamespace": 6, "gsrlimit": 8,
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

print("=== Download imagens Nuremberg ===\n")

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
            print(f"      nao encontrado, buscando: {fallback_query[:55]}...")
            time.sleep(1)
            url = search_commons(fallback_query)

        if not url:
            print(f"      [ERR] nao encontrado no Commons")
            continue

        r = requests.get(url, headers=HEADERS, timeout=60)
        r.raise_for_status()
        kb = save_image(r.content, dest)
        print(f"      OK  {kb} KB")

        if dest_rel.endswith("/main.jpg"):
            thumb = dest.replace("main.jpg", "thumb.jpg")
            if not os.path.exists(thumb):
                kb_t = make_thumb(dest, thumb)
                print(f"      thumb OK  {kb_t} KB")

    except Exception as e:
        print(f"      [ERR] {e}")

print("\n=== Verificacao final ===")
needed = [
    "photos/durer-haus/main.jpg",
    "photos/durer-haus/thumb.jpg",
    "photos/st-lorenz-kirche/main.jpg",
    "photos/st-lorenz-kirche/thumb.jpg",
    "photos/handwerkerhof/main.jpg",
    "photos/handwerkerhof/thumb.jpg",
    "photos/memorial-julgamentos/main.jpg",
    "photos/memorial-julgamentos/thumb.jpg",
    "sub-attractions/kaiserburg/kettensteg.jpg",
    "sub-attractions/durer-haus/atelier-durer.jpg",
    "sub-attractions/durer-haus/durer-selbstportrat.jpg",
    "sub-attractions/st-lorenz-kirche/engelsgruss-stoss.jpg",
    "sub-attractions/st-lorenz-kirche/sakramenthaus-kraft.jpg",
    "sub-attractions/handwerkerhof/cerveja-franconia.jpg",
    "sub-attractions/handwerkerhof/lebkuchen-handwerk.jpg",
    "sub-attractions/memorial-julgamentos/sala-600.jpg",
    "sub-attractions/memorial-julgamentos/crimes-humanidade.jpg",
]
ok = miss = 0
for f in needed:
    path = os.path.join(BASE, f.replace("/", os.sep))
    if os.path.exists(path):
        print(f"  [OK]   {f} ({os.path.getsize(path)//1024} KB)")
        ok += 1
    else:
        print(f"  [MISS] {f}")
        miss += 1

print(f"\n{ok} OK / {miss} faltando")
print("\nConcluido!")
