import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://www.imagini-mkt.com',
  integrations: [mdx()],
});
