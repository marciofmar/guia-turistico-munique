"""
Baixa fotos reais do Wikimedia Commons para cada POI.
URLs verificadas via API Wikimedia Commons.
"""
import os
import sys
import json
import urllib.request
import urllib.parse

# Fix Windows console encoding
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

OUTPUT_BASE = os.path.join(os.path.dirname(__file__), "..", "public", "media", "routes", "urbanizacao-rio", "photos")

PHOTOS = {
    "paco-imperial": {
        "caption": "Paco Imperial, sede do governo colonial portugues no Brasil",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Pa%C3%A7o_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg/960px-Pa%C3%A7o_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Pa%C3%A7o_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg/330px-Pa%C3%A7o_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg",
    },
    "chafariz-valentim": {
        "caption": "Chafariz do Mestre Valentim, monumento colonial na Praca XV",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chafariz_do_Mestre_Valentim_-_Rio_de_Janeiro_-_20220924092531.jpg/960px-Chafariz_do_Mestre_Valentim_-_Rio_de_Janeiro_-_20220924092531.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chafariz_do_Mestre_Valentim_-_Rio_de_Janeiro_-_20220924092531.jpg/330px-Chafariz_do_Mestre_Valentim_-_Rio_de_Janeiro_-_20220924092531.jpg",
    },
    "arco-do-teles": {
        "caption": "Arco do Teles e a historica Travessa do Comercio no Centro",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Arco_do_Teles_Centro_da_cidade.jpg/960px-Arco_do_Teles_Centro_da_cidade.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Arco_do_Teles_Centro_da_cidade.jpg/330px-Arco_do_Teles_Centro_da_cidade.jpg",
    },
    "ccbb": {
        "caption": "Centro Cultural Banco do Brasil, palacio no coracao do Centro",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Centro_Cultural_Banco_do_Brasil_-_Rio_de_Janeiro.jpg/960px-Centro_Cultural_Banco_do_Brasil_-_Rio_de_Janeiro.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Centro_Cultural_Banco_do_Brasil_-_Rio_de_Janeiro.jpg/330px-Centro_Cultural_Banco_do_Brasil_-_Rio_de_Janeiro.jpg",
    },
    "candelaria": {
        "caption": "Igreja de Nossa Senhora da Candelaria, imponcente templo barroco",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Igreja_de_Nossa_Senhora_da_Candel%C3%A1ria_-_Rio_de_Janeiro_-_20220625120400.jpg/960px-Igreja_de_Nossa_Senhora_da_Candel%C3%A1ria_-_Rio_de_Janeiro_-_20220625120400.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Igreja_de_Nossa_Senhora_da_Candel%C3%A1ria_-_Rio_de_Janeiro_-_20220625120400.jpg/330px-Igreja_de_Nossa_Senhora_da_Candel%C3%A1ria_-_Rio_de_Janeiro_-_20220625120400.jpg",
    },
    "centro-cultural-justica": {
        "caption": "Centro Cultural Justica Federal, antigo predio do Supremo Tribunal",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Centro_Cultural_Justi%C3%A7a_Federal_01.jpg/960px-Centro_Cultural_Justi%C3%A7a_Federal_01.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Centro_Cultural_Justi%C3%A7a_Federal_01.jpg/330px-Centro_Cultural_Justi%C3%A7a_Federal_01.jpg",
    },
    "rua-do-ouvidor": {
        "caption": "Rua do Ouvidor, historico corredor cultural do Centro",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/RuaDoOuvidor.JPG/960px-RuaDoOuvidor.JPG",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/RuaDoOuvidor.JPG/330px-RuaDoOuvidor.JPG",
    },
    "confeitaria-colombo": {
        "caption": "Confeitaria Colombo, cafe historico com decoracao art nouveau",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Confeitaria_Colombo_-_Rio_de_Janeiro_-_20230323130249.jpg/960px-Confeitaria_Colombo_-_Rio_de_Janeiro_-_20230323130249.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Confeitaria_Colombo_-_Rio_de_Janeiro_-_20230323130249.jpg/330px-Confeitaria_Colombo_-_Rio_de_Janeiro_-_20230323130249.jpg",
    },
    "igreja-sao-francisco": {
        "caption": "Igreja de Sao Francisco de Paula, joia do barroco tardio",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Igreja_de_S%C3%A3o_Francisco_de_Paula%2C_Rio_de_Janeiro.JPG/960px-Igreja_de_S%C3%A3o_Francisco_de_Paula%2C_Rio_de_Janeiro.JPG",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Igreja_de_S%C3%A3o_Francisco_de_Paula%2C_Rio_de_Janeiro.JPG/330px-Igreja_de_S%C3%A3o_Francisco_de_Paula%2C_Rio_de_Janeiro.JPG",
    },
    "real-gabinete": {
        "caption": "Real Gabinete Portugues de Leitura, biblioteca neomanuelina",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Real_Gabinete_Portugu%C3%AAs_de_Leitura_03.jpg/960px-Real_Gabinete_Portugu%C3%AAs_de_Leitura_03.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Real_Gabinete_Portugu%C3%AAs_de_Leitura_03.jpg/330px-Real_Gabinete_Portugu%C3%AAs_de_Leitura_03.jpg",
    },
    "theatro-municipal": {
        "caption": "Theatro Municipal do Rio de Janeiro, inspirado na Opera de Paris",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Teatro_Municipal_do_Rio_de_Janeiro_%28007_IMG_2517%29.jpg/960px-Teatro_Municipal_do_Rio_de_Janeiro_%28007_IMG_2517%29.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Teatro_Municipal_do_Rio_de_Janeiro_%28007_IMG_2517%29.jpg/330px-Teatro_Municipal_do_Rio_de_Janeiro_%28007_IMG_2517%29.jpg",
    },
    "biblioteca-nacional": {
        "caption": "Biblioteca Nacional do Brasil, maior acervo bibliografico da America Latina",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Biblioteca_Nacional_do_Brasil_-_Rio_de_Janeiro_-_20230921132823.jpg/960px-Biblioteca_Nacional_do_Brasil_-_Rio_de_Janeiro_-_20230921132823.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Biblioteca_Nacional_do_Brasil_-_Rio_de_Janeiro_-_20230921132823.jpg/330px-Biblioteca_Nacional_do_Brasil_-_Rio_de_Janeiro_-_20230921132823.jpg",
    },
    "museu-belas-artes": {
        "caption": "Museu Nacional de Belas Artes, sede do maior acervo de arte do Brasil",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Museu_Nacional_de_Belas_Artes_02.jpg/960px-Museu_Nacional_de_Belas_Artes_02.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Museu_Nacional_de_Belas_Artes_02.jpg/330px-Museu_Nacional_de_Belas_Artes_02.jpg",
    },
    "cinelandia": {
        "caption": "Cinelandia e a Praca Floriano, centro cultural e politico do Rio",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cinel%C3%A2ndia%2C_Rio_de_Janeiro.jpg/960px-Cinel%C3%A2ndia%2C_Rio_de_Janeiro.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cinel%C3%A2ndia%2C_Rio_de_Janeiro.jpg/330px-Cinel%C3%A2ndia%2C_Rio_de_Janeiro.jpg",
    },
    "av-rio-branco": {
        "caption": "Avenida Rio Branco, principal boulevard do Centro historico carioca",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Avenida_Rio_Branco%2C_Rio_de_Janeiro.jpg/960px-Avenida_Rio_Branco%2C_Rio_de_Janeiro.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Avenida_Rio_Branco%2C_Rio_de_Janeiro.jpg/330px-Avenida_Rio_Branco%2C_Rio_de_Janeiro.jpg",
    },
    "central-do-brasil": {
        "caption": "Estacao Central do Brasil, marco ferroviario e simbolo da cidade",
        "url_800": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Esta%C3%A7%C3%A3o_Central_do_Brasil_-_Rio_de_Janeiro_-_20240518110719.jpg/960px-Esta%C3%A7%C3%A3o_Central_do_Brasil_-_Rio_de_Janeiro_-_20240518110719.jpg",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Esta%C3%A7%C3%A3o_Central_do_Brasil_-_Rio_de_Janeiro_-_20240518110719.jpg/330px-Esta%C3%A7%C3%A3o_Central_do_Brasil_-_Rio_de_Janeiro_-_20240518110719.jpg",
    },
}

def download_file(url, path):
    headers = {"User-Agent": "GuiaTuristicoCentroRio/1.0 (educational; marci@example.com)"}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            if len(data) < 2000:
                print(f"  AVISO: arquivo pequeno ({len(data)} bytes)")
                return False
            with open(path, "wb") as f:
                f.write(data)
            print(f"  OK: {os.path.basename(path)} ({len(data)//1024} KB)")
            return True
    except Exception as e:
        print(f"  ERRO: {e}")
        return False

def get_ext(url):
    path = url.split("?")[0].split("#")[0]
    # get the filename part after last /
    fname = path.rsplit("/", 1)[-1]
    # strip size prefix like "960px-"
    if "-" in fname and fname.split("-")[0].endswith("px"):
        fname = fname.split("-", 1)[1]
    ext = fname.rsplit(".", 1)[-1].lower()
    if ext in ("jpg", "jpeg"):
        return "jpg"
    if ext in ("png", "webp"):
        return ext
    return "jpg"

def main():
    os.makedirs(OUTPUT_BASE, exist_ok=True)
    route_json_path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "routes", "urbanizacao-rio.json")

    results = {}

    for poi_id, info in PHOTOS.items():
        poi_dir = os.path.join(OUTPUT_BASE, poi_id)
        os.makedirs(poi_dir, exist_ok=True)
        print(f"\n[{poi_id}]")

        ext = get_ext(info["url_800"])

        # Main photo
        main_path = os.path.join(poi_dir, f"main.{ext}")
        ok = download_file(info["url_800"], main_path)

        # Thumb
        thumb_path = os.path.join(poi_dir, f"thumb.{ext}")
        download_file(info["thumb_url"], thumb_path)

        if ok:
            results[poi_id] = {
                "main": f"/media/routes/urbanizacao-rio/photos/{poi_id}/main.{ext}",
                "thumb": f"/media/routes/urbanizacao-rio/photos/{poi_id}/thumb.{ext}",
                "caption": info["caption"],
                "ext": ext,
            }

    # Update route JSON photos
    print("\n\nAtualizando JSON do roteiro...")
    with open(route_json_path, "r", encoding="utf-8") as f:
        route = json.load(f)

    for poi in route["pois"]:
        poi_id = poi["id"]
        if poi_id in results:
            r = results[poi_id]
            poi["media"]["photos"] = [
                {"src": r["main"], "caption": r["caption"]}
            ]
            # Update thumb if card uses it
            poi["media"]["thumb"] = r["thumb"]
            print(f"  {poi_id}: OK")
        else:
            print(f"  {poi_id}: sem foto")

    with open(route_json_path, "w", encoding="utf-8") as f:
        json.dump(route, f, ensure_ascii=False, indent=2)

    print(f"\nJSON atualizado. {len(results)}/16 POIs com fotos.")

if __name__ == "__main__":
    main()
