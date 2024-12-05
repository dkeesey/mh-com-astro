import { defineCollection, z } from 'astro:content';

const familyAlbum = defineCollection({
  schema: z.object({
    title: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    exhibitionImages: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).optional(),
    birthYear: z.string().optional(),
    birthPlace: z.string().optional(),
    deathYear: z.string().optional(),
    deathPlace: z.string().optional(),
    camp: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
  }),
});

export const collections = {
  'family-album': familyAlbum,
};
