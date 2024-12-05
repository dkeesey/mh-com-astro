import { defineCollection, z } from 'astro:content';

export const collections = {
  'family-album': defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      // Add other fields as needed
    })
  })
};
