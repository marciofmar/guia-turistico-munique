/**
 * Corrige as coordenadas das hospedagens em todos os roteiros.
 * Fonte: OpenStreetMap Nominatim (geocodificação pelos endereços exatos).
 * Executar: node fix_hotel_coords.cjs
 */
const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, 'src', 'data', 'routes');

const corrections = {
  'munique':       { lat: 48.1228, lng: 11.5650 },  // Geyerstr. 52 → ~760 m ao sul do valor anterior
  'nuremberg':     { lat: 49.4537, lng: 11.0757 },  // Augustinerhof 1 → ~668 m ao norte
  'praga':         { lat: 50.0895, lng: 14.4076 },  // Letenská 11 → ~424 m
  // cesky-krumlov: OK (~22 m de desvio, dentro do mesmo edifício)
  'budapeste':     { lat: 47.5037, lng: 19.0464 },  // Akadémia utca 15-17 → ~902 m
  'bratislava':    { lat: 48.1408, lng: 17.1069 },  // Paulinyho 14 → ~870 m
  'viena':         { lat: 48.2160, lng: 16.4052 },  // Messestraße 2 → ~764 m
  'madri':         { lat: 40.4163, lng: -3.7090 },  // Costanilla de Santiago 2 → ~548 m
};

for (const [routeId, coords] of Object.entries(corrections)) {
  const filePath = path.join(ROUTES_DIR, `${routeId}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const prev = { lat: data.accommodation.lat, lng: data.accommodation.lng };
  data.accommodation.lat = coords.lat;
  data.accommodation.lng = coords.lng;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅  ${routeId}: (${prev.lat}, ${prev.lng}) → (${coords.lat}, ${coords.lng})`);
}

console.log('\ncesky-krumlov: mantido (desvio de ~22 m — aceitável)');
