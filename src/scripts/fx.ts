type FxKind = 'snow' | 'cards';

const SUITS = [
  { glyph: '\u2660\uFE0E', red: false },
  { glyph: '\u2665\uFE0E', red: true },
  { glyph: '\u2666\uFE0E', red: true },
  { glyph: '\u2663\uFE0E', red: false },
];

const SNOW_SVG =
  '<svg viewBox="-10 -10 20 20" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M0 -9V9M-7.8 -4.5L7.8 4.5M-7.8 4.5L7.8 -4.5"/></svg>';

const MAX_PARTICLES = 120;

function motionOk(): boolean {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
}

function finePointer(): boolean {
  return window.matchMedia('(pointer: fine)').matches;
}

function isWonderland(): boolean {
  return document.documentElement.dataset.wonderland === 'on';
}

function makeParticle(kind: FxKind, size: number): HTMLElement {
  const el = document.createElement('span');
  el.className = 'fx-particle';
  el.setAttribute('aria-hidden', 'true');
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.fontSize = `${size}px`;

  if (kind === 'snow') {
    el.innerHTML = SNOW_SVG;
    el.style.color = 'var(--accent)';
  } else {
    const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
    el.textContent = suit.glyph;
    // Red suits take the accent, black suits take the text color, like a real deck.
    el.style.color = suit.red ? 'var(--accent)' : 'var(--text)';
  }
  document.body.appendChild(el);
  return el;
}

function canSpawn(): boolean {
  return motionOk() && document.querySelectorAll('.fx-particle').length < MAX_PARTICLES;
}

export function burst(x: number, y: number, kind: FxKind, count = 10): void {
  if (!canSpawn()) return;
  for (let i = 0; i < count; i++) {
    const size = 12 + Math.random() * 12;
    const el = makeParticle(kind, size);
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 90;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist + 30;
    const rot = (Math.random() - 0.5) * 360;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    const anim = el.animate(
      [
        { transform: 'translate(-50%, -50%) rotate(0deg) scale(0.6)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rot}deg) scale(1)`, opacity: 0 },
      ],
      { duration: 700 + Math.random() * 500, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'forwards' }
    );
    anim.onfinish = () => el.remove();
  }
}

export function shower(kind: FxKind, count = 26): void {
  if (!canSpawn()) return;
  for (let i = 0; i < count; i++) {
    const size = 16 + Math.random() * 18;
    const el = makeParticle(kind, size);
    const startX = Math.random() * window.innerWidth;
    const sway = (Math.random() - 0.5) * 160;
    const rot = (Math.random() - 0.5) * 540;
    el.style.left = `${startX}px`;
    el.style.top = '-40px';
    const anim = el.animate(
      [
        { transform: 'translate(-50%, 0) rotate(0deg)', opacity: 0 },
        { opacity: 1, offset: 0.12 },
        { transform: `translate(calc(-50% + ${sway}px), ${window.innerHeight + 80}px) rotate(${rot}deg)`, opacity: 0.9 },
      ],
      { duration: 1800 + Math.random() * 1400, delay: i * 40, easing: 'cubic-bezier(0.4, 0, 0.6, 1)', fill: 'forwards' }
    );
    anim.onfinish = () => el.remove();
  }
}

function initReveal(): void {
  if (!motionOk()) return;
  document.documentElement.classList.add('reveal-ready');
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  items.forEach((el) => observer.observe(el));
}

function initTilt(): void {
  if (!finePointer() || !motionOk()) return;
  document.querySelectorAll<HTMLElement>('.project, .profilecard').forEach((card) => {
    if (card.dataset.tiltBound === 'true') return;
    card.dataset.tiltBound = 'true';

    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${((px - 0.5) * 7).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${((0.5 - py) * 7).toFixed(2)}deg`);
      card.style.setProperty('--gx', `${(px * 100).toFixed(0)}%`);
      card.style.setProperty('--gy', `${(py * 100).toFixed(0)}%`);
      card.classList.add('is-tilting');
    });

    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

function initPoke(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-fx-poke]').forEach((btn) => {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    let spin = 0;
    btn.addEventListener('click', (e) => {
      const target = btn.querySelector<HTMLElement>('.crystal-spin');
      spin += 60;
      if (target) target.style.transform = `rotate(${spin}deg)`;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      burst(x, y, isWonderland() ? 'cards' : 'snow', 16);
    });
  });
}

function syncSizer(): void {
  const current = document.documentElement.dataset.wlSize ?? 'normal';
  document.querySelectorAll<HTMLButtonElement>('[data-wl-size]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.wlSize === current));
  });
}

function initSizer(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-wl-size]').forEach((btn) => {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', (e) => {
      const size = btn.dataset.wlSize ?? 'normal';
      if (size === 'normal') {
        delete document.documentElement.dataset.wlSize;
      } else {
        document.documentElement.dataset.wlSize = size;
      }
      syncSizer();
      if (finePointer()) burst(e.clientX, e.clientY, 'cards', 6);
    });
  });
  syncSizer();
}

function bindGlobalOnce(): void {
  const w = window as unknown as { __fxBound?: boolean };
  if (w.__fxBound) return;
  w.__fxBound = true;

  document.addEventListener('pointerdown', (e) => {
    if (!finePointer() || !motionOk()) return;
    const target = (e.target as HTMLElement).closest(
      '.btn, .filter, .chat-chip, .skillrow, .profile-tab, .palette-trigger, .wonderland-trigger, .footer-term-btn'
    );
    if (!target) return;
    burst(e.clientX, e.clientY, isWonderland() ? 'cards' : 'snow', 6);
  });

  window.addEventListener('wonderland:change', (e) => {
    const active = Boolean((e as CustomEvent<{ active: boolean }>).detail?.active);
    if (!active) {
      delete document.documentElement.dataset.wlSize;
      syncSizer();
    }
    window.setTimeout(() => shower(active ? 'cards' : 'snow', 26), 260);
  });
}

export function initFx(): void {
  bindGlobalOnce();
  initReveal();
  initTilt();
  initPoke();
  initSizer();
}

