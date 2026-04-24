const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function getTodayKey() {
  return DAY_KEYS[new Date().getDay()];
}

function readInitialDayIndex() {
  const stored = localStorage.getItem('selectedDayIndex');
  if (stored === null) return 0;
  const n = parseInt(stored, 10);
  return Number.isFinite(n) && n >= 0 && n <= 5 ? n : 0;
}

const state = {
  // Legacy: dia da semana (mantido para compatibilidade com dayFilter antigo)
  selectedDay: localStorage.getItem('selectedDay') || getTodayKey(),
  // Novo: índice (0–5) do dia do roteiro selecionado
  selectedDayIndex: readInitialDayIndex(),
  activeRouteId: null,
  activeRoute: null,
  filteredPOIs: [],
  userPosition: null,
  gpsAccuracy: null,
  nearbyPOI: null,
  audioState: { playing: false, poiId: null, currentTime: 0, duration: 0 },
  currentView: 'list', // 'list' | 'map'
  mapExpanded: false,
};

const listeners = {};

export function getState() {
  return state;
}

export function setState(key, value) {
  state[key] = value;
  if (key === 'selectedDay') {
    localStorage.setItem('selectedDay', value);
  }
  if (key === 'selectedDayIndex') {
    localStorage.setItem('selectedDayIndex', String(value));
  }
  (listeners[key] || []).forEach(fn => fn(value, state));
  (listeners['*'] || []).forEach(fn => fn(key, value, state));
}

export function subscribe(key, fn) {
  if (!listeners[key]) listeners[key] = [];
  listeners[key].push(fn);
  return () => {
    listeners[key] = listeners[key].filter(f => f !== fn);
  };
}

export { DAY_KEYS };
