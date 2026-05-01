import L from 'leaflet';
import { periodColor } from '../utils/formatters.js';

let map = null;
let userMarker = null;
let poiMarkers = [];
let routePolyline = null;
let accuracyCircle = null;
let hotelMarker = null;

const userIcon = L.divIcon({
  className: 'user-marker',
  html: '<div style="width:16px;height:16px;background:#4285f4;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function createPOIIcon(periodId, order) {
  const color = periodId === 'colonial' ? '#8b4513' :
    periodId === 'imperial' ? '#6a0dad' :
    periodId === 'belle-epoque' ? '#c0872a' :
    periodId === 'vargas' ? '#2e7d32' :
    periodId === 'moderno' ? '#1565c0' : '#1a5276';

  return L.divIcon({
    className: 'poi-marker',
    html: `<div style="width:28px;height:28px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:700">${order}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export function initMap(containerId) {
  if (map) {
    map.remove();
    map = null;
  }
  // Reset stale Leaflet layer references so they get recreated on the new map instance
  userMarker = null;
  accuracyCircle = null;
  hotelMarker = null;

  map = L.map(containerId, {
    zoomControl: false,
    attributionControl: true,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  L.control.zoom({ position: 'topleft' }).addTo(map);

  return map;
}

export function renderRoute(pois, segments, onPOIClick) {
  if (!map) return;

  // Clear existing
  poiMarkers.forEach(m => map.removeLayer(m));
  poiMarkers = [];
  if (routePolyline) {
    map.removeLayer(routePolyline);
    routePolyline = null;
  }

  // Draw polyline from segments
  const allPoints = [];
  for (const seg of segments) {
    if (seg.path) {
      allPoints.push(...seg.path);
    }
  }

  if (allPoints.length > 0) {
    routePolyline = L.polyline(allPoints, {
      color: '#1a5276',
      weight: 4,
      opacity: 0.7,
      dashArray: '8, 8',
    }).addTo(map);
  }

  // Add POI markers
  for (const poi of pois) {
    const marker = L.marker([poi.lat, poi.lng], {
      icon: createPOIIcon(poi.historicalPeriod, poi.order),
    }).addTo(map);

    marker.bindPopup(`<b>${poi.name}</b><br>${poi.significance || ''}`);

    if (onPOIClick) {
      marker.on('click', () => onPOIClick(poi));
    }

    poiMarkers.push(marker);
  }

  // Fit bounds
  if (pois.length > 0) {
    const bounds = L.latLngBounds(pois.map(p => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [30, 30] });
  }
}

export function updateUserPosition(lat, lng, accuracy) {
  if (!map) return;

  const latlng = [lat, lng];

  if (!userMarker) {
    userMarker = L.marker(latlng, { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
  } else {
    userMarker.setLatLng(latlng);
  }

  if (accuracyCircle) {
    accuracyCircle.setLatLng(latlng).setRadius(accuracy);
  } else {
    accuracyCircle = L.circle(latlng, {
      radius: accuracy,
      color: '#4285f4',
      fillColor: '#4285f4',
      fillOpacity: 0.1,
      weight: 1,
    }).addTo(map);
  }
}

export function centerOnUser(lat, lng) {
  if (map) {
    map.setView([lat, lng], 17, { animate: true });
  }
}

export function renderAccommodation(accommodation) {
  if (!map || !accommodation) return;
  if (hotelMarker) {
    map.removeLayer(hotelMarker);
    hotelMarker = null;
  }
  const icon = L.divIcon({
    className: 'hotel-marker',
    html: `<div class="hotel-marker__pin">🏨</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
  hotelMarker = L.marker([accommodation.lat, accommodation.lng], { icon, zIndexOffset: 900 })
    .addTo(map)
    .bindPopup(`<b>🏨 ${accommodation.name}</b><br><span style="font-size:0.85em;color:#555">${accommodation.address}</span>`);

  // Extend current bounds to include the hotel so it's always visible
  try {
    const currentBounds = map.getBounds();
    const hotelLatLng = L.latLng(accommodation.lat, accommodation.lng);
    if (!currentBounds.contains(hotelLatLng)) {
      map.fitBounds(currentBounds.extend(hotelLatLng), { padding: [40, 40] });
    }
  } catch (_) {}
}

export function getMap() {
  return map;
}

export function invalidateSize() {
  if (map) {
    setTimeout(() => map.invalidateSize(), 100);
  }
}
