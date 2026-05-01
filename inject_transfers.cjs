/**
 * Injeta fromAccommodation / toAccommodation em cada dia de todos os roteiros.
 * Executar: node inject_transfers.cjs
 */
const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, 'src', 'data', 'routes');

// ─── Dados de transferência por roteiro / dia ────────────────────────────────

const transfers = {

  // ══════════════════════════════════════════════════════════════════
  // MUNIQUE — hotel: Geyerstr. 52 (U3/U6 Goetheplatz, 10 min centro)
  // ══════════════════════════════════════════════════════════════════
  'munique': {
    'dia-1': {
      fromAccommodation: {
        walking: {
          duration: '22 min',
          route: 'Geyerstr. → Sendlinger Str. → Asamkirche → Marienplatz',
          highlight: 'Asamkirche — joia do barroco bávaro, imperdível logo de manhã',
        },
        transit: {
          line: 'U3/U6 Goetheplatz → Sendlinger Tor (1 parada)',
          duration: '8 min',
          cost: '€3,70',
        },
        taxi: { duration: '7 min', cost: '€8–12' },
        recommended: 'walking',
        recommendedReason: '22 min pela Sendlinger Str. com parada obrigatória na Asamkirche é o início ideal — você chega ao Marienplatz já imerso na atmosfera histórica da cidade.',
      },
      toAccommodation: {
        walking: {
          duration: '22 min',
          route: 'Marienplatz → Sendlinger Str. → Asamkirche → Geyerstr.',
          highlight: 'Ótimo para apreciar as lojas e a Asamkirche com outro ângulo ao entardecer',
        },
        transit: {
          line: 'U3/U6 Sendlinger Tor → Goetheplatz',
          duration: '8 min',
          cost: '€3,70',
        },
        taxi: { duration: '7 min', cost: '€8–12' },
        recommended: 'walking',
        recommendedReason: 'Retorno agradável pela Sendlinger Str. depois de um longo dia a pé.',
      },
    },
    'dia-2': {
      fromAccommodation: {
        walking: {
          duration: '20 min',
          route: 'Geyerstr. → Müllerstr. → Isar → Maximilianstr.',
          highlight: 'Passeio à beira do Isar de manhã cedo — calmo e revigorante',
        },
        transit: {
          line: 'U3/U6 Goetheplatz → Isartor (U4/U5, 2 paradas)',
          duration: '10 min',
          cost: '€3,70',
        },
        taxi: { duration: '7 min', cost: '€8–12' },
        recommended: 'walking',
        recommendedReason: 'A caminhada pela margem do Isar é um dos pontos altos de Munique e combina perfeitamente com um dia de museus próximos ao rio.',
      },
      toAccommodation: {
        walking: {
          duration: '20 min',
          route: 'Maximilianstr. → Isartorpl. → Müllerstr. → Geyerstr.',
        },
        transit: {
          line: 'U4/U5 Isartor → Sendlinger Tor → U3/U6 Goetheplatz',
          duration: '10 min',
          cost: '€3,70',
        },
        taxi: { duration: '8 min', cost: '€8–12' },
        recommended: 'walking',
        recommendedReason: 'Retorno direto após dia intenso de museus — 20 min tranquilos pelo centro.',
      },
    },
    'dia-3': {
      fromAccommodation: {
        walking: {
          duration: '28 min',
          route: 'Geyerstr. → Sendlinger Str. → Marienplatz → Residenzstr. → Residenz',
          highlight: 'Atravessar o coração histórico a pé para chegar à Residência Real',
        },
        transit: {
          line: 'U3/U6 Goetheplatz → Odeonsplatz',
          duration: '10 min',
          cost: '€3,70',
        },
        taxi: { duration: '8 min', cost: '€9–13' },
        recommended: 'walking',
        recommendedReason: 'Os 28 min a pé pelo Altstadt são o melhor aquecimento para um dia dedicado à realeza bávara.',
      },
      toAccommodation: {
        walking: {
          duration: '28 min',
          route: 'Residenzstr. → Marienplatz → Sendlinger Str. → Geyerstr.',
        },
        transit: {
          line: 'U3/U6 Odeonsplatz → Goetheplatz',
          duration: '10 min',
          cost: '€3,70',
        },
        taxi: { duration: '8 min', cost: '€9–13' },
        recommended: 'transit',
        recommendedReason: 'Após dia longo na Residenz e Englischer Garten, o metrô é o retorno mais confortável.',
      },
    },
    'dia-4': {
      fromAccommodation: {
        transit: {
          line: 'U3/U6 Goetheplatz → Marienplatz → S-Bahn S3/S8 → Nymphenburg (Bus 51)',
          duration: '30 min',
          cost: '€3,70',
        },
        taxi: { duration: '18 min', cost: '€18–25' },
        recommended: 'transit',
        recommendedReason: 'Schloss Nymphenburg fica a 7 km a oeste — metrô + ônibus é a opção mais prática e econômica.',
      },
      toAccommodation: {
        transit: {
          line: 'Bus 51 → Romanplatz → Tram 17 → Goetheplatz',
          duration: '28 min',
          cost: '€3,70',
        },
        taxi: { duration: '18 min', cost: '€18–25' },
        recommended: 'transit',
        recommendedReason: 'Retorno mais cômodo após dia intenso no palácio e jardins.',
      },
    },
    'dia-5': {
      fromAccommodation: {
        transit: {
          line: 'U3/U6 Goetheplatz → Marienplatz → U3 Olympiazentrum',
          duration: '22 min',
          cost: '€3,70',
        },
        taxi: { duration: '15 min', cost: '€15–22' },
        recommended: 'transit',
        recommendedReason: 'O Olympiapark fica a 6 km ao norte — o U3 direto leva em 22 min.',
      },
      toAccommodation: {
        transit: {
          line: 'U3 Olympiazentrum → Goetheplatz',
          duration: '22 min',
          cost: '€3,70',
        },
        taxi: { duration: '15 min', cost: '€15–22' },
        recommended: 'transit',
        recommendedReason: 'Metrô direto de volta após dia de parque.',
      },
    },
    'dia-6': {
      fromAccommodation: {
        transit: {
          line: 'U3/U6 Goetheplatz → Hauptbahnhof → U2 Theresienwiese',
          duration: '12 min',
          cost: '€3,70',
        },
        walking: {
          duration: '25 min',
          route: 'Geyerstr. → Landwehrstr. → Bayerstr. → Theresienwiese',
          highlight: 'Caminhada pelo bairro de Schwabing com vista progressiva da Bavaria',
        },
        taxi: { duration: '9 min', cost: '€9–13' },
        recommended: 'walking',
        recommendedReason: 'A Theresienwiese fica a apenas 25 min a pé — a caminhada pelo entorno já cria o clima para o dia.',
      },
      toAccommodation: {
        walking: {
          duration: '25 min',
          route: 'Theresienwiese → Bayerstr. → Landwehrstr. → Geyerstr.',
        },
        transit: {
          line: 'U2 Theresienwiese → Hauptbahnhof → U3/U6 Goetheplatz',
          duration: '12 min',
          cost: '€3,70',
        },
        taxi: { duration: '9 min', cost: '€9–13' },
        recommended: 'walking',
        recommendedReason: 'Retorno curto a pé — menos de 2 km.',
      },
    },
    'dia-7': {
      fromAccommodation: {
        transit: {
          line: 'U3/U6 Goetheplatz → Marienplatz → U6 Klinikum Großhadern',
          duration: '18 min',
          cost: '€3,70',
        },
        taxi: { duration: '12 min', cost: '€12–18' },
        recommended: 'transit',
        recommendedReason: 'Dia no Deutsches Museum (Museumsinsel) — metrô é o mais rápido.',
      },
      toAccommodation: {
        transit: {
          line: 'U4/U5 Isartor → Sendlinger Tor → U3/U6 Goetheplatz',
          duration: '12 min',
          cost: '€3,70',
        },
        taxi: { duration: '8 min', cost: '€9–12' },
        recommended: 'transit',
        recommendedReason: 'Retorno rápido de metrô após dia de museu.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // NUREMBERG — hotel: Karl August, Augustinerhof 1 (centro, a pé do castelo)
  // ══════════════════════════════════════════════════════════════════
  'nuremberg': {
    'dia-1': {
      fromAccommodation: {
        walking: {
          duration: '8 min',
          route: 'Augustinerhof → Burgstr. → Kaiserstallung → Kaiserburg',
          highlight: 'Subida histórica pela Burgstraße com vista para o Altstadt',
        },
        recommended: 'walking',
        recommendedReason: 'Hotel fica no coração do Altstadt — a Kaiserburg está a apenas 8 min subindo a Burgstraße.',
      },
      toAccommodation: {
        walking: {
          duration: '8 min',
          route: 'Burgstr. → Augustinerhof',
        },
        recommended: 'walking',
        recommendedReason: 'Retorno de 8 min descendo a colina do castelo.',
      },
    },
    'dia-2': {
      fromAccommodation: {
        transit: {
          line: 'U2 Lorenzkirche → Doku-Zentrum (Stadtpark, ~18 min)',
          duration: '18 min',
          cost: '€3,00',
        },
        taxi: { duration: '10 min', cost: '€10–14' },
        walking: {
          duration: '42 min',
          route: 'Augustinerhof → Frauentorgraben → Luitpoldhain → Doku-Zentrum',
          walkingNote: '3,5 km — recomendável apenas se quiser aproveitar o parque pela manhã',
        },
        recommended: 'transit',
        recommendedReason: 'O Dokumentationszentrum fica a 3,5 km (42 min a pé). O U2 leva em 18 min por €3,00 — a escolha mais prática.',
      },
      toAccommodation: {
        transit: {
          line: 'U2 Doku-Zentrum → Lorenzkirche',
          duration: '18 min',
          cost: '€3,00',
        },
        taxi: { duration: '10 min', cost: '€10–14' },
        recommended: 'transit',
        recommendedReason: 'Retorno de metrô após dia intenso no complexo do Rallye.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // PRAGA — hotel: Royal Palace, Letenská 11 (Malá Strana, perto da Ponte Carlos)
  // ══════════════════════════════════════════════════════════════════
  'praga': {
    'dia-1': {
      fromAccommodation: {
        walking: {
          duration: '12 min',
          route: 'Letenská → Mostecká → Ponte Carlos → Staroměstské nám.',
          highlight: 'A Ponte Carlos de manhã cedo, com poucas pessoas e luz dourada',
        },
        recommended: 'walking',
        recommendedReason: 'A Ponte Carlos a poucos metros do hotel é um privilégio — atravessá-la pela manhã é o começo perfeito para um dia no Staré Město.',
      },
      toAccommodation: {
        walking: {
          duration: '12 min',
          route: 'Staroměstské nám. → Ponte Carlos → Mostecká → Letenská',
          highlight: 'Ponte Carlos ao anoitecer — um dos cenários mais bonitos de Praga',
        },
        recommended: 'walking',
        recommendedReason: 'Retorno pela Ponte Carlos ao entardecer fecha o dia com chave de ouro.',
      },
    },
    'dia-2': {
      fromAccommodation: {
        walking: {
          duration: '15 min',
          route: 'Letenská → Nerudova → Hradčany → Castelo de Praga',
          highlight: 'Nerudova — rua íngreme com casas barrocas e detalhes medievais únicos',
        },
        recommended: 'walking',
        recommendedReason: 'A subida pela Nerudova até o Castelo é parte do programa — a vista de cima recompensa cada degrau.',
      },
      toAccommodation: {
        walking: {
          duration: '15 min',
          route: 'Hradčany → Nerudova → Letenská',
        },
        recommended: 'walking',
        recommendedReason: 'Descida agradável da colina do castelo de volta ao hotel.',
      },
    },
    'dia-3': {
      fromAccommodation: {
        transit: {
          line: 'Tram 17 → Albertov + caminhada 8 min até Vyšehrad',
          duration: '22 min',
          cost: 'CZK 30 (~€1,20)',
        },
        walking: {
          duration: '35 min',
          route: 'Letenská → Smetanovo nábřeží → Rašínovo nábřeží → Vyšehrad',
          highlight: 'Passeio à beira do Vltava com vista para as pontes históricas',
        },
        taxi: { duration: '12 min', cost: '€6–9' },
        recommended: 'walking',
        recommendedReason: 'A caminhada de 35 min pela margem do Vltava até Vyšehrad é um dos percursos mais bonitos de Praga — imperdível.',
      },
      toAccommodation: {
        transit: {
          line: 'Tram 17 Albertov → Malostranské nám.',
          duration: '22 min',
          cost: 'CZK 30 (~€1,20)',
        },
        walking: {
          duration: '35 min',
          route: 'Vyšehrad → Rašínovo nábřeží → Smetanovo → Letenská',
        },
        taxi: { duration: '12 min', cost: '€6–9' },
        recommended: 'transit',
        recommendedReason: 'Depois de Vyšehrad, o bonde de volta é o retorno mais confortável.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ČESKÝ KRUMLOV — hotel: Krumlovská Pohádka, Siroka 74 (dentro do centro histórico)
  // ══════════════════════════════════════════════════════════════════
  'cesky-krumlov': {
    'dia-1': {
      fromAccommodation: {
        walking: {
          duration: '6 min',
          route: 'Siroka → Latran → Castelo de Český Krumlov',
          highlight: 'O castelo fica visível desde o hotel — atravessar a praça medieval é o caminho natural',
        },
        recommended: 'walking',
        recommendedReason: 'Cidade compacta, tudo a pé. O castelo está a 6 min subindo a Latrán.',
      },
      toAccommodation: {
        walking: {
          duration: '6 min',
          route: 'Castelo → Latran → Siroka',
        },
        recommended: 'walking',
        recommendedReason: 'Tudo em Český Krumlov está no raio de 10 min a pé.',
      },
    },
    'dia-2': {
      fromAccommodation: {
        walking: {
          duration: '8 min',
          route: 'Siroka → Horní → Náměstí Svornosti (praça principal)',
          highlight: 'Náměstí Svornosti — praça renascentista com casas coloridas',
        },
        recommended: 'walking',
        recommendedReason: 'Toda a cidade é percorrível a pé em minutos.',
      },
      toAccommodation: {
        walking: {
          duration: '8 min',
          route: 'Náměstí Svornosti → Horní → Siroka',
        },
        recommended: 'walking',
        recommendedReason: 'Retorno curto pela praça central.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // BUDAPESTE — hotel: Aurea Ana Palace, Akadémia utca 15-17 (Pest, perto do Parlamento)
  // ══════════════════════════════════════════════════════════════════
  'budapeste': {
    'dia-1': {
      fromAccommodation: {
        walking: {
          duration: '18 min',
          route: 'Akadémia utca → Széchenyi rakpart → Ponte das Correntes → Várnegyed',
          highlight: 'A Ponte das Correntes de manhã cedo, com o Castelo ao fundo — cartão-postal de Budapeste',
        },
        transit: {
          line: 'Metro M2 Kossuth tér → Déli pályaudvar + caminhada 10 min',
          duration: '18 min',
          cost: '490 HUF (~€1,20)',
        },
        taxi: { duration: '10 min', cost: '€8–13' },
        recommended: 'walking',
        recommendedReason: 'A caminhada pela margem do Danúbio até a Ponte das Correntes é uma das experiências mais icônicas de Budapeste — o início perfeito para o dia no Várnegyed.',
      },
      toAccommodation: {
        walking: {
          duration: '18 min',
          route: 'Ponte das Correntes → Széchenyi rakpart → Akadémia utca',
          highlight: 'Panorama do Castelo ao entardecer com o Danúbio dourado',
        },
        transit: {
          line: 'M2 Déli → Kossuth tér',
          duration: '18 min',
          cost: '490 HUF (~€1,20)',
        },
        taxi: { duration: '10 min', cost: '€8–13' },
        recommended: 'walking',
        recommendedReason: 'A Ponte das Correntes ao pôr do sol com vista para Buda é imperdível no retorno.',
      },
    },
    'dia-2': {
      fromAccommodation: {
        walking: {
          duration: '5 min',
          route: 'Akadémia utca → Kossuth Lajos tér → Parlamento',
          highlight: 'O Parlamento fica logo na esquina — uma das mais belas obras neo-góticas do mundo',
        },
        recommended: 'walking',
        recommendedReason: 'O Parlamento está a apenas 5 min a pé — desfrutar da fachada ao longo do caminho é parte do programa.',
      },
      toAccommodation: {
        walking: {
          duration: '5 min',
          route: 'Parlamento → Kossuth tér → Akadémia utca',
        },
        recommended: 'walking',
        recommendedReason: 'Retorno de 5 min — o Parlamento iluminado à noite é um bônus.',
      },
    },
    'dia-3': {
      fromAccommodation: {
        transit: {
          line: 'Tram 2 Széchenyi István tér → Jászai Mari tér (margem do Danúbio)',
          duration: '12 min',
          cost: '490 HUF (~€1,20)',
        },
        walking: {
          duration: '22 min',
          route: 'Akadémia utca → Margit híd → Margit-sziget',
          highlight: 'Ponte Margit com vista panorâmica para a Ilha Margarida e o Danúbio',
        },
        taxi: { duration: '8 min', cost: '€6–10' },
        recommended: 'transit',
        recommendedReason: 'O Tram 2 percorre a margem do Danúbio com vista constante para Buda — ele mesmo já é um passeio turístico.',
      },
      toAccommodation: {
        transit: {
          line: 'Tram 2 Jászai Mari tér → Széchenyi István tér',
          duration: '12 min',
          cost: '490 HUF (~€1,20)',
        },
        walking: {
          duration: '22 min',
          route: 'Margit-sziget → Margit híd → Akadémia utca',
        },
        taxi: { duration: '8 min', cost: '€6–10' },
        recommended: 'transit',
        recommendedReason: 'Retorno pelo Tram 2 à beira do Danúbio encerra o dia lindamente.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // BRATISLAVA — hotel: BlueBell B&B, Paulinyho 14 (Staré Mesto, centro histórico)
  // ══════════════════════════════════════════════════════════════════
  'bratislava': {
    'dia-1': {
      fromAccommodation: {
        walking: {
          duration: '7 min',
          route: 'Paulinyho → Hviezdoslavovo nám. → Staroměstská → Castelo de Bratislava',
          highlight: 'Praça Hviezdoslav ao amanhecer — espaço nobre da cidade velha',
        },
        recommended: 'walking',
        recommendedReason: 'Hotel no coração do Staré Mesto — o castelo está a 7 min a pé subindo a colina.',
      },
      toAccommodation: {
        walking: {
          duration: '7 min',
          route: 'Castelo → Staroměstská → Paulinyho',
        },
        recommended: 'walking',
        recommendedReason: 'Retorno curto descendo a colina do castelo.',
      },
    },
    'dia-2': {
      fromAccommodation: {
        walking: {
          duration: '5 min',
          route: 'Paulinyho → Klobučnícka → Hlavné nám. (praça principal)',
          highlight: 'Hlavné námestie — praça barroca com a Fontana Rolandova',
        },
        recommended: 'walking',
        recommendedReason: 'A praça principal fica a 5 min — Bratislava é perfeitamente compacta.',
      },
      toAccommodation: {
        walking: {
          duration: '5 min',
          route: 'Hlavné nám. → Paulinyho',
        },
        recommended: 'walking',
        recommendedReason: 'Retorno de 5 min pelo centro histórico.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // VIENA — hotel: Spark by Hilton, Messestraße 2 (perto do Prater, ~5-7 km do centro)
  // NOTA: hotel fica longe do centro histórico — TODOS os dias requerem transporte
  // ══════════════════════════════════════════════════════════════════
  'viena': {
    'dia-1': {
      fromAccommodation: {
        transit: {
          line: 'U2 Messe-Prater → Karlsplatz (6 paradas, ~14 min)',
          duration: '20 min',
          cost: '€2,40',
        },
        taxi: { duration: '15 min', cost: '€14–20' },
        walking: {
          duration: '70 min',
          route: 'Messestraße → Prater → Ringstraße → Karlsplatz',
          walkingNote: 'Cerca de 5,7 km — não recomendável para início de dia; reserve energia para os museus',
        },
        recommended: 'transit',
        recommendedReason: 'Hotel está a ~5,7 km do centro histórico. O U2 leva direto até Karlsplatz em 20 min por €2,40 — confortável e rápido.',
      },
      toAccommodation: {
        transit: {
          line: 'U2 Karlsplatz → Messe-Prater',
          duration: '20 min',
          cost: '€2,40',
        },
        taxi: { duration: '15 min', cost: '€14–20' },
        recommended: 'transit',
        recommendedReason: 'Metrô direto de volta após dia intenso no Ring.',
      },
    },
    'dia-2': {
      fromAccommodation: {
        transit: {
          line: 'U2 Messe-Prater → Schottenring → U4 Schönbrunn (20 min)',
          duration: '25 min',
          cost: '€2,40',
        },
        taxi: { duration: '20 min', cost: '€18–26' },
        recommended: 'transit',
        recommendedReason: 'Schönbrunn fica a oeste — metrô via U2+U4 em 25 min, sem trancos.',
      },
      toAccommodation: {
        transit: {
          line: 'U4 Schönbrunn → Schottenring → U2 Messe-Prater',
          duration: '25 min',
          cost: '€2,40',
        },
        taxi: { duration: '20 min', cost: '€18–26' },
        recommended: 'transit',
        recommendedReason: 'Retorno de metrô direto após Schönbrunn e Naschmarkt.',
      },
    },
    'dia-3': {
      fromAccommodation: {
        walking: {
          duration: '12 min',
          route: 'Messestraße → Praterstern → Hauptallee do Prater',
          highlight: 'A Hauptallee do Prater de manhã cedo — 4 km de castanheiros centenários',
        },
        transit: {
          line: 'U2 Messe-Prater → Praterstern (1 parada)',
          duration: '5 min',
          cost: '€2,40',
        },
        recommended: 'walking',
        recommendedReason: 'O Prater é literalmente ao lado do hotel — a única vez que vale sair a pé! Aproveite a Hauptallee de manhã.',
      },
      toAccommodation: {
        walking: {
          duration: '12 min',
          route: 'Prater → Praterstern → Messestraße',
          highlight: 'Retorno curto pelo parque com a Roda Gigante ao fundo',
        },
        recommended: 'walking',
        recommendedReason: 'Único dia em que o retorno a pé faz sentido — Prater está a 12 min do hotel.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // MADRI — hotel: Hostal Met, Costanilla de Santiago 2 (centro, 5 min do Sol)
  // ══════════════════════════════════════════════════════════════════
  'madri': {
    'dia-1': {
      fromAccommodation: {
        walking: {
          duration: '18 min',
          route: 'Costanilla de Santiago → Mayor → Carrera de San Jerónimo → Paseo del Prado',
          highlight: 'Carrera de San Jerónimo — a rota real histórica que liga o Congresso ao Prado',
        },
        transit: {
          line: 'Metro L1 Sol → Atocha (3 paradas)',
          duration: '8 min',
          cost: '€1,50',
        },
        taxi: { duration: '7 min', cost: '€6–9' },
        recommended: 'walking',
        recommendedReason: '18 min pela Carrera de San Jerónimo é o começo clássico — você passa pelo Congresso e chega ao Prado pelo caminho histórico que reis e nobres percorriam.',
      },
      toAccommodation: {
        walking: {
          duration: '18 min',
          route: 'Prado → Carrera de San Jerónimo → Mayor → Costanilla de Santiago',
        },
        transit: {
          line: 'Metro L1 Atocha → Sol',
          duration: '8 min',
          cost: '€1,50',
        },
        taxi: { duration: '7 min', cost: '€6–9' },
        recommended: 'walking',
        recommendedReason: 'A caminhada de volta ao entardecer pelo centro histórico é muito agradável.',
      },
    },
    'dia-2': {
      fromAccommodation: {
        walking: {
          duration: '5 min',
          route: 'Costanilla de Santiago → Puerta del Sol → Plaza Mayor',
          highlight: 'Puerta del Sol de manhã — o km 0 de todas as estradas espanholas',
        },
        recommended: 'walking',
        recommendedReason: 'Sol e Plaza Mayor estão a 5 min a pé do hotel — impossível não ir a pé.',
      },
      toAccommodation: {
        walking: {
          duration: '5 min',
          route: 'Plaza Mayor → Sol → Costanilla de Santiago',
        },
        recommended: 'walking',
        recommendedReason: 'Retorno de 5 min pelo centro da cidade.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // TESTE LOCAL — hospedagem: Rua Agrolândia 100, Freguesia
  // ══════════════════════════════════════════════════════════════════
  'teste-local': {
    'teste-dia-1': {
      fromAccommodation: {
        walking: {
          duration: '8 min',
          route: 'Rua Agrolândia → Rua Araguaia → Armazém Urbano',
          highlight: 'Rota de teste — verificar vibração e alerta GPS ao chegar',
        },
        recommended: 'walking',
        recommendedReason: 'Ponto de teste a menos de 600 m — ideal para verificar o funcionamento do GPS.',
      },
      toAccommodation: {
        walking: {
          duration: '8 min',
          route: 'Hortifruti → Estrada dos Três Rios → Rua Agrolândia',
        },
        recommended: 'walking',
        recommendedReason: 'Retorno curto após o circuito de testes.',
      },
    },
  },
};

// ─── Injeção nos arquivos JSON ───────────────────────────────────────────────

let totalDays = 0;
let updatedDays = 0;

for (const [routeId, dayMap] of Object.entries(transfers)) {
  const filePath = path.join(ROUTES_DIR, `${routeId}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Arquivo não encontrado: ${filePath}`);
    continue;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const day of data.days) {
    totalDays++;
    const dayTransfers = dayMap[day.id];
    if (!dayTransfers) {
      console.warn(`  ⚠️  Sem dados de transfer para dia ${day.id} (roteiro ${routeId})`);
      continue;
    }
    day.fromAccommodation = dayTransfers.fromAccommodation;
    day.toAccommodation = dayTransfers.toAccommodation;
    updatedDays++;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅  ${routeId} — ${data.days.length} dia(s) atualizado(s)`);
}

console.log(`\n📊  Total: ${updatedDays}/${totalDays} dias atualizados.`);
