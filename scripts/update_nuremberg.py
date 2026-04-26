#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io, json, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROUTE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "routes", "nuremberg.json")

with open(ROUTE, encoding="utf-8") as f:
    data = json.load(f)

# ── 1. Atualizar dia-1 ────────────────────────────────────────────────────────
for day in data["days"]:
    if day["id"] == "dia-1":
        day["title"] = "O Castelo Imperial e a Alma Medieval"
        day["subtitle"] = "Kaiserburg · Dürer · Hauptmarkt · St. Lorenz · Cerveja Francônia no Handwerkerhof"
        day["theme"] = "Da vista panorâmica do topo da colina imperial aos arcos medievais iluminados ao entardecer"
        day["startTime"] = "09:00"
        day["estimatedEndTime"] = "22:00"
        day["energyLevel"] = "moderate"
        day["intro"] = (
            "Nuremberg guarda dois rostos distintos e igualmente poderosos — e o dia 1 pertence ao mais "
            "antigo: a cidade imperial do Sacro Império, onde 36 imperadores realizaram suas primeiras "
            "dietas e cujos artesãos e comerciantes fizeram dela uma das cidades mais ricas da Europa. "
            "Comece no ponto mais alto: a Kaiserburg, o castelo que nunca foi conquistado militarmente, "
            "com sua vista de 360 graus sobre os telhados vermelhos e a planície franca.\n\n"
            "Descendo pela Burgstraße medieval, a Casa de Albrecht Dürer — o maior pintor do Renascimento "
            "alemão — aparece numa esquina do bairro dos artesãos. Ali ao lado, a Kettensteg, a velha "
            "ponte de ferro sobre o Pegnitz, oferece a perspectiva mais fotogênica da muralha do castelo "
            "refletida no rio. O Hauptmarkt ao meio-dia com Rostbratwurst recém-saídas da grelha de ferro "
            "e uma Tucher geladinha é um dos rituais irrecusáveis de Nuremberg. À tarde, a Igreja de "
            "São Lourenço — o maior templo gótico da cidade — guarda dois dos maiores tesouros da arte "
            "alemã: a Anunciação flutuante de Veit Stoss e o tabernáculo de pedra de Adam Kraft. O dia "
            "termina no Handwerkerhof, o pátio dos artesãos encostado à velha muralha do Königstor: "
            "um Schlenkerla ou uma Tucher Helles numa mesa de madeira, olhando para quem passa, enquanto "
            "as lamparinas iluminam as fachadas de enxaimel."
        )
        day["poiIds"] = [
            "kaiserburg",
            "durer-haus",
            "hauptmarkt-nuremberg",
            "st-lorenz-kirche",
            "handwerkerhof"
        ]
        break

# ── 2. Atualizar dia-2 ────────────────────────────────────────────────────────
for day in data["days"]:
    if day["id"] == "dia-2":
        day["title"] = "Nazismo, Julgamentos e a Consciência da Europa"
        day["subtitle"] = "Dokumentationszentrum · Memorial dos Julgamentos (Sala 600) · Germanisches (opcional)"
        day["theme"] = "O peso da história alemã — de onde veio o nazismo e o que a humanidade fez depois"
        day["energyLevel"] = "intense"
        day["intro"] = (
            "O dia 2 é o mais pesado do roteiro — e também o mais necessário. Nuremberg foi escolhida "
            "para os comícios nazistas não por acidente: era a 'cidade dos imperadores', o símbolo da "
            "grandeza alemã medieval, e Hitler queria exatamente essa aura de legitimidade histórica "
            "para seu regime. O Dokumentationszentrum, instalado dentro da Kongresshalle inacabada de "
            "Albert Speer, documenta como a democracia foi destruída de dentro — em câmara lenta, com "
            "aplausos. Leve ao menos 3 horas; o audioguia em português/inglês é imprescindível.\n\n"
            "À tarde, o Memorial dos Julgamentos de Nuremberg na Sala 600 do Justizpalast: o mesmo "
            "tribunal onde Göring, Hess e Ribbentrop foram julgados pelos crimes contra a humanidade "
            "entre novembro de 1945 e outubro de 1946. A sala continua em uso para julgamentos comuns "
            "hoje — sentar nessas mesmas cadeiras é uma experiência sem equivalente. Fundou-se ali o "
            "conceito de 'crime contra a humanidade' que ainda é a base do direito internacional.\n\n"
            "Se ainda houver energia no final da tarde, o Germanisches Nationalmuseum — o maior museu "
            "de cultura germânica do mundo — fica a 20 minutos de transporte. Com Dürer originais, "
            "armaduras medievais e o mapa de Behaim (o globo mais antigo do mundo, de 1492). É uma "
            "alternativa cultural ao segundo período do dia, ou um acréscimo para quem tiver pique."
        )
        day["poiIds"] = [
            "dokumentationszentrum",
            "memorial-julgamentos",
            "germanisches-nationalmuseum"
        ]
        break

# ── 3. Atualizar kaiserburg ───────────────────────────────────────────────────
for poi in data["pois"]:
    if poi["id"] == "kaiserburg":
        poi["walkingNotes"] = (
            "Do terraço da Kaiserburg, desça pela Burgstraße em direção ao Tiergärtnertorplatz. "
            "Antes de virar para a Albrecht-Dürer-Straße, faça o desvio de 5 minutos à esquerda "
            "para a Kettensteg — a velha ponte de correntes sobre o Pegnitz. É o ângulo clássico "
            "da muralha do castelo refletida no rio, quase sem turistas de manhã cedo. Depois volte "
            "e siga 3 minutos até o nº 39 da Albrecht-Dürer-Straße."
        )
        poi["nextTransport"] = "walking"
        poi["nextTransportMinutes"] = 15
        poi["media"]["subAttractions"].append({
            "id": "kettensteg",
            "name": "Kettensteg — A Ponte de Correntes",
            "image": "/media/routes/nuremberg/sub-attractions/kaiserburg/kettensteg.jpg",
            "caption": "A velha ponte pedestre de ferro sobre o Pegnitz — vista clássica da muralha do castelo refletida na água",
            "reel": {
                "audioMood": "medieval",
                "segments": [
                    {
                        "text": "A Kettensteg — literalmente 'ponte de correntes' — é uma das mais antigas pontes pedestres de ferro da Europa, suspensa por correntes sobre o Rio Pegnitz. Do centro da ponte, o ângulo norte revela a muralha do castelo e as torres medievais refletidas na água calma — uma das composições fotográficas mais autênticas de Nuremberg, longe do movimento turístico do Hauptmarkt.",
                        "duration": 26,
                        "focusZone": "full"
                    },
                    {
                        "text": "O Pegnitz divide Nuremberg em duas metades que tiveram histórias distintas: ao norte, o bairro do castelo e os artesãos; ao sul, os mercadores e a burguesia comercial. A ponte não foi só física — foi a passagem diária entre duas classes. Os telhados de enxaimel que se inclinam sobre o rio nas duas margens são os mesmos há 500 anos.",
                        "duration": 22,
                        "focusZone": "center"
                    }
                ]
            }
        })
        break

# ── 4. Atualizar hauptmarkt ───────────────────────────────────────────────────
for poi in data["pois"]:
    if poi["id"] == "hauptmarkt-nuremberg":
        poi["order"] = 3
        poi["suggestedExperience"] = (
            "Esta é a pausa para almoço do dia — e Nuremberg não perdoa quem ignora a Rostbratwurst. "
            "Vá a um dos quiosques na praça (o Bratwursthäusle ao lado da Frauenkirche tem a fila certa "
            "— local, não turístico) e peça '6 no pão' ou '8 no prato' com chucrute. A Nürnberger "
            "Rostbratwurst é menor que qualquer outra salsicha alemã — 7-9 cm — e assada em grelha de "
            "ferro de faia. É exclusiva da cidade com IGP europeia desde 2003. Sente com uma Tucher "
            "Helles ou Schlenkerla Märzen na mesa de pedra, olhe para o Schöner Brunnen e para os "
            "telhados medievais. Esse é o momento de respirar e absorver.\n\n"
            "Depois do almoço: vá até a fonte, passe a mão no anel dourado da grade (o anel gira sem "
            "encaixe — como foi colocado há 600 anos é um mistério ainda não resolvido). Se for ao "
            "meio-dia, o Männleinlaufen da Frauenkirche começa às 12h em ponto — posicione-se 10 min "
            "antes para ver de frente os 7 príncipes eleitos circulando em torno do Imperador Carlos IV."
        )
        poi["walkingNotes"] = (
            "Do Hauptmarkt à Igreja de São Lourenço: desça a Museumsbrücke (a ponte sobre o Pegnitz "
            "logo a sul da praça) — 3 min a pé — e a fachada gótica da St. Lorenz aparece diretamente "
            "à frente. A fachada oeste com o grande rosáceo e as duas torres é a vista de chegada. "
            "Entrada principal pelo portal sul (Lorenzer Platz)."
        )
        poi["nextTransport"] = "walking"
        poi["nextTransportMinutes"] = 5
        break

# ── 5. Atualizar dokumentationszentrum ───────────────────────────────────────
for poi in data["pois"]:
    if poi["id"] == "dokumentationszentrum":
        poi["order"] = 1
        poi["nextTransport"] = "subway"
        poi["nextTransportMinutes"] = 30
        poi["walkingNotes"] = (
            "Do Dokumentationszentrum ao Memorial dos Julgamentos: tome o bonde Linie 8 de volta "
            "à estação central (Hauptbahnhof), depois siga a pé ou de táxi ~10 min até a "
            "Bärenschanzstraße 72. Total: ~30 min. Se preferir economizar tempo, "
            "tome um táxi direto do Dokuzentrum (cerca de €12–15, 15 min)."
        )
        break

# ── 6. Atualizar germanisches-nationalmuseum ──────────────────────────────────
for poi in data["pois"]:
    if poi["id"] == "germanisches-nationalmuseum":
        poi["order"] = 3
        poi["suggestedExperience"] = (
            "Opcional — visite se ainda houver energia após o Dokuzentrum e o Memorial dos Julgamentos, "
            "ou como alternativa cultural ao segundo período do dia. Priorize: a sala de Albrecht Dürer "
            "(originais do maior pintor alemão do Renascimento), a seção de armaduras e armas medievais, "
            "e o Erdapfel de Martin Behaim — o globo terrestre mais antigo do mundo, de 1492, fabricado "
            "em Nuremberg antes de Colombo voltar das Américas. A ironia: o mapa do mundo mais preciso "
            "de sua época não mostra o continente que seria descoberto semanas depois de ser feito. "
            "Museu fechado às segundas-feiras. Gratuito às quartas após 18h."
        )
        break

# ── 7. Novos POIs ─────────────────────────────────────────────────────────────

# ─ durer-haus ─────────────────────────────────────────────────────────────────
durer_haus = {
    "id": "durer-haus",
    "dayId": "dia-1",
    "order": 2,
    "name": "Casa de Albrecht Dürer",
    "lat": 49.4566,
    "lng": 11.0770,
    "address": "Albrecht-Dürer-Straße 39, 90403 Nürnberg",
    "historicalPeriod": "renaissance",
    "yearBuilt": "c. 1420 (construção) / 1509 (compra por Dürer)",
    "architecturalStyle": "Enxaimel tardio-gótico (Fachwerk)",
    "significance": "Única residência de Albrecht Dürer preservada no mundo; o maior pintor do Renascimento alemão viveu aqui de 1509 até sua morte em 1528",
    "description": (
        "A casa de enxaimel de quatro andares na Albrecht-Dürer-Straße 39 é, ao mesmo tempo, um dos "
        "monumentos mais importantes da arte alemã e um dos espaços museológicos mais íntimos da Europa "
        "Central. Albrecht Dürer comprou esta casa em 1509, aos 38 anos, por 275 florins de ouro — uma "
        "fortuna que ele só conseguiu reunir graças ao sucesso das suas gravuras em metal e em madeira, "
        "vendidas por toda a Europa antes de qualquer pintura sua ter encontrado um comprador importante. "
        "Ele viveu aqui até sua morte em 6 de abril de 1528. Não saiu uma única vez deste bairro.\n\n"
        "Dürer (1471–1528) é o artista mais importante do Renascimento alemão — o homem que trouxe para "
        "o norte europeu os ensinamentos italianos sobre perspectiva matemática, proporção humana e "
        "anatomia, e os fundiu com a tradição gótica nórdica de detalhe obsessivo e intensidade expressiva. "
        "Ele estudou com Giovanni Bellini em Veneza em 1494–1495 e voltou transformado: o primeiro artista "
        "alemão a compreender Leon Battista Alberti e Leonardo da Vinci. Mas — ao contrário dos italianos "
        "— Dürer nunca abandonou o mundo real e rugoso do norte: suas mãos são mãos de trabalhador, seus "
        "rostos têm cicatrizes e imperfeições, seus animais têm pelos e músculos concretos.\n\n"
        "O edifício original data de cerca de 1420 e pertencia, antes de Dürer, ao matemático e astrônomo "
        "Bernhard Walther. A estrutura de enxaimel com projeções de andar sobre andar — típica da "
        "arquitetura germânica do século XV — preserva a distribuição interna original: oficina e depósito "
        "no térreo, aposentos de recepção no primeiro andar, ateliê de pintura no segundo, câmaras privadas "
        "no terceiro. Os visitantes percorrem os quatro andares numa reconstituição que inclui prensas de "
        "gravura em funcionamento, pigmentos da época, instrumentos de desenho e réplicas das obras mais "
        "famosas nas paredes onde provavelmente foram criadas.\n\n"
        "O Selbstbildnis (auto-retrato) de 1500 — o mais ousado da história da arte ocidental até então, "
        "onde Dürer se pinta em posição frontalmente hierática reservada à iconografia de Cristo — foi "
        "criado exatamente neste período, antes de comprar a casa. O original está na Alte Pinakothek de "
        "Munique. Aqui há uma reprodução de alta qualidade, mas o que importa é o contexto: entender que "
        "este homem que pintou a si mesmo como divindade era o mesmo que descia à rua todos os dias para "
        "comprar tinta de insetos, óleo de linhaça e metais para suas matrizes de gravura.\n\n"
        "Dürer morreu em 1528, provavelmente de malária contraída numa viagem à Zelândia holandesa para "
        "ver um baleia encalhada. Seu amigo e biógrafo Joachim Camerarius escreveu: 'Quanto de arte viveu "
        "neste homem, que foi capaz de mostrar.' Está sepultado no Johannisfriedhof, a 15 minutos a pé, "
        "numa lápide que ele mesmo desenhou."
    ),
    "immersiveMode": True,
    "immersiveText": (
        "Pare no segundo andar — o ateliê de pintura, com a janela de guilhotina que deixa entrar a luz "
        "do norte em ângulo difuso, sem sombras duras. Dürer escolheu esta casa por esta janela. A luz "
        "do norte era, para ele, o que a câmara escura seria para Vermeer meio século depois: um "
        "instrumento de precisão.\n\n"
        "Olhe para a prensa de gravura no canto. As gravuras em metal de Dürer — o Cavaleiro, a Morte "
        "e o Diabo (1513), São Jerônimo no Gabinete (1514), Melencolia I (1514) — foram os primeiros "
        "objetos de arte da história ocidental produzidos em série e vendidos por correspondência. Dürer "
        "tinha distribuidores em Frankfurt, Veneza, Antuérpia e Roma. Uma edição das gravuras dos doze "
        "apóstolos esgotava em dias. Ele era, essencialmente, o primeiro artista moderno com mercado "
        "editorial próprio.\n\n"
        "A Melencolia I merece atenção especial, mesmo na reprodução. O anjo sentado com a cabeça "
        "apoiada na mão, rodeado de instrumentos científicos e geométricos espalhados sem uso, é uma "
        "das imagens mais analisadas da história da arte. Erwin Panofsky dedicou um livro inteiro a "
        "ela em 1943. O quadrado mágico no canto superior direito soma 34 em todas as direções — linha, "
        "coluna, diagonal, quadrantes. O ano de criação (1514) está nas duas células centrais da linha "
        "inferior. Dürer escondeu ali uma data, uma assinatura, um enigma matemático e uma autobiografia "
        "emocional — tudo ao mesmo tempo.\n\n"
        "No terceiro andar, o quarto de Agnes Frey, a esposa de Dürer. Ela administrava a venda das "
        "gravuras nos mercados de Frankfurt enquanto ele pintava e viajava. Ele a descreveu em cartas "
        "como 'minha Agnes' com uma afeição que nunca virou declaração pública. Em correspondências "
        "com amigos humanistas, ele se queixava de que ela não o entendia. Ela sobreviveu a ele por "
        "42 anos, guardou a casa e vendeu obras com cuidado. Provavelmente ela o entendia melhor do "
        "que ele imaginava."
    ),
    "observationPoints": [
        "Ateliê do segundo andar: a janela de norte com luz difusa — a mesma de onde Dürer estudava a anatomia da lebre e do cão",
        "Prensa de gravura em funcionamento: a mecânica que tornou Dürer o primeiro artista com distribuição europeia em série",
        "Reprodução do Selbstbildnis de 1500: compare o rosto com o auto-retrato de 1498 (dois anos antes) — a transformação é radical",
        "Melencolia I (reprodução): localize o quadrado mágico e a data 1514 antes que o guia explique — o exercício de observação já é a experiência"
    ],
    "suggestedExperience": (
        "Reserve 60 minutos e evite grupos guiados se possível — o prazer aqui é o silêncio de cada "
        "andar. Suba em ordem: térreo (contexto biográfico) → primeiro (sala de recepção) → segundo "
        "(o ateliê — o andar mais importante) → terceiro (aposentos privados). No ateliê, procure a "
        "reprodução da Melencolia I e fique alguns minutos tentando encontrar sozinho o quadrado mágico. "
        "Na loja na saída, as reproduções das gravuras em papel de alta qualidade são lembranças mais "
        "interessantes do que qualquer souvenir de Nuremberg."
    ),
    "searchSuggestions": [
        "Albrecht Dürer Haus Nuremberg ingresso horário",
        "Dürer Selbstbildnis 1500 análise arte",
        "Melencolia I Dürer gravura explicação",
        "Renascimento alemão diferenças italiano"
    ],
    "visitType": "indoor",
    "entryFee": {
        "free": False,
        "price": "6,50€; 1,50€ crianças (6–16); gratuito abaixo de 6 anos",
        "notes": "Audioguia disponível em português/inglês incluído no ingresso"
    },
    "schedule": {
        "mon": {"open": "10:00", "close": "17:00"},
        "tue": {"open": None, "close": None},
        "wed": {"open": "10:00", "close": "17:00"},
        "thu": {"open": "10:00", "close": "17:00"},
        "fri": {"open": "10:00", "close": "17:00"},
        "sat": {"open": "10:00", "close": "18:00"},
        "sun": {"open": "10:00", "close": "18:00"}
    },
    "estimatedVisitMinutes": 60,
    "externalViewingAlways": True,
    "proximityRadiusMeters": 30,
    "media": {
        "audio": "/media/routes/nuremberg/audio/durer-haus.mp3",
        "photos": [
            {
                "src": "/media/routes/nuremberg/photos/durer-haus/main.jpg",
                "caption": "Casa de Albrecht Dürer — a residência do maior pintor do Renascimento alemão (c. 1420)",
                "type": "recognition"
            }
        ],
        "subAttractions": [
            {
                "id": "atelier-durer",
                "name": "O Ateliê do Segundo Andar",
                "image": "/media/routes/nuremberg/sub-attractions/durer-haus/atelier-durer.jpg",
                "caption": "A janela de luz norte onde Dürer estudava anatomia e proporção — o instrumento invisível mais importante da casa",
                "reel": {
                    "audioMood": "contemplative",
                    "segments": [
                        {
                            "text": "O segundo andar da Casa de Dürer é o ateliê de pintura e gravura — o coração da casa. A janela de guilhotina voltada para o norte deixa entrar luz difusa, sem sombras duras, ideal para o estudo da cor e da forma. Dürer foi o primeiro artista alemão a aplicar sistematicamente os princípios italianos de perspectiva linear neste espaço.",
                            "duration": 24,
                            "focusZone": "full"
                        },
                        {
                            "text": "As gravuras de Dürer — produzidas na prensa reconstituída neste mesmo andar — foram os primeiros objetos de arte da história ocidental comercializados em escala europeia. Distribuidores em Frankfurt, Veneza, Antuérpia e Roma recebiam pacotes das matrizes impressas. Dürer inventou, sem perceber, o mercado de arte em série.",
                            "duration": 24,
                            "focusZone": "center"
                        },
                        {
                            "text": "A Melencolia I de 1514 — uma das gravuras mais estudadas da história da arte — foi criada neste ateliê. O anjo melancólico rodeado de instrumentos científicos sem uso, o quadrado mágico, o tempo parado: Dürer comprimiu numa única folha de metal uma autobiografia emocional, um exercício matemático e uma meditação sobre os limites do conhecimento humano.",
                            "duration": 24,
                            "focusZone": "detail"
                        }
                    ]
                }
            },
            {
                "id": "durer-selbstportrat",
                "name": "O Selbstbildnis de 1500",
                "image": "/media/routes/nuremberg/sub-attractions/durer-haus/durer-selbstportrat.jpg",
                "caption": "O auto-retrato mais ousado da história da arte até então — Dürer pintou a si mesmo em pose frontalmente reservada à iconografia de Cristo",
                "reel": {
                    "audioMood": "contemplative",
                    "segments": [
                        {
                            "text": "O Selbstbildnis (auto-retrato) de 1500, hoje na Alte Pinakothek de Munique, é uma das declarações mais radicais da história da arte ocidental. Dürer se pinta em posição frontal simétrica, com os cabelos espiralando perfeitamente e a mão levantada — a posição iconográfica reservada, desde Bizâncio, às representações de Cristo.",
                            "duration": 24,
                            "focusZone": "center"
                        },
                        {
                            "text": "Não era blasfêmia — era uma afirmação filosófica: o artista como criador, imagem do criador. O 'Deus criou o homem à sua imagem' virado do avesso: 'o artista, ao criar, revela a centelha divina'. Foi a primeira vez, na história da arte europeia, que um pintor se apresentou como igual intelectual ao patrono. Nuremberg — rica, humanista, fora do domínio direto da Igreja — foi o único lugar onde isso era possível em 1500.",
                            "duration": 26,
                            "focusZone": "full"
                        }
                    ]
                }
            }
        ],
        "thumb": "/media/routes/nuremberg/photos/durer-haus/thumb.jpg"
    },
    "walkingNotes": (
        "Da Casa de Dürer ao Hauptmarkt: desça a Albrecht-Dürer-Straße em direção sul, passe pelo "
        "Tiergärtnertorplatz com suas casas de enxaimel medievais, continue pela Bergstraße "
        "até a Burgstraße e siga descendo até a Hauptmarkt — 12 minutos a pé. O percurso passa "
        "pelos quarteirões medievais mais preservados da cidade."
    ),
    "nextTransport": "walking",
    "nextTransportMinutes": 12,
    "tags": ["arte", "renascimento", "Dürer", "museu", "história", "gravura", "medieval"]
}

# ─ st-lorenz-kirche ───────────────────────────────────────────────────────────
st_lorenz = {
    "id": "st-lorenz-kirche",
    "dayId": "dia-1",
    "order": 4,
    "name": "Igreja de São Lourenço (St. Lorenzkirche)",
    "lat": 49.4524,
    "lng": 11.0774,
    "address": "Lorenzer Platz 1, 90402 Nürnberg",
    "historicalPeriod": "medieval",
    "yearBuilt": "1250–1477",
    "architecturalStyle": "Gótico (Alto Gótico / Gótico Tardio)",
    "significance": "A maior e mais rica igreja gótica de Nuremberg; abriga dois dos maiores tesouros da arte alemã: a Anunciação de Veit Stoss e o Tabernáculo de Adam Kraft",
    "description": (
        "A St. Lorenzkirche — Igreja de São Lourenço — é o maior templo da cidade e um dos mais "
        "extraordinários repositórios de arte gótica e renascentista da Alemanha. Construída em etapas "
        "entre 1250 e 1477, ela cresceu junto com a prosperidade comercial de Nuremberg: cada nova "
        "geração de mercadores e artesãos ricos patrocinava uma capela, um altar, uma obra de arte — "
        "transformando o interior numa galeria acumulada de séculos.\n\n"
        "A fachada oeste é o acesso principal e uma das mais elaboradas do gótico alemão: dois portais "
        "profundos com dezenas de figuras esculpidas em pedra arenárea — profetas, apóstolos, cenas do "
        "julgamento final — e acima deles o gigantesco rosáceo de 9 metros de diâmetro (1477), com "
        "suas vidrarias que filtram a luz da tarde em vermelhos e azuis sobre o piso da nave. Entre as "
        "duas torres assimétricas (construídas em épocas diferentes, diferença visível na pedra), a "
        "tensão vertical do gótico tardio está no seu máximo.\n\n"
        "O interior guarda duas obras-primas absolutas da arte alemã. A primeira é o Engelsgruß "
        "(Anunciação, 1517–1519), de Veit Stoss: um grupo de figuras entalhadas em madeira de tília "
        "que flutua no centro do coro, suspenso por correntes de ferro a vários metros do chão. "
        "Dois metros de diâmetro, envolto numa coroa de 50 medalhões com cenas da vida de Maria e "
        "ladeado por anjos, o grupo central — o arcanjo Gabriel e Maria no momento do anúncio — tem "
        "uma mobilidade das vestes e uma expressão dos rostos que nenhuma fotografia comunica adequadamente. "
        "Veit Stoss tinha 80 anos quando o terminou.\n\n"
        "A segunda é o Sakramentshaus (Tabernáculo, 1493–1496), de Adam Kraft: uma torre de pedra "
        "arenárea de 20 metros que sobe do chão até a abóbada como uma trepadeira gótica petrificada. "
        "Na base, Adam Kraft esculpiu a si mesmo em postura de suporte, ajoelhado, segurando o peso "
        "do tabernáculo com uma expressão de esforço físico genuíno — o único autorretrato de um "
        "escultor medieval que conheço onde o artista aparece literalmente carregando sua própria obra.\n\n"
        "A igreja é luterana desde 1525, quando Nuremberg aderiu à Reforma de Lutero com entusiasmo — "
        "Dürer foi um dos primeiros a abraçar o luteranismo. Na Segunda Guerra, o interior foi evacuado "
        "e o Engelsgruß desmontado e escondido em abrigos antiaéreos antes dos bombardeamentos de "
        "janeiro de 1945, que destruíram 90% da cidade mas deixaram o casco da igreja de pé."
    ),
    "immersiveMode": False,
    "immersiveText": None,
    "observationPoints": [
        "Engelsgruß de Veit Stoss (1519): observe de baixo para cima, em silêncio — o movimento das vestes, a expressão de Maria, os 50 medalhões em volta. 5 minutos parado",
        "Sakramentshaus de Adam Kraft: encontre o escultor ajoelhado na base — as rugas no rosto e a tensão dos músculos são autorretrato e confissão ao mesmo tempo",
        "Rosáceo oeste: no final da tarde, a luz entra em diagonal e projeta no piso manchas de cor — posicione-se no centro da nave para ver o espetáculo completo",
        "Fachada leste (Choir Window): os vitrais do século XV com mais de 4.000 painéis de vidro colorido, doados por famílias de mercadores com seus brasões representados"
    ],
    "suggestedExperience": (
        "Entre pelo portal sul (à direita da fachada, do lado da Lorenzer Platz). Caminhe em silêncio "
        "pela nave central até o cruzamento do transepto e levante os olhos: o Engelsgruß de Veit Stoss "
        "está suspenso no coro. Não tente fotografar ainda — fique parado 3 minutos apenas olhando. "
        "A escala, o movimento das dobras da madeira e a luz que vem do leste iluminam o grupo de um "
        "modo diferente de qualquer reprodução.\n\n"
        "Depois vá até o Sakramentshaus à esquerda: ache Adam Kraft ajoelhado na base, olhe para cima "
        "pelos 20 metros de trepadeira gótica e veja onde ele a 'encaixa' na abóbada — a solução "
        "técnica é tão engenhosa quanto o programa iconográfico. A entrada é gratuita (doação bem-vinda). "
        "Reserve 50–60 minutos para sentir o espaço sem pressa."
    ),
    "searchSuggestions": [
        "St. Lorenz Nuremberg Veit Stoss Engelsgruss",
        "Adam Kraft Sakramentshaus Nuremberg",
        "Lorenzkirche Nuremberg arte gotica",
        "Nuremberg igrejas medievais historia Reforma"
    ],
    "visitType": "indoor",
    "entryFee": {
        "free": True,
        "price": None,
        "notes": "Entrada gratuita; doação sugerida. Audioguia: ~2€"
    },
    "schedule": {
        "mon": {"open": "09:00", "close": "17:30"},
        "tue": {"open": "09:00", "close": "17:30"},
        "wed": {"open": "09:00", "close": "17:30"},
        "thu": {"open": "09:00", "close": "17:30"},
        "fri": {"open": "09:00", "close": "17:30"},
        "sat": {"open": "09:00", "close": "17:30"},
        "sun": {"open": "13:00", "close": "16:30"}
    },
    "estimatedVisitMinutes": 60,
    "externalViewingAlways": True,
    "proximityRadiusMeters": 50,
    "media": {
        "audio": "/media/routes/nuremberg/audio/st-lorenz-kirche.mp3",
        "photos": [
            {
                "src": "/media/routes/nuremberg/photos/st-lorenz-kirche/main.jpg",
                "caption": "Igreja de São Lourenço — a maior e mais rica igreja gótica de Nuremberg (1250–1477)",
                "type": "recognition"
            }
        ],
        "subAttractions": [
            {
                "id": "engelsgruss-stoss",
                "name": "Engelsgruß de Veit Stoss",
                "image": "/media/routes/nuremberg/sub-attractions/st-lorenz-kirche/engelsgruss-stoss.jpg",
                "caption": "A Anunciação flutuante (1517–1519): dois metros de madeira de tília suspensa por correntes de ferro no coro",
                "reel": {
                    "audioMood": "medieval",
                    "segments": [
                        {
                            "text": "O Engelsgruß — Saudação Angélica — de Veit Stoss é uma das obras mais extraordinárias da escultura em madeira da Europa. Concluído em 1519 quando o escultor tinha 80 anos, o grupo de figuras flutuantes representa o momento da Anunciação: o arcanjo Gabriel e Maria, envoltos por 50 medalhões com cenas da vida de Maria e ladeados por anjos, tudo esculpido em tília e suspenso por correntes de ferro.",
                            "duration": 26,
                            "focusZone": "full"
                        },
                        {
                            "text": "O movimento das vestes de Stoss foi revolucionário para 1519: as dobras da madeira parecem agitadas por um vento invisível, os mantos encrespam como se os personagens estivessem acabando de pousar. Stoss estudou a anatomia dos tecidos com a mesma obsessão que Dürer estudava a anatomia humana — os dois eram amigos e rivais em Nuremberg nestes anos decisivos.",
                            "duration": 26,
                            "focusZone": "center"
                        },
                        {
                            "text": "Em 1945, antes dos bombardeamentos de janeiro que destruíram 90% de Nuremberg, a obra foi desmontada peça por peça e escondida em abrigos antiaéreos subterrâneos. Quando as tropas americanas entraram na cidade, encontraram o Engelsgruß intacto, embalado em palha. Foi remontado no mesmo lugar, pelas mesmas correntes, como se nada tivesse acontecido.",
                            "duration": 24,
                            "focusZone": "detail"
                        }
                    ]
                }
            },
            {
                "id": "sakramenthaus-kraft",
                "name": "Sakramentshaus de Adam Kraft",
                "image": "/media/routes/nuremberg/sub-attractions/st-lorenz-kirche/sakramenthaus-kraft.jpg",
                "caption": "O tabernáculo gótico de 20 metros (1493–1496) com Adam Kraft autorretratado na base, carregando sua própria obra",
                "reel": {
                    "audioMood": "medieval",
                    "segments": [
                        {
                            "text": "O Sakramentshaus de Adam Kraft é uma torre de pedra arenárea de 20 metros erguida entre 1493 e 1496, encomendada pelo comerciante Hans IV Imhoff. Sobe da base ao teto como uma coluna de laço gótico petrificado, com rendilhado cada vez mais delicado conforme se afina. Do ponto de vista técnico, é provavelmente a peça mais ambiciosa da escultura em pedra alemã do século XV.",
                            "duration": 24,
                            "focusZone": "full"
                        },
                        {
                            "text": "Na base, Adam Kraft esculpiu a si mesmo em postura de suporte, ajoelhado, com uma expressão de esforço físico genuíno — músculos tensos, cenho franzido, peso sobre os ombros. É o único autorretrato de um escultor medieval que conhecemos onde o artista aparece literalmente suportando o peso da sua própria obra. A confissão é simultânea: sou eu que carrego isso, e foi difícil.",
                            "duration": 26,
                            "focusZone": "bottom"
                        }
                    ]
                }
            }
        ],
        "thumb": "/media/routes/nuremberg/photos/st-lorenz-kirche/thumb.jpg"
    },
    "walkingNotes": (
        "Da Igreja de São Lourenço ao Handwerkerhof: saia pela Lorenzer Platz e siga a Königstraße "
        "em direção sul — a rua principal de compras de Nuremberg. Em 12 minutos a pé, chega ao "
        "Königstor (a torre sul da muralha medieval). O Handwerkerhof fica exatamente ao lado, "
        "entre o Königstor e a Hauptbahnhof (estação central). A muralha da cidade é visível em "
        "todo o percurso."
    ),
    "nextTransport": "walking",
    "nextTransportMinutes": 12,
    "tags": ["gótico", "arte", "Veit Stoss", "Adam Kraft", "renascimento", "religião", "medieval", "escultura"]
}

# ─ handwerkerhof ──────────────────────────────────────────────────────────────
handwerkerhof = {
    "id": "handwerkerhof",
    "dayId": "dia-1",
    "order": 5,
    "name": "Handwerkerhof — O Pátio dos Artesãos",
    "lat": 49.4462,
    "lng": 11.0793,
    "address": "Königstraße 82 (Königstor), 90402 Nürnberg",
    "historicalPeriod": "medieval",
    "yearBuilt": "Königstor: séc. XIV / Handwerkerhof: 1971 (reconstituição)",
    "architecturalStyle": "Enxaimel medieval (reconstituição do século XX)",
    "significance": "Pátio de artesãos medievais encostado à muralha histórica do Königstor; ponto de encontro local no fim da tarde e lugar clássico para cerveja Francônia",
    "description": (
        "O Handwerkerhof é um espaço único em Nuremberg: um pátio de casas de enxaimel medievais "
        "reconstruídas em 1971 dentro do Königstor — a torre sul do sistema de muralhas do século XIV "
        "que defendia a entrada da cidade pelo lado da estrada para Regensburg e Munique. Sim, é uma "
        "reconstituição — mas construída com técnicas tradicionais, usando a estrutura real da muralha "
        "como parede traseira, e os oficinas são genuínas: os artesãos trabalham à vista dos visitantes.\n\n"
        "O que acontece aqui é a versão viva do que era Nuremberg no século XV: a cidade mais rica do "
        "Sacro Império produzia aqui Lebkuchen (o pão de mel especiado exportado por toda a Europa, "
        "com receita protegida desde o século XIV), cristais de qualidade, brinquedos de madeira "
        "(o setor de brinquedos de Nuremberg ainda é o maior do mundo), armas e ferramentas. Hoje "
        "os artesãos do Handwerkerhof fazem Lebkuchen, trabalham o estanho, pintam vidro, esculpem "
        "madeira e vendem instrumentos musicais barrocos de corda — instrumentos construídos com os "
        "mesmos métodos do século XVIII.\n\n"
        "Mas a razão pela qual os nurembergueses gostam do Handwerkerhof não é o artesanato — é a "
        "cerveja. As mesas de madeira no pátio interior são o lugar favorito dos locais para uma "
        "Schlenkerla (a cerveja de fumeiro de Bamberg, 30 km ao norte, com sabor de bacon defumado), "
        "uma Tucher Helles ou uma Patrizier — as três cervejas tradicionais da Francônia. O pátio "
        "fica iluminado por lanternas no anoitecer, encostado à pedra medieval da muralha, com as "
        "sombras das torres projetadas no chão de paralelepípedos. É o fim de tarde perfeito numa "
        "cidade alemã.\n\n"
        "A Francônia (Franken) é uma das regiões cervejeiras mais importantes da Alemanha — e a "
        "menos conhecida fora do país. Enquanto a Baviera exportou sua Märzen e Weissbier para o "
        "mundo, os francônios ficaram bebendo Rauchbier (defumada), Kellerbier (não filtrada, diretamente "
        "do barril) e Zwickelbier (não pasteurizada) em paz. Nuremberg tem mais de 40 cervejarias "
        "ativas num raio de 50 km — a concentração mais alta da Europa. Se quiser entender a diferença: "
        "peça uma Schlenkerla Märzen (vermelha, defumada, intensa) e depois uma Tucher Kellerbier "
        "(âmbar, não filtrada, cremosa) na mesma sessão."
    ),
    "immersiveMode": False,
    "immersiveText": None,
    "observationPoints": [
        "O Königstor de dentro: a torre do século XIV vista de baixo — a espessura dos muros (4 metros de pedra), as setas nas frestas, a escada de madeira de serviço",
        "Mesas do pátio no entardecer: a lanterna que acende, a parede de pedra medieval ao fundo, as sombras das torres projetadas no chão de paralelepípedo",
        "Atelier do Lebkuchen: a receita nunca publicada, os moldes de madeira centenários, o cheiro de canela, cardamomo e anis que é também o cheiro do mercado de Natal"
    ],
    "suggestedExperience": (
        "Chegue ao Handwerkerhof por volta das 15h–16h, quando o pátio começa a encher de locais "
        "saindo do trabalho. Faça uma volta pelos ateliês abertos (Lebkuchen, estanho, brinquedos "
        "de madeira) e pare para observar o processo sem pressa — os artesãos explicam o que fazem "
        "em alemão e inglês. Depois assente numa mesa do pátio e peça uma cerveja Francônia: "
        "Schlenkerla se quiser algo intenso e defumado, Tucher se preferir mais suave. "
        "Com a cerveja na mão, observe as pessoas: famílias locais voltando para casa, casais de "
        "fim de tarde, turistas perdidos. A muralha medieval ao fundo está iluminada pelas lanternas. "
        "Há Rostbratwurst também — se sobrou fome depois do Hauptmarkt.\n\n"
        "Se quiser comprar presentes: Lebkuchen da loja própria (os de mel e amêndoa são os "
        "melhores), bonecos articulados de madeira, ou um dos instrumentos barrocos de corda "
        "feitos à mão — um alaúde em miniatura é uma lembrança improvável e inesquecível."
    ),
    "searchSuggestions": [
        "Handwerkerhof Nuremberg artesanato cerveja",
        "Lebkuchen Nuremberg original historia",
        "Schlenkerla Rauchbier Franconia cerveja defumada",
        "Nuremberg Königstor muralha medieval história"
    ],
    "visitType": "outdoor+indoor",
    "entryFee": {
        "free": True,
        "price": None,
        "notes": "Entrada gratuita. Consumo nas lanchonetes e restaurantes do pátio: cervejas ~€3–4, Bratwurst ~€5–7"
    },
    "schedule": {
        "mon": {"open": "10:00", "close": "18:00"},
        "tue": {"open": "10:00", "close": "18:00"},
        "wed": {"open": "10:00", "close": "18:00"},
        "thu": {"open": "10:00", "close": "18:00"},
        "fri": {"open": "10:00", "close": "20:00"},
        "sat": {"open": "10:00", "close": "20:00"},
        "sun": {"open": None, "close": None}
    },
    "estimatedVisitMinutes": 90,
    "externalViewingAlways": True,
    "proximityRadiusMeters": 60,
    "media": {
        "audio": "/media/routes/nuremberg/audio/handwerkerhof.mp3",
        "photos": [
            {
                "src": "/media/routes/nuremberg/photos/handwerkerhof/main.jpg",
                "caption": "Handwerkerhof — o pátio de artesãos no Königstor medieval, à luz das lanternas",
                "type": "recognition"
            }
        ],
        "subAttractions": [
            {
                "id": "cerveja-franconia",
                "name": "Cerveja Francônia — A Sessão da Tarde",
                "image": "/media/routes/nuremberg/sub-attractions/handwerkerhof/cerveja-franconia.jpg",
                "caption": "Uma Schlenkerla ou Tucher nas mesas do pátio medieval — o fim de tarde perfeito em Nuremberg",
                "reel": {
                    "audioMood": "contemplative",
                    "segments": [
                        {
                            "text": "A Francônia é a região cervejeira mais densa da Europa, com mais de 200 cervejarias num raio de 50 km de Nuremberg — e a menos exportada do mundo. Enquanto a Baviera espalhou sua Märzen e Weissbier globalmente, os francônios ficaram produzindo para consumo local: Rauchbier defumada, Kellerbier não filtrada, Zwickelbier não pasteurizada. O resultado é uma tradição intacta que o turismo de massa ainda não homogeneizou.",
                            "duration": 28,
                            "focusZone": "full"
                        },
                        {
                            "text": "A Schlenkerla de Bamberg — a cerveja defumada mais famosa da região — usa malte seco diretamente sobre madeira de faia ardendo, o que confere um sabor distinto de bacon defumado. A primeira cervejada sempre surpreende quem não espera: parece errado. A segunda já parece certa. A terceira já é inevitável. Com Bratwurst, é uma combinação que faz sentido há cinco séculos.",
                            "duration": 26,
                            "focusZone": "center"
                        },
                        {
                            "text": "Sente aqui, nas mesas de madeira do pátio, com a parede da muralha medieval ao fundo e as lanternas acendendo conforme o sol desce atrás das torres. Observe os nurembergueses: as famílias que chegam às 17h, os casais com bicicleta, os velhos que leram os jornais dobrados no bolso. Esta é a parte do roteiro que não tem legenda e não precisa ter.",
                            "duration": 24,
                            "focusZone": "full"
                        }
                    ]
                }
            },
            {
                "id": "lebkuchen-handwerk",
                "name": "O Lebkuchen de Nuremberg",
                "image": "/media/routes/nuremberg/sub-attractions/handwerkerhof/lebkuchen-handwerk.jpg",
                "caption": "O pão de mel especiado com proteção de Indicação Geográfica Europeia desde 2003 — feito em Nuremberg há 700 anos",
                "reel": {
                    "audioMood": "baroque",
                    "segments": [
                        {
                            "text": "O Nürnberger Lebkuchen tem Indicação Geográfica Protegida desde 2003 — como o Champagne ou o Parmigiano Reggiano, só pode ser chamado assim se produzido dentro dos limites da cidade. A receita exata é segredo de cada família de confeiteiros, mas os ingredientes obrigatórios incluem: mel, farinha, nozes, avelãs e um blend de especiarias que inclui canela, cardamomo, cravo, anis e gengibre.",
                            "duration": 26,
                            "focusZone": "full"
                        },
                        {
                            "text": "A história começa nos mosteiros franciscanos de Nuremberg no século XIV, que recebiam mel como dízimo e produziram os primeiros pães de mel especiados para venda nos mercados. A Nuremberg comercial rapidamente percebeu o potencial e organizou a produção artesanal. Ao final do século XV, o Lebkuchen já era exportado para toda a Europa, embalado em caixas de madeira pintada — as mesmas caixas que ainda são o padrão hoje.",
                            "duration": 26,
                            "focusZone": "center"
                        }
                    ]
                }
            }
        ],
        "thumb": "/media/routes/nuremberg/photos/handwerkerhof/thumb.jpg"
    },
    "walkingNotes": (
        "Fim do Dia 1. O centro histórico e os hotéis estão a 5–10 minutos a pé pelo Königstraße. "
        "Para jantar: a Weißgerbergasse (a 'rua dos curtidores', 10 min a pé pelo Hauptmarkt) tem "
        "os melhores restaurantes de Francônia da cidade, menos turísticos que o centro. "
        "Sugestões: Bratwurst Röslein (clássico, lotado), Goldenes Posthorn (histórico desde 1498, "
        "um dos restaurantes mais antigos da Alemanha)."
    ),
    "nextTransport": None,
    "nextTransportMinutes": None,
    "tags": ["artesanato", "cerveja", "medieval", "gastronomia", "relaxamento", "Lebkuchen", "Francônia"]
}

# ─ memorial-julgamentos ───────────────────────────────────────────────────────
memorial = {
    "id": "memorial-julgamentos",
    "dayId": "dia-2",
    "order": 2,
    "name": "Memorial dos Julgamentos de Nuremberg",
    "lat": 49.4583,
    "lng": 11.0600,
    "address": "Bärenschanzstraße 72, 90429 Nürnberg",
    "historicalPeriod": "modern",
    "yearBuilt": "1916 (Justizpalast) / 1945–1946 (julgamentos) / 2010 (Memorium)",
    "architecturalStyle": "Neoclássico (Justizpalast, 1916)",
    "significance": "O local onde foi julgada a liderança nazista em 1945–1946; onde foram estabelecidos os conceitos de 'crime contra a humanidade' e responsabilidade individual pelo direito internacional",
    "description": (
        "A Sala 600 do Justizpalast (Palácio da Justiça) de Nuremberg não é apenas um museu — é o "
        "lugar onde foi inventado o direito penal internacional. Entre novembro de 1945 e outubro de "
        "1946, neste tribunal de grandes dimensões com suas paredes de madeira escura e seus bancos de "
        "réus lotados de ex-poderosos, o Tribunal Militar Internacional julgou 21 líderes nazis pelos "
        "crimes mais graves da história humana.\n\n"
        "A escolha de Nuremberg não foi acidental. A cidade estava associada diretamente ao regime: "
        "os comícios nazis de propaganda aconteciam aqui anualmente desde 1933, as Leis de Nuremberg "
        "(1935) — que retiraram a cidadania dos judeus alemães — levavam o nome da cidade, e aqui era "
        "o coração simbólico da ideologia racial. Julgá-los em Nuremberg era um ato de justiça "
        "poética deliberado. Mas a escolha também era prática: o Justizpalast e o complexo carcerário "
        "adjacente eram os únicos edifícios alemães que ainda funcionavam após os bombardeamentos — "
        "um dos acasos que mudou a história.\n\n"
        "Os acusados principais incluíam Hermann Göring (fundador da Gestapo, número dois do regime), "
        "Rudolf Hess (secretário de Hitler), Joachim von Ribbentrop (ministro das relações exteriores), "
        "Wilhelm Keitel (chefe do alto-comando militar), Alfred Rosenberg (ideólogo racial), Julius "
        "Streicher (editor do jornal antisemita Der Stürmer) e Hans Frank (governador-geral da Polônia "
        "ocupada). Göring foi condenado à morte mas suicidou-se com cianeto duas horas antes da execução. "
        "Hess cumpriu pena de prisão perpétua até 1987 — morreu aos 93 anos na prisão de Spandau.\n\n"
        "Os julgamentos estabeleceram precedentes jurídicos que ainda estruturam o direito internacional. "
        "Pela primeira vez: (1) 'guerra de agressão' foi declarada crime internacional; (2) 'crimes "
        "contra a humanidade' foi definido como categoria jurídica independente de qualquer guerra; "
        "(3) a defesa 'estava apenas seguindo ordens' foi explicitamente recusada como justificativa; "
        "(4) indivíduos — não apenas estados — foram responsabilizados por crimes de guerra. O Estatuto "
        "de Roma do Tribunal Penal Internacional (1998) e todos os tribunais internacionais subsequentes "
        "(Ruanda, ex-Iugoslávia, Serra Leoa) derivam diretamente da jurisprudência estabelecida aqui.\n\n"
        "O Memorium Nürnberger Prozesse, inaugurado em 2010 numa sala adjacente à Sala 600, documenta "
        "os julgamentos com material original: fotografias, filmes, transcrições, documentos. A Sala 600 "
        "em si continua em uso — é um tribunal ativo do Estado da Baviera. O acesso aos visitantes é "
        "feito em horários específicos (quando não há sessões em andamento), com tour guiado obrigatório."
    ),
    "immersiveMode": True,
    "immersiveText": (
        "Você está na Sala 600. Sentem-se nos bancos de madeira escura que os correspondentes "
        "internacionais ocuparam entre novembro de 1945 e outubro de 1946. À sua frente, o banco "
        "dos réus onde Göring, Hess, Ribbentrop e os demais se sentavam em duas fileiras com seus "
        "advogados atrás. À esquerda, a bancada dos quatro juízes (EUA, Reino Unido, França, URSS). "
        "À direita, a acusação. No fundo, a cabine de tradução simultânea — a primeira vez na história "
        "que um processo judicial usou tradução simultânea em quatro idiomas.\n\n"
        "Hermann Göring era o mais difícil de lidar. Inteligente, irônico, sem remorso aparente — "
        "nas primeiras semanas de depoimento, seus advogados relataram que ele ainda acreditava que "
        "seria declarado inocente por 'insuficiência de provas'. Só mudou de postura quando os "
        "filmes dos campos de concentração foram exibidos na sala. Os juízes ordenaram que todos os "
        "réus assistissem sem dar as costas à tela. O relatório do psicólogo americano Gustave "
        "Gilbert, que os entrevistou todos os dias, documenta o momento em que Göring viu as "
        "imagens de Dachau pela primeira vez. Disse: 'Não sabia que chegou a tanto.' Gilbert "
        "escreveu no diário: 'Mentira.'\n\n"
        "O processo durou 11 meses e 22 dias. Foram ouvidas 114 testemunhas, produzidos 300.000 "
        "documentos. A acusação americana, liderada por Robert H. Jackson, juiz da Suprema Corte "
        "afastado temporariamente para o cargo, pronunciou um discurso de abertura que ainda é "
        "ensinado nas faculdades de direito do mundo: 'O crime que queremos condenar e punir com "
        "tal clareza que as gerações futuras, quando se lembrarem dele, ficarão apavoradas é o "
        "deliberado e conspirado começo de guerras ilegais.'\n\n"
        "Doze réus foram condenados à morte na forca. Três foram absolvidos. Os demais receberam "
        "penas de prisão entre 10 anos e perpétua. Göring se envenenou na cela às 22h44 de 15 de "
        "outubro de 1946 — duas horas antes de sua execução agendada. Como conseguiu o cianeto "
        "nunca foi completamente explicado. Era Göring até o fim.\n\n"
        "A sala continua em uso para julgamentos comuns do tribunal bávar. Um funcionário abre o "
        "caso de arquivos, um juiz entra, os advogados chegam. A rotina normal da justiça acontece "
        "no mesmo espaço onde foi inventada. É perturbador e certo ao mesmo tempo."
    ),
    "observationPoints": [
        "Banco dos réus: a posição de cada acusado no banco (Göring sentava no canto esquerdo da fila da frente — o mais alto e visível)",
        "Cabine de tradução simultânea (fundos): a tecnologia de 1945 que tornou o processo possível — e que ainda é o padrão da ONU",
        "Bancada dos juízes: as quatro bandeiras dos países aliados — a mesma mesa onde os quatro sistemas jurídicos distintos precisaram concordar",
        "A tela de projeção: onde os filmes dos campos de concentração foram exibidos — e que forçou os réus a ver o que seus governos fizeram"
    ],
    "suggestedExperience": (
        "Visite primeiro a exposição permanente do Memorium (sala adjacente, 45–60 min) antes de "
        "entrar na Sala 600: o contexto histórico torna a sala muito mais poderosa. O tour guiado "
        "da Sala 600 dura ~45 min e inclui acesso aos arquivos e à tribuna dos juízes. Reserve com "
        "antecedência no site museen.nuernberg.de — os horários são limitados e os grupos pequenos.\n\n"
        "Após a visita, saia para o pátio externo do Justizpalast e sente-se por alguns minutos "
        "sem falar. O peso do que você viu é real e merece ser sentido. O bar no térreo do "
        "Justizpalast serve café — há uma ironia nisso que só percebe quem sai do processo de "
        "julgar crimes contra a humanidade e pede um expresso no mesmo edifício."
    ),
    "searchSuggestions": [
        "Memorium Nuremberg Trials ingresso reserva",
        "Sala 600 Nuremberg julgamentos historia",
        "Göring Nuremberg julgamento suicidio",
        "Robert Jackson discurso Nuremberg 1945"
    ],
    "visitType": "indoor",
    "entryFee": {
        "free": False,
        "price": "7,50€; 1,50€ crianças (6–16). Tour Sala 600: incluído",
        "notes": "Exposição permanente: Ter–Dom 10h–18h (fechado segunda). Tour Sala 600: horários específicos — reservar em museen.nuernberg.de"
    },
    "schedule": {
        "mon": {"open": None, "close": None},
        "tue": {"open": "10:00", "close": "18:00"},
        "wed": {"open": "10:00", "close": "18:00"},
        "thu": {"open": "10:00", "close": "18:00"},
        "fri": {"open": "10:00", "close": "18:00"},
        "sat": {"open": "10:00", "close": "18:00"},
        "sun": {"open": "10:00", "close": "18:00"}
    },
    "estimatedVisitMinutes": 120,
    "externalViewingAlways": False,
    "proximityRadiusMeters": 40,
    "media": {
        "audio": "/media/routes/nuremberg/audio/memorial-julgamentos.mp3",
        "photos": [
            {
                "src": "/media/routes/nuremberg/photos/memorial-julgamentos/main.jpg",
                "caption": "Justizpalast de Nuremberg — o Palácio da Justiça onde funcionou o tribunal que inventou o direito penal internacional",
                "type": "recognition"
            }
        ],
        "subAttractions": [
            {
                "id": "sala-600",
                "name": "Sala 600 — O Tribunal",
                "image": "/media/routes/nuremberg/sub-attractions/memorial-julgamentos/sala-600.jpg",
                "caption": "A Sala 600 do Justizpalast — onde Göring, Hess e Ribbentrop foram julgados em 1945–1946, ainda em uso hoje",
                "reel": {
                    "audioMood": "contemplative",
                    "segments": [
                        {
                            "text": "A Sala 600 do Justizpalast de Nuremberg tem paredes de madeira escura, bancos de imprensa internacional, banco dos réus em duas fileiras e bancada dos quatro juízes ao fundo. É um tribunal comum de dimensões extraordinárias — e continua sendo usado para julgamentos ordinários hoje, décadas depois de ter sediado o mais importante processo judicial da história.",
                            "duration": 24,
                            "focusZone": "full"
                        },
                        {
                            "text": "De novembro de 1945 a outubro de 1946, o Tribunal Militar Internacional julgou aqui 21 líderes nazis. Os acusados incluíam Göring, Hess, Ribbentrop, Keitel e Streicher. Foi a primeira vez na história que chefes de estado e militares foram julgados individualmente por crimes de guerra — estabelecendo que 'ordens superiores' não é defesa suficiente.",
                            "duration": 26,
                            "focusZone": "center"
                        },
                        {
                            "text": "Doze foram condenados à morte. Göring suicidou-se com cianeto duas horas antes da execução — como o obteve nunca foi explicado. Rudolf Hess ficou preso em Berlim-Spandau até 1987, quando morreu com 93 anos, o único preso da prisão. A sala onde tudo isso foi decidido continua exatamente igual. Entrar aqui sem sentir o peso do que aconteceu é impossível.",
                            "duration": 26,
                            "focusZone": "detail"
                        }
                    ]
                }
            },
            {
                "id": "crimes-humanidade",
                "name": "A Invenção dos 'Crimes Contra a Humanidade'",
                "image": "/media/routes/nuremberg/sub-attractions/memorial-julgamentos/crimes-humanidade.jpg",
                "caption": "A exposição permanente documenta como Nuremberg estabeleceu os fundamentos do direito penal internacional",
                "reel": {
                    "audioMood": "contemplative",
                    "segments": [
                        {
                            "text": "Antes de Nuremberg, não existia na lei internacional o conceito de 'crime contra a humanidade'. Crimes de guerra eram regulados pelas Convenções de Haia desde 1899, mas cobriam apenas o tratamento de prisioneiros e populações civis em zona de combate. O que os nazistas fizeram — o genocídio sistemático de grupos populacionais dentro do próprio território — era legalmente um vazio.",
                            "duration": 26,
                            "focusZone": "full"
                        },
                        {
                            "text": "O Estatuto do Tribunal de Nuremberg (1945) criou três categorias novas: crimes contra a paz (planejamento de guerra de agressão), crimes de guerra (violações das leis e costumes de guerra) e crimes contra a humanidade (assassinato, extermínio, escravização de populações civis). Esta terceira categoria era radicalmente nova. E a decisão de que indivíduos — não apenas estados — podiam ser responsabilizados foi ainda mais radical.",
                            "duration": 28,
                            "focusZone": "center"
                        },
                        {
                            "text": "O legado de Nuremberg é o Estatuto de Roma (1998), que criou o Tribunal Penal Internacional em Haia. Cada julgamento de crime de guerra desde então — Ruanda, ex-Iugoslávia, Serra Leoa, Sudão — deriva diretamente do precedente estabelecido nesta sala. A frase do promotor americano Robert Jackson ainda ressoa: 'Que essas leis sejam aplicadas ao vencedor como ao vencido — ou não são leis, são poder.'",
                            "duration": 26,
                            "focusZone": "full"
                        }
                    ]
                }
            }
        ],
        "thumb": "/media/routes/nuremberg/photos/memorial-julgamentos/thumb.jpg"
    },
    "walkingNotes": (
        "Do Memorial dos Julgamentos ao Germanisches Nationalmuseum (opcional): do Justizpalast, "
        "tome o bonde ou o metrô de volta ao centro (~20 min) e siga para o museu na "
        "Kartäusergasse 1, perto do Königstor. Fechado às segundas-feiras. Se não for ao museu, "
        "o centro histórico está a 20 min de transporte para um jantar de encerramento na Weißgerbergasse."
    ),
    "nextTransport": "subway",
    "nextTransportMinutes": 20,
    "tags": ["história", "Segunda Guerra", "nazismo", "julgamentos", "direito", "reflexão", "memorial"]
}

# ── 8. Inserir novos POIs na lista ────────────────────────────────────────────
# Inserir durer-haus após kaiserburg
idx_kaiser = next(i for i, p in enumerate(data["pois"]) if p["id"] == "kaiserburg")
data["pois"].insert(idx_kaiser + 1, durer_haus)

# Inserir st-lorenz após hauptmarkt (que agora é order 3)
idx_haupt = next(i for i, p in enumerate(data["pois"]) if p["id"] == "hauptmarkt-nuremberg")
data["pois"].insert(idx_haupt + 1, st_lorenz)

# Inserir handwerkerhof após st-lorenz (que acabou de ser inserido)
idx_lorenz = next(i for i, p in enumerate(data["pois"]) if p["id"] == "st-lorenz-kirche")
data["pois"].insert(idx_lorenz + 1, handwerkerhof)

# Inserir memorial-julgamentos após dokumentationszentrum
idx_doku = next(i for i, p in enumerate(data["pois"]) if p["id"] == "dokumentationszentrum")
data["pois"].insert(idx_doku + 1, memorial)

# ── 9. Atualizar segments ─────────────────────────────────────────────────────
data["segments"] = [
    {
        "from": "kaiserburg",
        "to": "durer-haus",
        "distance": 0.25,
        "duration": 15,
        "transport": "walking",
        "waypoints": [[49.4604, 11.0752], [49.4590, 11.0768], [49.4566, 11.0770]],
        "streetNotes": "Desça pelo Tiergärtnertorplatz — a praça medieval com casas de enxaimel. Desvio opcional: Kettensteg (ponte histórica sobre o Pegnitz, 5 min a pé à esquerda). Depois siga pela Albrecht-Dürer-Straße até o nº 39."
    },
    {
        "from": "durer-haus",
        "to": "hauptmarkt-nuremberg",
        "distance": 0.6,
        "duration": 12,
        "transport": "walking",
        "waypoints": [[49.4566, 11.0770], [49.4578, 11.0762], [49.4553, 11.0778]],
        "streetNotes": "Desça a Albrecht-Dürer-Straße, passe pelo Tiergärtnertorplatz e continue pela Bergstraße até a Burgstraße. A rua medieval desce gradualmente do castelo até o Hauptmarkt. Casas de enxaimel dos séculos XV–XVI em todo o percurso."
    },
    {
        "from": "hauptmarkt-nuremberg",
        "to": "st-lorenz-kirche",
        "distance": 0.3,
        "duration": 5,
        "transport": "walking",
        "waypoints": [[49.4553, 11.0778], [49.4539, 11.0776], [49.4524, 11.0774]],
        "streetNotes": "Do Hauptmarkt, desça a Museumsbrücke (a ponte sobre o Pegnitz, visível do sul da praça). Atravesse o rio e a fachada gótica da St. Lorenz aparece diretamente à frente. Entrada pela Lorenzer Platz."
    },
    {
        "from": "st-lorenz-kirche",
        "to": "handwerkerhof",
        "distance": 0.7,
        "duration": 12,
        "transport": "walking",
        "waypoints": [[49.4524, 11.0774], [49.4495, 11.0782], [49.4462, 11.0793]],
        "streetNotes": "Siga a Königstraße em direção sul — a rua comercial principal. Em 12 minutos chega ao Königstor (a torre sul da muralha medieval). O Handwerkerhof fica à direita do Königstor, entre a muralha e a Hauptbahnhof."
    },
    {
        "from": "dokumentationszentrum",
        "to": "memorial-julgamentos",
        "distance": 5.2,
        "duration": 30,
        "transport": "subway",
        "waypoints": [[49.427, 11.1218], [49.4483, 11.0810], [49.4583, 11.0600]],
        "streetNotes": "Bonde linha 8 do Dokuzentrum de volta ao centro (Hauptbahnhof, ~20 min). Da estação, metrô U1 direção Fürth ou táxi (~€12) até Bärenschanzstraße 72. Total: ~30 min."
    },
    {
        "from": "memorial-julgamentos",
        "to": "germanisches-nationalmuseum",
        "distance": 3.1,
        "duration": 20,
        "transport": "subway",
        "waypoints": [[49.4583, 11.0600], [49.4483, 11.0810], [49.4506, 11.0757]],
        "streetNotes": "Do Justizpalast, bonde ou metrô de volta ao centro (~20 min). O Germanisches Nationalmuseum fica na Kartäusergasse 1, perto do Königstor — a 5 min a pé da Hauptbahnhof. ATENÇÃO: visita opcional dependendo de energia disponível."
    }
]

with open(ROUTE, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("nuremberg.json atualizado.")
print(f"Total POIs: {len(data['pois'])}")
print()
for day in data["days"]:
    pois = sorted([p for p in data["pois"] if p["dayId"] == day["id"]], key=lambda x: x["order"])
    total = sum(p.get("estimatedVisitMinutes", 0) for p in pois)
    print(f"=== {day['id']} ({day['startTime']}-{day['estimatedEndTime']}): {day['title']} ===")
    for p in pois:
        subs = [s["id"] for s in p.get("media", {}).get("subAttractions", [])]
        print(f"  [{p['order']}] {p['id']} ({p.get('estimatedVisitMinutes')}min) -> {p.get('nextTransport')}")
        if subs:
            print(f"       subs: {subs}")
    print(f"  Total ativo: ~{total}min ({total//60}h{total%60}min)")
    print()
