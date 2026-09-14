import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thexify.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
