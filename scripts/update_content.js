/**
 * Atualiza munique.json:
 * - Substitui Deutsches Museum pela Alte Pinakothek no Dia 3
 * - Reescreve immersiveText de Neuschwanstein, Zugspitze e Salzburg-Festung (sem repetição da descrição)
 * - Adiciona audioImmersive paths para os 4 POIs imersivos
 * - Adiciona imagePosition nas sub-atrações (mariensaeule = top)
 * - Adiciona informação sobre artistas de rua nos POIs relevantes
 */
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../src/data/routes/munique.json');
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

// ─────────────────────────────────────────────────────────────────
// 1. Substituir Deutsches Museum → Alte Pinakothek
// ─────────────────────────────────────────────────────────────────
const altePinakothek = {
  id: 'alte-pinakothek',
  dayId: 'dia-3',
  order: 1,
  name: 'Alte Pinakothek',
  lat: 48.14860,
  lng: 11.57030,
  address: 'Barer Straße 27, 80333 München',
  historicalPeriod: 'royal',
  yearBuilt: 1836,
  architecturalStyle: 'Neoclássico (Leo von Klenze, 1826–1836)',
  significance: 'Primeiro museu europeu projetado do zero como galeria pública — onde Leo von Klenze inventou a arquitetura museológica moderna para Ludwig I, reunindo quatro séculos de patronato Wittelsbach numa única coleção.',
  description: `A Alte Pinakothek não é apenas uma galeria de arte — é a invenção de uma instituição. Quando Leo von Klenze recebeu de Ludwig I da Baviera a encomenda de projetar um museu público em 1826, não havia modelo europeu estabelecido: o Louvre era um palácio adaptado, os Uffizi uma galeria ducal reconvertida. Klenze projetou do zero, pensando em iluminação natural para pinturas, circulação pública, espaço contemplativo. Quando abriu em 1836, era o primeiro edifício europeu concebido desde a fundação como museu. Essa origem explica algo na qualidade do silêncio dentro.

A coleção é de origem dinástica — não foi comprada por um mecenas iluminado, mas acumulada ao longo de quatro séculos pelos Wittelsbachs. O núcleo inicial data de Guilherme IV da Baviera (1508–1550), que encomendou obras diretamente a Dürer, Cranach e Altdorfer para uma galeria ducal. Essa proximidade temporal com os artistas — não era coleção retroativa, era patronato vivo — explica o que você vai ver: obras que vieram do ateliê diretamente ao palácio.

Entre os 700 quadros em exposição permanente, quatro disputam a atenção com razões distintas. O Autorretrato de Dürer (1500) não é simplesmente um retrato extraordinário em termos técnicos — é uma declaração filosófica. A postura frontal, a composição cristiforme, o monograma AD destacado: Dürer afirmava que o artista é um criador divino, não artesão. Nenhum europeu havia ousado dizer isso antes dele com tanta clareza visual.

A Madonna com o Cravo de Leonardo é de 1472–1478, período de aprendizado com Verrocchio em Florença. O cravo que o Menino segura é símbolo da Paixão de Cristo ainda não vivida — uma profecia em forma de flor. A janela dupla ao fundo, com paisagem nublada e atmosférica, já antecipa o sfumato que tornaria a Mona Lisa impossível de olhar apenas uma vez.

Rubens chegou com A Queda dos Condenados (c. 1620) — 288 centímetros de altura, mais de cem corpos nus em espiral descendente. A anatomia é de Michelangelo; o movimento é de Rubens; a vertigem é inteiramente nova. Delacroix viria copiar esse quadro como exercício formativo.

A Sagrada Família Canigiani de Rafael (1505–1506) fecha o quarteto com uma das composições mais matematicamente perfeitas da história: triângulo de figuras, cada proporção calculada para criar repouso e tensão ao mesmo tempo.

O edifício foi bombardeado em 1943, restando apenas as paredes externas. Na reconstrução dos anos 1950, as fachadas laterais foram refeitas em tijolo aparente moderno — visível hoje na entrada. É uma cicatriz deliberada, não um erro. A Alte Pinakothek carrega essa história no próprio corpo.`,
  immersiveMode: true,
  immersiveText: `Você está dentro agora. O pé-direito alto, a luz natural vinda de claraboias e janelas altas projetadas por Klenze especificamente para pintura a óleo — sem luz direta que desvanece, sem sombras que ocultam. Em 1836, quando isso abriu, a decisão de iluminação natural controlada foi revolucionária. A maioria das galerias dependia de luz de vela ou gás — uma catástrofe para telas que precisam ser vistas a dois passos de distância.

Vá até o Autorretrato de Dürer (1500) e fique dois metros à frente. Não leia a plaqueta ainda. Apenas olhe.

O que você está vendo é um homem de 28 anos que decidiu que era igual a Deus — artisticamente. A postura é cristiforme: frontal, simétrica, a mão direita levantada em posição de bênção. Até esse quadro, essa composição era reservada exclusivamente a imagens de Cristo. Dürer a usou para um autorretrato. O monograma "AD" está posicionado no centro-direita, à altura dos olhos do observador. A data "1500" foi escolhida: era o ano carregado de ressonância escatológica — ano em que o mundo poderia acabar, ou recomeçar. Dürer escolheu esse ano para afirmar a eternidade de seu nome.

Agora veja a pele. O casaco de pele de marta-zibelina é pintado fio por fio. Séculos antes da fotografia, antes da capacidade de pausar e examinar em câmera lenta, Dürer criou a mais precisa representação de textura que a pintura europeia havia produzido. Não é habilidade demonstrativa — é argumento filosófico: se um artista consegue capturar a realidade com essa exatidão, seu olho é de outra ordem.

Vá agora até Leonardo. A Madonna com o Cravo fica na sala da Primeira Renascença Italiana. Ela é pequena — 62 por 47 centímetros — e isso é parte do argumento. É um quadro íntimo, pintado por um artista de vinte e poucos anos que ainda não era Leonardo da Vinci, apenas um aprendiz brilhante no ateliê de Verrocchio em Florença.

Olhe para as mãos da Virgem. Especificamente os dedos — a forma como seguram suavemente o tornozelo do Menino. Compare com qualquer outra Virgem do século XV na mesma sala. Ninguém antes de Leonardo havia pintado contato físico com essa qualidade de calor. É possível que você consiga sentir a textura da pele.

A janela ao fundo não é decoração: é programa. A paisagem neblinosa, os contornos dissolvendo-se em névoa atmosférica — Leonardo está praticando o sfumato aqui, trinta anos antes da Mona Lisa. Este quadro pequeno, discreto, quase sem moldura chamativa, é o laboratório onde a pintura europeia mudou de direção.

Atravesse duas salas e chegue a Rubens. A Queda dos Condenados (c. 1620) vai parecer alta demais para você ver confortavelmente — 288 centímetros. Afaste-se cinco passos e deixe a composição trabalhar.

A gravidade do quadro é de baixo para cima, não de cima para baixo. Os condenados caem, mas o olho sobe seguindo a espiral de corpos. Rubens inverte a direção narrativa: em vez de mostrar a queda, mostra o momento exato da perda de sustentação — o instante antes de qualquer destino ser definitivo. Delacroix copiou esse quadro como exercício de formação. Géricault estudou as massas musculares aqui antes de pintar A Jangada da Medusa.

Rafael fica logo depois. A Família Canigiani (1505) vai parecer quieta depois de Rubens. Isso é calculado. Procure o triângulo: Maria no centro-topo, Santa Isabel à esquerda embaixo, José à direita embaixo. Agora olhe o triângulo menor formado pelas crianças — Cristo e João Batista. Dois triângulos sobrepostos, cada figura apontando para a outra, cada posição determinada por geometria, não por sentimento. Rafael aprendeu isso com Leonardo durante dois anos em Florença. O repouso que você sente olhando esse quadro não é acidente — é matemática aplicada à emoção.

Uma última coisa antes de sair: olhe as fachadas laterais do edifício quando saíres. O tijolo aparente moderno que você vê — diferente do reboco histórico da fachada principal — é da reconstrução dos anos 1950 após o bombardeio de 1943. A Alte Pinakothek decidiu não apagar a cicatriz. Carrega essa história no próprio corpo, como as pinturas carregam as histórias dos séculos que atravessaram.`,
  observationPoints: [
    "O Autorretrato de Dürer: a postura frontal cristiforme — quem mais na história usou essa composição antes de 1500? Compare com as imagens de Cristo na mesma sala",
    "Na Madonna de Leonardo: os dedos da Virgem tocando o tornozelo do Menino — compare com qualquer outra Madonna do século XV na galeria",
    "A Queda dos Condenados de Rubens: a espiral de corpos sobe ou desce? Siga o movimento com os olhos por 30 segundos antes de decidir",
    "A cicatriz da guerra: as fachadas laterais em tijolo aparente moderno — reconstrução dos anos 1950 que preservou a marca do bombardeio de 1943",
    "A iluminação natural zenithal: Klenze calculou o ângulo para que a luz chegasse às telas sem reflexo direto — tecnologia de museu de 1836"
  ],
  suggestedExperience: `Escolha no máximo três obras antes de entrar — não depois. Use o mapa da entrada para localizar Dürer (sala 2), Leonardo (sala 4) e Rubens (sala 12). Chegue às 10h, quando a luz natural é mais limpa. Dedique 20 minutos a cada obra: 5 de observação sem informação, 10 lendo o contexto, 5 voltando a olhar com o que aprendeu. Saia antes de saturar — três horas é o máximo produtivo. Domingo a entrada custa apenas €1 para toda a rede Pinakothek.`,
  searchSuggestions: [
    "Dürer Autorretrato 1500 cristiforme significado",
    "Leonardo Madonna com o Cravo sfumato Verrocchio",
    "Rubens A Queda dos Condenados Michelangelo influência",
    "Rafael Família Canigiani composição piramidal Florença",
    "Leo von Klenze Alte Pinakothek 1836 primeiro museu",
    "Alte Pinakothek bombardeio 1943 reconstrução cicatriz"
  ],
  visitType: 'internal',
  entryFee: {
    free: false,
    price: '€7',
    notes: 'Domingo: €1 (toda a rede Pinakothek) · Menores 18 grátis · Combinado com Neue + Pinakothek der Moderne: €12'
  },
  schedule: {
    mon: { open: null, close: null },
    tue: { open: '10:00', close: '20:30' },
    wed: { open: '10:00', close: '18:00' },
    thu: { open: '10:00', close: '18:00' },
    fri: { open: '10:00', close: '18:00' },
    sat: { open: '10:00', close: '18:00' },
    sun: { open: '10:00', close: '18:00' }
  },
  estimatedVisitMinutes: 180,
  externalViewingAlways: false,
  proximityRadiusMeters: 80,
  media: {
    audio: '/media/routes/munique/audio/alte-pinakothek.mp3',
    audioImmersive: '/media/routes/munique/audio/alte-pinakothek-immersive.mp3',
    audioDurationSeconds: null,
    photos: [
      {
        src: '/media/routes/munique/photos/alte-pinakothek/main.jpg',
        caption: 'Alte Pinakothek — o primeiro museu europeu projetado do zero como galeria pública (Leo von Klenze, 1836)',
        type: 'recognition'
      }
    ],
    thumb: '/media/routes/munique/photos/alte-pinakothek/main.jpg',
    subAttractions: [
      {
        id: 'durer-autorretrato',
        name: 'Dürer — Autorretrato (1500)',
        image: '/media/routes/munique/sub-attractions/alte-pinakothek/durer-autorretrato.jpg',
        imagePosition: 'top',
        caption: "O monograma 'AD 1500' e postura cristiforme — o primeiro artista europeu a se declarar divino.",
        reel: {
          audioMood: 'contemplative',
          segments: [
            { text: '1500.', duration: 2, focusZone: 'full' },
            { text: 'Um artista de 28 anos.', duration: 3, focusZone: 'top' },
            { text: 'Que decidiu ser igual a Deus.', duration: 3.5, focusZone: 'detail' },
            { text: 'A postura é de Cristo.', duration: 3, focusZone: 'center' },
            { text: 'Ninguém havia ousado antes.', duration: 3.5, focusZone: 'top' },
            { text: 'Ele ousou.', duration: 2.5, focusZone: 'full' }
          ]
        }
      },
      {
        id: 'leonardo-madonna',
        name: 'Leonardo — Madonna com o Cravo (c. 1475)',
        image: '/media/routes/munique/sub-attractions/alte-pinakothek/leonardo-madonna.jpg',
        imagePosition: 'center',
        caption: 'A janela nublada ao fundo: o sfumato 30 anos antes da Mona Lisa, pintado com 20 e poucos anos.',
        reel: {
          audioMood: 'contemplative',
          segments: [
            { text: 'Um aprendiz de 20 anos.', duration: 3, focusZone: 'full' },
            { text: 'Ainda sem nome.', duration: 2.5, focusZone: 'center' },
            { text: 'Olhe a janela ao fundo.', duration: 3, focusZone: 'top' },
            { text: 'O contorno que se dissolve em névoa.', duration: 3.5, focusZone: 'detail' },
            { text: 'Trinta anos antes da Mona Lisa.', duration: 3.5, focusZone: 'top' },
            { text: 'O método já estava aqui.', duration: 3, focusZone: 'full' }
          ]
        }
      },
      {
        id: 'rubens-queda',
        name: 'Rubens — A Queda dos Condenados (c. 1620)',
        image: '/media/routes/munique/sub-attractions/alte-pinakothek/rubens-queda.jpg',
        imagePosition: 'center',
        caption: 'Mais de 100 corpos em espiral — Michelangelo levado ao colapso pelo movimento barroco de Rubens.',
        reel: {
          audioMood: 'dramatic',
          segments: [
            { text: '100 corpos.', duration: 2, focusZone: 'full' },
            { text: '288 centímetros de altura.', duration: 3, focusZone: 'bottom' },
            { text: 'Siga a espiral.', duration: 2.5, focusZone: 'center' },
            { text: 'Ela sobe ou desce?', duration: 3, focusZone: 'top' },
            { text: 'Rubens inverte a gravidade.', duration: 3.5, focusZone: 'detail' },
            { text: 'E o olho segue.', duration: 2.5, focusZone: 'full' }
          ]
        }
      },
      {
        id: 'rafael-canigiani',
        name: 'Rafael — Família Canigiani (c. 1506)',
        image: '/media/routes/munique/sub-attractions/alte-pinakothek/rafael-canigiani.jpg',
        imagePosition: 'top',
        imageFit: 'contain',
        caption: 'O triângulo perfeito — geometria aprendida com Leonardo em Florença como método de criar paz visual.',
        reel: {
          audioMood: 'contemplative',
          segments: [
            { text: 'Dois triângulos.', duration: 2, focusZone: 'full' },
            { text: 'Rafael tinha 21 anos.', duration: 3, focusZone: 'top' },
            { text: 'Passou dois anos com Leonardo em Florença.', duration: 4, focusZone: 'center' },
            { text: 'E aprendeu a construir repouso com matemática.', duration: 4, focusZone: 'detail' },
            { text: 'Este quadro é a prova.', duration: 3, focusZone: 'full' }
          ]
        }
      }
    ]
  },
  walkingNotes: 'Fim do Dia 3 — a Neue Pinakothek e a Pinakothek der Moderne ficam a menos de 5 minutos a pé, completando o Museumsareal.',
  nextTransport: null,
  nextTransportMinutes: null,
  tags: ['museu', 'arte', 'pintura', 'imersivo', 'renascimento', 'barroco']
};

// Substituir deutsches-museum por alte-pinakothek
const dmIdx = data.pois.findIndex(p => p.id === 'deutsches-museum');
if (dmIdx >= 0) {
  data.pois.splice(dmIdx, 1, altePinakothek);
  console.log('✓ deutsches-museum → alte-pinakothek');
}

// ─────────────────────────────────────────────────────────────────
// 2. Adicionar audioImmersive para os outros 3 POIs imersivos
// ─────────────────────────────────────────────────────────────────
const immersivePOIs = {
  'neuschwanstein': '/media/routes/munique/audio/neuschwanstein-immersive.mp3',
  'zugspitze': '/media/routes/munique/audio/zugspitze-immersive.mp3',
  'salzburg-festung': '/media/routes/munique/audio/salzburg-festung-immersive.mp3',
};
for (const [id, audioPath] of Object.entries(immersivePOIs)) {
  const poi = data.pois.find(p => p.id === id);
  if (poi) {
    poi.media.audioImmersive = audioPath;
    console.log(`✓ audioImmersive adicionado: ${id}`);
  }
}

// ─────────────────────────────────────────────────────────────────
// 3. Reescrever immersiveText dos 3 POIs (conteúdo novo, não-repetitivo)
// ─────────────────────────────────────────────────────────────────

const neuschwansteinImmersive = `Você subiu 200 metros acima do vale de Hohenschwangau. O castelo que está à sua frente é maior do que parece nas fotos — e mais vazio do que qualquer castelo que você já visitou.

Ludwig II dormiu aqui 170 noites ao longo de 17 anos de construção. Uma média de dez noites por ano. O Schloss Neuschwanstein foi projetado como cenário de vida interior — não para receber, não para governar, não para impressionar nobres. Para que Ludwig pudesse existir sozinho dentro da ópera de Wagner.

Entre no Thronsaal — a Sala do Trono. É o cômodo mais impressionante do castelo: abóbada dourada, colunas de pórfiro vermelho, mosaicos bizantinos no chão com animais exóticos, afresco no teto com Cristo entre anjos. E no centro do estrado: nada. O trono nunca foi instalado. Ludwig morreu em 1886 antes de decidir qual trono compraria. A sala foi construída para uma peça de mobiliário que nunca existiu. Você está dentro de uma antecipação congelada.

Vá até o Sängersaal — o Salão dos Cantores, no topo do castelo, 60 metros de comprimento. Todas as paredes são pinturas de episódios do Parsifal de Wagner e do Lohengrin. A acústica foi projetada para performances ao vivo. Nunca houve uma única performance aqui durante a vida de Ludwig. Wagner veio visitar o castelo uma vez, viu os esboços do Sängersaal e morreu 4 anos antes de a sala ser concluída. O salão construído para Wagner nunca recebeu Wagner.

Essa é a lógica de Neuschwanstein: cada cômodo é uma preparação para algo que não aconteceu. A Grotte — a caverna artificial que conecta o quarto ao estúdio, decorada com estalactites de zinco e uma cascata artificial — era cenário para o segundo ato de Tannhäuser. Ludwig mandou instalar uma caverna dentro de um castelo para poder encenar mentalmente uma ópera que ele nunca produziu aqui.

Ludwig II foi declarado incapaz e deposto em junho de 1886. Três dias depois estava morto, com 40 anos, num lago próximo. O castelo abriu ao público seis semanas depois da morte dele. Em 1886, 12.000 pessoas visitaram Neuschwanstein. No ano passado, 1,4 milhão. Ludwig construiu o castelo mais visitado da Europa como fortaleza da solidão.

Quando você sair, olhe para trás no primeiro patamar da descida. O ângulo a partir daí — o castelo emergindo das pedras da falésia com o vale embaixo — é o ângulo das fotografias que viraram o Castelo da Cinderela da Disney. Um animador da Disney veio aqui em 1954. O resto é a história da fantasia industrializada. Mas a origem era uma tristeza muito real: um rei que não queria ser rei, construindo uma fuga que nunca terminou.`;

const zugspitzeImmersive = `Você está a 2.962 metros. O oxigênio disponível é 30% menor do que ao nível do mar. A UV é 40% mais intensa. Se você tem 25 anos, seu coração bate 15% mais rápido do que batia em Munique esta manhã.

O que você está pisando tem 300 milhões de anos. O Wetterstein Kalk — o calcário que forma a Zugspitze — foi depositado camada por camada durante o Triássico, quando os Alpes eram um mar tropical raso. As rochas que formam o pico mais alto da Alemanha são literalmente conchas de organismos marinhos comprimidas por processos geológicos durante um tempo que torna qualquer história humana irrelevante.

A primeira ascensão registrada foi em 27 de agosto de 1820. O Tenente Josef Naus, com dois soldados e um guia local, demorou três dias para subir. Não havia trilha, não havia equipamento técnico, não havia previsão do tempo confiável. Eles chegaram ao cume no terceiro dia ao entardecer e gravaram seus nomes numa pedra. Essa pedra ainda existe; você pode procurá-la.

Agora olhe para onde deveria estar o glaciar.

O Zugspitzgletscher tinha 79 hectares em 1900. Hoje tem aproximadamente 11 hectares. Perdeu 86% da sua massa em 120 anos. Projeções atuais indicam desaparecimento completo por volta de 2035. Você está possivelmente em uma das últimas gerações que pode ver um glaciar nos Alpes alemães. O Gipfelkreuz — a cruz de metal no pico — foi instalada em 1851. Ela passou por sete glaciares diferentes à medida que o gelo avançou e recuou durante o século XIX. Agora está sobre pedra exposta.

Se você foi de teleférico, você fez o mesmo percurso vertical em 10 minutos que Josef Naus fez em três dias. O teleférico original data de 1926 — foi o primeiro teleférico de alta montanha da Alemanha, uma conquista de engenharia comparável às pontes suspensas da época. O atual data de 2017 e é considerado o mais moderno do mundo em capacidade e design.

Uma última coisa: o cume tem uma fronteira geopolítica. A linha divisória entre Alemanha e Áustria passa pelo pico. Do lado austríaco fica a estação de Zugspitzplatt, administrada pela Tirol. Em dias claros, daqui você vê Munique a 85 quilômetros ao norte — a cidade que Ludwig I construiu como Atenas do Norte, visível apenas quando o ar está suficientemente frio e limpo. Hoje, com poluição luminosa e névoa de inversão térmica, isso acontece talvez 20 dias por ano. Verifique se este é um deles.`;

const salzburgFestungImmersive = `Você está em cima do Festungsberg — o morro da fortaleza — após a subida pela Festungsbahn, o funicular mais antigo ainda em operação da Europa central (1892). A Festung Hohensalzburg parece invencível daqui. E é essa a história que vendem: 900 anos sem conquista militar, a fortaleza medieval mais bem preservada da Europa central.

A história real é mais interessante.

Em 1803, as tropas de Napoleão entraram em Salzburgo sem resistência. O Arcebispo Hieronymus von Colloredo simplesmente entregou as chaves e fugiu para Viena. Não houve cerco, não houve batalha, não houve defesa. A "fortaleza invicta de 900 anos" foi abandonada num domingo de março. Dois anos depois, Salzburgo passou para a Baviera por acordo diplomático. A fortaleza que você está visitando é menos um monumento à resistência do que ao pragmatismo do poder eclesiástico.

Entre no Hohen Stock — os aposentos do Príncipe-Arcebispo. No corredor principal, procure o Salzburger Stier: o órgão de barril construído em 1502, o instrumento musical mais antigo do mundo ainda em funcionamento regular. Toca três vezes por dia (7h, 11h e 18h) — você ouvirá os sons reverberando pela cidade lá embaixo. Mozart cresceu ouvindo esse instrumento da janela de sua casa na Getreidegasse. Quando ele compôs peças para órgão, esse era o timbre que tinha na cabeça.

Isso importa porque Salzburgo foi, durante dois séculos, uma das capitais musicais da Europa não por acidente geográfico — mas porque os Príncipes-Arcebispos contratavam os melhores músicos da Europa como funcionários da corte. Leopold Mozart, pai de Wolfgang Amadeus, era vice-Kapellmeister do Arcebispo. Mozart nasceu funcionário público, filho de funcionário público. A fortaleza que você está visitando era o empregador do pai do maior compositor europeu.

Suba até a plataforma mais alta — o Reck. Daqui a cidade de Salzburgo se organiza como uma maquete: o Mirabell ao norte com seus jardins geométricos, a Getreidegasse cortando o Altstadt em linha reta, o Dom barroco com as duas torres idênticas, o Rio Salzach dividindo a cidade medieval da cidade barroca. Esta vista foi o horizonte de 500 anos de Príncipes-Arcebispos que governaram um Estado independente — Salzburgo só entrou definitivamente para a Áustria em 1816.

Uma última escala antes de descer: o Stiftskeller St. Peter fica do lado de fora da porta da fortaleza, na encosta do morro. Fundado em 803 d.C., é frequentemente listado como o restaurante mais antigo ainda em funcionamento do mundo. Carlo Magno teria jantado aqui, segundo a tradição. O que é certo é que monges beneditinos do Mosteiro de São Pedro administram ou administraram este espaço há mais de 1.200 anos. Você pode jantar num local que existe antes de existirem a maioria das nações europeias.`;

// Atualiza os textos
const patchImmersive = { 'neuschwanstein': neuschwansteinImmersive, 'zugspitze': zugspitzeImmersive, 'salzburg-festung': salzburgFestungImmersive };
for (const [id, text] of Object.entries(patchImmersive)) {
  const poi = data.pois.find(p => p.id === id);
  if (poi) {
    poi.immersiveText = text;
    console.log(`✓ immersiveText reescrito: ${id}`);
  }
}

// ─────────────────────────────────────────────────────────────────
// 4. Adicionar imagePosition na sub-atração mariensaeule
// ─────────────────────────────────────────────────────────────────
const marienplatz = data.pois.find(p => p.id === 'marienplatz');
if (marienplatz) {
  const mariensaeule = marienplatz.media.subAttractions.find(sa => sa.id === 'mariensaeule');
  if (mariensaeule) {
    mariensaeule.imagePosition = 'top';
    console.log('✓ imagePosition=top adicionado: mariensaeule');
  }
  // Glockenspiel também: posição central é melhor para mostrar as figuras
  const glockenspiel = marienplatz.media.subAttractions.find(sa => sa.id === 'glockenspiel');
  if (glockenspiel) {
    glockenspiel.imagePosition = 'top';
    console.log('✓ imagePosition=top adicionado: glockenspiel');
  }
}

// ─────────────────────────────────────────────────────────────────
// 5. Artistas de rua nos POIs relevantes
// ─────────────────────────────────────────────────────────────────
const streetArtistPatches = {
  'marienplatz': {
    addToObservation: 'Músicos de rua e artistas circenses se concentram na praça nos horários do Glockenspiel (11h, 12h, 17h) — chegue 15 minutos antes e observe o ecossistema que se forma ao redor do ritual do carrilhão',
    addToExperience: ' Antes das 11h, posicione-se no centro da praça: você verá simultaneamente o ritual do Glockenspiel acima e os artistas de rua que aproveitam a audiência cativa abaixo.'
  },
  'viktualienmarkt': {
    addToObservation: 'Nos fins de semana (sábado especialmente), músicos tradicionais bávaros tocam ao lado do Maibaum entre 11h e 14h — Schuhplattler (dança típica) ocasionalmente em datas comemorativas',
    addToExperience: ' Sábado de manhã é o melhor momento: mais produtores locais, menos turistas, e chance de encontrar música ao vivo junto ao Maibaum entre 11h e 14h.'
  },
  'odeonsplatz': {
    addToObservation: 'Músicos clássicos e de jazz tocam ocasionalmente na escadaria da Feldherrnhalle e no Theatinergasse nos fins de semana ensolarados — sem horário fixo, mas o entorno acústico do pórtico da Feldherrnhalle amplifica naturalmente os instrumentos de cordas',
  }
};

for (const [id, patch] of Object.entries(streetArtistPatches)) {
  const poi = data.pois.find(p => p.id === id);
  if (!poi) continue;
  if (patch.addToObservation) {
    poi.observationPoints = poi.observationPoints || [];
    poi.observationPoints.push(patch.addToObservation);
    console.log(`✓ artistas de rua (observação): ${id}`);
  }
  if (patch.addToExperience && poi.suggestedExperience) {
    poi.suggestedExperience += patch.addToExperience;
    console.log(`✓ artistas de rua (experiência): ${id}`);
  }
}

// ─────────────────────────────────────────────────────────────────
// 6. Salvar
// ─────────────────────────────────────────────────────────────────
fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');
console.log('\n✓ munique.json salvo');

// Verificação rápida
const check = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
const ap = check.pois.find(p => p.id === 'alte-pinakothek');
const dm = check.pois.find(p => p.id === 'deutsches-museum');
console.log('alte-pinakothek:', ap ? `OK (${ap.media.subAttractions.length} sub-atrações, imersivo: ${ap.immersiveMode})` : 'NOT FOUND');
console.log('deutsches-museum:', dm ? 'AINDA PRESENTE (erro!)' : 'removido OK');
console.log('total POIs:', check.pois.length);
