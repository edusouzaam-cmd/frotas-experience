(() => {
  const gallery = document.querySelector('.fx-gallery');
  if (!gallery) return;
  const track = gallery.querySelector('.fx-gallery-track');
  const slides = [...track.children];
  const count = slides.length;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 1, busy = false, paused = reduced.matches, hovered = false, focused = false;
  for (const [slide, atStart] of [[slides[count - 1], true], [slides[0], false]]) {
    const clone = slide.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    atStart ? track.prepend(clone) : track.append(clone);
  }
  const button = gallery.querySelector('[data-gallery-pause]');
  function render(animate) {
    track.style.transition = animate && !reduced.matches ? '' : 'none';
    track.style.transform = `translateX(${-index * 100}%)`;
    [...track.children].forEach((s, i) => s.setAttribute('aria-hidden', String(i !== index)));
    gallery.querySelector('.fx-gallery-count').textContent = `${((index - 1 + count) % count) + 1} / ${count}`;
  }
  function settle() {
    if (index === 0) index = count;
    if (index === count + 1) index = 1;
    render(false);
    busy = false;
  }
  function move(direction) {
    if (busy) return;
    busy = true;
    index += direction;
    render(true);
    window.setTimeout(settle, reduced.matches ? 0 : 700);
  }
  function pauseLabel() {
    button.textContent = paused ? 'Reproduzir' : 'Pausar';
    button.setAttribute('aria-label', paused ? 'Reproduzir carrossel automático' : 'Pausar carrossel automático');
  }
  button.addEventListener('click', () => { paused = !paused; pauseLabel(); });
  gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => move(-1));
  gallery.querySelector('[data-gallery-next]').addEventListener('click', () => move(1));
  gallery.addEventListener('mouseenter', () => { hovered = true; });
  gallery.addEventListener('mouseleave', () => { hovered = false; });
  gallery.addEventListener('focusin', () => { focused = true; });
  gallery.addEventListener('focusout', e => { focused = gallery.contains(e.relatedTarget); });
  reduced.addEventListener('change', () => { paused = reduced.matches; pauseLabel(); });
  window.setInterval(() => {
    const rect = gallery.getBoundingClientRect();
    if (!paused && !hovered && !focused && !document.hidden && rect.bottom > 0 && rect.top < innerHeight) move(1);
  }, 4200);
  render(false);
  pauseLabel();
})();
