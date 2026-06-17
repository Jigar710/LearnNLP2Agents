/**
 * Astro content collection schema for the 48 topic MDX files (PRD §17 Step 3.3).
 *
 * Astro 6 uses the Content Layer API, so the collection is backed by a `glob`
 * loader over src/content/topics. The Zod schema validates the frontmatter that
 * every topic MDX file declares (see Step 9).
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const topics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    phase: z.number().int().min(1).max(5),
    topicNumber: z.number().int().min(1).max(48),
    slug: z.string(),
    readingTime: z.number().int().positive().optional(),
    prerequisites: z.array(z.string()).default([]),
    hasCode: z.boolean().default(false),
    hasMath: z.boolean().default(false),
    hasInteractiveDemo: z.boolean().default(false),
  }),
});

export const collections = { topics };
