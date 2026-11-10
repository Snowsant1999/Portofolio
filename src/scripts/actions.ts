import { toggleThemeWithTransition, toggleWonderlandWithTransition } from './theme';

export interface PaletteItem {
  id: string;
  label: string;
  group: string;
  keywords: string;
  href?: string;
  external?: boolean;
  actionType?: 'theme' | 'wonderland' | 'copy-email' | 'open-terminal';
}

export async function runPortfolioAction(item: PaletteItem): Promise<string | null> {
  if (item.actionType === 'theme') {
    const toggleBtn = document.querySelector<HTMLElement>('[data-theme-toggle]') ?? document.documentElement;
    toggleThemeWithTransition(toggleBtn);
    return 'Theme switched.';
  }

  if (item.actionType === 'wonderland') {
    const toggleBtn =
      document.querySelector<HTMLElement>('[data-wonderland-toggle]') ?? document.documentElement;
    const isNowOn = toggleWonderlandWithTransition(toggleBtn);
    return isNowOn
      ? 'Down the Rabbit Hole! Alice in Wonderland theme: ON'
      : 'Returned from Wonderland. Snowfield theme: ON';
  }

  if (item.actionType === 'copy-email') {
    const email = 'snowsant1999@example.com';
    try {
      await navigator.clipboard.writeText(email);
      return `Copied ${email} to clipboard.`;
    } catch {
      return `Email: ${email}`;
    }
  }

  if (item.actionType === 'open-terminal') {
    window.dispatchEvent(new CustomEvent('terminal:open'));
    return 'Opening interactive terminal...';
  }

  if (item.href) {
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = item.href;
    }
    return null;
  }

  return null;
}
