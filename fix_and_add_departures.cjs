/**
 * 1. Corrige os dados de fromAccommodation/toAccommodation do roteiro de Munique
 *    (dias 1-7 estavam com destinos trocados / inexistentes).
 * 2. Adiciona `departureTime` a cada modo de transporte em fromAccommodation
 *    para todos os 9 roteiros: departureTime = startTime - duration.
 *
 * Executar: node fix_and_add_departures.cjs
 */
const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, 'src', 'data', 'routes');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseDurationMinutes(str) {
  if (!str) return 0;
  const match = str.match(/(\d+)\s*min/);
  return match ? parseInt(match[1], 10) : 0;
}

function subtractMinutes(timeStr, minutes) {
  if (!timeStr || !minutes) return null;
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m - minutes;
  if (total < 0) return null;
  const rh = Math.floor(total / 60);
  const rm = total % 60;
  return `${String(rh).padStart(2, '0')}:${String(rm).padStart(2, '0')}`;
}

// ─── Dados corrigidos para MUNIQUE ──────────────────────────────────────────

const MUNIQUE_TRANSFERS = {

  // dia-1 "Vida Local" — firstPOI: Eisbach (Englischer Garten sul)
  'dia-1': {
    fromAccommodation: {
      walking: {
        duration: '25 min',
        route: 'Geyerstr. → Müllerstr. → Isartor → Maximilianstr. → Eisbach',
        highlight: 'Margem do Isar pela manhã — tranquila, com vista para as pontes e o parque',
      },
      transit: {
        line: 'U6 Goetheplatz → Universität (3 paradas) + 7 min a pé',
        duration: '14 min',
        cost: '€3,70',
      },
      taxi: { duration: '10 min', cost: '€9–13' },
      recommended: 'walking',
      recommendedReason: '25 min a pé pela margem do Isar é o início perfeito para um dia de vida local — você chega no Eisbach já no ritmo da cidade.',
    },
    toAccommodation: {
      walking: {
        duration: '25 min',
        route: 'Eisbach → Maximilianstr. → Isartor → Müllerstr. → Geyerstr.',
      },
      transit: {
        line: 'U6 Universität → Goetheplatz',
        duration: '14 min',
        cost: '€3,70',
      },
      taxi: { duration: '10 min', cost: '€9–13' },
      recommended: 'walking',
      recommendedReason: 'Retorno agradável pelo Isar ao fim do dia.',
    },
  },

  // dia-2 "Centro Histórico" — firstPOI: Marienplatz
  'dia-2': {
    fromAccommodation: {
      walking: {
        duration: '22 min',
        route: 'Geyerstr. → Sendlinger Str. → Asamkirche → Marienplatz',
        highlight: 'Asamkirche — joia barroca bávara, imperdível logo de manhã',
      },
      transit: {
        line: 'U3/U6 Goetheplatz → Marienplatz (2 paradas)',
        duration: '6 min',
        cost: '€3,70',
      },
      taxi: { duration: '7 min', cost: '€8–12' },
      recommended: 'walking',
      recommendedReason: '22 min pela Sendlinger Str. com parada obrigatória na Asamkirche é o começo ideal — você chega ao Marienplatz já imerso na atmosfera histórica da cidade.',
    },
    toAccommodation: {
      walking: {
        duration: '22 min',
        route: 'Marienplatz → Sendlinger Str. → Asamkirche → Geyerstr.',
        highlight: 'Asamkirche com outro ângulo ao entardecer',
      },
      transit: {
        line: 'U3/U6 Marienplatz → Goetheplatz',
        duration: '6 min',
        cost: '€3,70',
      },
      taxi: { duration: '7 min', cost: '€8–12' },
      recommended: 'walking',
      recommendedReason: 'Retorno agradável pela Sendlinger Str. depois de um longo dia a pé.',
    },
  },

  // dia-3 "Dachau e Alte Pinakothek" — firstPOI: Memorial de Dachau (17 km NW de Munique)
  'dia-3': {
    fromAccommodation: {
      transit: {
        line: 'U3/U6 Goetheplatz → Hauptbahnhof + S2 HBF → Dachau + Bus 726 → Gedenkstätte',
        duration: '42 min',
        cost: '€9,20 (Tageskarte Gesamtnetz)',
      },
      taxi: { duration: '35 min', cost: '€35–45' },
      recommended: 'transit',
      recommendedReason: 'Dachau fica a 17 km de Munique — S2 + ônibus em 42 min por €9,20 (Tageskarte que cobre o retorno e toda a tarde na cidade).',
    },
    toAccommodation: {
      transit: {
        line: 'Bus 726 → Dachau Bahnhof + S2 → München HBF + U3/U6 → Goetheplatz',
        duration: '42 min',
        cost: '€0 (já incluso na Tageskarte)',
      },
      taxi: { duration: '35 min', cost: '€35–45' },
      recommended: 'transit',
      recommendedReason: 'Tageskarte cobre o retorno sem custo adicional.',
    },
  },

  // dia-4 "Neuschwanstein" — firstPOI: Castelo de Neuschwanstein (Füssen, 125 km)
  // startTime 08:00 = horário de partida do trem em München HBF
  'dia-4': {
    fromAccommodation: {
      transit: {
        line: 'U3/U6 Goetheplatz → Hauptbahnhof (10 min) · RegionalBahn HBF → Füssen (2h05) · Ônibus 73/78 Füssen → Hohenschwangau (10 min)',
        duration: '10 min',
        cost: '€29 Bayernticket (cobre todo o dia)',
      },
      recommended: 'transit',
      recommendedReason: 'Neuschwanstein fica a 125 km — o trem das 08:00 em HBF chega a Füssen às ~10:10. Chegue ao hotel às 07:50 para pegar o metrô até HBF.',
    },
    toAccommodation: {
      transit: {
        line: 'Ônibus 73/78 → Füssen + RegionalBahn → München HBF + U3/U6 → Goetheplatz',
        duration: '10 min',
        cost: '€0 (incluso no Bayernticket)',
      },
      recommended: 'transit',
      recommendedReason: 'Bayernticket cobre o retorno. Último trem direto Füssen→HBF sai por volta das 20:00.',
    },
  },

  // dia-5 "Zugspitze" — firstPOI: Garmisch-Partenkirchen (90 km)
  // startTime 07:30 = horário de partida do trem em München HBF
  'dia-5': {
    fromAccommodation: {
      transit: {
        line: 'U3/U6 Goetheplatz → Hauptbahnhof (10 min) · Bayerische Zugspitzbahn HBF → Garmisch (1h28)',
        duration: '10 min',
        cost: '€29 Bayernticket',
      },
      recommended: 'transit',
      recommendedReason: 'Trem direto das 07:30 em HBF chega a Garmisch às ~09:00 — fundamental chegar cedo para aproveitar a Zugspitze com céu limpo.',
    },
    toAccommodation: {
      transit: {
        line: 'Zugspitzbahn Garmisch → München HBF + U3/U6 → Goetheplatz',
        duration: '10 min',
        cost: '€0 (incluso no Bayernticket)',
      },
      recommended: 'transit',
      recommendedReason: 'Bayernticket cobre o retorno completo.',
    },
  },

  // dia-6 "Salzburgo" — firstPOI: Mirabelplatz (Salzburgo, Áustria, 145 km)
  // startTime 08:30 = horário de partida do trem em München HBF
  'dia-6': {
    fromAccommodation: {
      transit: {
        line: 'U3/U6 Goetheplatz → Hauptbahnhof (10 min) · EC/IC HBF → Salzburg Hbf (1h30)',
        duration: '10 min',
        cost: '€29 Bayernticket + €4,30 supl. Áustria (até Freilassing a fronteira)',
      },
      recommended: 'transit',
      recommendedReason: 'EC das 08:30 chega a Salzburg às ~10:00 — ideal para começar os jardins do Mirabell com o abre do castelo.',
    },
    toAccommodation: {
      transit: {
        line: 'EC/IC Salzburg → München HBF + U3/U6 → Goetheplatz',
        duration: '10 min',
        cost: '€0 (Bayernticket + supl. já pago)',
      },
      recommended: 'transit',
      recommendedReason: 'Último EC conveniente Salzburg→HBF sai por volta das 19:00.',
    },
  },

  // dia-7 "Rothenburg ob der Tauber" — firstPOI: Marktplatz de Rothenburg (180 km)
  // startTime 08:00 = horário de partida do trem em München HBF
  'dia-7': {
    fromAccommodation: {
      transit: {
        line: 'U3/U6 Goetheplatz → Hauptbahnhof (10 min) · Regional HBF → Treuchtlingen → Steinach b.Rot. → Rothenburg (2h30)',
        duration: '10 min',
        cost: '€29 Bayernticket',
      },
      recommended: 'transit',
      recommendedReason: 'Rothenburg fica a 180 km — o trem das 08:00 em HBF chega às ~10:30, antes do rush turístico de meio-dia.',
    },
    toAccommodation: {
      transit: {
        line: 'Rothenburg → Steinach → Treuchtlingen → München HBF + U3/U6 → Goetheplatz',
        duration: '10 min',
        cost: '€0 (incluso no Bayernticket)',
      },
      recommended: 'transit',
      recommendedReason: 'Último trem conveniente Rothenburg→HBF sai por volta das 18:30.',
    },
  },
};

// ─── Injetar horários de saída ────────────────────────────────────────────────

function addDepartureTimes(days, startTimeByDayId) {
  for (const day of days) {
    const startTime = startTimeByDayId[day.id] ?? day.startTime;
    if (!startTime || !day.fromAccommodation) continue;

    const from = day.fromAccommodation;
    for (const mode of ['walking', 'transit', 'taxi']) {
      const modeData = from[mode];
      if (!modeData || !modeData.duration) continue;
      const durationMin = parseDurationMinutes(modeData.duration);
      const depTime = subtractMinutes(startTime, durationMin);
      if (depTime) modeData.departureTime = depTime;
    }
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

const routes = [
  'munique', 'nuremberg', 'praga', 'cesky-krumlov',
  'budapeste', 'bratislava', 'viena', 'madri', 'teste-local',
];

for (const routeId of routes) {
  const filePath = path.join(ROUTES_DIR, `${routeId}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Não encontrado: ${routeId}.json`);
    continue;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // 1. Corrige dados de Munique
  if (routeId === 'munique') {
    for (const day of data.days) {
      const corrected = MUNIQUE_TRANSFERS[day.id];
      if (corrected) {
        day.fromAccommodation = corrected.fromAccommodation;
        day.toAccommodation = corrected.toAccommodation;
      }
    }
    console.log(`🔧  munique — dados de transfer corrigidos`);
  }

  // 2. Adiciona departureTime a todos os roteiros
  addDepartureTimes(data.days, {});

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅  ${routeId} — departureTime adicionado`);
}

console.log('\n✔  Concluído.');
