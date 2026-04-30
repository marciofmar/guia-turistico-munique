import { el } from '../utils/dom.js';
import { formatTime } from '../utils/formatters.js';
import { setState, getState } from '../state.js';

let audioEl = null;
let playerContainer = null;
let progressBar = null;
let timeDisplay = null;
let titleDisplay = null;
let chapterStrip = null;
let playBtn = null;

// Estado de capítulos
let chapters = [];     // [{title, src, fallbackSrc?}]
let currentChapter = 0;

// ── Init ────────────────────────────────────────────────────────

export function initAudioPlayer() {
  audioEl = new Audio();
  audioEl.preload = 'metadata';

  playerContainer = document.createElement('div');
  playerContainer.className = 'audio-player';
  playerContainer.innerHTML = `
    <button class="audio-player__btn" aria-label="Play/Pause">
      <span style="font-size:1.2rem">&#9654;</span>
    </button>
    <div class="audio-player__info">
      <div class="audio-player__title">—</div>
      <div class="audio-player__chapters"></div>
      <div class="audio-player__progress">
        <div class="audio-player__progress-bar" style="width:0%"></div>
      </div>
    </div>
    <span class="audio-player__time">0:00</span>
  `;

  playBtn        = playerContainer.querySelector('.audio-player__btn');
  titleDisplay   = playerContainer.querySelector('.audio-player__title');
  chapterStrip   = playerContainer.querySelector('.audio-player__chapters');
  progressBar    = playerContainer.querySelector('.audio-player__progress-bar');
  timeDisplay    = playerContainer.querySelector('.audio-player__time');

  playBtn.addEventListener('click', togglePlay);

  const progressContainer = playerContainer.querySelector('.audio-player__progress');
  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioEl.duration) audioEl.currentTime = pct * audioEl.duration;
  });

  audioEl.addEventListener('timeupdate', () => {
    if (audioEl.duration) {
      const pct = (audioEl.currentTime / audioEl.duration) * 100;
      progressBar.style.width = `${pct}%`;
      timeDisplay.textContent = formatTime(audioEl.currentTime);
      setState('audioState', {
        ...getState().audioState,
        currentTime: audioEl.currentTime,
        duration: audioEl.duration,
      });
    }
  });

  // Avança automaticamente para o próximo capítulo ao terminar
  audioEl.addEventListener('ended', () => {
    if (currentChapter < chapters.length - 1) {
      goToChapter(currentChapter + 1);
    } else {
      playBtn.querySelector('span').innerHTML = '&#9654;';
      setState('audioState', { ...getState().audioState, playing: false });
    }
  });

  document.body.appendChild(playerContainer);
}

// ── API pública ──────────────────────────────────────────────────

/**
 * Toca uma lista de capítulos com navegação entre seções.
 * @param {Array<{title:string, src:string, fallbackSrc?:string}>} chapterList
 * @param {number} [startIndex=0]
 */
export function playChapters(chapterList, startIndex = 0) {
  if (!audioEl) initAudioPlayer();
  chapters = chapterList;
  currentChapter = startIndex;
  renderChapterStrip();
  goToChapter(currentChapter);
  playerContainer.classList.add('audio-player--visible');
}

/**
 * Atalho retrocompatível: toca um único arquivo.
 * @param {string} src
 * @param {string} title
 * @param {{ fallbackSrc?: string }} [opts]
 */
export function playAudio(src, title, opts = {}) {
  playChapters([{ title, src, fallbackSrc: opts.fallbackSrc }]);
}

export function stopAudio() {
  if (!audioEl) return;
  audioEl.pause();
  audioEl.currentTime = 0;
  chapters = [];
  currentChapter = 0;
  if (chapterStrip) chapterStrip.innerHTML = '';
  playerContainer.classList.remove('audio-player--visible');
  playBtn.querySelector('span').innerHTML = '&#9654;';
  setState('audioState', { playing: false, poiId: null, currentTime: 0, duration: 0 });
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
  }
}

export function renderAudioPlayer() {
  // Already rendered globally via initAudioPlayer
}

// ── Capítulos ────────────────────────────────────────────────────

function goToChapter(index) {
  currentChapter = index;
  const chapter = chapters[index];

  audioEl.onerror = null;
  let triedFallback = false;

  audioEl.onerror = () => {
    if (chapter.fallbackSrc && !triedFallback) {
      triedFallback = true;
      audioEl.src = chapter.fallbackSrc;
      titleDisplay.textContent = `${chapter.title} · ambiente`;
      audioEl.play().catch(() => {});
    } else {
      titleDisplay.textContent = 'Narração indisponível';
      playBtn.querySelector('span').innerHTML = '&#9654;';
      setState('audioState', { playing: false, poiId: null, currentTime: 0, duration: 0 });
    }
  };

  audioEl.src = chapter.src;
  audioEl.play().catch(() => {});
  titleDisplay.textContent = chapter.title;
  playBtn.querySelector('span').innerHTML = '&#9646;&#9646;';
  setState('audioState', { playing: true, poiId: null, currentTime: 0, duration: 0 });

  updateChapterPills();
  syncMediaSession();
}

function syncMediaSession() {
  if (!('mediaSession' in navigator)) return;
  const chapter = chapters[currentChapter];
  if (!chapter) return;

  navigator.mediaSession.metadata = new MediaMetadata({
    title: chapter.title,
    artist: 'Guia Munique & Leste Europeu 2026',
  });
  navigator.mediaSession.playbackState = audioEl.paused ? 'paused' : 'playing';

  navigator.mediaSession.setActionHandler('play', () => {
    audioEl.play().catch(() => {});
    playBtn.querySelector('span').innerHTML = '&#9646;&#9646;';
    setState('audioState', { ...getState().audioState, playing: true });
    navigator.mediaSession.playbackState = 'playing';
  });
  navigator.mediaSession.setActionHandler('pause', () => {
    audioEl.pause();
    playBtn.querySelector('span').innerHTML = '&#9654;';
    setState('audioState', { ...getState().audioState, playing: false });
    navigator.mediaSession.playbackState = 'paused';
  });
  navigator.mediaSession.setActionHandler('stop', () => stopAudio());
  navigator.mediaSession.setActionHandler('nexttrack',
    currentChapter < chapters.length - 1 ? () => goToChapter(currentChapter + 1) : null
  );
  navigator.mediaSession.setActionHandler('previoustrack',
    currentChapter > 0 ? () => goToChapter(currentChapter - 1) : null
  );
}

function renderChapterStrip() {
  chapterStrip.innerHTML = '';
  if (chapters.length <= 1) {
    chapterStrip.style.display = 'none';
    return;
  }
  chapterStrip.style.display = 'flex';
  chapters.forEach((ch, i) => {
    const pill = document.createElement('button');
    pill.className = `audio-chapter-pill${i === currentChapter ? ' audio-chapter-pill--active' : ''}`;
    pill.textContent = ch.title;
    pill.setAttribute('aria-label', `Ir para ${ch.title}`);
    pill.addEventListener('click', () => goToChapter(i));
    chapterStrip.appendChild(pill);
  });
}

function updateChapterPills() {
  const pills = chapterStrip.querySelectorAll('.audio-chapter-pill');
  pills.forEach((p, i) => {
    p.classList.toggle('audio-chapter-pill--active', i === currentChapter);
  });
}

// ── Play/Pause ───────────────────────────────────────────────────

function togglePlay() {
  if (!audioEl || !audioEl.src) return;
  if (audioEl.paused) {
    audioEl.play().catch(() => {});
    playBtn.querySelector('span').innerHTML = '&#9646;&#9646;';
    setState('audioState', { ...getState().audioState, playing: true });
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
  } else {
    audioEl.pause();
    playBtn.querySelector('span').innerHTML = '&#9654;';
    setState('audioState', { ...getState().audioState, playing: false });
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
  }
}
