"""
Gera o áudio do mini-documentário do roteiro "urbanizacao-rio".
Voz: pt-BR-FranciscaNeural  |  Duração estimada: ~20 min
"""
import asyncio, os, sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

try:
    import edge_tts
except ImportError:
    print("Instale: pip install edge-tts")
    sys.exit(1)

VOICE = "pt-BR-FranciscaNeural"
RATE  = "-5%"
OUT   = os.path.join(os.path.dirname(__file__), "..", "public", "media",
                     "routes", "urbanizacao-rio", "documentary.mp3")

SCRIPT = """
Há uma cidade que nunca para de se revelar.

Nas pedras irregulares de suas calçadas, nas fachadas sobrepostas de seus palacetes, nas ruas que guardam o traçado sinuoso de caminhos abertos há mais de três séculos.

O Rio de Janeiro não é apenas uma cidade. É um arquivo vivo. Um palimpsesto urbano onde cada camada de tempo esconde e ao mesmo tempo revela a anterior.

Caminhar pelo Centro Histórico do Rio é fazer uma viagem que não precisa de bilhete de volta. As ruas falam. As pedras contam. E se você souber ouvir, cada esquina tem uma história que começa séculos antes de você nascer.

Este documentário é um convite. Um convite a conhecer as fases que moldaram esse espaço urbano, e a sair às ruas com olhos novos para ver uma cidade que poucos turistas enxergam de verdade.

Capítulo um. A cidade esquecida.

Antes de falarmos do Rio que existe hoje, precisamos falar do Rio que não existe mais.

No começo do século dezenove, o Rio de Janeiro era uma cidade pequena, abafada e inesperadamente importante. Fundada em 1565 pelos portugueses para proteger a Baía de Guanabara dos invasores franceses, ela cresceu de forma orgânica, sem plano, sem projeto, sem visão de longo prazo.

Suas ruas eram estreitas e tortuosas, herdadas de caminhos que seguiam o relevo natural ou os trilhos deixados por escravizados que carregavam mercadorias até o porto.

Era uma cidade de contradições. Sede do governo colonial de uma das maiores colônias do mundo, mas sem bibliotecas públicas, sem imprensa, sem universidades. Portugal, diferentemente da Espanha, proibiu sistematicamente que a colônia desenvolvesse suas próprias instituições culturais.

O Rio colonial era rico em mercadorias — açúcar, ouro, diamantes, café — e pobre em letras e artes.

Havia, claro, beleza. O escultor Mestre Valentim, filho de um português com uma mulher africana, deixou marcas sofisticadas no espaço público da cidade. Seus chafarizes e jardins provam que havia refinamento artístico mesmo numa cidade que tentava se parecer com Lisboa sem ter as condições de Lisboa.

O Chafariz do Mestre Valentim, próximo à Praça XV, é um desses raros sobreviventes. Erguido em 1789, com suas figuras mitológicas em pedra e lioz, ele abastecia a cidade e ao mesmo tempo a embelezava. Num lugar sem encanamento, sem serviços urbanos básicos, uma fonte pública era quase uma declaração de civilidade.

As igrejas eram o centro da vida urbana. Não havia praças públicas como as europeias, não havia boulevards, não havia espaços de encontro que não fossem sacros. A cidade vivia em torno de suas procissões, de suas festas religiosas, de seus rituais de fé que misturavam o catolicismo europeu, as religiões africanas e os costumes indígenas.

Nas travessas estreitas entre o porto e as igrejas, a vida urbana colonial pulsava com intensidade. O Arco do Teles e a Travessa do Comércio, um dos raros fragmentos do traçado setecentista que sobreviveram até hoje, dão uma ideia do que era caminhar pelo Rio colonial. Arcos de pedra, sombra permanente, cheiros misturados de maresia, especiarias e vida humana.

Mas esse mundo estava prestes a mudar de forma irreversível. E a mudança viria de um navio fugindo de Napoleão.

Capítulo dois. O choque de 1808.

No dia vinte e dois de janeiro de 1808, uma frota portuguesa entrou na Baía de Guanabara. A bordo: a família real portuguesa, a corte, os ministros, os funcionários, os arquivos do Estado. Cerca de quinze mil pessoas, fugindo da invasão napoleônica que havia tomado Lisboa semanas antes.

Era a primeira vez na história que um monarca europeu em exercício pisava em território colonial. E o Rio de Janeiro, praticamente da noite para o dia, se tornou a capital de um império que se estendia de Portugal ao Brasil, de Moçambique a Goa.

Para a cidade, o impacto foi imenso. Pense: de uma hora para outra, uma cidade de sessenta mil habitantes precisava abrigar uma corte acostumada ao luxo europeu. Casas foram requisitadas à força. O povo chamou a sigla P.R., de Príncipe Regente, de Ponha-se na Rua. Ruas foram alargadas, esgotos foram construídos, jardins foram plantados.

O Paço Imperial, que até então servia como sede do governo colonial, passou a ser a residência da família real. Aquelas paredes de pedra e cal, que já haviam abrigado governadores e vice-reis, agora sustentavam o peso de uma monarquia inteira em exílio.

Dom João Sexto tratou de transformar o Rio numa capital digna. Em poucos anos, fundou a Imprensa Régia, a primeira imprensa do Brasil. Criou o Jardim Botânico. Abriu os portos às nações amigas, encerrando três séculos de monopólio comercial português.

E, naquele mesmo ano de 1808, inaugurou a Biblioteca Real. O acervo que havia sido resgatado às pressas de Lisboa, embalado em caixotes que mal chegaram a tempo antes dos franceses, foi instalado numa casa colonial no centro do Rio. Esse acervo se tornaria a Biblioteca Nacional do Brasil, hoje o maior repositório bibliográfico da América Latina, com mais de dez milhões de itens.

A relação do Rio com o mundo das letras, dos livros e do conhecimento mudou radicalmente. A cidade que nunca tivera uma universidade passou a ter academias de ciências, escolas de medicina, de direito, de artes.

O Real Gabinete Português de Leitura, inaugurado décadas depois por imigrantes portugueses, seria uma expressão duradoura desse amor tardio pelos livros. Uma biblioteca de tirar o fôlego, com fachada neomanuelina em estilo gótico-português que parece ter saído de um conto de fadas lusitano. Dizem que é uma das bibliotecas mais belas do mundo. Quem entra raramente discorda.

A Missão Artística Francesa de 1816, trazida por Dom João para civilizar esteticamente a colônia, trouxe pintores, escultores, arquitetos e professores. Era uma tentativa de traduzir para o Brasil os ideais do neoclassicismo europeu, de criar uma identidade visual para um país que ainda não sabia muito bem o que era.

Dessa missão nasceu o que viria a ser o Museu Nacional de Belas Artes, hoje guardião do maior acervo de arte do país. A instituição que deu origem a ele, a Academia Imperial de Belas Artes, foi o primeiro ensino formal de artes do Brasil. Era o Rio tentando, com atraso e de forma artificial, conquistar o verniz cultural que Lisboa sempre teve.

Capítulo três. O Brasil imperial.

Em 1822, o Brasil se tornou independente. Mas o Rio continuou sendo o centro. O Império brasileiro, com sua monarquia constitucional incomum na América Latina do século dezenove, fez do Centro do Rio o palco de suas ambições.

A Igreja de Nossa Senhora da Candelária, cuja construção se arrastou por mais de cem anos, finalmente foi concluída no período imperial. Com sua cúpula imponente e sua fachada de granito e lioz inspirada no barroco português tardio, ela representa o desejo do Rio de ser levado a sério. O interior é uma explosão de mármores importados, afrescos e vitrais. Era a fé, sim, mas era também o poder.

Mas a Candelária não é apenas um monumento de glória. Em 1993, ela foi palco de uma das tragédias mais chocantes da história recente do Rio: o massacre de jovens em situação de rua que dormiam em seus degraus. A beleza e a dor convivem em seus muros como convivem em toda a história desta cidade.

O comércio florescia. O Banco do Brasil, fundado por Dom João ainda em 1808, ocupava um dos edifícios mais imponentes do centro. O que hoje abriga o Centro Cultural Banco do Brasil já foi o coração financeiro do país. Ali, decisões econômicas moviam o café que sustentava o Império, o ouro que já havia sustentado Portugal, e os títulos de uma dívida pública que crescia junto com as ambições da nação.

A Rua do Ouvidor era o coração pulsante da vida urbana carioca. Sem carros, pois era estreita demais para eles, ela era o lugar onde o Rio se reunia para falar, comprar, conspirar e ser visto. Jornais, cafés, lojas de modas importadas, livrarias. Ali se encontravam pessoas livres e escravizadas, barões do café e artistas, jornalistas e poetas, diplomatas e espiões.

A Rua do Ouvidor foi, por muitas décadas, a rua mais importante do Brasil. Abolicionistas conspiravam nela. Republicanos se articulavam nela. A imprensa que mudou o país nasceu nela.

E nesse contexto de efervescência urbana surgiu a Confeitaria Colombo. Inaugurada em 1894, com seus espelhos belgas e sua decoração art nouveau, ela era o ponto de encontro da elite carioca. Machado de Assis, o maior escritor do Brasil oitocentista, era frequentador assíduo. Poetas, políticos e escritores debatiam o destino do país entre cafés e doces portugueses.

A Colombo sobreviveu à República, sobreviveu à reforma urbana, sobreviveu a duas guerras mundiais. Ainda está lá, quase intacta, uma janela para o passado no meio do presente acelerado.

A Igreja de São Francisco de Paula, erguida no século dezoito e reformada no dezenove, é outro desses marcos que resistiram ao tempo. Seu interior reúne talhas douradas, azulejos e obras de pintores brasileiros do período colonial e imperial. Na sua nave, ecoa o som de séculos de fé e de história.

Capítulo quatro. O bota-abaixo.

No início do século vinte, o Rio tinha um problema grave. Crescera demais sem planejamento. Suas ruas estreitas e insalubres eram caldeirão de epidemias. Febre amarela. Varíola. Tuberculose. A cidade que queria ser a Paris dos trópicos era, na prática, um labirinto doentio que envergonhava a República recém-proclamada.

A solução foi radical. Quase violenta.

Entre 1902 e 1906, o prefeito Francisco Pereira Passos implementou a maior reforma urbana que o Rio já viu. Inspirado diretamente nas obras do Barão de Haussmann em Paris, que havia destruído os bairros medievais da capital francesa para criar os grandes boulevards, Passos derrubou, abriu, alargou e refez.

O povo chamou de bota-abaixo. Dezenas de cortiços foram demolidos. Comunidades inteiras foram deslocadas sem aviso ou indenização. A pobreza que habitava o centro foi empurrada para os morros e para os subúrbios. Um movimento que moldou a geografia social do Rio de forma que sentimos até hoje, mais de cem anos depois.

Mas da destruição nasceu algo grandioso. A Avenida Central, que depois seria batizada de Avenida Rio Branco em homenagem ao Barão do Rio Branco, foi rasgada no coração da cidade. Com trinta metros de largura e quase dois quilômetros de extensão, era o boulevard que o Rio sempre quis ter.

Suas margens foram rapidamente ocupadas por prédios ecléticos, palacetes neoclássicos, instituições culturais. Num período de apenas quatro anos, o Centro do Rio foi reinventado.

O Theatro Municipal foi a joia da coroa dessa reforma. Inaugurado em 1909, seu projeto era assumidamente inspirado na Ópera de Paris, a Palais Garnier, com pitadas de estilo florentino e referências ao barroco brasileiro. Com sua fachada de pedra calcária, suas colunas, suas esculturas e sua cúpula verde, ele transforma o entorno da Cinelândia num cenário de ópera a céu aberto.

Dentro, o luxo é total. O foyer com mosaicos importados da Itália. Os camarotes revestidos de veludo. O lustre central que pesa toneladas. O Theatro Municipal foi construído para dizer ao mundo: o Brasil chegou. Somos civilizados. Somos modernos. Somos capazes.

Na mesma época, a Biblioteca Nacional ganhou sua sede definitiva. O novo edifício, inaugurado em 1910, era uma declaração de intenções culturais. Com seus salões de leitura monumentais, suas colunas e seus vitrais, ela guardava e ainda guarda milhões de documentos que contam a história não apenas do Brasil, mas de todo o mundo lusófono.

O Museu Nacional de Belas Artes também recebeu sua sede própria, num palacete neoclássico que abriga até hoje a maior coleção de arte do país. Renoir, Monet, e ao lado deles os mestres brasileiros do século dezenove: Victor Meirelles, Pedro Américo. A história da arte num só endereço.

E o antigo Supremo Tribunal Federal — hoje Centro Cultural Justiça Federal — é outro monumento dessa época. Inaugurado em 1910, seu interior é um tratado de neoclassicismo jurídico: colunas, mármores, vitrais, e uma cúpula de ferro e vidro que banha o salão principal com luz dourada. Foi aqui que o Brasil decidiu seus destinos legais por décadas.

A Cinelândia, o trecho da Avenida Rio Branco em torno da Praça Floriano, se tornou o coração cultural e político da República. Nos anos 1920 e 1930, cinemas monumentais, cafés, teatros e sedes de jornais formavam um ecossistema urbano vibrante. Era ali que os cariocas iam ver filmes importados, tomar cerveja gelada, discutir política e fazer negócios. A Praça Floriano foi palco de manifestações históricas, de greves de trabalhadores, de discursos que mudaram o país.

Capítulo cinco. A cidade que ficou.

O século vinte continuou transformando o Rio. Mas o Centro Histórico resistiu. Não intacto — nada no Rio é intacto —, mas resistiu.

A Estação Central do Brasil, inaugurada em 1943 e ampliada nas décadas seguintes com a famosa torre do relógio, se tornou o símbolo da cidade moderna, populosa e frenética. Mais de meio milhão de passageiros passam por ela todo dia. Ela conecta o Rio profundo, suburbano, popular, trabalhador, com o Centro histórico e turístico.

A Estação Central não é apenas um terminal. É um lugar de despedidas e de encontros. De sonhos que chegam do interior em busca da cidade grande, e de esperanças que partem todo dia em trem. O filme de Walter Salles capturou algo verdadeiro nessa estação: ela é o coração do Rio que não aparece nos cartões-postais, mas que pulsa com mais força do que qualquer monumento.

O Paço Imperial, onde tudo começou, sobreviveu a todas as reformas. Restaurado nos anos 1980, ele hoje é um centro cultural que abriga exposições, cinema, teatro e restaurantes. É um dos poucos edifícios que conectam, de forma tangível, o Rio colonial ao Rio contemporâneo.

Naquelas paredes estão impressas as camadas de tempo que fazem do Centro Histórico um lugar único. O Rio colonial, que tentava ser Lisboa. O Rio joanino, que de repente precisou ser uma capital europeia nos trópicos. O Rio imperial, que construiu instituições e sonhou com grandeza. O Rio republicano, que se reinventou com boulevard e teatro de ópera. E o Rio de hoje, que carrega tudo isso e ainda não sabe direito o que fazer com tamanha herança.

Epílogo. O convite.

O Centro Histórico do Rio de Janeiro é uma das paisagens urbanas mais densas em significado da América Latina.

Cada rua tem múltiplas camadas. Cada prédio carrega histórias que não cabem em placas ou folhetos turísticos. Cada esquina foi palco de cenas que nenhum livro didático conta direito.

Caminhar por lá com atenção é um exercício de humildade e de maravilhamento. Você percebe que é muito pequeno diante de tanto tempo. Que as pedras debaixo dos seus pés foram assentadas por mãos que nunca poderiam imaginar o mundo que você conhece. Que os prédios que parecem apenas velhos são na verdade depósitos de drama, de poder, de arte, de injustiça e de beleza.

Este roteiro que você está prestes a fazer é uma tentativa de decifrar essas camadas. De cada ponto que você vai visitar, uma história. De cada esquina, uma perspectiva. De cada praça, um eco do passado que ressoa no presente.

O Rio tem muitas faces. Você está prestes a conhecer uma das mais fascinantes: o Rio que foi capital de um império, que se reinventou como metrópole republicana, que carrega em suas pedras e fachadas a complexa e contraditória história de um país que ainda está descobrindo quem é.

Vá. Caminhe devagar. Olhe para cima. Olhe para os detalhes. Deixe a cidade falar.

Ela tem muito a contar.
"""

async def main():
    out_dir = os.path.dirname(OUT)
    os.makedirs(out_dir, exist_ok=True)
    print(f"Gerando documentário: {os.path.basename(OUT)}", flush=True)
    print(f"Voz: {VOICE}  |  Taxa: {RATE}", flush=True)
    communicate = edge_tts.Communicate(SCRIPT.strip(), VOICE, rate=RATE)
    await communicate.save(OUT)
    size_mb = os.path.getsize(OUT) / 1024 / 1024
    print(f"OK — {size_mb:.1f} MB", flush=True)

asyncio.run(main())
