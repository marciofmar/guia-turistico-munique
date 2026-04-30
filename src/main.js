import 'leaflet/dist/leaflet.css';
import { addRoute, initRouter, navigate } from './router.js';
import { getState, setState, subscribe } from './state.js';
import { getAllRoutes, getRoute } from './data/routes/index.js';
import { filterRouteByDayIndex } from './services/dayFilter.js';
import { startWatching, onProximity } from './services/geolocation.js';
import { initMap, renderRoute, updateUserPosition, centerOnUser } from './services/map.js';
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

// Ordem canônica de exibição dos roteiros (ordem do itinerário)
const ROUTE_ORDER = [
  'munique-2026',
  'nuremberg-2026',
  'praga-2026',
  'cesky-krumlov-2026',
  'budapeste-2026',
  'bratislava-2026',
  'viena-2026',
  'madri-2026',
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function getSortedRoutes() {
  const all = getAllRoutes();
  const byId = Object.fromEntries(all.map(r => [r.id, r]));
  const main = ROUTE_ORDER.map(id => byId[id]).filter(Boolean);
  if (localStorage.getItem('dev-routes') === '1') {
    return [...main, ...all.filter(r => r.devOnly)];
  }
  return main;
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

async function requestNotificationPermission() {
  if (!('Notification' in window) || Notification.permission !== 'default') return;
  await Notification.requestPermission();
}

function fireProximityNotification(poi) {
  if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const n = new Notification(`📍 ${poi.name}`, {
    body: 'Você está perto desta parada. Toque para abrir.',
    tag: `proximity-${poi.id}`,
    renotify: false,
  });
  n.onclick = () => {
    window.focus();
    const state = getState();
    if (state.activeRouteId) navigate(`#/route/${state.activeRouteId}/poi/${poi.id}`);
    n.close();
  };
  setTimeout(() => n.close(), 8000);
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

  const hasTransport = !!(lg.transport || lg.departureStation);
  const hasMeals = !!(lg.meals);
  const hasCostSummary = !!(lg.costSummary);
  if (!hasTransport && !hasMeals && !hasCostSummary) return null;

  const card = el('div', { className: 'logistics-card' });

  if (hasTransport) {
    card.appendChild(el('div', { className: 'logistics-card__header' }, '\uD83D\uDE82 Excurs\u00e3o do dia'));
    card.appendChild(el('div', { className: 'logistics-card__route' },
      `${lg.departureStation || 'M\u00fcnchen Hbf'} \u2192 ${lg.destination || ''}`
    ));
    card.appendChild(el('div', { className: 'logistics-card__meta' },
      `~${lg.trainDuration || ''} de ${lg.transport === 'train' ? 'trem' : 'transporte'}`
      + (lg.trainLine ? ` \u00b7 ${lg.trainLine}` : '')
      + (lg.returnBy ? ` \u00b7 Volta at\u00e9 ${lg.returnBy}` : '')
    ));
    if (lg.notes) {
      card.appendChild(el('div', { className: 'logistics-card__notes' }, `\u26A0\uFE0F ${lg.notes}`));
    }
    if (lg.bookingUrl) {
      card.appendChild(el('a', {
        className: 'logistics-card__btn',
        href: lg.bookingUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
      }, 'Comprar passagens \u2192'));
    }
  }

  if (hasMeals) card.appendChild(renderMealsSection(lg.meals));
  if (hasCostSummary) card.appendChild(renderCostSummarySection(lg.costSummary));

  return card;
}

const MEAL_LEVEL_LABELS = { budget: 'Econ\u00f4mico', mid: 'M\u00e9dio', premium: 'Premium' };

function renderMealsSection(meals) {
  const section = el('div', { className: 'meals-section' });
  section.appendChild(el('h3', { className: 'meals-section__title' }, '\uD83C\uDF7D\uFE0F Onde comer'));

  for (const [key, label] of [['lunch', '\u2600\uFE0F Almo\u00e7o'], ['dinner', '\uD83C\uDF19 Jantar']]) {
    const meal = meals[key];
    if (!meal) continue;

    const block = el('div', { className: 'meal-block' });
    block.appendChild(el('div', { className: 'meal-block__label' }, label));
    if (meal.context) {
      block.appendChild(el('p', { className: 'meal-block__context' }, meal.context));
    }

    for (const opt of meal.options || []) {
      const optEl = el('div', { className: `meal-option meal-option--${opt.level}` });
      optEl.appendChild(el('span', { className: 'meal-option__badge' }, MEAL_LEVEL_LABELS[opt.level] || opt.level));
      const info = el('div', { className: 'meal-option__info' });
      info.appendChild(el('strong', { className: 'meal-option__name' }, opt.name));
      if (opt.type) info.appendChild(el('span', { className: 'meal-option__type' }, opt.type));
      if (opt.address) {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(opt.name + ' ' + opt.address)}`;
        info.appendChild(el('a', {
          className: 'meal-option__address',
          href: mapsUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
        }, `📍 ${opt.address}`));
      }
      optEl.appendChild(info);
      optEl.appendChild(el('span', { className: 'meal-option__cost' }, opt.estimatedCoupleCost || ''));
      block.appendChild(optEl);
    }

    section.appendChild(block);
  }

  return section;
}

function renderCostSummarySection(summary) {
  const section = el('div', { className: 'cost-summary' });
  section.appendChild(el('h3', { className: 'cost-summary__title' }, '\uD83D\uDCB6 Resumo de custos'));

  if (summary.attractions?.length) {
    const list = el('ul', { className: 'cost-summary__attractions' });
    for (const a of summary.attractions) {
      const note = a.note ? ` \u00b7 ${a.note}` : '';
      list.appendChild(el('li', {}, `${a.name} \u2014 ${a.coupleCost || ''}${note}`));
    }
    section.appendChild(list);
    if (summary.attractionsSubtotal) {
      section.appendChild(el('div', { className: 'cost-summary__subtotal' },
        `Subtotal atra\u00e7\u00f5es: ${summary.attractionsSubtotal}`
      ));
    }
  }

  if (summary.dailyTotal) {
    const tiers = el('div', { className: 'cost-tiers' });
    for (const [key, label] of [['budget', 'Econ\u00f4mico'], ['mid', 'M\u00e9dio'], ['premium', 'Premium']]) {
      const tier = summary.dailyTotal[key];
      if (!tier) continue;
      const row = el('div', { className: `cost-tier cost-tier--${key}` });
      row.appendChild(el('span', { className: 'cost-tier__label' }, label));
      row.appendChild(el('span', { className: 'cost-tier__meals' }, `refei\u00e7\u00f5es ${tier.meals}`));
      row.appendChild(el('strong', { className: 'cost-tier__total' }, tier.total));
      tiers.appendChild(row);
    }
    section.appendChild(tiers);
  }

  if (summary.attractionsNote) {
    section.appendChild(el('p', { className: 'cost-summary__note' }, `\u2139\uFE0F ${summary.attractionsNote}`));
  }

  return section;
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
  const routes = getSortedRoutes();

  renderHeader(container, { title: 'Minha Viagem 2026' });

  const main = el('div', { className: 'main-content home' });

  // Hero
  main.appendChild(el('div', { className: 'home__hero' },
    el('h2', { className: 'home__hero-title' }, '🗺️ Munique & Leste Europeu'),
    el('p', { className: 'home__hero-subtitle' },
      '8 destinos · 23 dias · Mai–Jun 2026'),
    el('p', { className: 'home__hero-dates' },
      '31 mai – 22 jun · Baviera, Boêmia, Danúbio, Alpes, Madri')
  ));

  // Seção de cidades
  const section = el('div', { className: 'home__routes-section' },
    el('h3', { className: 'home__section-title' }, 'Escolha um destino')
  );

  // Grid de cidades
  const grid = el('div', { className: 'home__routes-grid' });

  for (const route of routes) {
    const days = route.days || [];
    const totalPOIs = (route.pois || []).length;
    const firstDay = days[0];
    const lastDay  = days[days.length - 1];

    // Flag emoji por país (baseado no id)
    const flagMap = {
      'munique-2026': '🇩🇪', 'nuremberg-2026': '🇩🇪',
      'praga-2026': '🇨🇿', 'cesky-krumlov-2026': '🇨🇿',
      'budapeste-2026': '🇭🇺', 'bratislava-2026': '🇸🇰',
      'viena-2026': '🇦🇹', 'madri-2026': '🇪🇸',
      'teste-local': '🧪',
    };
    const flag = flagMap[route.id] || '🌍';

    const dateRange = (firstDay && lastDay)
      ? `${formatDate(firstDay.date)} – ${formatDate(lastDay.date)}`
      : '';

    const card = el('div', {
      className: 'route-card',
      onclick: () => {
        setState('selectedDayIndex', 0);
        navigate(`#/route/${route.id}?day=0`);
      },
      role: 'button',
      tabIndex: 0,
    },
      el('div', { className: 'route-card__flag' }, flag),
      el('div', { className: 'route-card__body' },
        el('h3', { className: 'route-card__title' }, route.title || route.id),
        route.subtitle
          ? el('p', { className: 'route-card__subtitle' }, route.subtitle)
          : null,
        el('div', { className: 'route-card__meta' },
          el('span', { className: 'route-card__dates' }, dateRange),
          el('span', { className: 'route-card__stats' },
            `${days.length} dia${days.length !== 1 ? 's' : ''} · ${totalPOIs} parada${totalPOIs !== 1 ? 's' : ''}`)
        )
      ),
      el('span', { className: 'route-card__arrow' }, '›')
    );
    grid.appendChild(card);
  }

  section.appendChild(grid);
  main.appendChild(section);
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

    // Logistics card (excursões e dias com refeições)
    if (filtered.day.logistics) {
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

  // Inicia GPS e pede permissão de notificações automaticamente ao abrir o mapa
  startWatching();
  requestNotificationPermission();

  renderDaySelector(main, route);

  const mapWrapper = el('div', { style: { position: 'relative' } });

  const mapDiv = el('div', {
    id: 'route-map',
    className: 'map-container',
    style: {
      height: 'calc(100dvh - var(--header-height) - var(--bottom-nav-height) - 60px)',
      margin: '0',
    },
  });

  const centerBtn = el('button', {
    className: 'map-center-btn',
    title: 'Centrar na minha posição',
    onclick: () => {
      const pos = getState().userPosition;
      if (pos) centerOnUser(pos.lat, pos.lng);
    },
  }, '📍');

  mapWrapper.appendChild(mapDiv);
  mapWrapper.appendChild(centerBtn);

  if (isIOS() && !localStorage.getItem('ios-gps-noticed')) {
    const overlay = el('div', { className: 'ios-popup__overlay' });
    const popup = el('div', { className: 'ios-popup' },
      el('div', { className: 'ios-popup__icon' }, '📍'),
      el('h3', { className: 'ios-popup__title' }, 'Atenção — iPhone / iPad'),
      el('p', { className: 'ios-popup__text' },
        'No iOS, o GPS pausa automaticamente quando o ecrã bloqueia ou quando sai deste app. ' +
        'Para receber alertas ao se aproximar de uma parada, mantenha o ecrã ativo durante a caminhada.'
      ),
      el('button', {
        className: 'ios-popup__btn',
        onclick: () => {
          localStorage.setItem('ios-gps-noticed', '1');
          overlay.remove();
          popup.remove();
        },
      }, 'Entendido')
    );
    mapWrapper.appendChild(overlay);
    mapWrapper.appendChild(popup);
  }

  main.appendChild(mapWrapper);

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
    el('h2', { style: { marginBottom: 'var(--space-sm)', color: 'var(--color-primary-dark)' } },
      '🗺️ Munique & Leste Europeu 2026'),
    el('p', { style: { marginBottom: 'var(--space-md)', lineHeight: '1.7', color: 'var(--color-text-muted)' } },
      '23 dias · 8 destinos · 31 mai – 22 jun'
    ),
    el('p', { style: { marginBottom: 'var(--space-md)', lineHeight: '1.7' } },
      'Guia turístico interativo com narração de áudio, mapas offline e reels imersivos. Cobre Munique, Nuremberg, Praga, Český Krumlov, Budapeste, Bratislava, Viena e Madri.'
    ),
    el('h3', { style: { marginBottom: 'var(--space-sm)', color: 'var(--color-primary)' } }, 'Como usar'),
    el('ul', { style: { paddingLeft: 'var(--space-lg)', lineHeight: '2' } },
      el('li', {}, 'Na home, escolha um destino e depois o dia do roteiro'),
      el('li', {}, 'Abra a aba Mapa — o GPS é ativado automaticamente e a sua posição aparece como um círculo azul'),
      el('li', {}, 'No mapa, toque 📍 para centrar a vista na sua posição atual'),
      el('li', {}, 'Ao se aproximar de uma parada (~80 m), um alerta aparece e a narração de áudio inicia automaticamente'),
      el('li', {}, 'Em dias urbanos, "Iniciar caminhada" abre o Google Maps com rota a pé até a primeira parada do dia'),
      el('li', {}, 'Em dias de excursão, confira o card de logística para horários de trem e notas importantes'),
      el('li', {}, 'Toque em qualquer parada para abrir a narração e detalhes completos'),
      el('li', {}, 'Paradas com 🎧 têm Modo Imersivo — texto e contexto aprofundados'),
      el('li', {}, 'Sub-atrações com ▶ abrem mini-reels com áudio ambiente')
    ),
    el('h3', { style: { marginTop: 'var(--space-lg)', marginBottom: 'var(--space-sm)', color: 'var(--color-primary)' } }, 'Dicas essenciais'),
    el('ul', { style: { paddingLeft: 'var(--space-lg)', lineHeight: '2' } },
      el('li', {}, 'Use fones de ouvido para narrações e reels'),
      el('li', {}, 'Permita notificações quando solicitado — são usadas para alertar quando você se aproxima de uma parada com o app em segundo plano (Android)'),
      el('li', { style: { color: '#856404' } }, '⚠️ iPhone / iPad: o GPS pausa quando o ecrã bloqueia ou quando sai do app. Mantenha o ecrã ativo durante a caminhada para receber os alertas de proximidade'),
      el('li', {}, 'Neuschwanstein: compre bilhete online com semanas de antecedência'),
      el('li', {}, 'Zugspitze: reserve cabine do teleférico para o horário certo'),
      el('li', {}, 'Salzburg Card cobre transporte público + funicular da Fortaleza'),
      el('li', {}, 'Prado: Las Meninas fica na Sala 12 — vá cedo para ver sem multidão'),
      el('li', {}, 'O app funciona offline após o primeiro carregamento (PWA)')
    ),
    el('h3', { style: { marginTop: 'var(--space-lg)', marginBottom: 'var(--space-sm)', color: 'var(--color-primary)' } }, 'Itinerário resumido'),
    el('ul', { style: { paddingLeft: 'var(--space-lg)', lineHeight: '2', fontSize: '0.9rem' } },
      el('li', {}, '🇩🇪 Munique — 31 mai–5 jun (6 dias)'),
      el('li', {}, '🇩🇪 Nuremberg — 6–7 jun (2 dias)'),
      el('li', {}, '🇨🇿 Praga — 8–10 jun (3 dias)'),
      el('li', {}, '🇨🇿 Český Krumlov — 11–12 jun (2 dias)'),
      el('li', {}, '🇭🇺 Budapeste — 13–15 jun (3 dias)'),
      el('li', {}, '🇸🇰 Bratislava — 16–17 jun (2 dias)'),
      el('li', {}, '🇦🇹 Viena — 18–20 jun (3 dias)'),
      el('li', {}, '🇪🇸 Madri — 21–22 jun (2 dias)')
    )
  );

  const devEnabled = localStorage.getItem('dev-routes') === '1';
  main.appendChild(el('div', {
    style: { marginTop: 'var(--space-xl)', padding: 'var(--space-md)', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' },
  },
    el('h3', { style: { marginBottom: 'var(--space-sm)', color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' } }, '🔧 Modo Desenvolvedor'),
    el('p', { style: { fontSize: '0.85rem', color: '#666', marginBottom: 'var(--space-md)', lineHeight: '1.6' } }, 'Roteiros de teste para verificar alertas de proximidade no seu bairro.'),
    el('button', {
      style: { width: '100%', padding: 'var(--space-sm) var(--space-md)', borderRadius: '8px', border: devEnabled ? '1px solid #4caf50' : '1px solid #444', background: devEnabled ? 'rgba(76,175,80,0.15)' : 'rgba(255,255,255,0.05)', color: devEnabled ? '#4caf50' : '#888', cursor: 'pointer', fontSize: '0.9rem' },
      onclick: () => {
        if (devEnabled) {
          localStorage.removeItem('dev-routes');
        } else {
          localStorage.setItem('dev-routes', '1');
        }
        navigate('#/');
      },
    }, devEnabled ? '✓ Modo teste ativo — toque para desativar' : '🧪 Ativar roteiro de teste')
  ));

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
      fireProximityNotification(poi);
    }
  });

  subscribe('userPosition', (pos) => {
    if (pos) {
      updateUserPosition(pos.lat, pos.lng, getState().gpsAccuracy || 50);
    }
  });

  initRouter();
});
