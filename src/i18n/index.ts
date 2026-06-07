import { en } from './en';
import { es } from './es';
import type { Translations } from './en';

export type Locale = 'en' | 'es';

export const translations: Record<Locale, Translations> = { en, es };

export function t(locale: Locale): Translations {
  return translations[locale] ?? en;
}

export const LOCALES: Locale[] = ['en', 'es'];
export const DEFAULT_LOCALE: Locale = 'en';

// Countries/langs that should default to Spanish
export const SPANISH_COUNTRIES = new Set([
  'ES','MX','AR','CO','CL','PE','VE','EC','GT','CU','BO','DO','HN','PY','SV','NI','CR','PA','UY','GQ',
]);
export const SPANISH_LANG_RE = /^es/i;
