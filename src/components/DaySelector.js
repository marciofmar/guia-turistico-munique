import { el } from '../utils/dom.js';
import { weekdayAbbrev, dayTypeBadge } from '../utils/formatters.js';
import { getState, setState } from '../state.js';

/**
 * Renderiza o seletor de dias do roteiro (6 abas para Munique).
 * Ao clicar, atualiza `state.selectedDayIndex` e dispara callback opcional.
 *
 * @param {HTMLElement} container
 * @param {object} route  — objeto de rota com `route.days[]`
 * @param {(index:number)=>void} [onChange] — callback opcional ao trocar de dia
 */
export function renderDaySelector(container, route, onChange) {
  const state = getState();
  const days = route.days || [];

  const selector = el('div', {
    className: 'day-selector',
    role: 'tablist',
    'aria-label': 'Dias do roteiro',
  });

  days.forEach((day, i) => {
    const isActive = i === state.selectedDayIndex;
    const badge = dayTypeBadge(day.dayType);

    const pill = el('button', {
      className: `day-pill ${isActive ? 'day-pill--active' : ''}`,
      role: 'tab',
      'aria-selected': isActive ? 'true' : 'false',
      title: `${day.title} — ${badge.label}`,
      onclick: () => {
        setState('selectedDayIndex', i);
        if (typeof onChange === 'function') onChange(i);
      },
    },
      el('span', { className: 'day-pill__emoji' }, day.coverEmoji || badge.emoji),
      `Dia ${day.order}`,
      el('span', { style: { opacity: 0.7 } }, `· ${weekdayAbbrev(day.weekday)}`)
    );

    selector.appendChild(pill);
  });

  container.appendChild(selector);
  return selector;
}
