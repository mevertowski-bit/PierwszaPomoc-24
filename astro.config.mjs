// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte'; // <-- MUSI BYĆ
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static', 
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    svelte() // <-- MUSI BYĆ TUTAJ WYWOŁANE
  ],
});