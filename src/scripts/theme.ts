export function toggleThemeWithTransition(triggerButton: HTMLElement): void {
  const root = document.documentElement;
  const currentTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  const applyTheme = () => {
    root.dataset.theme = nextTheme;
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // Ignore storage errors in private browsing modes.
    }
    document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(nextTheme === 'dark'));
    });
  };

  runCircularTransition(triggerButton, applyTheme);
}

export function toggleWonderlandWithTransition(triggerElement?: HTMLElement): boolean {
  const root = document.documentElement;
  const isCurrentlyOn = root.dataset.wonderland === 'on';
  const nextState = isCurrentlyOn ? 'off' : 'on';

  const applyWonderland = () => {
    if (nextState === 'on') {
      root.dataset.wonderland = 'on';
    } else {
      delete root.dataset.wonderland;
    }
    try {
      localStorage.setItem('wonderland', nextState);
    } catch {
      // Ignore storage errors in private browsing modes.
    }
    syncWonderlandButtons();
    window.dispatchEvent(
      new CustomEvent('wonderland:change', { detail: { active: nextState === 'on' } })
    );
  };

  const anchor =
    triggerElement ??
    document.querySelector<HTMLElement>('[data-wonderland-toggle]') ??
    document.documentElement;

  runCircularTransition(anchor, applyWonderland);
  return nextState === 'on';
}

function runCircularTransition(triggerElement: HTMLElement, callback: () => void): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const docWithTransition = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  };

  if (!docWithTransition.startViewTransition || prefersReducedMotion) {
    callback();
    return;
  }

  const rect = triggerElement.getBoundingClientRect();
  const x = rect.width > 0 ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect.height > 0 ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = docWithTransition.startViewTransition(callback);
  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 460,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  });
}

export function syncWonderlandButtons(): void {
  const isWonderland = document.documentElement.dataset.wonderland === 'on';
  document.querySelectorAll<HTMLButtonElement>('[data-wonderland-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(isWonderland));
    btn.classList.toggle('wonderland-active', isWonderland);
  });
}

export function bindThemeToggles(): void {
  const isDark = document.documentElement.dataset.theme === 'dark';
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(isDark));
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => toggleThemeWithTransition(btn));
  });

  syncWonderlandButtons();
  document.querySelectorAll<HTMLButtonElement>('[data-wonderland-toggle]').forEach((btn) => {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => toggleWonderlandWithTransition(btn));
  });
}
