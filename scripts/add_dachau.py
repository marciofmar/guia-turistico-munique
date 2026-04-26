#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io, json, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROUTE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "routes", "munique.json")

with open(ROUTE, encoding="utf-8") as f:
    data = json.load(f)

# ── 1. NOVO POI: dachau-memorial ─────────────────────────────────────────────
dachau = {
  "id": "dachau-memorial",
  "dayId": "dia-3",
  "order": 1,
  "name": "Memorial do Campo de Concentração de Dachau",
  "lat": 48.2688,
  "lng": 11.4688,
  "address": "Alte Römerstraße 75, 85221 Dachau",
  "historicalPeriod": "modern",
  "yearBuilt": "1933 (campo) / 1965 (memorial)",
  "architecturalStyle": None,
  "significance": "O primeiro campo de concentração do Terceiro Reich (22 de março de 1933) e o modelo sobre o qual todos os outros foram construídos — a 16 km do centro de Munique",
  "description": (
    "Dachau foi o primeiro campo de concentração do regime nazista, aberto em 22 de março de 1933 — "
    "apenas 53 dias após a posse de Adolf Hitler como chanceler. Heinrich Himmler o anunciou em "
    "conferência de imprensa em Munique como um campo para 'presos políticos'. O modelo administrativo "
    "e de terror desenvolvido aqui por Theodor Eicke foi exportado para todos os campos seguintes — "
    "Dachau formou os comandantes do sistema inteiro.\n\n"
    "O campo funcionou por 12 anos, de 1933 a 1945. Pelos seus barracões passaram mais de 200.000 "
    "prisioneiros de pelo menos 30 países — comunistas, social-democratas, sacerdotes, Testemunhas de "
    "Jeová, homossexuais, Roma e Sinti, e judeus em número crescente após 1938. O número documentado de "
    "mortes é de pelo menos 41.500, mas a estimativa real é muito superior, pois os registros foram "
    "destruídos e milhares morreram em marchas da morte nas semanas finais. Dachau ficava a 16 km de "
    "Munique — e os muniquenses sabiam. Trabalhadores da cidade forneciam bens ao campo; a fumaça das "
    "chaminés era visível nos dias de vento.\n\n"
    "O campo foi libertado em 29 de abril de 1945 pelas tropas americanas da 157ª Divisão de Infantaria. "
    "Os soldados registraram ter encontrado vagões de trem carregados de cadáveres na entrada e "
    "prisioneiros com menos de 30 kg. Após a libertação, o local foi usado como campo de refugiados e "
    "habitações até 1960. O memorial foi inaugurado em 9 de maio de 1965 — por iniciativa de "
    "sobreviventes, contra a resistência de autoridades bávaras que preferiam esquecer.\n\n"
    "O espaço atual inclui: a entrada original com o portão Jourhaus e a inscrição 'Arbeit Macht Frei'; "
    "o Appellplatz (praça da chamada) onde os prisioneiros ficavam em pé por horas sob qualquer clima; "
    "os barracões reconstruídos com exposição permanente; o complexo do crematório com câmara de gás "
    "(construída, mas segundo as evidências históricas usada apenas para experimentos e pequenas "
    "execuções, não para assassinato em massa sistemático como em Auschwitz); e quatro capelas — "
    "católica, protestante, judaica e ortodoxa — construídas após a guerra pelos sobreviventes. A "
    "exposição permanente documenta a ascensão do nazismo, o funcionamento do sistema de campos e os "
    "julgamentos de Nuremberg."
  ),
  "immersiveMode": False,
  "immersiveText": None,
  "observationPoints": [
    "Portão Jourhaus — a inscrição 'Arbeit Macht Frei' (O Trabalho Liberta): a mentira fundadora do sistema, forjada no ferro pelos próprios prisioneiros",
    "Appellplatz: a praça vazia de 200 x 200 metros onde os prisioneiros ficavam horas em formação — a escala comunica o que as palavras não conseguem",
    "Barracões reconstruídos: os dormitórios originais para 200 homens chegaram a abrigar 2.000 em 1944 — as fotografias das camas empilhadas são definitivas",
    "Krematorium e câmara de gás: o complexo sul com a porta marcada 'Brausebad' (chuveiro) — a visita mais pesada e a mais necessária"
  ],
  "suggestedExperience": (
    "Reserve a manhã inteira e vá com calma — não tente correr. O audioguia (~€4,50) é altamente "
    "recomendado: as vozes dos sobreviventes dão rostos aos documentos. Comece pela exposição permanente "
    "(cronológica, 45-60 min), depois percorra o campo a pé no sentido norte-sul até o crematório. Há "
    "um café no centro de visitantes para uma pausa se precisar. A visita não tem resposta certa: é "
    "normal e adequado sair em silêncio."
  ),
  "searchSuggestions": [
    "Dachau memorial como chegar Munique S2 ônibus 726",
    "KZ-Gedenkstätte Dachau audioguia visita guiada",
    "Dachau campo concentração história abertura 1933",
    "Dachau libertação 1945 tropas americanas"
  ],
  "visitType": "outdoor+indoor",
  "entryFee": "Gratuito. Audioguia: ~€4,50. Visita guiada em inglês: ~€3,50–7. Estacionamento: ~€5",
  "schedule": {
    "mon": {"open": None, "close": None},
    "tue": {"open": "09:00", "close": "17:00"},
    "wed": {"open": "09:00", "close": "17:00"},
    "thu": {"open": "09:00", "close": "17:00"},
    "fri": {"open": "09:00", "close": "17:00"},
    "sat": {"open": "09:00", "close": "17:00"},
    "sun": {"open": "09:00", "close": "17:00"}
  },
  "estimatedVisitMinutes": 180,
  "externalViewingAlways": False,
  "proximityRadiusMeters": 200,
  "media": {
    "audio": "/media/routes/munique/audio/dachau-memorial.mp3",
    "photos": [
      {
        "src": "/media/routes/munique/photos/dachau-memorial/main.jpg",
        "caption": "Portão Jourhaus com a inscrição 'Arbeit Macht Frei' — entrada do campo de concentração de Dachau (1933)",
        "type": "recognition"
      }
    ],
    "subAttractions": [
      {
        "id": "appellplatz-dachau",
        "name": "Appellplatz — A Praça da Chamada",
        "image": "/media/routes/munique/sub-attractions/dachau-memorial/appellplatz-dachau.jpg",
        "caption": "A praça vazia onde 200.000 prisioneiros ficaram horas em formação — a escala do espaço é a exposição mais honesta do campo",
        "reel": {
          "audioMood": "contemplative",
          "segments": [
            {
              "text": "O Appellplatz tem 200 por 200 metros — deliberadamente vasto para que os prisioneiros ficassem expostos ao sol, à chuva ou à neve por horas enquanto os guardas contavam e recontavam. Qualquer discrepância reiniciava a contagem. Há registros de chamadas de 19 horas no inverno de 1933. A cerca eletrificada com 5.480 volts ficava à vista; entrar no fosso que a precedia era motivo de execução imediata.",
              "duration": 28,
              "focusZone": "full"
            }
          ]
        }
      },
      {
        "id": "krematorium-dachau",
        "name": "Krematorium e Câmara de Gás",
        "image": "/media/routes/munique/sub-attractions/dachau-memorial/krematorium-dachau.jpg",
        "caption": "O complexo do crematório com a câmara de gás rotulada 'Brausebad' — a parte mais pesada e mais necessária da visita",
        "reel": {
          "audioMood": "contemplative",
          "segments": [
            {
              "text": "O krematorium foi expandido em 1942 com um complexo que incluía uma câmara de gás com a inscrição Brausebad — chuveiro — na porta. As evidências históricas indicam que a câmara foi construída e usada para experimentos e execuções pontuais, mas não para assassinato em massa sistemático como em Auschwitz-Birkenau. Os corpos chegavam ao krematorium por outras causas: fome, exaustão, fuzilamentos e os experimentos médicos do médico SS Sigmund Rascher.",
              "duration": 30,
              "focusZone": "center"
            },
            {
              "text": "Rascher conduziu em Dachau experimentos de altitude simulada e hipotermia em prisioneiros — mergulhando-os em tanques de água gelada para medir limites de sobrevivência para pilotos da Luftwaffe. Foi preso e executado pelos próprios SS em 1945 por fraudes não relacionadas. Os dados dos experimentos foram debatidos por décadas na bioética médica: deveriam ser usados? A resposta dominante foi não — conhecimento obtido através de crimes não tem legitimidade científica.",
              "duration": 30,
              "focusZone": "detail"
            }
          ]
        }
      }
    ],
    "thumb": "/media/routes/munique/photos/dachau-memorial/thumb.jpg"
  },
  "walkingNotes": (
    "Do memorial à Alte Pinakothek: ônibus 726 de KZ-Gedenkstätte até Dachau Bahnhof (~10 min), "
    "S2 sentido Munique Hauptbahnhof (~28 min), depois metrô U2 de Hauptbahnhof até Königsplatz "
    "(2 paradas, 4 min) + 5 min a pé. Total: ~50 min. A Alte Pinakothek na terça abre às 10h e "
    "fecha às 20:30 — há tempo folgado mesmo chegando às 14h."
  ),
  "nextTransport": "subway",
  "nextTransportMinutes": 50,
  "tags": ["memorial", "história", "Segunda Guerra", "nazismo", "educação", "SS", "reflexão"]
}

# ── 2. Atualizar alte-pinakothek: ordem 2 ────────────────────────────────────
for poi in data["pois"]:
    if poi["id"] == "alte-pinakothek":
        poi["order"] = 2
        poi["walkingNotes"] = (
            "Fim do Dia 3. A Neue Pinakothek e a Pinakothek der Moderne ficam a menos de 5 minutos a pé, "
            "completando o Museumsareal — se ainda houver energia após Dachau e a Alte Pinakothek."
        )
        break

# ── 3. Inserir dachau antes de alte-pinakothek ───────────────────────────────
idx = next(i for i, p in enumerate(data["pois"]) if p["id"] == "alte-pinakothek")
data["pois"].insert(idx, dachau)

# ── 4. Atualizar dia-3 ────────────────────────────────────────────────────────
for day in data["days"]:
    if day["id"] == "dia-3":
        day["title"] = "Dachau e Alte Pinakothek"
        day["subtitle"] = "Memorial do Campo de Concentração · Quatro séculos de pintura europeia"
        day["theme"] = "A memória da barbárie e a grandeza da arte — dois polos necessários de um mesmo dia"
        day["startTime"] = "08:30"
        day["estimatedEndTime"] = "18:00"
        day["energyLevel"] = "intense"
        day["intro"] = (
            "O dia mais denso do roteiro começa fora de Munique: Dachau, o primeiro campo de concentração "
            "nazista, a 16 km do centro da cidade, aberto 53 dias após a posse de Hitler em 1933. Reservar "
            "a manhã inteira para este memorial não é opcional — a visita exige tempo, silêncio e atenção. "
            "À tarde, de volta à cidade, a Alte Pinakothek com Dürer, Leonardo, Rubens e Rafael: quatro "
            "séculos de pintura europeia num dos maiores museus do mundo. O contraste entre os dois momentos "
            "do dia é intencional e inevitável — e Munique, cidade que viu o nascimento do nazismo, não "
            "permite escapar dessa tensão."
        )
        day["poiIds"] = ["dachau-memorial", "alte-pinakothek"]
        break

# ── 5. Adicionar segment ─────────────────────────────────────────────────────
data.setdefault("segments", []).append({
    "from": "dachau-memorial",
    "to": "alte-pinakothek",
    "transport": "subway",
    "minutes": 50,
    "notes": "Ônibus 726 até Dachau Bahnhof (~10 min) + S2 até Hauptbahnhof (~28 min) + U2 até Königsplatz + 5 min a pé"
})

with open(ROUTE, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("munique.json atualizado.")
print(f"Total POIs: {len(data['pois'])}")
