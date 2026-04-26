#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io, json, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROUTE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "routes", "cesky-krumlov.json")

with open(ROUTE, encoding="utf-8") as f:
    data = json.load(f)

# ── 1. Atualizar dia-1 ────────────────────────────────────────────────────────
for day in data["days"]:
    if day["id"] == "dia-1":
        day["title"] = "O Castelo e a Cidade Medieval"
        day["subtitle"] = "Chegada às 11h · Torre do Castelo, Fosso dos Ursos e Náměstí ao entardecer"
        day["theme"] = "Do promontório do hrad às ruas medievais — o coração de Český Krumlov revelado em camadas"
        day["startTime"] = "11:00"
        day["estimatedEndTime"] = "21:00"
        day["energyLevel"] = "moderate"
        day["intro"] = (
            "O ônibus de Praga desce entre colinas verdes e entra em Český Krumlov pelo Latrán — a rua "
            "medieval na encosta do castelo, com casas do século XIV transformadas em ateliês e restaurantes. "
            "Às 11h você já está aqui, e tem o dia inteiro pela frente.\n\n"
            "A manhã e parte da tarde pertencem ao complexo do castelo: o segundo maior da República Tcheca, "
            "com cinco pátios em sequência crescente de intimidade, o Fosso dos Ursos, a Torre do Castelo "
            "com vista panorâmica do meandro do Vltava e — se reservado em zamek.ckrumlov.cz — o Teatro "
            "Barroco mais bem preservado do mundo, intocado desde 1766. Após almoço numa ruela medieval, a "
            "tarde explora o centro histórico: a Náměstí Svornosti com suas fachadas renascentistas, a "
            "Igreja de São Vito em silêncio gótico e a Plášťový most — a arcada barroca amarela que passa "
            "por cima do Latrán como um aqueduto romano e é a fotografia mais icônica da cidade."
        )
        day["poiIds"] = ["hrad-cesky-krumlov", "historicke-centrum-ck"]
        break

# ── 2. Atualizar dia-2 ────────────────────────────────────────────────────────
for day in data["days"]:
    if day["id"] == "dia-2":
        day["title"] = "Jardins Barrocos e Schiele"
        day["subtitle"] = "Alamedas ao amanhecer · Egon Schiele Art Centrum · Partida às 17h"
        day["theme"] = "A ordem formal dos jardins barrocos e o olhar perturbador de um gênio sobre a mesma cidade"
        day["startTime"] = "08:00"
        day["estimatedEndTime"] = "16:30"
        day["energyLevel"] = "light"
        day["intro"] = (
            "A última manhã em Český Krumlov começa nos jardins barrocos que abrem às 8h — chegue antes "
            "das 9h para ter as alamedas de tília quase só para vocês, antes que o fluxo de visitantes "
            "comece lá pelas 10h. A Grande Cascata com Atlas e Netuno em calcário, o Teatro de Jardim ao "
            "ar livre, as sebes simétricas recortadas: um dos jardins formais mais bem preservados da "
            "Europa Central, gratuito e quase vazio de manhã cedo.\n\n"
            "Depois, de volta à cidade, o Egon Schiele Art Centrum ocupa uma antiga cervejaria barroca do "
            "século XVI. Schiele chamava Český Krumlov de 'Die tote Stadt' — A Cidade Morta — e pintou "
            "obsessivamente os mesmos telhados medievais que vocês viram ontem, desta vez de cima, comprimidos "
            "como metáfora de claustrofobia existencial. Ver as pinturas e depois olhar pela janela para os "
            "mesmos telhados reais é uma das experiências mais singulares do roteiro.\n\n"
            "O ônibus parte da estação Spičák às 17h — saiam do Centrum às 16h30, são 15 minutos a pé."
        )
        day["poiIds"] = ["zamecka-zahrada", "egon-schiele-centrum"]
        break

# ── 3. Atualizar hrad-cesky-krumlov ──────────────────────────────────────────
for poi in data["pois"]:
    if poi["id"] == "hrad-cesky-krumlov":
        poi["walkingNotes"] = (
            "Do castelo ao centro histórico: desça o Latrán (a rua principal na encosta), atravesse a "
            "Lazebnický most (Ponte do Barbeiro, de pedra sobre o Vltava) e chegue à Náměstí Svornosti "
            "em 15 min a pé. Almoce no Latrán antes de continuar: a Krcma v Satlavske Ulici (Sátlavská 2) "
            "fica exatamente no meio da descida — ambiente medieval num edifício do século XV, pratos boêmios "
            "e cerveja local. O Papa's Living Restaurant é a alternativa com mesas sobre o rio."
        )
        poi["nextTransport"] = "walking"
        poi["nextTransportMinutes"] = 15
        break

# ── 4. Atualizar historicke-centrum-ck ───────────────────────────────────────
for poi in data["pois"]:
    if poi["id"] == "historicke-centrum-ck":
        poi["dayId"] = "dia-1"
        poi["order"] = 2
        poi["description"] = (
            "O Centro Histórico de Český Krumlov é uma das cidades medievais mais perfeitamente conservadas "
            "da Europa Central — e sua escala humana, surpreendentemente pequena, torna a experiência diferente "
            "das grandes capitais. O núcleo habitado, cercado pelo meandro do Vltava, tem apenas alguns "
            "quarteirões de largura: é possível percorrer todo o centro histórico a pé em menos de 20 minutos, "
            "mas cada beco, cada esquina, cada fachada merece pausa.\n\n"
            "A Náměstí Svornosti (Praça da Concórdia) é o coração pulsante da cidade desde o século XIV. "
            "Ao contrário das grandes praças de Praga ou Viena, não há monumentalidade opressora — a praça "
            "tem escala doméstica, como uma sala de estar a céu aberto. As casas ao redor, com suas fachadas "
            "de sgraffito renascentistas e detalhes barrocos posteriores, foram pintadas em rosas, ocres, "
            "amarelos e brancos. A Câmara Municipal gótica com sua torre quadrangular e a Coluna da Peste de "
            "1716 — erguida em ação de graças após epidemia bubônica que matou um terço da população — "
            "completam o quadro central.\n\n"
            "A Igreja de São Vito (Kostel sv. Víta), erguida a partir de 1407, é a principal igreja gótica "
            "da cidade e uma das mais autênticas da Boêmia do Sul — e quase ninguém entra, porque os turistas "
            "passam pela praça sem notar a porta lateral na Horní ulice. O interior guarda frescos do século "
            "XV em notável estado de conservação, abóbadas de nervura tardio-gótica e um coro de madeira "
            "entalhada do século XVII. A torre sineira separada da nave — elemento característico da "
            "arquitetura gótica boêmia — é um dos pontos mais fotografados da Náměstí. Entrada gratuita; "
            "o interior merece 20 minutos.\n\n"
            "A Plášťový most — literalmente 'ponte manto' — é a arcada barroca de três andares construída "
            "entre 1764 e 1766 para conectar o quinto pátio do castelo aos jardins barrocos no topo do "
            "terraço oposto. Projetada pelos arquitetos dos Schwarzenberg, ela passa por cima da rua do "
            "Latrán como um aqueduto romano tardio, pintada em amarelo ocre sobre o fundo verde das colinas. "
            "Vista de baixo, da rua que passa sob seus arcos, é uma das fotografias mais icônicas da Europa "
            "Central — o ângulo que aparece em todos os postais e guias de viagem. Posicione-se no centro "
            "da rua e enquadre os três arcos com o castelo e as colinas ao fundo.\n\n"
            "O bairro do Latrán preserva casas medievais dos séculos XIV e XV — hoje ateliês, lojas de "
            "artesanato e restaurantes. A Lazebnický most (Ponte do Barbeiro), a ponte de pedra que conecta "
            "o Latrán à ilha histórica, oferece a vista clássica da cidade: torre, fachadas coloridas, rio e "
            "colinas verdes ao fundo. Fotografem no sentido norte, com o castelo iluminado como pano de fundo."
        )
        poi["observationPoints"] = [
            "Náměstí Svornosti ao entardecer: a luz rasante transforma o sgraffito renascentista em relevo tridimensional — melhor depois das 17h",
            "Igreja de São Vito (interior): os frescos do século XV no teto da abside norte, quase sempre vistos sem outros visitantes",
            "Plášťový most vista de baixo: o centro da rua do Latrán, com os três arcos amarelos enquadrando o castelo e as colinas — A fotografia",
            "Lazebnický most (Ponte do Barbeiro): vista norte sobre o rio com o castelo iluminado ao fundo, a cena mais clássica da cidade",
            "Becos do Latrán: as ruelas laterais que descem até o Vltava — perspectivas do rio que a maioria dos turistas não encontra"
        ]
        poi["suggestedExperience"] = (
            "Chegue ao centro histórico por volta das 14h30, após almoço no Latrán. Atravesse a Lazebnický "
            "most e entre na Náměstí Svornosti — sente-se num café e observe as fachadas, a Câmara Municipal "
            "gótica e a Coluna da Peste. Depois, desvie para a Igreja de São Vito (entrada pela Horní ulice, "
            "lado norte da praça): são 20 minutos num interior gótico extraordinariamente silencioso.\n\n"
            "Suba pelo Latrán de volta em direção ao castelo e pare sob a Plášťový most: posicione-se no "
            "centro da rua e enquadre os arcos barrocos amarelos com o castelo ao fundo. Esse é o cartão- "
            "postal número um de Český Krumlov. Explore as ruelas laterais do Latrán que descem ao Vltava — "
            "vistas intimistas do rio que quase ninguém fotografa.\n\n"
            "Termine o dia na Lazebnický most ao entardecer: a luz dourada do fim de tarde pinta as fachadas "
            "medievais e o reflexo do castelo no Vltava é o encerramento perfeito para o dia mais intenso "
            "do roteiro."
        )
        poi["nextTransport"] = None
        poi["nextTransportMinutes"] = None
        poi["walkingNotes"] = (
            "Fim do Dia 1. Hotel ou pousada costumam estar no próprio Latrán ou na ilha histórica — você "
            "estará a pé de tudo. Para o dia seguinte, os Jardins Barrocos ficam a 20 min a pé: suba o "
            "Latrán até o castelo e prossiga pelo quinto pátio até o terraço dos jardins."
        )
        # Remover egon-schiele-centrum dos sub-attractions (vai virar POI standalone no dia-2)
        # Adicionar São Vito e Plášťový most
        existing_subs = [s for s in poi["media"]["subAttractions"]
                         if s["id"] != "egon-schiele-centrum"]

        sao_vito = {
            "id": "sao-vito-ck",
            "name": "Igreja de São Vito",
            "image": "/media/routes/cesky-krumlov/sub-attractions/historicke-centrum-ck/sao-vito-ck.jpg",
            "caption": "A principal igreja gótica de Český Krumlov (1407) — frescos do século XV num interior quase sem visitantes",
            "reel": {
                "audioMood": "medieval",
                "segments": [
                    {
                        "text": "A Igreja de São Vito — Kostel sv. Víta — foi erguida a partir de 1407 como principal igreja gótica de Český Krumlov, substituindo uma construção anterior do século XIII. A nave tem abóbadas de nervura tardio-gótica e os frescos do século XV — representando santos locais e cenas bíblicas — sobreviveram às guerras hussitas, à Reforma e às reformas barrocas com notável integridade.",
                        "duration": 28,
                        "focusZone": "full"
                    },
                    {
                        "text": "A porta sul em pedra arenárea, com molduras vegetais e figura central esculpida, é o acesso principal e um exemplo raro de escultura gótica boêmia do início do século XV. O interior é incomumente silencioso para uma cidade tão visitada — a maioria dos turistas passa pela praça sem entrar, o que torna a experiência quase privada.",
                        "duration": 24,
                        "focusZone": "center"
                    },
                    {
                        "text": "A torre sineira separada da nave — elemento característico das igrejas góticas da Boêmia do Sul — foi erguida no século XV. Vista da Náměstí Svornosti, a composição da torre com as fachadas renascentistas ao redor é um dos cartões-postais mais autênticos da cidade, fotografada de forma que os turistas de grupos raramente descobrem.",
                        "duration": 24,
                        "focusZone": "top"
                    }
                ]
            }
        }

        plastyovy = {
            "id": "plastyovy-most",
            "name": "Plášťový Most — A Ponte Manto",
            "image": "/media/routes/cesky-krumlov/sub-attractions/historicke-centrum-ck/plastyovy-most.jpg",
            "caption": "A arcada barroca de três andares (1764–1766) vista de baixo — a fotografia mais icônica de Český Krumlov",
            "reel": {
                "audioMood": "baroque",
                "segments": [
                    {
                        "text": "A Plášťový most — literalmente 'ponte manto' — foi construída entre 1764 e 1766 por ordem dos Schwarzenberg para resolver um problema elegante: como conectar o quinto pátio do castelo aos jardins barrocos no terraço acima do vale, passando por cima da rua movimentada do Latrán sem interromper o tráfego abaixo?",
                        "duration": 26,
                        "focusZone": "full"
                    },
                    {
                        "text": "A solução foi uma arcada de três andares em pedra, pintada em amarelo ocre — 40 metros atravessando a rua como um aqueduto romano tardio. O andar superior era a galeria coberta por onde a família nobre passeava ao abrigo da chuva. O andar médio servia de corredor de serviço. Os arcos do andar inferior deixam a rua passar por baixo sem obstrução.",
                        "duration": 26,
                        "focusZone": "center"
                    },
                    {
                        "text": "Vista de baixo, da rua do Latrán, a Plášťový most é a fotografia que define Český Krumlov: o amarelo da arcada enquadrado pelo verde das colinas, com a Torre do Castelo ao fundo à esquerda. Para a imagem perfeita, posicione-se no centro da rua e enquadre os três arcos com o céu azul — é o ângulo que aparece em todos os postais, cartazes e guias de viagem do mundo.",
                        "duration": 26,
                        "focusZone": "bottom"
                    }
                ]
            }
        }

        existing_subs.append(sao_vito)
        existing_subs.append(plastyovy)
        poi["media"]["subAttractions"] = existing_subs
        break

# ── 5. Atualizar zamecka-zahrada ──────────────────────────────────────────────
for poi in data["pois"]:
    if poi["id"] == "zamecka-zahrada":
        poi["walkingNotes"] = (
            "Dos jardins ao Egon Schiele Art Centrum: desça pelo Latrán (a rua principal na encosta abaixo "
            "do castelo), atravesse a Lazebnický most sobre o Vltava e siga pela Široká — o Centrum fica "
            "a 15 min a pé, numa antiga cervejaria barroca do século XVI com fachada na margem da ilha "
            "histórica."
        )
        poi["nextTransport"] = "walking"
        poi["nextTransportMinutes"] = 15
        break

# ── 6. Adicionar POI egon-schiele-centrum ─────────────────────────────────────
egon_schiele = {
    "id": "egon-schiele-centrum",
    "dayId": "dia-2",
    "order": 2,
    "name": "Egon Schiele Art Centrum",
    "lat": 48.8103,
    "lng": 14.3186,
    "address": "Široká 71, 381 01 Český Krumlov",
    "historicalPeriod": "modern",
    "yearBuilt": "Século XVI (cervejaria) / 1992 (museu)",
    "architecturalStyle": "Renascentista (edifício) / Contemporâneo (espaço interno)",
    "significance": "Principal museu de arte moderna da Boêmia do Sul; única coleção permanente de Schiele na cidade que ele chamou de 'A Cidade Morta'",
    "description": (
        "O Egon Schiele Art Centrum ocupa uma antiga cervejaria renascentista do século XVI na ilha histórica "
        "de Český Krumlov, recuperada como espaço cultural em 1992 por iniciativa da própria cidade. É o "
        "principal museu de arte moderna do sul da Boêmia — e a conexão entre ele e Český Krumlov vai muito "
        "além do endereço.\n\n"
        "Egon Schiele (1890–1918) é considerado um dos maiores pintores expressionistas do século XX. "
        "Discípulo de Gustav Klimt que rapidamente rompeu com o ornamentalismo decorativo do mestre, Schiele "
        "criou uma linguagem visual radicalmente nova: figuras humanas angulares, contorcidas, com contornos "
        "deliberadamente fora da proporção acadêmica — corpos que comunicam ansiedade existencial de um modo "
        "que nenhuma figura tecnicamente correta conseguiria. Seus auto-retratos e retratos de nus confrontam "
        "o observador com uma nudez sem glamour ou idealização: não corpos bonitos posando, mas corpos que "
        "existem, que sofrem, que habitam o mundo.\n\n"
        "A conexão com Český Krumlov é profunda. A mãe de Schiele, Marie Soukupová, nasceu aqui em 1862. "
        "Após a morte do pai em 1905 e a consequente instabilidade financeira da família, Schiele passou "
        "temporadas na casa dos avós maternos aqui. Em 1911, retornou à cidade com sua companheira Wally "
        "Neuzil para instalar um ateliê — e foi rejeitado pelos moradores conservadores, escandalizados com "
        "os modelos nus. Expulso em menos de um ano, Schiele partiu com algo inestimável: a série 'Die tote "
        "Stadt' (A Cidade Morta), pinturas da cidade vista de cima, com os telhados medievais comprimidos "
        "como se a própria arquitetura sufocasse quem vive embaixo.\n\n"
        "O título não é literal — é psicológico. Schiele via em Český Krumlov o conservadorismo que sufocava "
        "o novo, a vida aprisionada pelo peso da tradição. Os telhados nas pinturas quase se tocam, as janelas "
        "são fechadas, não há figuras humanas nas ruas. A beleza da cidade na pintura é indistinguível da sua "
        "opressão. Ao ver os quadros e depois olhar pela janela do museu para os mesmos telhados que vocês "
        "caminharam ontem, a tensão que Schiele sentiu em 1911 ainda é palpável.\n\n"
        "Schiele morreu em outubro de 1918, três dias após sua esposa Edith, ambos vítimas da gripe espanhola "
        "que matou entre 50 e 100 milhões de pessoas naquele outono. Ele tinha 28 anos. O reconhecimento "
        "pleno veio décadas depois — mas as obras deixadas em menos de uma década de produção adulta mudaram "
        "permanentemente o que a pintura pode dizer sobre a condição humana.\n\n"
        "O Centrum exibe originais de Schiele (gravuras, desenhos, litografias) e obras de expressionistas "
        "austríacos e tchecos — Klimt, Kokoschka, Max Oppenheimer — ao lado de exposições temporárias de "
        "arte contemporânea."
    ),
    "immersiveMode": False,
    "immersiveText": None,
    "observationPoints": [
        "Série 'Die tote Stadt': as pinturas dos telhados de Český Krumlov de cima — compare com os telhados reais visíveis pela janela do museu",
        "Auto-retratos: o olhar fixo, as mãos com dedos exagerados, a ausência de qualquer idealização — um confronto direto com o artista",
        "Edifício: os arcos renascentistas da cervejaria do século XVI, o pátio interno recuperado na restauração de 1992",
        "Exposição temporária (térreo): artistas tchecos contemporâneos geralmente em diálogo direto com o expressionismo de Schiele"
    ],
    "suggestedExperience": (
        "Chegue por volta das 10h, quando o museu abre e antes dos grupos organizados. Reserve 75 a 90 "
        "minutos: comece no segundo andar (coleção permanente — os Schiele originais, os expressionistas "
        "austríacos) e desça para o térreo (exposição temporária). Antes de sair, fique um momento no "
        "pátio interno da antiga cervejaria.\n\n"
        "Após o Centrum, aproveite as horas restantes para compras de artesanato boêmio no Latrán "
        "(cerâmica, cristal, marionetes artesanais) e um almoço final antes da partida. Às 16h30, "
        "caminhem em direção à estação Spičák: siga pela Horní ulice subindo (norte) até a BR 159 — "
        "15 min a pé, com tempo de sobra para o ônibus das 17h."
    ),
    "searchSuggestions": [
        "Egon Schiele Art Centrum Český Krumlov ingresso horário",
        "Die tote Stadt Schiele pinturas Český Krumlov análise",
        "Egon Schiele mãe Marie Soukupová Boêmia",
        "expressionismo austríaco Klimt Kokoschka Schiele comparação"
    ],
    "visitType": "indoor",
    "entryFee": "320 CZK (~€13). Estudantes: 190 CZK (~€8). Menores de 10 anos: gratuito",
    "schedule": {
        "monday": "Fechado",
        "tuesday": "10:00–18:00",
        "wednesday": "10:00–18:00",
        "thursday": "10:00–18:00",
        "friday": "10:00–18:00",
        "saturday": "10:00–18:00",
        "sunday": "10:00–18:00"
    },
    "estimatedVisitMinutes": 90,
    "externalViewingAlways": False,
    "proximityRadiusMeters": 50,
    "media": {
        "audio": "/media/routes/cesky-krumlov/audio/egon-schiele-centrum.mp3",
        "photos": [
            {
                "src": "/media/routes/cesky-krumlov/photos/egon-schiele-centrum/main.jpg",
                "caption": "Egon Schiele Art Centrum — antiga cervejaria renascentista do século XVI",
                "type": "recognition"
            }
        ],
        "subAttractions": [
            {
                "id": "die-tote-stadt",
                "name": "Die tote Stadt — A Cidade Morta",
                "image": "/media/routes/cesky-krumlov/sub-attractions/egon-schiele-centrum/die-tote-stadt.jpg",
                "caption": "A série de Český Krumlov vista de cima: telhados comprimidos como metáfora de claustrofobia existencial",
                "reel": {
                    "audioMood": "contemplative",
                    "segments": [
                        {
                            "text": "Em 1911, Schiele instalou-se em Český Krumlov com sua companheira Wally Neuzil. Os moradores conservadores da cidade o expulsaram em menos de um ano — chocados com os modelos nus que posavam no ateliê. Schiele partiu com uma produção extraordinária: a série Die tote Stadt, pinturas aéreas da cidade com os telhados medievais comprimidos até sufocar.",
                            "duration": 28,
                            "focusZone": "full"
                        },
                        {
                            "text": "O título 'A Cidade Morta' não é arquitetônico — é psicológico. Schiele via em Český Krumlov o conservadorismo que sufocava o novo, a vida aprisionada pelo peso da tradição. Os telhados nas pinturas quase se tocam, as janelas são fechadas, não há figuras humanas nas ruas. A beleza da cidade na pintura é indistinguível da sua opressão.",
                            "duration": 26,
                            "focusZone": "center"
                        },
                        {
                            "text": "Olhe pela janela do museu depois de ver as pinturas. Os mesmos telhados medievais, a mesma curvatura do Vltava, o mesmo castelo ao fundo. Schiele pintou exatamente essa vista — com exatamente esse peso de beleza e claustrofobia simultaneamente. Cem anos depois, a tensão que ele sentiu ainda é palpável nesta cidade.",
                            "duration": 24,
                            "focusZone": "full"
                        }
                    ]
                }
            },
            {
                "id": "autorretratos-schiele",
                "name": "Auto-Retratos e a Linguagem Expressionista",
                "image": "/media/routes/cesky-krumlov/sub-attractions/egon-schiele-centrum/autorretratos-schiele.jpg",
                "caption": "Figuras angulares, olhar direto, sem idealização — Schiele usa o próprio corpo como laboratório de ansiedade existencial",
                "reel": {
                    "audioMood": "contemplative",
                    "segments": [
                        {
                            "text": "Schiele pintou mais de 100 auto-retratos em menos de dez anos de produção adulta — um número extraordinário. Não são retratos de autocomplacência: são estudos de ansiedade, identidade instável, de um homem que se usa como cobaia emocional. As mãos são sempre exageradas, os dedos longos como galhos, a expressão entre o desafio e o pânico.",
                            "duration": 26,
                            "focusZone": "center"
                        },
                        {
                            "text": "A nudez nas obras de Schiele era revolucionária não pela exposição, mas pela ausência de idealização. Os corpos são magros, assimétricos, com membros em ângulos impossíveis — não corpos belos posando, mas corpos existindo. Em 1912, ele foi preso em Neulengbach acusado de obscenidade. O juiz queimou um de seus desenhos na chama de uma vela durante o julgamento.",
                            "duration": 26,
                            "focusZone": "detail"
                        },
                        {
                            "text": "Schiele morreu em outubro de 1918, três dias após sua esposa Edith, vítimas da gripe espanhola. Ele tinha 28 anos. O reconhecimento pleno veio décadas depois — mas as obras que ele deixou mudaram permanentemente o que a pintura pode dizer sobre a condição humana. Saindo do museu, os mesmos telhados medievais que ele pintou esperam por vocês lá fora.",
                            "duration": 26,
                            "focusZone": "full"
                        }
                    ]
                }
            }
        ],
        "thumb": "/media/routes/cesky-krumlov/photos/egon-schiele-centrum/thumb.jpg"
    },
    "walkingNotes": (
        "Do Centrum à estação Spičák: siga pela Horní ulice subindo (direção norte) até o entroncamento "
        "com a estrada BR 159 — a Český Krumlov Spičák Bus Station fica à direita, 15 min a pé. O ônibus "
        "parte às 17h — saiam do Centrum às 16h30."
    ),
    "nextTransport": None,
    "nextTransportMinutes": None,
    "tags": ["arte", "expressionismo", "Schiele", "moderno", "museu", "história", "Viena", "Boêmia"]
}

# Inserir egon-schiele-centrum após zamecka-zahrada
idx = next(i for i, p in enumerate(data["pois"]) if p["id"] == "zamecka-zahrada")
data["pois"].insert(idx + 1, egon_schiele)

# ── 7. Atualizar segments ─────────────────────────────────────────────────────
data["segments"] = [
    {
        "from": "hrad-cesky-krumlov",
        "to": "historicke-centrum-ck",
        "transport": "walking",
        "minutes": 15,
        "notes": "Desça o Latrán, almoço na Krcma v Satlavske Ulici, atravesse a Lazebnický most até a ilha histórica"
    },
    {
        "from": "zamecka-zahrada",
        "to": "egon-schiele-centrum",
        "transport": "walking",
        "minutes": 15,
        "notes": "Desça o Latrán, atravesse a ponte sobre o Vltava, siga pela Široká até a cervejaria"
    }
]

with open(ROUTE, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("cesky-krumlov.json atualizado.")
print(f"Total POIs: {len(data['pois'])}")
print()
for day in data["days"]:
    pois = [p for p in data["pois"] if p["dayId"] == day["id"]]
    pois.sort(key=lambda x: x["order"])
    print(f"=== {day['id']} ({day['startTime']}-{day['estimatedEndTime']}): {day['title']} ===")
    for p in pois:
        print(f"  [{p['order']}] {p['id']} | next={p.get('nextTransport')} ({p.get('nextTransportMinutes')}min)")
        subs = p.get("media", {}).get("subAttractions", [])
        if subs:
            print(f"      sub-attractions: {[s['id'] for s in subs]}")
