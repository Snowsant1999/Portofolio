import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bilingualText = z.object({
  en: z.string().min(10),
  id: z.string().min(10),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    slug: z.string(),
    order: z.number().int().min(1),
    title: z.string(),
    repoName: z.string(),
    repoUrl: z.string().url(),
    category: z.enum(['ai', 'web', 'desktop', 'cloud', 'blockchain']),
    categoryLabel: z.string(),
    primaryLanguage: z.enum(['Python', 'PHP', 'Java', 'JavaScript', 'Solidity']),
    stack: z.array(z.string()).min(1),
    year: z.number().int(),
    featured: z.boolean().default(false),
    summary: bilingualText,
    problem: bilingualText,
    solution: bilingualText,
    role: bilingualText,
    highlights: z.object({
      en: z.array(z.string()).min(2),
      id: z.array(z.string()).min(2),
    }),
    statusNote: bilingualText,
  }),
});

export const collections = { projects };

