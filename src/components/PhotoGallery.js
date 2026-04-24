import { el } from '../utils/dom.js';

/**
 * Swipeable photo carousel.
 * @param {Array<{src: string, caption: string}>} photos
 * @param {string} fallbackColor  - CSS color used when no photos exist
 * @param {string} poiName        - used as alt text
 */
export function renderPhotoGallery(photos, fallbackColor, poiName) {
  if (!photos || photos.length === 0) {
    return el('div', {
      className: 'photo-gallery photo-gallery--placeholder',
      style: { background: fallbackColor },
    });
  }

  const wrapper = el('div', { className: 'photo-gallery' });

  const track = el('div', { className: 'photo-gallery__track' });

  photos.forEach((photo) => {
    const slide = el('div', { className: 'photo-gallery__slide' });
    const img = el('img', {
      className: 'photo-gallery__img',
      src: photo.src,
      alt: photo.caption || poiName,
      loading: 'lazy',
    });
    slide.appendChild(img);
    if (photo.caption) {
      slide.appendChild(
        el('div', { className: 'photo-gallery__caption' }, photo.caption)
      );
    }
    track.appendChild(slide);
  });

  wrapper.appendChild(track);

  // Dots (only if multiple photos)
  let dots = null;
  if (photos.length > 1) {
    dots = el('div', { className: 'photo-gallery__dots' });
    photos.forEach((_, i) => {
      const dot = el('button', {
        className: 'photo-gallery__dot' + (i === 0 ? ' photo-gallery__dot--active' : ''),
        'aria-label': `Foto ${i + 1}`,
      });
      dots.appendChild(dot);
    });
    wrapper.appendChild(dots);
  }

  // State
  let current = 0;

  function goTo(index) {
    current = Math.max(0, Math.min(index, photos.length - 1));
    track.style.transform = `translateX(-${current * 100}%)`;
    if (dots) {
      dots.querySelectorAll('.photo-gallery__dot').forEach((d, i) => {
        d.classList.toggle('photo-gallery__dot--active', i === current);
      });
    }
  }

  // Dot click
  if (dots) {
    dots.querySelectorAll('.photo-gallery__dot').forEach((d, i) => {
      d.addEventListener('click', () => goTo(i));
    });
  }

  // Touch / swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;

  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = false;
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (!isDragging && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      isDragging = true;
    }
    if (isDragging) {
      e.preventDefault();
    }
  }, { passive: false });

  wrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx < -40) goTo(current + 1);
    else if (dx > 40) goTo(current - 1);
  });

  return wrapper;
}
