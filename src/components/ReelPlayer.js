// ReelPlayer — mini-reel (Instagram/TikTok style) para sub-atrações.
// Foto com efeito Ken Burns + texto progressivo + áudio ambiente em loop.

const AUDIO_BASE = '/media/routes/munique/audio';

let currentAudio = null;
let segmentTimer = null;
let fadeTimer = null;
let keyHandler = null;
let currentSubAttraction = null;

export function openReel(subAttraction) {
  destroyReel();

  currentSubAttraction = subAttraction;

  const overlay = buildOverlay(subAttraction);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  startAudio(subAttraction.reel.audioMood);
  runSegments(subAttraction.reel.segments, overlay);

  // ESC fecha o reel
  keyHandler = (e) => {
    if (e.key === 'Escape') destroyReel();
  };
  document.addEventListener('keydown', keyHandler);
}

export function destroyReel() {
  if (segmentTimer) { clearTimeout(segmentTimer); segmentTimer = null; }
  if (fadeTimer) { clearTimeout(fadeTimer); fadeTimer = null; }
  if (currentAudio) {
    try { currentAudio.pause(); } catch (_) {}
    currentAudio = null;
  }
  if (keyHandler) {
    document.removeEventListener('keydown', keyHandler);
    keyHandler = null;
  }
  document.body.style.overflow = '';
  const existing = document.querySelector('.reel-overlay');
  if (existing) existing.remove();
  currentSubAttraction = null;
}

function buildOverlay(subAttraction) {
  const overlay = document.createElement('div');
  overlay.className = 'reel-overlay';

  const isPainting = subAttraction.imageFit === 'contain';
  // Uma única classe de animação para todo o reel — sem troca por segmento
  const animClass = isPainting ? 'kb-p-full' : 'kb-full';
  const paintingClass = isPainting ? ' reel-image--painting' : '';

  overlay.innerHTML = `
    <div class="reel-media">
      <img
        class="reel-image${paintingClass} ${animClass}"
        src="${escapeAttr(subAttraction.image)}"
        alt="${escapeAttr(subAttraction.name)}"
      />
      <div class="reel-vignette"></div>
    </div>
    <div class="reel-ui">
      <button class="reel-close" aria-label="Fechar">←</button>
      <div class="reel-info">
        <span class="reel-poi-name">${escapeHtml(subAttraction.name)}</span>
      </div>
      <div class="reel-text-container">
        <p class="reel-text" aria-live="polite"></p>
      </div>
      <div class="reel-progress">
        <div class="reel-progress-bar"></div>
      </div>
    </div>
  `;

  overlay._subAttraction = subAttraction;
  overlay.querySelector('.reel-close').addEventListener('click', destroyReel);

  // Fallback: se imagem falhar, aplica gradiente para que o reel não fique quebrado
  const img = overlay.querySelector('.reel-image');
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const media = overlay.querySelector('.reel-media');
    media.style.background =
      'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))';
  });

  return overlay;
}

function runSegments(segments, overlay) {
  const textEl   = overlay.querySelector('.reel-text');
  const progress = overlay.querySelector('.reel-progress-bar');
  const imgEl    = overlay.querySelector('.reel-image');
  const isPainting = imgEl.classList.contains('reel-image--painting');

  const totalDuration = segments.reduce((sum, s) => sum + (s.duration || 3), 0) || 1;

  // ── Animação única para todo o reel ────────────────────────────────
  // A imagem entra com um drift suave (kb-p-full ou kb-full) que dura o
  // tempo total do reel. A atenção é guiada SOMENTE pelo texto das legendas.
  const totalDurSec = Math.max(totalDuration + 4, 20);
  if (isPainting) {
    imgEl.style.transformOrigin = 'center center';
    imgEl.style.setProperty('--kb-total-dur', `${totalDurSec}s`);
    // classe já definida em buildOverlay (kb-p-full) — não mudar mais
  } else {
    imgEl.style.setProperty('--kb-total-dur', `${totalDurSec}s`);
    // classe já definida em buildOverlay (kb-full) — não mudar mais
  }

  let elapsed = 0;
  let idx = 0;

  function showNext() {
    if (idx >= segments.length) {
      textEl.style.opacity = '0';
      imgEl.style.animationPlayState = 'paused';
      progress.style.width = '100%';
      fadeTimer = setTimeout(() => showReplay(overlay), 400);
      return;
    }

    const seg = segments[idx++];

    // Apenas o texto muda — a imagem permanece visível e inteira
    textEl.style.opacity = '0';
    fadeTimer = setTimeout(() => {
      textEl.textContent = seg.text || '';
      textEl.style.opacity = '1';
    }, 300);

    elapsed += seg.duration;
    progress.style.width = `${Math.min(100, (elapsed / totalDuration) * 100)}%`;

    segmentTimer = setTimeout(showNext, (seg.duration || 3) * 1000);
  }

  showNext();
}

function showReplay(overlay) {
  const container = overlay.querySelector('.reel-text-container');
  if (!container) return;
  container.innerHTML = '<button class="reel-replay" aria-label="Repetir">↺</button>';
  const sub = overlay._subAttraction || currentSubAttraction;
  const replayBtn = container.querySelector('.reel-replay');
  if (replayBtn && sub) {
    replayBtn.addEventListener('click', () => openReel(sub));
  }
}

/**
 * Calcula o transform-origin para animações Ken Burns em pinturas com
 * object-fit:contain, mapeando focusZone para coordenadas reais da imagem.
 *
 * Com object-fit:contain, a imagem é renderizada dentro do elemento com
 * letterbox/pillarbox. O zoom (scale) sobre o transform-origin correto
 * faz a câmera "mover" para a área de interesse da pintura.
 *
 * @param {HTMLImageElement} imgEl
 * @param {string} focusZone  'full'|'top'|'bottom'|'center'|'detail'|'left'|'right'
 * @returns {string}  CSS transform-origin (e.g. "195px 210px")
 */
function getPaintingOrigin(imgEl, focusZone) {
  const eW = imgEl.clientWidth  || imgEl.offsetWidth  || 390;
  const eH = imgEl.clientHeight || imgEl.offsetHeight || 844;
  const nW = imgEl.naturalWidth  || eW;
  const nH = imgEl.naturalHeight || eH;

  // Dimensões renderizadas da pintura dentro do elemento (object-fit:contain)
  const scaleRatio = Math.min(eW / nW, eH / nH);
  const rW = nW * scaleRatio; // largura real da pintura na tela
  const rH = nH * scaleRatio; // altura real da pintura na tela
  const offX = (eW - rW) / 2;  // offset horizontal (pillarbox)
  const offY = (eH - rH) / 2;  // offset vertical (letterbox)

  // Mapeamento de zona → fração (fx, fy) dentro da área da pintura.
  // Valores empíricos para pinturas figurativas (retrato/meia-figura):
  // - 'top':    face / área superior (≈20% da altura)
  // - 'detail': zona principal do sujeito (≈35%)
  // - 'center': centro geométrico (50%)
  // - 'bottom': área inferior / mãos (≈78%)
  const ZONE_FRACTIONS = {
    full:   [0.50, 0.50],
    top:    [0.50, 0.20],
    bottom: [0.50, 0.78],
    center: [0.50, 0.50],
    detail: [0.50, 0.35],
    left:   [0.22, 0.50],
    right:  [0.78, 0.50],
  };
  const [fx, fy] = ZONE_FRACTIONS[focusZone] ?? [0.5, 0.5];

  const originX = offX + rW * fx;
  const originY = offY + rH * fy;
  return `${originX.toFixed(1)}px ${originY.toFixed(1)}px`;
}

function startAudio(mood) {
  if (!mood) return;
  const src = `${AUDIO_BASE}/ambient-${mood}.mp3`;
  try {
    currentAudio = new Audio(src);
    currentAudio.loop = true;
    currentAudio.volume = 0.25;
    currentAudio.play().catch(() => {
      // Autoplay bloqueado — silencioso. Usuário já deu gesture ao clicar em ▶.
    });
  } catch (_) {
    // Ambiente sem suporte a Audio — ignorar.
  }
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
