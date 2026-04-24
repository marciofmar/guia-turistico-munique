import { el, clearElement } from '../utils/dom.js';
import { periodColor, formatDuration } from '../utils/formatters.js';
import { playChapters } from './AudioPlayer.js';
import { renderNavigateButton } from './NavigateButton.js';
import { renderPhotoGallery } from './PhotoGallery.js';

export function renderPOIDetail(container, poi, route) {
  clearElement(container);

  const periodNames = {};
  for (const p of route.historicalPeriods || []) {
    periodNames[p.id] = p.name;
  }

  const photos = poi.media?.photos || [];
  const fallbackColor = `linear-gradient(135deg, ${periodColor(poi.historicalPeriod)}, var(--color-primary-dark))`;

  const detail = el('div', { className: 'poi-detail' });

  // ── Photo gallery (or gradient placeholder) ─────────────────
  const gallery = renderPhotoGallery(photos, fallbackColor, poi.name);
  gallery.classList.add('poi-detail__hero');
  detail.appendChild(gallery);

  const body = el('div', { className: 'poi-detail__body' });

  // Period badge
  body.appendChild(
    el('span', {
      className: 'poi-detail__period-badge',
      style: { background: periodColor(poi.historicalPeriod) },
    }, periodNames[poi.historicalPeriod] || poi.historicalPeriod)
  );

  // Name
  body.appendChild(el('h2', { className: 'poi-detail__name' }, poi.name));

  // Year + style + duration
  const yearParts = [];
  if (poi.yearBuilt) yearParts.push(poi.yearBuilt);
  if (poi.architecturalStyle) yearParts.push(poi.architecturalStyle);
  yearParts.push(formatDuration(poi.estimatedVisitMinutes));
  body.appendChild(
    el('p', { className: 'poi-detail__year' }, yearParts.join(' \u00b7 '))
  );

  // Botão de narração — monta playlist com todos os capítulos disponíveis
  if (poi.media?.audio) {
    const chapters = buildAudioChapters(poi);
    body.appendChild(
      el('button', {
        className: 'start-route-btn',
        style: { marginLeft: '0', marginRight: '0', marginTop: '0' },
        onclick: () => playChapters(chapters),
      }, '\u25B6 Ouvir narração')
    );
  }

  // Description
  if (poi.description) {
    body.appendChild(
      el('p', {
        className: 'poi-detail__description',
        style: { whiteSpace: 'pre-wrap' },
      }, poi.description)
    );
  }

  // Significance
  if (poi.significance) {
    body.appendChild(el('div', {},
      el('h3', { className: 'poi-detail__section-title' }, 'Importância'),
      el('p', { className: 'poi-detail__description' }, poi.significance)
    ));
  }

  // ── 🎧 Modo Imersivo ────────────────────────────────────────
  if (poi.immersiveMode && poi.immersiveText) {
    body.appendChild(renderImmersive(poi.immersiveText));
  }

  // ── 👀 O que observar ───────────────────────────────────────
  if (Array.isArray(poi.observationPoints) && poi.observationPoints.length) {
    body.appendChild(renderObservationPoints(poi.observationPoints));
  }

  // ── 🎯 Experiência sugerida ─────────────────────────────────
  if (poi.suggestedExperience) {
    body.appendChild(renderSuggestedExperience(poi.suggestedExperience));
  }

  // ── 🔗 Pesquise também ──────────────────────────────────────
  if (Array.isArray(poi.searchSuggestions) && poi.searchSuggestions.length) {
    body.appendChild(renderSearchSuggestions(poi.searchSuggestions));
  }

  // ── 📸 Sub-atrações com reel ────────────────────────────────
  const subs = poi.media?.subAttractions || [];
  if (subs.length) {
    body.appendChild(renderSubAttractions(subs));
  }

  // Entry fee
  if (poi.entryFee) {
    body.appendChild(el('div', {},
      el('h3', { className: 'poi-detail__section-title' }, 'Entrada'),
      el('p', { className: 'poi-detail__description' },
        poi.entryFee.free
          ? `Gratuita${poi.entryFee.notes ? ' \u00b7 ' + poi.entryFee.notes : ''}`
          : `${poi.entryFee.price || ''}${poi.entryFee.notes ? ' \u00b7 ' + poi.entryFee.notes : ''}`
      )
    ));
  }

  // Walking notes
  if (poi.walkingNotes) {
    body.appendChild(el('div', {},
      el('h3', { className: 'poi-detail__section-title' }, 'Próximo passo'),
      el('p', { className: 'poi-detail__description' }, poi.walkingNotes)
    ));
  }

  // Visit info (substitui o schedule semanal antigo)
  body.appendChild(el('div', { className: 'poi-section' },
    el('h3', { className: 'poi-detail__section-title' }, 'Visita'),
    el('p', { className: 'poi-detail__description' },
      `Tempo estimado: ${formatDuration(poi.estimatedVisitMinutes)}${
        poi.visitType === 'external' ? ' \u00b7 Vista externa' :
        poi.visitType === 'internal' ? ' \u00b7 Visita interna' :
        poi.visitType === 'hybrid'   ? ' \u00b7 Externa + interna' : ''
      }`
    )
  ));

  // Navigate button
  body.appendChild(renderNavigateButton(poi));

  detail.appendChild(body);
  container.appendChild(detail);

  // Conectar event listeners dos botões ▶ das sub-atrações (dynamic import)
  wireReelTriggers(detail, subs);
}

// ── Helpers ──────────────────────────────────────────────────

// Mapeia o período histórico para o áudio ambiente correspondente.
// Usado como fallback quando a narração por POI ainda não foi gravada.
const PERIOD_AMBIENT = {
  medieval: 'contemplative',
  baroque:  'baroque',
  royal:    'classical',
  modern:   'dramatic',
  alpine:   'alpine',
};
function periodAmbientSrc(period) {
  const mood = PERIOD_AMBIENT[period] || 'contemplative';
  return `/media/routes/munique/audio/ambient-${mood}.mp3`;
}

/**
 * Monta a playlist de capítulos de áudio para um POI.
 * - Capítulo 1 "Introdução": poi.media.audio (sempre presente)
 * - Capítulo 2 "Modo Imersivo": poi.media.audioImmersive (opcional)
 * - Capítulo 3 "Detalhes": poi.media.audioExtras (opcional)
 * Todos usam o ambient do período como fallback.
 */
function buildAudioChapters(poi) {
  const fallbackSrc = periodAmbientSrc(poi.historicalPeriod);
  const chapters = [];

  if (poi.media?.audio) {
    chapters.push({ title: 'Introdução', src: poi.media.audio, fallbackSrc });
  }
  if (poi.media?.audioImmersive) {
    chapters.push({ title: 'Modo Imersivo', src: poi.media.audioImmersive, fallbackSrc });
  }
  if (poi.media?.audioExtras) {
    chapters.push({ title: 'Detalhes', src: poi.media.audioExtras, fallbackSrc });
  }

  // Se há apenas 1 capítulo, usa o título do POI (comportamento anterior)
  if (chapters.length === 1) chapters[0].title = poi.name;

  return chapters;
}

// ── Sub-componentes ──────────────────────────────────────────

function renderImmersive(text) {
  return el('div', { className: 'poi-immersive' },
    el('div', { className: 'poi-immersive__header' },
      el('span', { className: 'poi-immersive__icon' }, '\uD83C\uDFA7'),
      el('h3', {}, 'Modo Imersivo'),
      el('p', {}, 'Texto aprofundado')
    ),
    el('p', { className: 'poi-immersive__text' }, text)
  );
}

function renderObservationPoints(points) {
  const list = el('ul', { className: 'poi-observation-list' });
  for (const p of points) {
    list.appendChild(el('li', {}, p));
  }
  return el('div', { className: 'poi-section' },
    el('h3', { className: 'poi-detail__section-title' }, '\uD83D\uDC40 O que observar'),
    list
  );
}

function renderSuggestedExperience(text) {
  return el('div', { className: 'poi-section poi-section--highlight' },
    el('h3', { className: 'poi-detail__section-title' }, '\uD83C\uDFAF Experiência sugerida'),
    el('p', {
      className: 'poi-detail__description',
      style: { whiteSpace: 'pre-wrap', margin: 0 },
    }, text)
  );
}

function renderSearchSuggestions(queries) {
  const tags = el('div', { className: 'poi-search-tags' });
  for (const q of queries) {
    const link = el('a', {
      className: 'poi-search-tag',
      href: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      target: '_blank',
      rel: 'noopener noreferrer',
    }, q);
    tags.appendChild(link);
  }
  return el('div', { className: 'poi-section' },
    el('h3', { className: 'poi-detail__section-title' }, '\uD83D\uDD17 Pesquise também'),
    tags
  );
}

function renderSubAttractions(subAttractions) {
  const grid = el('div', { className: 'sub-attraction-grid' });

  for (const sa of subAttractions) {
    const card = document.createElement('div');
    card.className = 'sub-attraction-card';
    card.dataset.saId = sa.id;
    // data-position e data-fit permitem controlar object-position/object-fit via CSS
    const posAttr = sa.imagePosition ? `data-position="${escapeAttr(sa.imagePosition)}"` : '';
    const fitAttr = sa.imageFit === 'contain' ? 'data-fit="contain"' : '';
    card.innerHTML = `
      <div class="sub-attraction-thumb">
        <img src="${escapeAttr(sa.image)}" alt="${escapeAttr(sa.name)}" loading="lazy"
             ${posAttr} ${fitAttr} onerror="this.style.display='none'" />
        ${sa.reel ? `
          <button class="reel-trigger" data-sa-id="${escapeAttr(sa.id)}"
                  aria-label="Ver reel de ${escapeAttr(sa.name)}">
            <span class="reel-trigger__icon">\u25B6</span>
          </button>` : ''}
      </div>
      <p class="sub-attraction-name">${escapeHtml(sa.name)}</p>
      ${sa.caption ? `<p class="sub-attraction-caption">${escapeHtml(sa.caption)}</p>` : ''}
    `;
    grid.appendChild(card);
  }

  return el('div', { className: 'poi-section' },
    el('h3', { className: 'poi-detail__section-title' }, '\uD83D\uDCF8 Explore em detalhe'),
    grid
  );
}

function wireReelTriggers(root, subAttractions) {
  const triggers = root.querySelectorAll('.reel-trigger');
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const saId = btn.dataset.saId;
      const sa = subAttractions.find(s => s.id === saId);
      if (sa?.reel) {
        import('./ReelPlayer.js').then(({ openReel }) => openReel(sa));
      }
    });
  });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function escapeAttr(str) {
  return String(str ?? '').replace(/"/g, '&quot;');
}
