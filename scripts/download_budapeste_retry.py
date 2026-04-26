#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
"""Retenta downloads que falharam com 429."""
import os, requests, time
from PIL import Image
from io import BytesIO

BASE   = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "public", "media", "routes", "budapeste"))
SUBS   = os.path.join(BASE, "sub-attractions")
COMMONS = "https://commons.wikimedia.org/w/api.php"
HEADERS = {"User-Agent": "BudapestGuide/1.0 (educational)"}

# Filenames confirmados no Wikimedia Commons
RETRIES = [
    # (poi_id, filename, wikimedia_exact_title)
    ("mercado-central",     "paprica-langos.jpg",     "Dried paprika Hungary.jpg"),
    ("jantar-bairro-judio", "szimpla-jardim.jpg",     "Szimpla Kert Budapest.jpg"),
    ("metro-m1-milenio",    "estacao-operahaz.jpg",   "Budapest M1 metro Vorosmarty ter 2015.jpg"),
    ("jantar-despedida",    "borkonyha-tokaji.jpg",   "Tokaji aszú wine.jpg"),
]

# Fallback: busca genérica se o título exato falhar
SEARCH_FALLBACKS = {
    "mercado-central/paprica-langos.jpg":     "paprika spice Hungary red",
    "jantar-bairro-judio/szimpla-jardim.jpg": "Szimpla ruin bar Budapest interior",
    "metro-m1-milenio/estacao-operahaz.jpg":  "Budapest underground metro 1896 station",
    "jantar-despedida/borkonyha-tokaji.jpg":  "Tokaji wine Hungary bottle",
}

def get_url(title):
    r = requests.get(COMMONS, params={
        "action": "query", "titles": f"File:{title}",
        "prop": "imageinfo", "iiprop": "url", "format": "json"
    }, headers=HEADERS, timeout=20)
    for p in r.json().get("query", {}).get("pages", {}).values():
        info = p.get("imageinfo", [])
        if info:
            return info[0]["url"]
    return None

def search_url(query):
    r = requests.get(COMMONS, params={
        "action": "query", "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrnamespace": 6, "gsrlimit": 5,
        "prop": "imageinfo", "iiprop": "url|mime|size",
        "format": "json"
    }, headers=HEADERS, timeout=20)
    pages = r.json().get("query", {}).get("pages", {})
    # Prefer larger images (real photos not maps)
    best = None
    best_size = 0
    for p in pages.values():
        info = p.get("imageinfo", [])
        if info and "image/jpeg" in info[0].get("mime", ""):
            sz = info[0].get("size", 0)
            if sz > best_size:
                best_size = sz
                best = info[0]["url"]
    return best

def download_url(url):
    r = requests.get(url, headers=HEADERS, timeout=60)
    r.raise_for_status()
    return r.content

def save(data, path, max_width=1200):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img = Image.open(BytesIO(data)).convert("RGB")
    if img.width > max_width:
        h = int(img.height * max_width / img.width)
        img = img.resize((max_width, h), Image.LANCZOS)
    img.save(path, "JPEG", quality=85, optimize=True)
    return os.path.getsize(path) // 1024

print("=== Retentando downloads falhos ===\n")
for poi_id, fname, wm_title in RETRIES:
    dest = os.path.join(SUBS, poi_id, fname)
    if os.path.exists(dest):
        print(f"[OK]  {poi_id}/{fname} ja existe")
        continue
    key = f"{poi_id}/{fname}"
    print(f"[DL]  {key}")
    time.sleep(2)
    try:
        url = get_url(wm_title)
        if url:
            print(f"      titulo exato encontrado")
        else:
            print(f"      titulo nao encontrado, buscando...")
            time.sleep(1)
            url = search_url(SEARCH_FALLBACKS.get(key, wm_title.replace(".jpg","")))
        if not url:
            print(f"      [ERR] nao encontrado")
            continue
        time.sleep(1)
        data = download_url(url)
        kb = save(data, dest)
        print(f"      OK  {kb} KB")
    except Exception as e:
        print(f"      [ERR] {e}")

print("\nConcluido!")
