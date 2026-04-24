// ReelPlayer — mini-reel para sub-atrações.
// Navegação MANUAL: o usuário avança e retrocede no próprio ritmo.
// Ken Burns contínuo + áudio ambiente em loop.

const AUDIO_BASE = '/media/routes/munique/audio';

let currentAudio         = null;
let keyHandler           = null;
let currentSubAttraction = null;
let reelSegments         = [];
let reelIdx              = 0;

// ─────────────────────────────────────────────────────────────────────

export function openReel(subAttraction) {
  destroyReel();

  currentSubAttraction = subAttraction;
  reelSegments         = subAttraction.reel?.segments ?? [];
  reelIdx              = 0;

  const overlay = buildOverlay(subAttraction);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  startAudio(subAttraction.reel?.audioMood);
  showSegment(overlay, 0);

  keyHandler = (e) => {
    if (e.key === 'Escape')     { destroyReel(); return; }
    if (e.key === 'ArrowRight') { advanceSegment(overlay, +1); }
    if (e.key === 'ArrowLeft')  { advanceSegment(overlay, -1); }
  };
  document.addEventListener('keydown', keyHandler);
}

export function destroyReel() {
  if (currentAudio) {
    try { currentAudio.pause(); } catch (_) {}
    currentAudio = null;
  }
  if (keyHandler) {
    document.removeEventListener('keydown', keyHandler);
    keyHandler = null;
  }
  document.body.style.overflow = '';
  document.querySelector('.reel-overlay')?.remove();
  currentSubAttraction = null;
  reelSegments         = [];
  reelIdx              = 0;
}

// ─────────────────────────────────────────────────────────────────────
// Navegação
// ─────────────────────────────────────────────────────────────────────

function advanceSegment(overlay, dir) {
  const next = reelIdx + dir;
  if (next < 0 || next >= reelSegments.length) return;
  showSegment(overlay, next);
}

function showSegment(overlay, idx) {
  reelIdx = idx;
  const total  = reelSegments.length;
  const seg    = reelSegments[idx];
  const isLast = idx === total - 1;

  // Texto com fade rápido
  const textEl = overlay.querySelector('.reel-text');
  textEl.style.opacity = '0';
  setTimeout(() => {
    textEl.textContent = seg?.text ?? '';
    textEl.style.opacity = '1';
  }, 180);

  // Pontos
  overlay.querySelectorAll('.reel-dot').forEach((d, i) =>
    d.classList.toggle('reel-dot--active', i === idx)
  );

  // Botão Anterior
  const prevBtn = overlay.querySelector('.reel-prev');
  if (prevBtn) prevBtn.disabled = idx === 0;

  // Botão Próxima / Repetir
  const nextBtn = overlay.querySelector('.reel-next');
  if (nextBtn) {
    nextBtn.disabled = false;
    if (isLast) {
      nextBtn.textContent = '↺';
      nextBtn.setAttribute('aria-label', 'Repetir');
      nextBtn.classList.add('reel-next--replay');
    } else {
      nextBtn.textContent = '›';
      nextBtn.setAttribute('aria-label', 'Próxima legenda');
      nextBtn.classList.remove('reel-next--replay');
    }
  }
}

// ─────────────────────────────────────────────────────────────────────
// Construção do overlay
// ─────────────────────────────────────────────────────────────────────

function buildOverlay(subAttraction) {
  const overlay     = document.createElement('div');
  overlay.className = 'reel-overlay';

  const isPainting = subAttraction.imageFit === 'contain';
  const animClass  = isPainting ? 'kb-p-full' : 'kb-full';
  const paintClass = isPainting ? ' reel-image--painting' : '';
  const total      = subAttraction.reel?.segments?.length ?? 0;

  const dotsHtml = Array.from({ length: total }, (_, i) =>
    `<span class="reel-dot${i === 0 ? ' reel-dot--active' : ''}"></span>`
  ).join('');

  overlay.innerHTML = `
    <div class="reel-media">
      <img
        class="reel-image${paintClass} ${animClass}"
        src="${escapeAttr(subAttraction.image)}"
        alt="${escapeAttr(subAttraction.name)}"
      />
      <div class="reel-vignette"></div>
    </div>
    <div class="reel-ui">

      <button class="reel-close" aria-label="Fechar">←</button>

      <div class="reel-spacer"></div>

      <div class="reel-text-container">
        <p class="reel-text" aria-live="polite"></p>
      </div>

      <div class="reel-bottom">
        <button class="reel-prev" aria-label="Legenda anterior" disabled>‹</button>
        <div class="reel-dots" aria-hidden="true">${dotsHtml}</div>
        <button class="reel-next" aria-label="Próxima legenda">›</button>
      </div>

    </div>
  `;

  overlay._subAttraction = subAttraction;

  overlay.querySelector('.reel-close')
    .addEventListener('click', destroyReel);

  overlay.querySelector('.reel-prev')
    .addEventListener('click', () => advanceSegment(overlay, -1));

  overlay.querySelector('.reel-next')
    .addEventListener('click', () => {
      if (reelIdx >= reelSegments.length - 1) {
        openReel(subAttraction);
      } else {
        advanceSegment(overlay, +1);
      }
    });

  const img = overlay.querySelector('.reel-image');
  img.style.setProperty('--kb-total-dur', '30s');
  if (isPainting) img.style.transformOrigin = 'center center';

  img.addEventListener('error', () => {
    img.style.display = 'none';
    overlay.querySelector('.reel-media').style.background =
      'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))';
  });

  return overlay;
}

// ─────────────────────────────────────────────────────────────────────
// Áudio
// ─────────────────────────────────────────────────────────────────────

function startAudio(mood) {
  if (!mood) return;
  try {
    currentAudio        = new Audio(`${AUDIO_BASE}/ambient-${mood}.mp3`);
    currentAudio.loop   = true;
    currentAudio.volume = 0.25;
    currentAudio.play().catch(() => {});
  } catch (_) {}
}

// ─────────────────────────────────────────────────────────────────────
// Utilitários
// ─────────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str ?? '').replace(/"/g, '&quot;');
}
