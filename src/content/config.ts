import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) => z.object({
        author: z.string(),
        date: z.string(),
        image: image(),
        title: z.string()
    })
});

const templates = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional()
    })
});

const uslugi = defineCollection({
    loader: glob({ base: './src/content/uslugi', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string().optional()
    })
});

export const collections = { blog, templates, uslugi };