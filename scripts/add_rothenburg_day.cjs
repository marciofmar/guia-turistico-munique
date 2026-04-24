'use strict';
/**
 * Adiciona o Dia 7 — Rothenburg ob der Tauber — ao munique.json.
 * Execute: node scripts/add_rothenburg_day.cjs
 */
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../src/data/routes/munique.json');
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

// ─────────────────────────────────────────────────────────────────────────────
// DIA 7
// ─────────────────────────────────────────────────────────────────────────────
const dia7 = {
  id: 'dia-7',
  order: 7,
  date: '2026-06-06',
  weekday: 'saturday',
  title: 'Rothenburg ob der Tauber',
  subtitle: 'A cidade medieval mais preservada da Alemanha',
  theme: 'medieval-time-travel',
  dayType: 'excursion',
  energyLevel: 'moderada — caminhadas em ruas de paralelepípedo',
  startTime: '08:00',
  estimatedEndTime: '20:30',
  primaryColor: '#7A3B19',
  coverEmoji: '🏰',
  intro: 'Rothenburg ob der Tauber foi preservada por um paradoxo: a devastação da Guerra dos Trinta Anos destruiu sua economia, e a pobreza a impediu de demolir e modernizar. O resultado, quatro séculos depois, é a cidade medieval mais íntegra da Alemanha. Muralhas completas, casas de enxaimel originais, torres medievais em uso contínuo — e no interior da Igreja de São Tiago, o altar de Tilman Riemenschneider, a maior obra da escultura em madeira do gótico alemão.',
  poiIds: [
    'marktplatz-rothenburg',
    'st-jakobskirche',
    'plonlein',
    'stadtmauer-rothenburg',
    'burggarten-rothenburg',
  ],
  logistics: {
    transport: 'train',
    departureStation: 'München Hauptbahnhof',
    destination: 'Rothenburg ob der Tauber',
    trainDuration: '3h',
    trainLine: 'DB Regio — Bayern-Ticket válido (conexão em Steinach b. Rothenb.)',
    bookingUrl: 'https://www.bahn.de',
    returnBy: '17:00',
    notes: 'Bayern-Ticket (~€29/pessoa) cobre toda a viagem em trens regionais. Sábado: válido o dia todo.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// POIs
// ─────────────────────────────────────────────────────────────────────────────
const newPOIs = [

  // ── 1. Marktplatz de Rothenburg ──────────────────────────────────────────
  {
    id: 'marktplatz-rothenburg',
    dayId: 'dia-7',
    order: 1,
    name: 'Marktplatz de Rothenburg',
    lat: 49.3813,
    lng: 10.1812,
    address: 'Marktplatz, 91541 Rothenburg ob der Tauber',
    historicalPeriod: 'medieval',
    yearBuilt: 1250,
    architecturalStyle: 'Gótico e Renascentista (séc. XIII–XVI)',
    significance: 'Coração político e comercial da cidade-livre imperial desde o século XIII, dominado pelo Rathaus gótico-renascentista e pela lenda do Meistertrunk de 1631.',
    description: 'O Marktplatz de Rothenburg ob der Tauber é o centro de uma das cidades medievais mais intactas da Europa. Dois edifícios dominam seus 310 metros quadrados de paralelepípedo: o Rathaus gótico-renascentista, cujas fases de construção atravessam seis séculos, e a Ratstrinkstube — a Taverna do Conselho — famosa por um relógio que encena diariamente uma das histórias mais improváveis da Guerra dos Trinta Anos.\n\nO Rathaus foi construído em fases que revelam a história da cidade. A ala mais antiga, com a torre gótica, data de 1250 — quando Rothenburg era uma cidade imperial livre, diretamente subordinada ao imperador, sem barões locais a controlar seu comércio. A ala renascentista foi adicionada após o grande incêndio de 1501. Do alto da torre (220 degraus), em dias claros, avistam-se os vinhedos da Francônia até o horizonte e a serpentina do rio Tauber sessenta metros abaixo.\n\nMas o que torna este Marktplatz memorável é a lenda do Meistertrunk — o Grande Gole. Em outubro de 1631, durante a Guerra dos Trinta Anos, o General Johann Tserclaes von Tilly capturou Rothenburg para a Liga Católica. Rothenburg era protestante. Tilly ordenou a execução dos conselheiros da cidade e a destruição do centro histórico. Num gesto que pode ter sido provocação ou teatralidade militar, ele ofereceu uma barganha: se alguém bebesse um cálice de 3,25 litros de vinho da Francônia de uma vez só, a cidade seria poupada.\n\nGeorg Nusch, ex-prefeito de setenta anos, aceitou o desafio. Bebeu os 3,25 litros em aproximadamente dez minutos. Tilly, consta, honrou a palavra e mandou embora as tropas sem destruir a cidade. Os historiadores debatem se o episódio aconteceu exatamente assim. O que é certo é que Rothenburg sobreviveu ao que outras cidades vizinhas não sobreviveram, e que a memória do Meistertrunk foi suficientemente poderosa para ser encenada em relógio todos os dias: à janela da Ratstrinkstube, às 11h, 12h, 13h, 14h, 15h, 20h, 21h e 22h, as figuras do General Tilly e do prefeito Nusch aparecem para reenencenar o momento do grande gole.\n\nHá algo de profundamente humano nessa encenação diária: uma cidade que preservou sua identidade ao longo de quatrocentos anos repetindo, de hora em hora, a história de sua salvação mais improvável. A praça não é apenas um conjunto arquitetônico — é um teatro de memória coletiva que não fecha.',
    immersiveMode: false,
    immersiveText: null,
    observationPoints: [
      'A ala gótica do Rathaus (séc. XIII) ao lado da ala renascentista (séc. XVI) — dois vocabulários arquitetônicos no mesmo edifício',
      'As janelas da Ratstrinkstube onde as figuras do Meistertrunk aparecem a cada hora',
      'O padrão do paralelepípedo da praça: pedras mais desgastadas nos caminhos de maior tráfego',
      'Do alto da torre do Rathaus: a compacidade da cidade intramuros e o vale do Tauber ao fundo',
    ],
    suggestedExperience: 'Chegue ao Marktplatz próximo de uma hora cheia para ver o Meistertrunk clock em ação — especialmente às 11h ou 12h, quando a praça está iluminada. Suba a torre do Rathaus (entrada paga, ~€3) para a melhor panorâmica da cidade e do vale. Reserve o segundo passeio pela praça para o fim do dia, quando os grupos de turistas se dissipam.',
    searchSuggestions: [
      'Meistertrunk 1631 General Tilly Rothenburg',
      'Rathaus Rothenburg gótico renascentista história',
      'Rothenburg ob der Tauber Guerra dos Trinta Anos',
      'Festival Meistertrunk Rothenburg junho',
    ],
    visitType: 'outdoor',
    entryFee: { free: true, price: null, notes: 'Praça: acesso livre. Torre do Rathaus: ~€3' },
    schedule: { mon: { open: '00:00', close: '23:59' }, tue: { open: '00:00', close: '23:59' }, wed: { open: '00:00', close: '23:59' }, thu: { open: '00:00', close: '23:59' }, fri: { open: '00:00', close: '23:59' }, sat: { open: '00:00', close: '23:59' }, sun: { open: '00:00', close: '23:59' } },
    estimatedVisitMinutes: 40,
    externalViewingAlways: true,
    proximityRadiusMeters: null,
    media: {
      audio: '/media/routes/munique/audio/marktplatz-rothenburg.mp3',
      audioDurationSeconds: null,
      photos: [{ src: '/media/routes/munique/photos/marktplatz-rothenburg/main.jpg', caption: 'Marktplatz com o Rathaus gótico-renascentista e a Ratstrinkstube ao fundo', type: 'recognition' }],
      thumb: '/media/routes/munique/photos/marktplatz-rothenburg/thumb.jpg',
      subAttractions: [
        {
          id: 'rathaus-turm',
          name: 'Vista da Torre do Rathaus',
          image: '/media/routes/munique/sub-attractions/marktplatz-rothenburg/rathaus-turm.webp',
          caption: 'Da torre gótica do Rathaus: o perímetro completo das muralhas, o vale do Tauber e o horizonte da Francônia.',
          reel: {
            audioMood: 'medieval',
            segments: [
              { text: 'Vista do alto da Torre do Rathaus — 220 degraus acima do Marktplatz. O perímetro completo das muralhas medievais visível em volta da cidade.', duration: 5, focusZone: 'full' },
              { text: 'No centro da imagem, diretamente abaixo: o Marktplatz com as pedras de paralelepípedo. A praça serve como centro urbano há 750 anos sem interrupção.', duration: 6, focusZone: 'full' },
              { text: 'À direita da imagem: os telhados compactos da Altstadt. Observe a densidade — casas encostadas umas nas outras, jardins internos escondidos. Lógica da cidade intramuros.', duration: 6, focusZone: 'full' },
              { text: 'Ao fundo, a faixa verde do vale do Tauber: o rio está sessenta metros abaixo. A diferença de altitude foi o que tornou Rothenburg defensável.', duration: 6, focusZone: 'full' },
              { text: 'À esquerda: a linha das muralhas medievais. Distingue-se a espessura real das paredes — 1,5 a 2 metros de arenito. Na galeria coberta do adarve, as sentinelas circulavam por aqui.', duration: 6, focusZone: 'full' },
              { text: 'Uma cidade preservada dentro de um perímetro fechado — intacta porque parou de crescer no século décimo sétimo. O que você vê daqui é um mapa fiel do que existia em 1400.', duration: 6, focusZone: 'full' },
            ],
          },
        },
        {
          id: 'meistertrunk-uhr',
          name: 'Relógio do Meistertrunk',
          image: '/media/routes/munique/sub-attractions/marktplatz-rothenburg/meistertrunk-uhr.webp',
          caption: 'A fachada da Ratstrinkstube com o glockenspiel que encena o Grande Gole — diariamente, de hora em hora.',
          reel: {
            audioMood: 'medieval',
            segments: [
              { text: 'A fachada da Ratstrinkstube — Taverna do Conselho — no Marktplatz. O relógio com figuras data de 1910, mas encena um episódio de 1631.', duration: 5, focusZone: 'full' },
              { text: 'No centro da fachada: as janelas do glockenspiel. Às 11h, 12h, 13h, 14h, 15h, 20h, 21h e 22h, as figuras do General Tilly e do prefeito Nusch aparecem.', duration: 7, focusZone: 'full' },
              { text: 'A história encenada: outubro de 1631. General Tilly capturou Rothenburg e ameaçou destruir a cidade protestante. Propôs o desafio: quem bebesse 3,25 litros de vinho de uma vez pouparia a cidade.', duration: 8, focusZone: 'full' },
              { text: 'Georg Nusch, ex-prefeito de setenta anos, aceitou. Bebeu os 3,25 litros em aproximadamente dez minutos. Tilly honrou a palavra. Rothenburg foi poupada.', duration: 7, focusZone: 'full' },
              { text: 'À esquerda da janela: a fachada renascentista do Rathaus. À direita: a arcada gótica da ala mais antiga. Seis séculos de construção num único conjunto arquitetônico.', duration: 6, focusZone: 'full' },
              { text: 'O Meistertrunk virou festival em 1881. Acontece anualmente em junho. A peça de teatro encenando o Grande Gole acontece ao vivo no Marktplatz desde então.', duration: 5, focusZone: 'full' },
            ],
          },
        },
      ],
      audioImmersive: null,
    },
    walkingNotes: 'Do Marktplatz, a Igreja de São Tiago fica a 3 minutos a pé, pela Klostergasse ao norte.',
    nextTransport: 'walking',
    nextTransportMinutes: 3,
    tags: ['praça', 'medieval', 'gótico', 'renascentista', 'lenda'],
  },

  // ── 2. St. Jakobskirche (imersivo) ───────────────────────────────────────
  {
    id: 'st-jakobskirche',
    dayId: 'dia-7',
    order: 2,
    name: 'Igreja de São Tiago',
    lat: 49.3820,
    lng: 10.1803,
    address: 'Klostergasse 15, 91541 Rothenburg ob der Tauber',
    historicalPeriod: 'medieval',
    yearBuilt: 1311,
    architecturalStyle: 'Gótico tardio (1311–1484)',
    significance: 'Abriga o Heilig-Blut-Altar de Tilman Riemenschneider (1499–1505), considerado a maior obra da escultura em madeira do gótico alemão — um retábulo em tília não pintada de onze metros de altura.',
    description: 'A Igreja de São Tiago — Stadtkirche St. Jakob — foi construída entre 1311 e 1484 em estilo gótico tardio, com financiamento das famílias mercantis que enriqueceram Rothenburg com o comércio de especiarias ao longo da Via Régia, a principal rota comercial medieval entre Frankfurt e Nürnberg. A cidadela que financiou as muralhas também financiou a catedral.\n\nA joia da igreja é o Heilig-Blut-Altar — o Altar do Santo Sangue — esculpido em madeira de tília por Tilman Riemenschneider entre 1499 e 1505. Riemenschneider foi um dos maiores escultores do período gótico tardio alemão, com ateliê em Würzburg, e o Altar do Santo Sangue é sua obra mais celebrada. Diferente dos altares de seus contemporâneos flamengos, Riemenschneider não pintou o trabalho — a madeira natural foi sua escolha estética deliberada. Em 1505, isso era radical: policromia era a norma do sagrado.\n\nO altar recebe o nome de uma relíquia: um cristal que, segundo a tradição, contém três gotas do sangue de Cristo, adquirido pela cidade em 1270 de um monge que afirmava tê-lo trazido de Jerusalém. O cristal está embutido no altarpiece no painel central, acima da cena da Última Ceia.\n\nRiemenschneider não escolheu o momento da instituição da Eucaristia para o painel central — o momento liturgicamente esperado. Escolheu o instante imediatamente posterior à revelação: "Um de vós me trairá." Treze figuras ao redor de uma mesa oval, cada rosto individualmente esculpido. E Judas — deliberadamente — não tem aparência diferente dos outros. Ele parece qualquer homem comum perturbado. Riemenschneider entendeu que a traição não tem face distinta.\n\nA igreja tem dois outros altares significativos: o Zwölf-Boten-Altar de 1466 no coro ocidental, e o Hochaltar policromado no coro oriental — este último um contraexemplo que torna ainda mais legível a escolha deliberada de Riemenschneider por madeira natural.',
    immersiveMode: true,
    immersiveText: 'Você está no coro ocidental da Stadtkirche St. Jakob, em frente ao Heilig-Blut-Altar de Tilman Riemenschneider. O altar foi esculpido em madeira de tília entre 1499 e 1505. Tem aproximadamente onze metros de altura. Não foi pintado.\n\nEsta última informação parece técnica, mas é filosófica. Em 1499, altares pintados eram a norma absoluta na escultura religiosa europeia. A policromia — cores vivas, dourados, manto vermelho na Virgem, azul no céu — era a linguagem visual do sagrado. Deixar a escultura em madeira natural era heterodoxo. Riemenschneider fez isso consistentemente ao longo de sua carreira. Não temos registro escrito de por quê. Mas o efeito é imediato: a madeira natural cria uma intimidade que o dourado e o vermelho recusam. Você está mais próximo destas figuras do que de qualquer Cristo pintado que já viu.\n\nOlhe para o painel central: a Última Ceia.\n\nRiemenschneider não escolheu o momento da instituição da Eucaristia — o instante liturgicamente esperado, quando Jesus parte o pão. Escolheu o momento posterior: "Um de vós me trairá." João 13:21. Treze figuras ao redor de uma mesa oval. Procure, no painel, cada rosto individualmente. Não há dois iguais. Não havia molde, não havia repetição mecânica. Cada figura exigiu pensamento autônomo sobre como aquele homem específico recebeu aquela notícia específica.\n\nNo centro do painel, Jesus e João. João recosta a cabeça no ombro de Jesus — referência direta a João 13:23: "O discípulo amado estava reclino no peito de Jesus." Imediatamente à direita: um apóstolo se inclina para frente com a mão no queixo. É contemplação, não horror. Ele está tentando entender.\n\nAgora procure Judas. Aqui está a decisão mais ousada de Riemenschneider: Judas não tem aparência diferente dos outros. Ele parece qualquer homem perturbado, comum, sobrecarregado. Não há cara de traidor, não há sombra especial, não há posição isolada. Ele poderia ser qualquer um dos treze. Riemenschneider entendeu algo que a iconografia medieval tradicional sistematicamente ignorava: a traição não tem fisionomia. Ela habita rostos ordinários.\n\nAcima da cena da Última Ceia, embutido no altarpiece: um cristal transparente. Dentro, segundo a tradição, três gotas do sangue de Cristo. A relíquia foi adquirida em 1270, de um monge que afirmou tê-la trazido de Jerusalém. O altar inteiro — onze metros de trabalho em madeira, seis anos de escultura — foi construído para guardar este cristal. A maior obra da escultura gótica alemã existe para servir a um fragmento de fé.\n\nVire agora para o painel esquerdo: A Entrada em Jerusalém.\n\nJesus entra na cidade sobre um jumento, cercado por uma multidão que se comprime no espaço estreito da cena. A porta da cidade está detalhada — portculis, arco de pedra, textura das juntas de argamassa. Riemenschneider foi arquiteto da emoção, mas também arquiteto da pedra: os edifícios que ele esculpiu eram estruturalmente plausíveis.\n\nNo canto inferior esquerdo do painel, próximo às pedras da calçada: uma criança se espreme entre os adultos tentando ver melhor. Um adulto a bloqueia com o cotovelo, sem perceber. A cena não está no Evangelho. Riemenschneider a inventou. Isso importa: numa obra religiosa de encomenda, com liturgia específica a ser representada, um escultor do século décimo quinto encontrou espaço para observação humana ordinária. Crianças tentam ver. Adultos bloqueiam sem querer. Isso acontecia em 1499. Acontece agora.\n\nPainel direito: A Agonia no Jardim do Getsêmani.\n\nJesus ajoelhado em oração. Ao fundo, os discípulos dormem — mas procure as expressões. Não é sono tranquilo. A figura mais à direita tem a mandíbula contraída. O corpo dorme, a angústia não. Acima de Jesus, um anjo sustenta o cálice — ao qual Jesus ora: "Se possível, que este cálice passe longe de mim."\n\nA paisagem ao fundo do painel não é a Judeia. São as colinas suaves, os vinhedos em socalcos, o vale gentil — é a Francônia. Riemenschneider situou a Paixão na sua própria paisagem. Dizia: isso aconteceu aqui. No terreno que você conhece.\n\nEm 1525, Riemenschneider tinha cinquenta e cinco anos, era Bürgermeister de Würzburg e um dos escultores mais celebrados da Europa. A Guerra dos Camponeses eclodiu. Riemenschneider tomou partido dos camponeses contra o príncipe-bispo de Würzburg. Foi capturado, preso, torturado. Os registros históricos são ambíguos sobre se suas mãos foram quebradas, mas ele esculpiu muito pouco nos seis anos que ainda viveu. As mãos que deram angústia a treze apóstolos foram destruídas pelo mesmo tipo de poder eclesiástico que elas serviram por três décadas.\n\nOlhe de novo para os rostos da Última Ceia. A angústia que você vê ali não é apenas observação — é conhecimento. Riemenschneider sabia, ao esculpir, que o poder pune quem o contradiz.',
    observationPoints: [
      'Painel central: os treze rostos individualizados da Última Ceia — nenhum igual ao outro',
      'Judas no painel central: deliberadamente indistinguível dos outros apóstolos',
      'Painel esquerdo, canto inferior esquerdo: a criança inventada por Riemenschneider tentando ver entre os adultos',
      'Painel direito: a Francônia no fundo — Riemenschneider situou Getsêmani na sua própria paisagem',
      'O cristal da relíquia embutido acima do painel central — o altar foi construído para guardar este objeto',
      'O contraste com o Hochaltar policromado no coro oriental: perceber o que significa ausência de tinta',
    ],
    suggestedExperience: 'Entre pela porta principal e siga imediatamente ao coro ocidental (ao fundo, subindo uma escada curta) — é onde está o Heilig-Blut-Altar. Dedique pelo menos vinte minutos ao altar: olhe painel por painel. Leve binóculos se possível — os detalhes dos rostos na faixa superior exigem proximidade ou ampliação. Antes de sair, compare com o Hochaltar policromado do coro oriental: o contraste revela a radicalidade da escolha de Riemenschneider.',
    searchSuggestions: [
      'Tilman Riemenschneider escultor Würzburg',
      'Heilig-Blut-Altar Rothenburg madeira de tília',
      'Riemenschneider Guerra dos Camponeses 1525',
      'escultura gótica alemã século décimo quinto',
      'Última Ceia representações medievais Judas',
    ],
    visitType: 'indoor',
    entryFee: { free: false, price: '€4', notes: 'Entrada inclui acesso ao coro ocidental com o altar' },
    schedule: { mon: { open: '10:00', close: '17:00' }, tue: { open: '10:00', close: '17:00' }, wed: { open: '10:00', close: '17:00' }, thu: { open: '10:00', close: '17:00' }, fri: { open: '10:00', close: '17:00' }, sat: { open: '10:00', close: '17:00' }, sun: { open: '11:00', close: '17:00' } },
    estimatedVisitMinutes: 35,
    externalViewingAlways: false,
    proximityRadiusMeters: null,
    media: {
      audio: '/media/routes/munique/audio/st-jakobskirche.mp3',
      audioDurationSeconds: null,
      photos: [{ src: '/media/routes/munique/photos/st-jakobskirche/main.jpg', caption: 'O Heilig-Blut-Altar de Riemenschneider — madeira de tília, 1499–1505, onze metros de altura', type: 'recognition' }],
      thumb: '/media/routes/munique/photos/st-jakobskirche/thumb.jpg',
      subAttractions: [
        {
          id: 'heilig-blut-altar',
          name: 'Heilig-Blut-Altar',
          image: '/media/routes/munique/sub-attractions/st-jakobskirche/heilig-blut-altar.webp',
          imageFit: 'contain',
          caption: 'O retábulo de Riemenschneider em madeira natural — três painéis: Entrada em Jerusalém, Última Ceia, Getsêmani.',
          reel: {
            audioMood: 'baroque',
            segments: [
              { text: 'O Heilig-Blut-Altar de Tilman Riemenschneider, 1499–1505. Madeira de tília sem pintura. Onze metros de altura. Observe a composição completa antes dos detalhes.', duration: 5, focusZone: 'full' },
              { text: 'No painel central, no coração da composição: a Última Ceia. Não o momento do pão partido — mas "Um de vós me trairá." Treze rostos, nenhum igual ao outro. Procure Judas: ele parece qualquer um.', duration: 8, focusZone: 'full' },
              { text: 'Ainda no painel central, à direita do grupo: um apóstolo inclinado com a mão no queixo. Contemplação, não horror. Ele está tentando entender. Riemenschneider esculpiu o pensamento.', duration: 6, focusZone: 'full' },
              { text: 'Painel esquerdo (à esquerda do altar): Entrada em Jerusalém. Canto inferior esquerdo do painel: uma criança espremida entre adultos tenta ver. Um adulto a bloqueia sem perceber. Cena inventada por Riemenschneider — não está no Evangelho.', duration: 8, focusZone: 'full' },
              { text: 'Painel direito (à direita do altar): Getsêmani. Os discípulos dormem ao fundo. Observe a figura mais à direita do grupo: mandíbula contraída. O corpo dorme, a angústia não. A paisagem ao fundo é a Francônia — não a Judeia.', duration: 7, focusZone: 'full' },
              { text: 'Acima do painel central, embutido na moldura: o cristal da relíquia. O altar inteiro foi construído para guardar este objeto. A maior obra do gótico alemão existe para servir a um fragmento de fé.', duration: 7, focusZone: 'full' },
            ],
          },
        },
      ],
      audioImmersive: '/media/routes/munique/audio/st-jakobskirche-immersive.mp3',
    },
    walkingNotes: 'Do St. Jakob, desça pela Herrngasse ou Schmiedgasse em direção sul, rumo ao Plönlein — cerca de 8 minutos a pé.',
    nextTransport: 'walking',
    nextTransportMinutes: 8,
    tags: ['igreja', 'escultura', 'medieval', 'imersivo', 'riemenschneider'],
  },

  // ── 3. Plönlein ──────────────────────────────────────────────────────────
  {
    id: 'plonlein',
    dayId: 'dia-7',
    order: 3,
    name: 'Plönlein',
    lat: 49.3769,
    lng: 10.1804,
    address: 'Plönlein, 91541 Rothenburg ob der Tauber',
    historicalPeriod: 'medieval',
    yearBuilt: 1385,
    architecturalStyle: 'Enxaimel e torres medievais (séc. XIV–XVI)',
    significance: 'A bifurcação de rua mais fotografada da Alemanha medieval, onde o Siebersturm e o Kobolzeller Tor enquadram uma composição que definiu a imagem iconográfica de Rothenburg para o mundo.',
    description: 'O Plönlein é o enquadramento mais fotografado de Rothenburg — e possivelmente o mais reproduzido da Alemanha medieval. Uma bifurcação de rua que cria uma praçinha triangular, com duas torres medievais ao fundo: o Siebersturm, erguido por volta de 1385 para defender a entrada sul da cidade alta, e o portão Kobolzeller Tor, que controla a descida íngreme até o vale do rio Tauber. No vértice da bifurcação, uma casa com enxaimel do século décimo sexto completa a composição.\n\nO nome "Plönlein" vem provavelmente do latim "planum" — referência ao terraço plano que existe na bifurcação antes das duas ruas começarem a subir e descer em direções distintas. Há uma teoria alternativa derivada do dialeto da Francônia, onde "plänlein" significa "pequena praça". Nenhuma das duas é romanticamente satisfatória, o que talvez explique por que ninguém investiga muito a etimologia.\n\nA fama do Plönlein é essencialmente fotográfica. A composição — a quase-simetria das torres ao fundo, o ângulo das ruas criando perspectiva diagonal, a textura das pedras de paralelepípedo, a escala humana das casas — é o tipo de cena que câmeras analógicas capturaram excepcionalmente bem no início do século vinte. Cartões-postais proliferaram. O Plönlein tornou-se o rosto de Rothenburg, e Rothenburg tornou-se o rosto da Alemanha medieval.\n\nHá um paradoxo útil nisso: dezenas de cenas igualmente belas existem no perímetro das muralhas de Rothenburg. O Plönlein é o símbolo porque foi eleito símbolo — não porque seja objetivamente superior aos demais. Caminhando a cidade inteira, você encontrará suas próprias versões do Plönlein em vielas laterais onde não há nenhum turista com câmera.\n\nA melhor fotografia do Plönlein, aliás, é de manhã cedo — antes das oito horas, quando a luz rasa do nascer do sol pinta as pedras de laranja e os visitantes ainda não chegaram.',
    immersiveMode: false,
    immersiveText: null,
    observationPoints: [
      'Siebersturm (esquerda): torre de 1385 para defesa da entrada sul; Kobolzeller Tor (direita): portão que controla a descida para o vale',
      'O desgaste diferenciado das pedras nos dois caminhos — o da esquerda mais polido, com mais tráfego histórico',
      'A casa de enxaimel no vértice: estrutura de madeira original com rebocos caiados característicos da Francônia',
      'O efeito de perspectiva criado pelo ângulo das duas ruas — o que faz a composição funcionar fotograficamente',
    ],
    suggestedExperience: 'Chegue ao Plönlein pela Schmiedgasse descendo do Marktplatz. Observe a composição do alto (antes da bifurcação) e depois desça até o vértice para sentir a escala real. Para fotografias sem multidão: antes das 9h ou após as 18h. Depois do Plönlein, explore a Herrngasse em paralelo — mesma época, zero turistas.',
    searchSuggestions: [
      'Plönlein Rothenburg fotografia história',
      'Siebersturm 1385 arquitetura medieval',
      'Romantische Straße cidades medievais Alemanha',
      'Rothenburg ob der Tauber cartões-postais história',
    ],
    visitType: 'outdoor',
    entryFee: { free: true, price: null, notes: 'Acesso livre' },
    schedule: { mon: { open: '00:00', close: '23:59' }, tue: { open: '00:00', close: '23:59' }, wed: { open: '00:00', close: '23:59' }, thu: { open: '00:00', close: '23:59' }, fri: { open: '00:00', close: '23:59' }, sat: { open: '00:00', close: '23:59' }, sun: { open: '00:00', close: '23:59' } },
    estimatedVisitMinutes: 20,
    externalViewingAlways: true,
    proximityRadiusMeters: null,
    media: {
      audio: '/media/routes/munique/audio/plonlein.mp3',
      audioDurationSeconds: null,
      photos: [{ src: '/media/routes/munique/photos/plonlein/main.jpg', caption: 'O Plönlein: bifurcação medieval com Siebersturm e Kobolzeller Tor ao fundo', type: 'recognition' }],
      thumb: '/media/routes/munique/photos/plonlein/thumb.jpg',
      subAttractions: [
        {
          id: 'plonlein-view',
          name: 'A Bifurcação Medieval',
          image: '/media/routes/munique/sub-attractions/plonlein/plonlein-view.webp',
          caption: 'O enquadramento que definiu o imaginário da Alemanha medieval: duas torres, uma bifurcação, uma casa de enxaimel.',
          reel: {
            audioMood: 'medieval',
            segments: [
              { text: 'O Plönlein — a bifurcação de rua mais fotografada da Alemanha medieval. Uma praça triangular onde dois caminhos se separam para destinos distintos.', duration: 5, focusZone: 'full' },
              { text: 'No fundo da imagem, à esquerda: o Siebersturm — Torre de Siebers, construída por volta de 1385. É o portão que dá acesso à cidade alta pela rota sul.', duration: 6, focusZone: 'full' },
              { text: 'No fundo, à direita: o Kobolzeller Tor — portão que controla a descida íngreme para o vale do Tauber, sessenta metros abaixo. Duas torres para dois destinos diferentes.', duration: 6, focusZone: 'full' },
              { text: 'No vértice da bifurcação, ao centro: a casa de enxaimel do século décimo sexto que completa a composição. Nem a casa nem as torres foram construídas para ser fotografadas. A beleza é acidental.', duration: 7, focusZone: 'full' },
              { text: 'As pedras de paralelepípedo na calçada têm desgaste diferente nos dois caminhos — o da esquerda mais polido, por receber historicamente mais tráfego de pedestres.', duration: 6, focusZone: 'full' },
              { text: 'Este ângulo tornou-se o rosto de Rothenburg por causa de cartões-postais do início do século vinte. Dezenas de vistas igualmente belas existem dentro das mesmas muralhas — sem turistas.', duration: 7, focusZone: 'full' },
            ],
          },
        },
      ],
      audioImmersive: null,
    },
    walkingNotes: 'Do Plönlein, siga pela Spitalgasse (a rua da direita, descendo levemente) até chegar ao setor sul das muralhas — 3 minutos.',
    nextTransport: 'walking',
    nextTransportMinutes: 3,
    tags: ['medieval', 'fotografia', 'icônico', 'enxaimel'],
  },

  // ── 4. Stadtmauer de Rothenburg ──────────────────────────────────────────
  {
    id: 'stadtmauer-rothenburg',
    dayId: 'dia-7',
    order: 4,
    name: 'Stadtmauer — As Muralhas Medievais',
    lat: 49.3808,
    lng: 10.1830,
    address: 'Stadtmauer, 91541 Rothenburg ob der Tauber',
    historicalPeriod: 'medieval',
    yearBuilt: 1356,
    architecturalStyle: 'Fortificação medieval em arenito (1356–1408)',
    significance: 'Muralhas medievais de 3,5 km em estado excepcional de conservação, com galeria coberta percorrível — preservadas ironicamente pelo colapso econômico da cidade após a Guerra dos Trinta Anos.',
    description: 'As muralhas medievais de Rothenburg — a Stadtmauer — foram construídas entre 1356 e 1408, financiadas diretamente pelas corporações de ofício da cidade. Cada guilda era responsável por uma seção específica: os padeiros defendiam um trecho, os ferreiros outro, os sapateiros mais outro. O nome de cada torre ainda reflete esse sistema corporativo de defesa comunitária, distribuída e auditável.\n\nO circuito completo tem 3,5 km, com aproximadamente metade percorrível por uma galeria coberta no nível do adarve — o caminho de sentinela. O piso de madeira da galeria está gasto de uma forma específica: mais nas bordas do que no centro, porque durante séculos as sentinelas caminhavam próximas às ameias para se apoiar. Depois de 1631, quando a ameaça militar passou, os mesmos trilhos foram usados pelos cidadãos para passeios. A madeira guarda a memória de ambos os usos.\n\nCaminhar as muralhas oferece uma perspectiva que as ruas internas negam: você vê simultaneamente a cidade compacta do interior — telhados de argila vermelha, jardins internos escondidos atrás das fachadas, pátios privados que nenhum turista visita — e o vale do Tauber ao exterior, com socalcos de vinhedos descendo até o rio.\n\nA conservação excepcional das muralhas resulta do mesmo paradoxo econômico que preservou a cidade inteira: após a Guerra dos Trinta Anos, Rothenburg entrou em colapso financeiro. Não havia verba para demolir as torres medievais e substituí-las por bulevares modernos. A pobreza foi o melhor conservador que as muralhas poderiam ter tido.',
    immersiveMode: false,
    immersiveText: null,
    observationPoints: [
      'O desgaste do piso de madeira: mais intenso nas bordas (onde as sentinelas se apoiavam) do que no centro',
      'A espessura real das paredes — 1,5 a 2 metros de arenito — visível nas janelas das ameias',
      'Os jardins e pátios internos invisíveis das ruas principais, visíveis apenas do adarve',
      'As torres com nomes de guildas: cada corporação financiou e defendia sua seção da muralha',
      'A diferença de cota entre o adarve e o vale do Tauber — o que tornava a muralha militarmente eficaz',
    ],
    suggestedExperience: 'Acesse o adarve pelo Rödertor (portão leste) ou pela Klingentor (portão norte). Caminhe pelo menos o trecho sul, que oferece as melhores vistas do vale do Tauber e fica mais tranquilo que o trecho norte. O acesso ao adarve é gratuito — mas o passeio exige boa disposição física: piso irregular, escadas íngremes nos pontos de acesso.',
    searchSuggestions: [
      'Stadtmauer Rothenburg adarve percurso',
      'Rothenburg pobreza preservação paradoxo histórico',
      'guildas medievais defesa urbana Alemanha',
      'Rödertor Klingentor Spitaltor portões medievais',
    ],
    visitType: 'outdoor',
    entryFee: { free: true, price: null, notes: 'Acesso ao adarve gratuito' },
    schedule: { mon: { open: '08:00', close: '20:00' }, tue: { open: '08:00', close: '20:00' }, wed: { open: '08:00', close: '20:00' }, thu: { open: '08:00', close: '20:00' }, fri: { open: '08:00', close: '20:00' }, sat: { open: '08:00', close: '20:00' }, sun: { open: '08:00', close: '20:00' } },
    estimatedVisitMinutes: 40,
    externalViewingAlways: true,
    proximityRadiusMeters: null,
    media: {
      audio: '/media/routes/munique/audio/stadtmauer-rothenburg.mp3',
      audioDurationSeconds: null,
      photos: [{ src: '/media/routes/munique/photos/stadtmauer-rothenburg/main.jpg', caption: 'A galeria coberta do adarve — piso de madeira gasto por séculos de sentinelas e visitantes', type: 'recognition' }],
      thumb: '/media/routes/munique/photos/stadtmauer-rothenburg/thumb.jpg',
      subAttractions: [
        {
          id: 'stadtmauer-blick',
          name: 'Vista do Adarve',
          image: '/media/routes/munique/sub-attractions/stadtmauer-rothenburg/stadtmauer-blick.webp',
          caption: 'Do adarve: à esquerda, os telhados compactos da cidade intramuros; à direita, o vale aberto da Francônia.',
          reel: {
            audioMood: 'medieval',
            segments: [
              { text: 'A galeria coberta do adarve de Rothenburg — construída entre 1356 e 1408. Piso de madeira gasto por séculos de uso. Mais desgastado nas bordas do que no centro.', duration: 5, focusZone: 'full' },
              { text: 'À esquerda na galeria (para dentro da cidade): telhados compactos de argila vermelha, jardins privados invisíveis das ruas, pátios internos que nenhum roteiro turístico alcança.', duration: 7, focusZone: 'full' },
              { text: 'À direita (para fora, pelas ameias): o campo aberto da Francônia — vinhedos, pastos e ao fundo o vale do Tauber correndo entre socalcos.', duration: 6, focusZone: 'full' },
              { text: 'A espessura real das paredes visível nas ameias: 1,5 a 2 metros de arenito. Cada torre foi financiada por uma guilda diferente. Os padeiros defendiam um trecho, os ferreiros, outro.', duration: 7, focusZone: 'full' },
              { text: 'Rothenburg manteve as muralhas intactas por um paradoxo: entrou em colapso após a Guerra dos Trinta Anos e nunca teve verba para modernizar ou demolir.', duration: 6, focusZone: 'full' },
              { text: 'Caminhar o adarve é entender o perímetro da cidade como decisão humana: o que fica dentro e o que fica fora. Uma distinção que durou seiscentos anos.', duration: 6, focusZone: 'full' },
            ],
          },
        },
      ],
      audioImmersive: null,
    },
    walkingNotes: 'Das muralhas sul, caminhe pelo adarve em direção oeste até o Burgtor — a porta do castelo — para chegar ao Burggarten. Aproximadamente 15 minutos a pé pelo adarve.',
    nextTransport: 'walking',
    nextTransportMinutes: 15,
    tags: ['muralhas', 'medieval', 'adarve', 'panorâmica'],
  },

  // ── 5. Burggarten ────────────────────────────────────────────────────────
  {
    id: 'burggarten-rothenburg',
    dayId: 'dia-7',
    order: 5,
    name: 'Burggarten — Jardins do Castelo',
    lat: 49.3803,
    lng: 10.1765,
    address: 'Burggasse, 91541 Rothenburg ob der Tauber',
    historicalPeriod: 'medieval',
    yearBuilt: 1330,
    architecturalStyle: 'Jardim público sobre ruínas de castelo imperial (séc. XIV–XIX)',
    significance: 'Jardins sobre o sítio do castelo imperial Hohenstaufen, destruído no terremoto de 1356 — com vistas panorâmicas do vale do Tauber e da Doppelbrücke medieval.',
    description: 'O Burggarten de Rothenburg ocupa o terreno onde erguia o castelo imperial da dinastia Hohenstaufen — destruído pelo terremoto de 1356 que também impulsionou a construção das muralhas medievais. Quando o castelo imperial desmoronou, a proteção que o imperador oferecia à cidade-livre foi substituída, literalmente, por paredes de pedra financiadas pelos próprios cidadãos.\n\nHoje, os jardins são um parque público com alguns dos melhores ângulos para observar a cidade de fora das muralhas e o vale do rio Tauber logo abaixo. Do ponto mais alto do jardim, o terreno cai dramaticamente — quase sessenta metros — até o leito do Tauber, que aqui faz uma curva pronunciada criando um meandro amplo, com socalcos de vinhedos nas encostas expostas ao sul.\n\nAo fundo do vale, a Doppelbrücke — a Ponte Dupla medieval — é visível: uma raridade de engenharia do século décimo quarto, com dois níveis superpostos. O nível inferior era caminho de pedestres; o superior, via para carros de boi. A lógica de separar os fluxos por categoria de usuário, que hoje chamamos de design multimodal, existia em Rothenburg em 1330.\n\nUma pequena capela sobreviveu ao terremoto de 1356: a Blasiuskapelle, construída em 1330, hoje convertida em memorial para as vítimas das Guerras Mundiais do século vinte. Do lado de fora, moradores colocam flores em datas de outubro e novembro.\n\nEm tardes quentes de sábado, moradores de Rothenburg usam o jardim para piqueniques e repouso na grama — um lembrete gentil de que, por trás de toda a infraestrutura turística, existe uma cidade com habitantes reais que escolheram viver aqui.',
    immersiveMode: false,
    immersiveText: null,
    observationPoints: [
      'O vale do Tauber sessenta metros abaixo: a diferença de cota que tornava o castelo imperial inexpugnável',
      'A Doppelbrücke ao fundo do vale: dois níveis superpostos, pedestres e carros de boi separados desde o século décimo quarto',
      'A Blasiuskapelle de 1330 — única estrutura sobrevivente do castelo imperial, hoje memorial de guerra',
      'Os vinhedos em socalcos nas encostas: a Francônia produz vinho há mais de mil anos neste vale',
      'A silhueta da cidade alta vista de fora das muralhas pelo ângulo oeste — perspectiva que os moradores medievais raramente tinham',
    ],
    suggestedExperience: 'Chegue ao Burggarten no fim da tarde, quando o sol inclina para oeste e a luz banha os vinhedos dourados do vale. Reserve tempo para sentar num banco do jardim e apenas olhar — este é o ritmo correto para o fim de um dia em Rothenburg. Se tiver energia, desça o caminho íngreme pelo Kobolzeller Steig até a Doppelbrücke e suba de volta pela Burgsteige. Uma hora adicional bem gasta.',
    searchSuggestions: [
      'Doppelbrücke Rothenburg engenharia medieval',
      'Castelo Hohenstaufen terremoto 1356 história',
      'Blasiuskapelle Rothenburg memorial guerra',
      'vale do Tauber vinhedos Francônia',
    ],
    visitType: 'outdoor',
    entryFee: { free: true, price: null, notes: 'Jardim público, acesso livre' },
    schedule: { mon: { open: '00:00', close: '23:59' }, tue: { open: '00:00', close: '23:59' }, wed: { open: '00:00', close: '23:59' }, thu: { open: '00:00', close: '23:59' }, fri: { open: '00:00', close: '23:59' }, sat: { open: '00:00', close: '23:59' }, sun: { open: '00:00', close: '23:59' } },
    estimatedVisitMinutes: 30,
    externalViewingAlways: true,
    proximityRadiusMeters: null,
    media: {
      audio: '/media/routes/munique/audio/burggarten-rothenburg.mp3',
      audioDurationSeconds: null,
      photos: [{ src: '/media/routes/munique/photos/burggarten-rothenburg/main.jpg', caption: 'Do Burggarten: o vale do Tauber com a Doppelbrücke medieval ao fundo', type: 'recognition' }],
      thumb: '/media/routes/munique/photos/burggarten-rothenburg/thumb.jpg',
      subAttractions: [],
      audioImmersive: null,
    },
    walkingNotes: 'Fim do Dia 7. Do Burggarten, volte ao Marktplatz pela Herrngasse (10 min) e siga à Estação de trem — a pé até o fim da Ansbacher Straße, fora das muralhas, ~15 min. Trem de retorno a Munique a partir de 17h.',
    nextTransport: null,
    nextTransportMinutes: null,
    tags: ['jardim', 'panorâmica', 'medieval', 'ruínas'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEGMENTS — conexões entre POIs do Dia 7
// ─────────────────────────────────────────────────────────────────────────────
const newSegments = [
  {
    from: 'BASE_MUNIQUE',
    to: 'marktplatz-rothenburg',
    transport: 'train',
    walkingMinutes: 180,
    distanceMeters: 180000,
    path: [[48.1405, 11.5582], [49.3813, 10.1812]],
    streetNotes: 'München Hauptbahnhof → Steinach (b) Rothenb. → Rothenburg ob der Tauber. Bayern-Ticket válido. Conexão em Steinach: 5 min de baldeação.',
  },
  {
    from: 'marktplatz-rothenburg',
    to: 'st-jakobskirche',
    transport: 'walking',
    walkingMinutes: 3,
    distanceMeters: 200,
    path: [[49.3813, 10.1812], [49.3820, 10.1803]],
    streetNotes: 'Pela Klostergasse ao norte do Marktplatz. A torre da Igreja de São Tiago é visível desde a saída da praça.',
  },
  {
    from: 'st-jakobskirche',
    to: 'plonlein',
    transport: 'walking',
    walkingMinutes: 8,
    distanceMeters: 550,
    path: [[49.3820, 10.1803], [49.3800, 10.1808], [49.3769, 10.1804]],
    streetNotes: 'Pela Herrngasse ou Schmiedgasse em direção sul — a espinha dorsal da cidade medieval. Casas de enxaimel em ambos os lados durante todo o percurso.',
  },
  {
    from: 'plonlein',
    to: 'stadtmauer-rothenburg',
    transport: 'walking',
    walkingMinutes: 3,
    distanceMeters: 180,
    path: [[49.3769, 10.1804], [49.3779, 10.1830]],
    streetNotes: 'Pela Spitalgasse (rua à direita da bifurcação) até o acesso ao adarve sul próximo ao Spitaltor.',
  },
  {
    from: 'stadtmauer-rothenburg',
    to: 'burggarten-rothenburg',
    transport: 'walking',
    walkingMinutes: 15,
    distanceMeters: 750,
    path: [[49.3779, 10.1830], [49.3808, 10.1780], [49.3803, 10.1765]],
    streetNotes: 'Pelo adarve ocidental em direção norte, até o Burgtor — a porta do castelo. Do Burgtor, desça para os jardins. Vista das muralhas durante todo o percurso.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Aplicar ao JSON
// ─────────────────────────────────────────────────────────────────────────────

// Verificar se dia-7 já existe
if (data.days.some(d => d.id === 'dia-7')) {
  console.error('ERRO: dia-7 já existe no JSON. Remova antes de executar novamente.');
  process.exit(1);
}

data.days.push(dia7);
data.pois.push(...newPOIs);
data.segments.push(...newSegments);

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');
console.log('✓ dia-7 adicionado ao munique.json');
console.log(`  ${newPOIs.length} POIs: ${newPOIs.map(p => p.id).join(', ')}`);
console.log(`  ${newSegments.length} segmentos adicionados`);
console.log();
console.log('Próximos passos:');
console.log('  1. Criar diretórios de mídia: node scripts/create_rothenburg_media_dirs.cjs');
console.log('  2. Gerar áudios: python -X utf8 scripts/generate_narrations.py dia-7-pois --all-sections');
