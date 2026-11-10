import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://snowsant1999.github.io',
  base: '/Portofolio',
  integrations: [preact(), mdx(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

