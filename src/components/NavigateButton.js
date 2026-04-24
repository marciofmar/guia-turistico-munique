import { el } from '../utils/dom.js';

export function renderNavigateButton(poi) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${poi.lat},${poi.lng}&travelmode=walking`;

  const wrapper = el('div', {},
    el('button', {
      className: 'navigate-btn',
      onclick: () => window.open(url, '_blank'),
    },
      '\uD83D\uDCCD Navegar até aqui'
    ),
    el('p', { className: 'navigate-btn__note' },
      'O Google Maps pode sugerir um caminho diferente do roteiro recomendado.'
    )
  );

  return wrapper;
}

export function renderNavigateToNext(fromPOI, toPOI) {
  if (!toPOI) return null;

  const url = `https://www.google.com/maps/dir/?api=1&origin=${fromPOI.lat},${fromPOI.lng}&destination=${toPOI.lat},${toPOI.lng}&travelmode=walking`;

  return el('button', {
    className: 'navigate-btn',
    style: { background: 'var(--color-accent)' },
    onclick: () => window.open(url, '_blank'),
  },
    `\u27A1 Próximo: ${toPOI.name}`
  );
}
