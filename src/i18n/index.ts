import en from './en.json';
import id from './id.json';

export type Locale = 'en' | 'id';

const dictionaries = { en, id } as const;

export function getDictionary(locale: Locale = 'en') {
  return dictionaries[locale] ?? dictionaries.en;
}

export function withBase(path = '/'): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}` || '/';
}

export function getAlternateLocalePath(pathname: string, targetLocale: Locale): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const withoutBase = base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
  const clean = withoutBase.replace(/^\/id(\/|$)/, '/');
  if (targetLocale === 'id') {
    const idPath = clean === '/' ? '/id/' : `/id${clean}`;
    return `${base}${idPath}`;
  }
  return `${base}${clean || '/'}`;
}
