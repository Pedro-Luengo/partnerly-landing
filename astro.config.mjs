import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://partnerly.io',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-ES' },
      },
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
