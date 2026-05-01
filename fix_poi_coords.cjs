/**
 * Corrige coordenadas erradas em POIs de Nuremberg e Budapeste.
 * Executar: node fix_poi_coords.cjs
 */
const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, 'src', 'data', 'routes');

const fixes = [
  // ── Nuremberg ──────────────────────────────────────────────────────────────
  {
    route: 'nuremberg',
    id: 'dokumentationszentrum',
    lat: 49.4338361,
    lng: 11.1124726,
    note: 'Bayernstr. 110 — museu sobre os rallys nazistas (era 49.427, 11.1218 — ~1km deslocado)',
  },
  {
    route: 'nuremberg',
    id: 'memorial-julgamentos',
    lat: 49.4544374,
    lng: 11.0483199,
    note: 'Bärenschanzstr. 72 — Justizpalast/Memorium (era 49.4583, 11.06 — longitude truncada)',
  },
  {
    route: 'nuremberg',
    id: 'kaiserburg',
    lat: 49.4580789,
    lng: 11.0753908,
    note: 'Auf der Burg 13 — pequena correção de ~260 m no lat (era 49.4604)',
  },
  // ── Budapeste ──────────────────────────────────────────────────────────────
  {
    route: 'budapeste',
    id: 'andrassy-opera',
    lat: 47.5028701,
    lng: 19.0581577,
    note: 'Andrássy út 22 — Ópera Estatal (era 47.5009, 19.0617 — ~370 m ao sul)',
  },
  {
    route: 'budapeste',
    id: 'metro-m1-milenio',
    lat: 47.5028701,
    lng: 19.0581577,
    note: 'Mesma referência da Ópera/Andrássy (era 47.5009, 19.0617)',
  },
];

const cache = {};

for (const fix of fixes) {
  const filePath = path.join(ROUTES_DIR, `${fix.route}.json`);
  if (!cache[fix.route]) {
    cache[fix.route] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  const data = cache[fix.route];
  const poi = data.pois.find(p => p.id === fix.id);
  if (!poi) { console.warn(`⚠️  Não encontrado: ${fix.route}/${fix.id}`); continue; }

  const prev = `${poi.lat}, ${poi.lng}`;
  poi.lat = fix.lat;
  poi.lng = fix.lng;
  console.log(`✅  ${fix.route}/${fix.id}: (${prev}) → (${fix.lat}, ${fix.lng})`);
  console.log(`    ${fix.note}`);
}

// Salva os arquivos modificados
for (const [routeId, data] of Object.entries(cache)) {
  const filePath = path.join(ROUTES_DIR, `${routeId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

console.log('\n✔  Concluído.');
