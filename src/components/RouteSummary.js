import { el } from '../utils/dom.js';
import { formatDuration, formatDistance } from '../utils/formatters.js';

export function renderRouteSummary(container, filteredRoute) {
  const summary = el('div', { className: 'route-summary' },
    el('div', { className: 'route-summary__item' },
      el('span', { className: 'route-summary__value' }, formatDuration(filteredRoute.totalMinutes)),
      el('span', { className: 'route-summary__label' }, 'Duração')
    ),
    el('div', { className: 'route-summary__item' },
      el('span', { className: 'route-summary__value' }, formatDistance(filteredRoute.totalDistanceKm)),
      el('span', { className: 'route-summary__label' }, 'Distância')
    ),
    el('div', { className: 'route-summary__item' },
      el('span', { className: 'route-summary__value' }, `${filteredRoute.poiCount}`),
      el('span', { className: 'route-summary__label' }, 'Pontos')
    ),
    el('div', { className: 'route-summary__item' },
      el('span', { className: 'route-summary__value' }, `${filteredRoute.openCount}`),
      el('span', { className: 'route-summary__label' }, 'Abertos')
    )
  );

  container.appendChild(summary);

  if (!filteredRoute.isWithinLimit) {
    const warning = el('div', { className: 'route-summary__warning' },
      `Este roteiro pode ultrapassar 5h30 neste dia (${formatDuration(filteredRoute.totalMinutes)}). Considere pular alguns pontos de vista externa.`
    );
    container.appendChild(warning);
  }

  return summary;
}
