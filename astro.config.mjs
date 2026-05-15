// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import netlify from '@astrojs/netlify'; // <--- DODAJ TO

// https://astro.build/config
export default defineConfig({
  output: 'server', // <--- DODAJ TO (obsługa serwera)
  adapter: netlify(), // <--- DODAJ TO
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    svelte()
  ],
});