export function initDesktopCursor(): void {
  const canUseFinePointer = window.matchMedia(
    '(pointer: fine) and (prefers-reduced-motion: no-preference)'
  ).matches;
  if (!canUseFinePointer) return;

  let ring = document.getElementById('custom-cursor-ring');
  if (!ring) {
    ring = document.createElement('div');
    ring.id = 'custom-cursor-ring';
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);
  }

  if (ring.dataset.bound !== 'true') {
    ring.dataset.bound = 'true';
    window.addEventListener(
      'pointermove',
      (e) => {
        if (!ring) return;
        ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      },
      { passive: true }
    );
  }

  document.querySelectorAll<HTMLElement>('a[href], button').forEach((el) => {
    if (el.dataset.cursorBound === 'true') return;
    el.dataset.cursorBound = 'true';
    el.addEventListener('pointerenter', () => ring?.classList.add('cursor-active'));
    el.addEventListener('pointerleave', () => ring?.classList.remove('cursor-active'));
  });

  document.querySelectorAll<HTMLElement>('.btn.primary, .btn-primary').forEach((btn) => {
    if (btn.dataset.magneticBound === 'true') return;
    btn.dataset.magneticBound = 'true';

    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 6;
      const dy = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 6;
      btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
    });

    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });
}

