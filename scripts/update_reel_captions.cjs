/**
 * Reescreve os segmentos de todos os reels com legendas que incluem
 * direções espaciais explícitas ("Observe no topo", "À esquerda:", etc.)
 * para que o usuário saiba exatamente para onde olhar na imagem.
 *
 * Mantém os campos duration e focusZone (para compatibilidade futura),
 * mas a imagem fica sempre inteira — a atenção é guiada pelo texto.
 */
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../src/data/routes/munique.json');
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

// ─────────────────────────────────────────────────────────────────
// Novos segmentos: texto guia o olho, imagem permanece inteira
// ─────────────────────────────────────────────────────────────────

const NEW_SEGMENTS = {

  // ── Dia 2 · Marienplatz ──────────────────────────────────────
  'glockenspiel': [
    { text: 'O Glockenspiel no centro da torre. 43 sinos distribuídos em três níveis.', duration: 5, focusZone: 'full' },
    { text: 'No segundo nível (meio da torre): as 32 figuras mecânicas douradas e coloridas.', duration: 5, focusZone: 'full' },
    { text: 'À esquerda, nível do meio: cavaleiros em armadura encenam o torneio do casamento do Duque Guilherme V, de 1568.', duration: 6, focusZone: 'full' },
    { text: 'À direita, nível inferior: os Schäfflertänzer — toneleiros dançando para celebrar o fim da grande peste de 1517.', duration: 6, focusZone: 'full' },
    { text: 'No topo da torre: o galo mecânico que canta três vezes ao final de cada apresentação.', duration: 5, focusZone: 'full' },
    { text: 'O edifício foi construído em 1867. Mas foi projetado para parecer medieval. A ficção funciona.', duration: 5, focusZone: 'full' },
  ],

  'mariensaeule': [
    { text: 'A Mariensäule — a Coluna de Maria — erguida em 1638 no centro da Marienplatz.', duration: 5, focusZone: 'full' },
    { text: 'No alto da coluna: a Virgem Dourada com o Menino Jesus, voltada para o leste.', duration: 5, focusZone: 'full' },
    { text: 'Na base da coluna, quatro anjos de bronze combatem as calamidades. Observe o da esquerda: está derrotando a guerra.', duration: 6, focusZone: 'full' },
    { text: 'O anjo da direita vence a fome. Os dois da frente derrotam a heresia e a peste.', duration: 5, focusZone: 'full' },
    { text: 'No século XVII, esta era a lista literal das ameaças cotidianas dos muniquenses.', duration: 5, focusZone: 'full' },
    { text: 'A coluna inteira é um documento teológico-político em pedra e bronze. Leia como um texto.', duration: 5, focusZone: 'full' },
  ],

  // ── Dia 2 · Peterskirche ─────────────────────────────────────
  'munditia-reliquary': [
    { text: 'O relicário de Santa Munditia no altar lateral esquerdo da Peterskirche.', duration: 4, focusZone: 'full' },
    { text: 'Observe o esqueleto ornamentado: cada osso visível foi coberto com joias e tecidos pelos fiéis.', duration: 6, focusZone: 'full' },
    { text: 'O rosto foi coberto com máscara de cera dourada. As mãos enluvadas seguram flores e objetos sagrados.', duration: 6, focusZone: 'full' },
    { text: 'À volta do corpo: o manto de veludo vermelho com bordados em fio de ouro. Tudo foi colocado peça por peça por devotos anônimos.', duration: 7, focusZone: 'full' },
    { text: 'Ninguém sabe quem ela realmente foi. O nome "Munditia" foi atribuído depois da exumação, em 1675.', duration: 6, focusZone: 'full' },
    { text: 'Está aqui há 350 anos. Olhando os visitantes que olham de volta para ela.', duration: 5, focusZone: 'full' },
  ],

  'tower-alps-view': [
    { text: '306 degraus acima e a cidade se abre. Olhe em volta sem pressa.', duration: 4, focusZone: 'full' },
    { text: 'Direto à frente (norte): o Englischer Garten começa ali, a maior área verde urbana da Europa.', duration: 6, focusZone: 'full' },
    { text: 'À esquerda (leste): as duas torres bulbosas da Frauenkirche dominam o skyline. Nenhum prédio pode ultrapassá-las — por lei.', duration: 7, focusZone: 'full' },
    { text: 'À direita (oeste): o Neues Rathaus e a torre do Glockenspiel, daqui visto de cima.', duration: 5, focusZone: 'full' },
    { text: 'Ao sul: em dias claros, no horizonte, a silhueta branca dos Alpes bávaros.', duration: 5, focusZone: 'full' },
    { text: 'Esta escala humana foi votada pelos próprios muniquenses. Resistência à verticalidade como escolha coletiva.', duration: 6, focusZone: 'full' },
  ],

  // ── Dia 2 · Viktualienmarkt ──────────────────────────────────
  'maibaum': [
    { text: 'O Maibaum — o mastro de maio — no centro do Viktualienmarkt. Observe os painéis coloridos da base ao topo.', duration: 6, focusZone: 'full' },
    { text: 'Na base do mastro: os brasões das guildas medievais. Cada um representa um ofício que alimentou Munique por séculos.', duration: 6, focusZone: 'full' },
    { text: 'Do primeiro ao terceiro nível, da base: os padeiros, os açougueiros e os pescadores.', duration: 5, focusZone: 'full' },
    { text: 'No quarto e quinto nível: os toneleiros (Schäffler) e os ferreiros. Cada figura pintada a mão.', duration: 6, focusZone: 'full' },
    { text: 'No topo: a coroa de galhos de abeto verde, símbolo de vida e abundância. Renovada toda primavera.', duration: 5, focusZone: 'full' },
    { text: 'O mastro é uma lista de quem fez Munique funcionar por 900 anos. Uma hierarquia de trabalho em madeira pintada.', duration: 6, focusZone: 'full' },
  ],

  // ── Dia 2 · Odeonsplatz ─────────────────────────────────────
  'viscardigasse': [
    { text: 'A Viscardigasse — a viela entre a Theatinerstraße e a Residenzstraße que desvia da Feldherrnhalle.', duration: 6, focusZone: 'full' },
    { text: 'Observe o piso de paralelepípedos: o centro do corredor está polido pelo uso de décadas. Marcas de solas.', duration: 6, focusZone: 'full' },
    { text: 'Durante o nazismo, passar pela Feldherrnhalle exigia parar e saudar a guarda de honra com o braço erguido.', duration: 6, focusZone: 'full' },
    { text: 'Esta viela era o desvio silencioso. Entrar por aqui significava: recuso a performance.', duration: 5, focusZone: 'full' },
    { text: 'Os muniquenses chamavam de "Drückebergergasse" — rua dos covardões. Os que usavam chamavam de resistência.', duration: 6, focusZone: 'full' },
    { text: 'À saída direita: a Residenzstraße. À saída esquerda: a Theatinerstraße. A Feldherrnhalle fica entre as duas — e fora do caminho.', duration: 7, focusZone: 'full' },
  ],

  // ── Dia 3 · Alte Pinakothek ──────────────────────────────────
  'durer-autorretrato': [
    { text: 'O Autorretrato de Albrecht Dürer, pintado em 1500. Visão completa da composição.', duration: 4, focusZone: 'full' },
    { text: 'Observe diretamente o rosto no centro: postura frontal, olhar fixo. Era a postura reservada exclusivamente a retratos de Cristo.', duration: 7, focusZone: 'full' },
    { text: 'No canto superior esquerdo: a data "1500". No canto superior direito: o monograma "AD". Dürer os posicionou como declarações de eternidade.', duration: 7, focusZone: 'full' },
    { text: 'Desça o olhar para o centro: o casaco de pele de marta-zibelina. Cada fio pintado individualmente. Argumento filosófico, não virtuosismo.', duration: 7, focusZone: 'full' },
    { text: 'Observe a mão direita, visível abaixo do casaco: posição de bênção — o gesto de Cristo dando graças.', duration: 6, focusZone: 'full' },
    { text: 'Composição inteira: um artesão de 28 anos que se representou como Deus. O maior ato de ambição artística do Renascimento alemão.', duration: 6, focusZone: 'full' },
  ],

  'leonardo-madonna': [
    { text: 'Madonna com o Cravo. Leonardo da Vinci, Florença, c.1475. Composição completa.', duration: 4, focusZone: 'full' },
    { text: 'No centro da composição, na altura das mãos: o cravo vermelho. O Menino o segura — símbolo da Paixão que ainda não aconteceu.', duration: 7, focusZone: 'full' },
    { text: 'Observe as mãos da Madonna, ao centro: a mão esquerda apoia o Menino; a direita apresenta o cravo. Proteção e entrega simultâneas.', duration: 7, focusZone: 'full' },
    { text: 'Suba o olhar para o fundo: a janela dupla com arco. A paisagem ao fundo dissolve-se em névoa sem contorno definido.', duration: 7, focusZone: 'full' },
    { text: 'No horizonte ao fundo, onde o terreno encontra o céu: nenhuma linha definida. Leonardo inventava o sfumato aqui, em tempo real.', duration: 7, focusZone: 'full' },
    { text: 'Percorra o quadro inteiro: da figura em primeiro plano à paisagem ao fundo. Trinta anos antes da Mona Lisa. O método estava sendo criado aqui.', duration: 7, focusZone: 'full' },
  ],

  'rubens-queda': [
    { text: 'A Queda dos Condenados. Peter Paul Rubens, c.1620. 288 cm de altura. Observe a obra inteira.', duration: 5, focusZone: 'full' },
    { text: 'Comece no topo do quadro: anjos com espadas e chamas expulsam os condenados do céu. É o ponto de partida da composição.', duration: 7, focusZone: 'full' },
    { text: 'Siga com o olhar descendo pelo centro: mais de cem corpos em espiral descendente. Anatomia de Michelangelo, movimento que é de Rubens.', duration: 7, focusZone: 'full' },
    { text: 'No fundo escuro, parte inferior do quadro: os corpos chegam ao caos. O olho tende a fugir para baixo — mas não consegue.', duration: 6, focusZone: 'full' },
    { text: 'Suba pela borda esquerda da composição: o olho encontra uma figura que sobe, contrariando a queda. Rubens criou uma saída que prende o olhar para sempre.', duration: 8, focusZone: 'full' },
    { text: 'Visão geral novamente: Eugène Delacroix copiou este quadro inteiro, de cabo a rabo, como exercício de aprendizado de composição e drama visual.', duration: 7, focusZone: 'full' },
  ],

  'rafael-canigiani': [
    { text: 'Sagrada Família Canigiani. Raffaello Sanzio, c.1506. Raffaello tinha 21 anos. Visão completa.', duration: 5, focusZone: 'full' },
    { text: 'Observe a composição inteira: trace com os olhos um triângulo imaginário. São José no topo, Maria à esquerda, João Batista à direita em baixo.', duration: 7, focusZone: 'full' },
    { text: 'No alto, à esquerda: São José sentado ancora a composição. É o ponto mais alto do triângulo e o mais tranquilo da cena.', duration: 6, focusZone: 'full' },
    { text: 'No centro da composição: Jesus e João Batista se encontram. Nunca se encontraram historicamente — Raffaello imaginou esse momento.', duration: 7, focusZone: 'full' },
    { text: 'Percorra a composição novamente: cada figura está no cruzamento de uma proporção calculada. A sensação de repouso não é acidental — é geometria pura.', duration: 7, focusZone: 'full' },
  ],

  // ── Dia 4 · Neuschwanstein ───────────────────────────────────
  'thronsaal': [
    { text: 'O Thronsaal — o Salão do Trono. O espaço mais monumental do castelo. Observe a composição inteira.', duration: 5, focusZone: 'full' },
    { text: 'Ao fundo, no centro: o arco de mosaico dourado onde o trono deveria estar. Nunca foi instalado. Ludwig morreu seis semanas antes da inauguração.', duration: 8, focusZone: 'full' },
    { text: 'No piso: mosaico de dois milhões de pedras representando animais e a criação. Observe os pavões e leões nos cantos.', duration: 6, focusZone: 'full' },
    { text: 'No teto azul e dourado: imitação dos mosaicos das igrejas de Ravenna, Itália. À esquerda e à direita: colunas de pórfiro vermelho imitando Bizâncio.', duration: 7, focusZone: 'full' },
    { text: 'Nas paredes, entre as colunas: pinturas de santos e reis cristãos europeus. Cada um carregado de simbolismo deliberado.', duration: 6, focusZone: 'full' },
    { text: 'Um salão construído para um trono que nunca existiu. Para um rei que nunca sentou aqui. Tudo imitado — como o próprio castelo.', duration: 7, focusZone: 'full' },
  ],

  'saengersaal': [
    { text: 'O Sängersaal — o Salão dos Cantores. O espaço mais elaborado de Neuschwanstein. Visão completa.', duration: 5, focusZone: 'full' },
    { text: 'No teto: a abóbada dourada pintada com estrelas e cenas medievais. Observe as vigas esculpidas nos cantos superiores.', duration: 6, focusZone: 'full' },
    { text: 'Nas paredes, à esquerda: pinturas narrando o ciclo de Parsifal, a ópera de Wagner sobre a busca do Santo Graal.', duration: 6, focusZone: 'full' },
    { text: 'Nas paredes, à direita: mais cenas de Parsifal — o cavaleiro na floresta encantada, o castelo do Graal ao fundo.', duration: 6, focusZone: 'full' },
    { text: 'No centro do salão: o espaço onde o palco estaria. Ludwig construiu tudo isso para um único espectador: ele mesmo.', duration: 7, focusZone: 'full' },
    { text: 'Nunca convidou ninguém. Nunca permitiu uma apresentação real aqui. Uma ópera que nunca foi cantada neste salão.', duration: 6, focusZone: 'full' },
  ],

  // ── Dia 5 · Zugspitze ────────────────────────────────────────
  'gipfelkreuz': [
    { text: 'A cume da Zugspitze, 2.962 metros. O ponto mais alto da Alemanha. Observe o panorama completo.', duration: 5, focusZone: 'full' },
    { text: 'No centro: a cruz de ferro dourada instalada em 1851 — a primeira no cume da Alemanha. Ao redor: placas deixadas por alpinistas de todo o mundo.', duration: 7, focusZone: 'full' },
    { text: 'Direto à frente (sul): as Dolomitas italianas, em dias claros visíveis a 200 km de distância.', duration: 5, focusZone: 'full' },
    { text: 'À esquerda (leste): o Tirol austríaco. A fronteira entre Alemanha e Áustria passa exatamente pelo cume, embaixo de seus pés.', duration: 6, focusZone: 'full' },
    { text: 'À direita (oeste): Suíça e Liechtenstein no horizonte. Em dias excepcionais, são quatro países visíveis deste ponto.', duration: 6, focusZone: 'full' },
    { text: 'As fronteiras humanas não alcançam as montanhas. Esta perspectiva não tem equivalente em nenhuma capital europeia.', duration: 6, focusZone: 'full' },
  ],

  'gletscher': [
    { text: 'O Zugspitzplatt — o platô glacial da Zugspitze. Observe a extensão do campo de gelo.', duration: 5, focusZone: 'full' },
    { text: 'A superfície irregular de gelo cinza-azulado ao centro: este é o glaciar Nördlicher Schneeferner. Existe há milênios.', duration: 7, focusZone: 'full' },
    { text: 'As faixas escuras no gelo: morenas — depósitos de rochas e detritos carregados pelo glaciar em seu lento movimento.', duration: 6, focusZone: 'full' },
    { text: 'Observe os limites do gelo nas bordas da imagem. Compare com as fotografias históricas nas placas ao redor. A diferença é vertiginosa.', duration: 7, focusZone: 'full' },
    { text: 'Em 1900, o glaciar cobria o dobro da área visível. Desde 1820, perdeu 80% do volume. Em 2030, pode ter desaparecido.', duration: 7, focusZone: 'full' },
  ],

  // ── Dia 6 · Salzburgo ────────────────────────────────────────
  'taufbecken-mozart': [
    { text: 'A pia batismal da Catedral de Salzburgo. É aqui que Mozart foi batizado, em 28 de janeiro de 1756.', duration: 6, focusZone: 'full' },
    { text: 'Observe a borda superior: bronze ornamentado com figuras de anjos e santos em baixo-relevo, trabalhado no século XVII.', duration: 6, focusZone: 'full' },
    { text: 'No centro da pia: a abertura por onde a água benta era derramada sobre o recém-nascido. Um dia após Mozart nascer, foi trazido aqui.', duration: 7, focusZone: 'full' },
    { text: 'À volta da pia: as quatro pernas de ferro forjado. Observe as proporções — é uma peça pequena para um batismo tão grande.', duration: 6, focusZone: 'full' },
    { text: 'Vinte anos depois do batismo, Mozart fugiu de Salzburgo jurando nunca mais voltar. Nunca voltou.', duration: 5, focusZone: 'full' },
    { text: 'A pia ficou. Olhando gerações de visitantes que vêm aqui por causa de um compositor que odiava a cidade onde foi batizado.', duration: 6, focusZone: 'full' },
  ],

  'salzburg-panorama': [
    { text: 'Panorama de Salzburgo visto da Festung Hohensalzburg. Observe a cidade inteira antes de entrar nos detalhes.', duration: 5, focusZone: 'full' },
    { text: 'No centro: o rio Salzach dividindo a cidade. À esquerda do rio (margem esquerda): a Altstadt — a cidade velha medieval e barroca.', duration: 7, focusZone: 'full' },
    { text: 'À direita do rio (margem direita): a cidade nova, do século XIX em diante. As torres barrocas da Altstadt dominam o skyline da esquerda.', duration: 6, focusZone: 'full' },
    { text: 'Ao fundo norte: as montanhas do Untersberg fecham o horizonte como uma parede. Salzburgo não tem como crescer para norte.', duration: 6, focusZone: 'full' },
    { text: 'Ao sul e sudeste: o Tennengebirge e o Hagengebirge. A cidade está literalmente emoldurada por montanhas em três direções.', duration: 6, focusZone: 'full' },
    { text: 'Um anfiteatro natural. Salzburgo não cresceu para fora — cresceu para dentro e para cima. A geografia é o destino desta cidade.', duration: 6, focusZone: 'full' },
  ],

};

// ─────────────────────────────────────────────────────────────────
// Aplicar ao JSON
// ─────────────────────────────────────────────────────────────────
let updated = 0;
data.pois.forEach(poi => {
  const sas = poi.media?.subAttractions || [];
  sas.forEach(sa => {
    if (sa.reel && NEW_SEGMENTS[sa.id]) {
      sa.reel.segments = NEW_SEGMENTS[sa.id];
      updated++;
      console.log(`✓ ${poi.id} > ${sa.id} (${NEW_SEGMENTS[sa.id].length} segs)`);
    }
  });
});

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');
console.log(`\n✓ ${updated} reels atualizados`);
