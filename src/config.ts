import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import path from 'path';

// Wygenerowanie bezwzględnych ścieżek systemowych dla Windowsa
const uslugiAbsoluteBase = path.resolve('src/content/uslugi');
const blogAbsoluteBase = path.resolve('src/content/blog');

// 1. Kolekcja usług
const uslugiCollection = defineCollection({
  // base przyjmuje teraz pełną ścieżkę systemową, co eliminuje błąd pustego folderu
  loader: glob({ pattern: '**/*.{md,mdx}', base: uslugiAbsoluteBase }),
  schema: z.object({
    title: z.string(),
  }).passthrough(), // .passthrough() ignoruje dodatkowe pola z frontmattera (np. image, date), nie wywalając błędu
});

// 2. Kolekcja bloga
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: blogAbsoluteBase }),
  schema: z.object({
    title: z.string(),
  }).passthrough(),
});

export const collections = {
  'uslugi': uslugiCollection,
  'blog': blogCollection,
};