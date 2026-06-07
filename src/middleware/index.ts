import { defineMiddleware } from 'astro:middleware';
import { SPANISH_COUNTRIES, SPANISH_LANG_RE, type Locale } from '../i18n/index';

const LANG_COOKIE = 'pl_lang';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies, redirect } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Already on a locale route — just persist cookie
  if (path.startsWith('/en') || path.startsWith('/es')) {
    const locale = path.startsWith('/es') ? 'es' : 'en';
    if (!cookies.get(LANG_COOKIE)) {
      cookies.set(LANG_COOKIE, locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    }
    return next();
  }

  // Root / or unknown — detect language
  if (path === '/' || path === '') {
    // 1. Saved cookie
    const saved = cookies.get(LANG_COOKIE)?.value as Locale | undefined;
    if (saved === 'en' || saved === 'es') {
      return redirect(`/${saved}${url.search}`, 302);
    }

    // 2. Vercel edge: country header
    const country = request.headers.get('x-vercel-ip-country') ?? '';
    if (SPANISH_COUNTRIES.has(country.toUpperCase())) {
      return redirect(`/es${url.search}`, 302);
    }

    // 3. Accept-Language
    const acceptLang = request.headers.get('accept-language') ?? '';
    if (SPANISH_LANG_RE.test(acceptLang)) {
      return redirect(`/es${url.search}`, 302);
    }

    return redirect(`/en${url.search}`, 302);
  }

  return next();
});
