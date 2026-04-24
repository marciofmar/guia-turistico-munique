import { el, clearElement } from '../utils/dom.js';
import { navigate } from '../router.js';
import { getState, subscribe } from '../state.js';

export function renderHeader(container, { title = 'Guia Centro Rio', showBack = false, backHash = '#/' } = {}) {
  const header = el('header', { className: 'header' },
    showBack
      ? el('button', {
          className: 'header__back',
          onclick: () => navigate(backHash),
          'aria-label': 'Voltar'
        }, '\u2190')
      : null,
    el('h1', { className: 'header__title' }, title)
  );
  container.appendChild(header);
  return header;
}

export function renderBottomNav(container, activeTab = 'route') {
  const tabs = [
    { id: 'route', label: 'Roteiro', icon: mapIcon() },
    { id: 'map', label: 'Mapa', icon: compassIcon() },
    { id: 'info', label: 'Info', icon: infoIcon() },
  ];

  const nav = el('nav', { className: 'bottom-nav', 'aria-label': 'Navegação principal' },
    ...tabs.map(tab =>
      el('button', {
        className: `bottom-nav__btn ${tab.id === activeTab ? 'bottom-nav__btn--active' : ''}`,
        onclick: () => {
          if (tab.id === 'map') {
            const state = getState();
            if (state.activeRouteId) {
              navigate(`#/route/${state.activeRouteId}/map`);
            }
          } else if (tab.id === 'route') {
            const state = getState();
            if (state.activeRouteId) {
              navigate(`#/route/${state.activeRouteId}`);
            } else {
              navigate('#/');
            }
          } else if (tab.id === 'info') {
            navigate('#/info');
          }
        },
        'aria-label': tab.label,
      },
        tab.icon,
        el('span', {}, tab.label)
      )
    )
  );

  container.appendChild(nav);
  return nav;
}

function mapIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.innerHTML = '<path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>';
  return svg;
}

function compassIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.innerHTML = '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/>';
  return svg;
}

function infoIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.innerHTML = '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>';
  return svg;
}
