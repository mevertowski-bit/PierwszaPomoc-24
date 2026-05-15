// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'static',       // <-- ZMIENIAMY NA STATIC (błędy 500 znikną)
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    svelte()
  ],
});