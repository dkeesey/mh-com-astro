import { defineCollection, z } from 'astro:content';

export const collections = {
  'artwork': defineCollection({
    schema: z.object({
      // Core identification
      title: z.string(),
      name: z.string(),

      // Location information
      city: z.string(),
      state: z.string(),
      country: z.string().optional(),

      // Artwork details
      year: z.union([z.string(), z.number()]).optional(),
      media: z.string().optional(),
      size: z.string().optional(),
      series: z.string(),

      // Display/rendering properties
      cloudinaryId: z.string().optional(),
      sourceUrl: z.string().optional(),
      classNames: z.string().optional(),
      figcaptionClasses: z.string().optional(),
      transition: z.string().optional(),

      // Additional content collection specific fields
      'data-file': z.string().optional(),
      'content-type': z.string().optional(),
      image: z.string().optional(),
      altTag: z.string().optional(),
      inventory: z.string().optional(),
    })
  }),

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
