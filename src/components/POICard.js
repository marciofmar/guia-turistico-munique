import { el } from '../utils/dom.js';
import {
  periodColor,
  formatDuration,
  transportBadge,
  formatTransportMinutes,
} from '../utils/formatters.js';
import { navigate } from '../router.js';
import { getState } from '../state.js';

export function renderPOICard(poi, routeId) {
  const state = getState();
  const nearby = state.nearbyPOI;
  const isNearby = nearby && nearby.id === poi.id;

  const infoChildren = [
    el('div', { className: 'poi-card__name' }, poi.name),
    el('div', { className: 'poi-card__period' },
      `${poi.architecturalStyle || ''} \u00b7 ${formatDuration(poi.adjustedVisitMinutes ?? poi.estimatedVisitMinutes)}`
    ),
  ];

  if (poi.immersiveMode) {
    infoChildren.push(
      el('span', { className: 'poi-card__immersive-tag' }, '\uD83C\uDFA7 Imersivo')
    );
  }

  const card = el('div', {
    className: `poi-card ${poi.externalOnly ? 'poi-card--external' : ''} ${isNearby ? 'poi-card--nearby' : ''}`,
    onclick: () => navigate(`#/route/${routeId}/poi/${poi.id}`),
  },
    el('div', {
      className: 'poi-card__order',
      style: { background: periodColor(poi.historicalPeriod) }
    }, `${poi.order}`),

    el('div', { className: 'poi-card__info' }, ...infoChildren),

    poi.statusType === 'open'
      ? el('span', { className: 'poi-card__badge poi-card__badge--open' }, poi.statusLabel)
      : poi.statusType === 'external'
        ? el('span', { className: 'poi-card__badge poi-card__badge--external' }, poi.statusLabel)
        : null
  );

  return card;
}

export function renderWalkSegment(segment) {
  const transport = segment.transport || 'walking';
  const badge = transportBadge(transport);
  const timeLabel = formatTransportMinutes(segment.walkingMinutes);

  return el('div', { className: 'walk-segment' },
    el('div', { className: 'walk-segment__line' }),
    el('span', {
      className: `transport-badge transport-badge--${transport}`,
    },
      el('span', {}, badge.emoji),
      el('span', {}, timeLabel)
    ),
    segment.streetNotes
      ? el('span', { style: { fontSize: '0.8rem', color: 'var(--color-text-muted)' } },
          ` \u00b7 ${segment.streetNotes}`)
      : null
  );
}
