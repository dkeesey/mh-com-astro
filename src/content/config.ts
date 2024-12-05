import { defineCollection, z } from 'astro:content';

export const collections = {
  'family-album': defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      heroImage: z.string().optional(),
      layout: z.string().optional(),
      name: z.string().optional(),
      birthYear: z.string().optional(),
      birthPlace: z.string().optional(),
      deathYear: z.string().optional(),
      deathPlace: z.string().optional(),
      camp: z.string().optional(),
      image: z.string().optional(),
      photos: z.array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string()
        })
      ).optional()
    })
  })
};
