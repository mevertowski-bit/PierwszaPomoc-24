// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import netlify from '@astrojs/netlify'; // <-- 1. DODAJ TEN IMPORT

// https://astro.build/config
export default defineConfig({
  output: 'server',       // <-- 2. DODAJ TĘ LINIJKĘ
  adapter: netlify(),     // <-- 3. DODAJ TĘ LINIJKĘ
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    svelte()
  ],
});