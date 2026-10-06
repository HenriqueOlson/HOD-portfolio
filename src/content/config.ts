import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Basic info
    title: z.string(),
    displayTitle: z.string(),
    titleColor: z.string(),
    client: z.string(),

    // Descriptions
    cardDescription: z.string(),
    overviewDescription: z.string(),

    // Metadata
    badges: z.array(z.string()),
    tags: z.array(z.string()).optional(),

    // Images
    cardImage: z.string().optional(),
    heroImage: z.string().optional(),

    // Status
    passwordProtected: z.boolean().default(false),
    accessPasswordHash: z.string().optional(),
    comingSoon: z.boolean().default(false),

    // Ordering
    order: z.number(),

    // Key Results (displayed on project page)
    keyResults: z.array(z.object({
      metric: z.string(),
      description: z.string(),
    })).optional(),
    keyResultsTitle: z.string().optional(),
    keyResultsPrefix: z.string().optional(),

    // Featured projects to show at bottom of project page
    featuredProjectSlugs: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
