// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import netlify from '@astrojs/netlify'; // Dodajemy wsparcie Netlify

export default defineConfig({
  output: 'server',       // Dzięki temu menu i podstrony będą działać na Netlify
  adapter: netlify(),     // To łączy kod z serwerem
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    svelte()
  ],
});