import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  lang: z.enum(['es', 'en']),
  title: z.string(),
  routeSlug: z.string().regex(/^[a-z0-9-]+$/),
  challenge: z.string(),
  solution: z.string(),
  impact: z.string(),
  stack: z.array(z.string()),
  supportedTechnologies: z.array(z.string()).optional(),
  repo: z.string().url(),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative().default(999)
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: baseSchema
});

const labs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/labs' }),
  schema: baseSchema.extend({
    provider: z.enum(['gcs', 'az'])
  })
});

export const collections = { projects, labs };
