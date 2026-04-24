const DAY_LABELS = {
  sun: 'Dom', mon: 'Seg', tue: 'Ter', wed: 'Qua', thu: 'Qui', fri: 'Sex', sat: 'Sáb'
};

const DAY_FULL_LABELS = {
  sun: 'Domingo', mon: 'Segunda', tue: 'Terça', wed: 'Quarta',
  thu: 'Quinta', fri: 'Sexta', sat: 'Sábado'
};

export function dayLabel(key) {
  return DAY_LABELS[key] || key;
}

export function dayFullLabel(key) {
  return DAY_FULL_LABELS[key] || key;
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${m.toString().padStart(2, '0')}`;
}

export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function periodColor(periodId) {
  const colors = {
    // Bavarian periods (current app)
    medieval: 'var(--color-medieval)',
    baroque: 'var(--color-baroque)',
    royal: 'var(--color-royal)',
    modern: 'var(--color-modern)',
    alpine: 'var(--color-alpine)',
    // Legacy Rio periods (compat fallback)
    colonial: 'var(--color-medieval)',
    imperial: 'var(--color-royal)',
    'belle-epoque': 'var(--color-baroque)',
    vargas: 'var(--color-modern)',
    moderno: 'var(--color-alpine)',
  };
  return colors[periodId] || 'var(--color-primary)';
}

export function dayTypeBadge(dayType) {
  const map = {
    urban: { emoji: '🏙️', label: 'Urbano', color: 'var(--color-day-urban)' },
    museum: { emoji: '🏛️', label: 'Museu', color: 'var(--color-day-museum)' },
    excursion: { emoji: '🚂', label: 'Excursão', color: 'var(--color-day-excursion)' },
  };
  return map[dayType] || { emoji: '📍', label: dayType, color: 'var(--color-primary)' };
}

export function transportBadge(transport) {
  const map = {
    walking: { emoji: '🚶', label: 'a pé', color: 'var(--color-transport-walk)' },
    subway: { emoji: '🚇', label: 'metrô', color: 'var(--color-transport-subway)' },
    train: { emoji: '🚂', label: 'trem', color: 'var(--color-transport-train)' },
    'cable-car': { emoji: '🚠', label: 'teleférico', color: 'var(--color-transport-cable)' },
    funicular: { emoji: '🚡', label: 'funicular', color: 'var(--color-transport-funicular)' },
  };
  return map[transport] || { emoji: '🚶', label: 'caminhada', color: 'var(--color-transport-walk)' };
}

export function formatTransportMinutes(minutes) {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m === 0 ? `${h}h` : `${h}h${m.toString().padStart(2, '0')}`;
}

const WEEKDAY_ABBREV = {
  sunday: 'Dom', monday: 'Seg', tuesday: 'Ter', wednesday: 'Qua',
  thursday: 'Qui', friday: 'Sex', saturday: 'Sáb',
};

export function weekdayAbbrev(weekday) {
  return WEEKDAY_ABBREV[weekday] || weekday?.slice(0, 3);
}

export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}`;
}
