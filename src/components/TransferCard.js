import { el } from '../utils/dom.js';

const MODE_CONFIG = {
  walking: { icon: '🚶', label: 'A pé' },
  transit: { icon: '🚇', label: 'Transporte público' },
  taxi:    { icon: '🚕', label: 'Táxi / app' },
};

function renderOption(mode, data, isRec) {
  const cfg = MODE_CONFIG[mode] || { icon: '🚗', label: mode };
  const cost = data.cost || 'Gratuito';

  const headerChildren = [
    el('span', { className: 'transfer-option__icon' }, cfg.icon),
    el('span', { className: 'transfer-option__label' }, cfg.label),
    el('span', { className: 'transfer-option__time' }, data.duration),
    cost !== 'Gratuito'
      ? el('span', { className: 'transfer-option__cost' }, cost)
      : el('span', { className: 'transfer-option__cost transfer-option__cost--free' }, 'Gratuito'),
  ];

  const header = el('div', { className: `transfer-option__header${isRec ? ' transfer-option__header--rec' : ''}` },
    ...headerChildren
  );

  if (data.departureTime) {
    const dep = el('div', { className: 'transfer-option__departure' },
      el('span', { className: 'transfer-option__departure-label' }, 'Sair às'),
      el('span', { className: 'transfer-option__departure-time' }, data.departureTime)
    );
    header.appendChild(dep);
  }

  const body = el('div', { className: 'transfer-option__body' });

  if (mode === 'walking' && data.route) {
    body.appendChild(el('p', { className: 'transfer-option__route' }, data.route));
    if (data.highlight) {
      body.appendChild(el('p', { className: 'transfer-option__highlight' }, `✨ ${data.highlight}`));
    }
  } else if (mode === 'transit' && data.line) {
    body.appendChild(el('p', { className: 'transfer-option__route' }, data.line));
  }

  // Walking note for cities where walking is not practical
  if (data.walkingNote) {
    body.appendChild(el('p', { className: 'transfer-option__walking-note' }, `🚶 ${data.walkingNote}`));
  }

  return el('div', { className: `transfer-option${isRec ? ' transfer-option--rec' : ''}` }, header, body);
}

/**
 * @param {object} transfer  — fromAccommodation or toAccommodation data
 * @param {'from'|'to'} direction
 */
export function renderTransferCard(transfer, direction) {
  if (!transfer) return null;

  const title = direction === 'from' ? '🏨 Saída da hospedagem' : '🏨 Retorno à hospedagem';
  const recommended = transfer.recommended;

  const card = el('div', { className: 'transfer-card' });
  card.appendChild(el('div', { className: 'transfer-card__header' }, title));

  // Recommended option — prominently
  if (recommended && transfer[recommended]) {
    const recWrap = el('div', { className: 'transfer-card__rec-wrap' },
      el('span', { className: 'transfer-card__rec-badge' }, '⭐ Recomendado'),
      renderOption(recommended, transfer[recommended], true)
    );
    if (transfer.recommendedReason) {
      recWrap.appendChild(el('p', { className: 'transfer-card__reason' }, transfer.recommendedReason));
    }
    card.appendChild(recWrap);
  }

  // Other options
  const otherModes = ['walking', 'transit', 'taxi'].filter(m => m !== recommended && transfer[m]);
  if (otherModes.length > 0) {
    const othersWrap = el('div', { className: 'transfer-card__others' });
    othersWrap.appendChild(el('div', { className: 'transfer-card__others-label' }, 'Outras opções'));
    for (const mode of otherModes) {
      othersWrap.appendChild(renderOption(mode, transfer[mode], false));
    }
    card.appendChild(othersWrap);
  }

  return card;
}
