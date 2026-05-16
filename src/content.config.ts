import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const uslugiCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/uslugi' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    image: image().optional(),
  }).passthrough(),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    image: image().optional(),
  }).passthrough(),
});

export const collections = {
  uslugi: uslugiCollection,
  blog: blogCollection,
};
