import { el } from '../utils/dom.js';
import { navigate } from '../router.js';
import { getState } from '../state.js';

let toastEl = null;
let hideTimeout = null;

export function initProximityAlert() {
  toastEl = el('div', { className: 'proximity-toast' },
    el('div', { className: 'proximity-toast__icon' }, '\uD83D\uDCCD'),
    el('div', { className: 'proximity-toast__text' },
      el('div', { className: 'proximity-toast__title' }, ''),
      el('div', { className: 'proximity-toast__subtitle' }, 'Toque para ver detalhes')
    )
  );

  document.body.appendChild(toastEl);
}

export function showProximityAlert(poi) {
  if (!toastEl) initProximityAlert();

  const title = toastEl.querySelector('.proximity-toast__title');
  title.textContent = `Você está perto: ${poi.name}`;

  toastEl.onclick = () => {
    hideProximityAlert();
    const state = getState();
    navigate(`#/route/${state.activeRouteId}/poi/${poi.id}`);
  };

  toastEl.classList.add('proximity-toast--visible');

  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(hideProximityAlert, 8000);
}

export function hideProximityAlert() {
  if (toastEl) {
    toastEl.classList.remove('proximity-toast--visible');
  }
}
