import { haversineMeters } from '../utils/distance.js';
import { setState, getState, subscribe } from '../state.js';

let watchId = null;
const insideRadius = new Set();
const proximityCallbacks = [];

export function onProximity(callback) {
  proximityCallbacks.push(callback);
}

export function startWatching() {
  if (!navigator.geolocation) {
    console.warn('Geolocation not supported');
    return;
  }

  if (watchId !== null) return;

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      setState('userPosition', { lat: latitude, lng: longitude });
      setState('gpsAccuracy', accuracy);

      if (accuracy <= 150) {
        checkProximity(latitude, longitude);
      }
    },
    (error) => {
      console.warn('Geolocation error:', error.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 15000,
    }
  );
}

export function stopWatching() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}

function checkProximity(userLat, userLng) {
  const state = getState();
  const pois = state.filteredPOIs || [];

  let closestPOI = null;
  let closestDist = Infinity;

  for (const poi of pois) {
    const dist = haversineMeters(userLat, userLng, poi.lat, poi.lng);
    const radius = poi.proximityRadiusMeters || 80;

    if (dist < closestDist) {
      closestDist = dist;
      closestPOI = poi;
    }

    const wasInside = insideRadius.has(poi.id);
    const isInside = dist <= radius;

    if (isInside && !wasInside) {
      insideRadius.add(poi.id);
      proximityCallbacks.forEach(cb => cb('enter', poi, dist));
    } else if (!isInside && wasInside) {
      insideRadius.delete(poi.id);
      proximityCallbacks.forEach(cb => cb('leave', poi, dist));
    }
  }

  setState('nearbyPOI', closestPOI ? { ...closestPOI, distance: closestDist } : null);
}

export function requestPermission() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => resolve(true),
      () => resolve(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}
