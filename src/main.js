import 'leaflet/dist/leaflet.css';
import { addRoute, initRouter, navigate } from './router.js';
import { getState, setState, subscribe } from './state.js';
import { getAllRoutes, getRoute } from './data/routes/index.js';
import { filterRouteByDayIndex } from './services/dayFilter.js';
import { startWatching, onProximity } from './services/geolocation.js';
import { initMap, renderRoute, updateUserPosition } from './services/map.js';
import { initAudioPlayer, playAudio } from './components/AudioPlayer.js';
import { initProximityAlert, showProximityAlert } from './components/ProximityAlert.js';
import { renderHeader, renderBottomNav } from './components/App.js';
import { renderDaySelector } from './components/DaySelector.js';
import { renderRouteSummary } from './components/RouteSummary.js';
import { renderPOICard, renderWalkSegment } from './components/POICard.js';
import { renderPOIDetail } from './components/POIDetail.js';
import {
  dayTypeBadge,
  weekdayAbbrev,
  formatDate,
} from './utils/formatters.js';
import { el, clearElement } from './utils/dom.js';

const MUNIQUE_ID = 'munique-2026';

// ── Helpers ──────────────────────────────────────────────────────────────────

function getPrimaryRoute() {
  const all = getAllRoutes();
  return getRoute(MUNIQUE_ID) || all[0] || null;
}

function parseDayFromQuery(hash) {
  const qIdx = (hash || '').indexOf('?');
  if (qIdx < 0) return null;
  const params = new URLSearchParams(hash.slice(qIdx + 1));
  const d = parseInt(params.get('day'), 10);
  return Number.isFinite(d) && d >= 0 && d <= 5 ? d : null;
}

function renderLogisticsCard(day) {
  const lg = day.logistics;
  if (!lg) return null;

  return el('div', { className: 'logistics-card' },
    el('div', { className: 'logistics-card__header' }, '\uD83D\uDE82 Excursão do dia'),
    el('div', { className: 'logistics-card__route' },
      `${lg.departureStation || 'München Hbf'} \u2192 ${lg.destination || ''}`
    ),
    el('div', { className: 'logistics-card__meta' },
      `~${lg.trainDuration || ''} de ${lg.transport === 'train' ? 'trem' : 'transporte'}`
      + (lg.trainLine ? ` \u00b7 ${lg.trainLine}` : '')
      + (lg.returnBy ? ` \u00b7 Volta até ${lg.returnBy}` : '')
    ),
    lg.notes
      ? el('div', { className: 'logistics-card__notes' }, `\u26A0\uFE0F ${lg.notes}`)
      : null,
    lg.bookingUrl
      ? el('a', {
          className: 'logistics-card__btn',
          href: lg.bookingUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
        }, 'Comprar passagens \u2192')
      : null
  );
}

function renderDayHeader(day) {
  const badge = dayTypeBadge(day.dayType);

  return el('div', { className: 'day-header' },
    el('div', { className: 'day-header__title-row' },
      el('span', { style: { fontSize: '1.6rem' } }, day.coverEmoji || badge.emoji),
      el('h2', { className: 'day-header__title' }, day.title),
      el('span', {
        className: `day-type-badge day-type-badge--${day.dayType}`,
      }, badge.emoji, badge.label)
    ),
    day.subtitle
      ? el('p', { className: 'day-header__subtitle' }, day.subtitle)
      : null,
    day.intro
      ? el('p', { className: 'day-header__intro' }, day.intro)
      : null,
    el('div', { className: 'day-header__meta' },
      el('span', {}, `\uD83D\uDCC5 ${formatDate(day.date)} \u00b7 ${weekdayAbbrev(day.weekday)}`),
      day.startTime
        ? el('span', {}, `\u23F0 A partir de ${day.startTime}`)
        : null
    )
  );
}

// ── Home page ─────────────────────────────────────────────────────────────────
addRoute('/', (container) => {
  clearElement(container);
  const route = getPrimaryRoute();

  renderHeader(container, { title: 'Munique & Arredores' });

  if (!route) {
    container.appendChild(el('div', { className: 'main-content', style: { padding: 'var(--space-lg)' } },
      el('p', {}, 'Nenhum roteiro disponível.')
    ));
    renderBottomNav(container, 'route');
    return;
  }

  const main = el('div', { className: 'main-content home' });

  // Hero
  main.appendChild(el('div', { className: 'home__hero' },
    el('h2', { className: 'home__hero-title' }, route.title || 'Munique & Arredores'),
    el('p', { className: 'home__hero-subtitle' },
      route.subtitle || '6 dias \u00b7 Baviera, Alpes e Salzburgo'),
    route.tripDates
      ? el('p', { className: 'home__hero-dates' },
          `${formatDate(route.tripDates.start)} \u2013 ${formatDate(route.tripDates.end)} \u00b7 2026`)
      : null
  ));

  // Grid de dias
  const grid = el('div', { className: 'home__days-grid' });

  for (let i = 0; i < (route.days || []).length; i++) {
    const day = route.days[i];
    const badge = dayTypeBadge(day.dayType);
    const poiCount = (day.poiIds || []).length;

    const card = el('div', {
      className: `day-card day-card--${day.dayType}`,
      onclick: () => {
        setState('selectedDayIndex', i);
        navigate(`#/route/${route.id}?day=${i}`);
      },
      role: 'button',
      tabIndex: 0,
    },
      el('div', { className: 'day-card__header' },
        el('span', { className: 'day-card__number' },
          `DIA ${day.order} \u00b7 ${formatDate(day.date)}`),
        el('span', { className: 'day-card__emoji' }, day.coverEmoji || badge.emoji)
      ),
      el('h3', { className: 'day-card__title' }, day.title),
      day.subtitle
        ? el('p', { className: 'day-card__subtitle' }, day.subtitle)
        : null,
      el('div', { className: 'day-card__footer' },
        el('span', {
          className: `day-type-badge day-type-badge--${day.dayType}`,
        }, badge.emoji, badge.label),
        el('span', { className: 'day-card__pois-count' },
          `${poiCount} parada${poiCount === 1 ? '' : 's'}`)
      )
    );
    grid.appendChild(card);
  }

  main.appendChild(grid);
  container.appendChild(main);
  renderBottomNav(container, 'route');
});

// ── Route view (list) ─────────────────────────────────────────────────────────
addRoute('/route/:id', (container, { id }) => {
  clearElement(container);
  const route = getRoute(id);
  if (!route) { navigate('#/'); return; }

  setState('activeRouteId', id);
  setState('activeRoute', route);

  // Day from query string (?day=N)
  const dayFromQuery = parseDayFromQuery(window.location.hash);
  if (dayFromQuery !== null) {
    setState('selectedDayIndex', dayFromQuery);
  }

  renderHeader(container, { title: route.title, showBack: true, backHash: '#/' });

  const main = el('div', { className: 'main-content' });
  container.appendChild(main);

  function renderContent() {
    clearElement(main);
    const state = getState();
    const filtered = filterRouteByDayIndex(route, state.selectedDayIndex);
    setState('filteredPOIs', filtered.pois);

    renderDaySelector(main, route, (newIndex) => {
      // Ao trocar o dia, atualiza a URL (sem recarregar)
      history.replaceState(null, '', `#/route/${id}?day=${newIndex}`);
    });

    if (!filtered.day) {
      main.appendChild(el('p', { style: { padding: 'var(--space-md)' } }, 'Dia não encontrado.'));
      return;
    }

    // Day header
    main.appendChild(renderDayHeader(filtered.day));

    // Logistics card (apenas excursões)
    if (filtered.day.dayType === 'excursion' && filtered.day.logistics) {
      const logCard = renderLogisticsCard(filtered.day);
      if (logCard) main.appendChild(logCard);
    }

    // Route summary
    renderRouteSummary(main, filtered);

    // View toggle
    const toggle = el('div', { className: 'view-toggle' },
      el('button', {
        className: 'view-toggle__btn view-toggle__btn--active',
        onclick: () => {},
      }, 'Lista'),
      el('button', {
        className: 'view-toggle__btn',
        onclick: () => navigate(`#/route/${id}/map?day=${state.selectedDayIndex}`),
      }, 'Mapa')
    );
    main.appendChild(toggle);

    // GPS apenas em dias urbanos
    if (filtered.day.dayType === 'urban' && filtered.pois.length) {
      const startBtn = el('button', {
        className: 'start-route-btn',
        onclick: () => {
          startWatching();
          const firstPOI = filtered.pois[0];
          if (firstPOI) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${firstPOI.lat},${firstPOI.lng}&travelmode=walking`;
            window.open(url, '_blank');
          }
        },
      }, '\uD83D\uDEB6 Iniciar caminhada');
      main.appendChild(startBtn);
    }

    // POI list
    const list = el('div', { className: 'poi-list' });
    for (let i = 0; i < filtered.pois.length; i++) {
      const poi = filtered.pois[i];
      list.appendChild(renderPOICard(poi, id));

      if (i < filtered.segments.length) {
        list.appendChild(renderWalkSegment(filtered.segments[i]));
      }
    }
    main.appendChild(list);
  }

  renderContent();

  const unsub = subscribe('selectedDayIndex', () => renderContent());
  renderBottomNav(container, 'route');

  return () => unsub();
});

// ── Route map view ────────────────────────────────────────────────────────────
addRoute('/route/:id/map', (container, { id }) => {
  clearElement(container);
  const route = getRoute(id);
  if (!route) { navigate('#/'); return; }

  setState('activeRouteId', id);

  const dayFromQuery = parseDayFromQuery(window.location.hash);
  if (dayFromQuery !== null) {
    setState('selectedDayIndex', dayFromQuery);
  }

  renderHeader(container, {
    title: route.title,
    showBack: true,
    backHash: `#/route/${id}?day=${getState().selectedDayIndex}`,
  });

  const main = el('div', { className: 'main-content' });
  container.appendChild(main);

  const filtered = filterRouteByDayIndex(route, getState().selectedDayIndex);
  setState('filteredPOIs', filtered.pois);

  renderDaySelector(main, route);

  const mapDiv = el('div', {
    id: 'route-map',
    className: 'map-container',
    style: {
      height: 'calc(100dvh - var(--header-height) - var(--bottom-nav-height) - 60px)',
      margin: '0',
    },
  });
  main.appendChild(mapDiv);

  renderBottomNav(container, 'map');

  requestAnimationFrame(() => {
    initMap('route-map');
    renderRoute(filtered.pois, filtered.segments, (poi) => {
      navigate(`#/route/${id}/poi/${poi.id}`);
    });

    const pos = getState().userPosition;
    if (pos) {
      updateUserPosition(pos.lat, pos.lng, getState().gpsAccuracy || 50);
    }
  });

  const unsubPos = subscribe('userPosition', (pos) => {
    if (pos) {
      updateUserPosition(pos.lat, pos.lng, getState().gpsAccuracy || 50);
    }
  });

  const unsubDay = subscribe('selectedDayIndex', (idx) => {
    const f = filterRouteByDayIndex(route, idx);
    setState('filteredPOIs', f.pois);
    renderRoute(f.pois, f.segments, (poi) => {
      navigate(`#/route/${id}/poi/${poi.id}`);
    });
  });

  return () => {
    unsubPos();
    unsubDay();
  };
});

// ── POI Detail view ───────────────────────────────────────────────────────────
addRoute('/route/:id/poi/:poiId', (container, { id, poiId }) => {
  clearElement(container);
  const route = getRoute(id);
  if (!route) { navigate('#/'); return; }

  const poi = route.pois.find(p => p.id === poiId);
  if (!poi) { navigate(`#/route/${id}`); return; }

  const filtered = filterRouteByDayIndex(route, getState().selectedDayIndex);
  const enrichedPOI = filtered.pois.find(p => p.id === poiId) || poi;

  renderHeader(container, {
    title: poi.name,
    showBack: true,
    backHash: `#/route/${id}?day=${getState().selectedDayIndex}`,
  });

  const main = el('div', { className: 'main-content' });
  container.appendChild(main);

  renderPOIDetail(main, enrichedPOI, route);
  renderBottomNav(container, 'route');
});

// ── Info page ─────────────────────────────────────────────────────────────────
addRoute('/info', (container) => {
  clearElement(container);
  renderHeader(container, { title: 'Informações', showBack: true });

  const main = el('div', { className: 'main-content', style: { padding: 'var(--space-lg)' } },
    el('h2', { style: { marginBottom: 'var(--space-md)', color: 'var(--color-primary-dark)' } },
      'Guia Munique & Arredores'),
    el('p', { style: { marginBottom: 'var(--space-md)', lineHeight: '1.7' } },
      'Guia turístico interativo de 6 dias cobrindo Munique, Castelos da Baviera, Zugspitze (Alpes alemães) e Salzburgo. Cada dia tem tipo próprio — caminhada urbana, museu ou excursão regional de trem.'
    ),
    el('h3', { style: { marginBottom: 'var(--space-sm)', color: 'var(--color-primary)' } }, 'Como usar'),
    el('ul', { style: { paddingLeft: 'var(--space-lg)', lineHeight: '2' } },
      el('li', {}, 'Na home, escolha um dos 6 dias do roteiro'),
      el('li', {}, 'Em dias urbanos, use "Iniciar caminhada" para ativar o GPS'),
      el('li', {}, 'Em dias de excursão, confira o card de logística antes de sair'),
      el('li', {}, 'Toque em qualquer parada para ler a narração completa'),
      el('li', {}, 'Em algumas paradas há o Modo Imersivo — texto aprofundado'),
      el('li', {}, 'Sub-atrações marcadas com \u25B6 abrem mini-reels com narração rápida')
    ),
    el('h3', { style: { marginTop: 'var(--space-lg)', marginBottom: 'var(--space-sm)', color: 'var(--color-primary)' } }, 'Dicas'),
    el('ul', { style: { paddingLeft: 'var(--space-lg)', lineHeight: '2' } },
      el('li', {}, 'Use fones de ouvido para os áudios e reels'),
      el('li', {}, 'Compre ingressos de Neuschwanstein com antecedência'),
      el('li', {}, 'Salzburg Card cobre transporte + funicular da fortaleza'),
      el('li', {}, 'O app funciona offline após o primeiro carregamento')
    )
  );

  container.appendChild(main);
  renderBottomNav(container, 'info');
});

// ── Initialize ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAudioPlayer();
  initProximityAlert();

  // Proximity → auto play audio (só relevante em dias urbanos)
  onProximity((event, poi) => {
    if (event === 'enter' && poi.media?.audio) {
      showProximityAlert(poi);
      playAudio(poi.media.audio, poi.name);
    }
  });

  subscribe('userPosition', (pos) => {
    if (pos) {
      updateUserPosition(pos.lat, pos.lng, getState().gpsAccuracy || 50);
    }
  });

  initRouter();
});
