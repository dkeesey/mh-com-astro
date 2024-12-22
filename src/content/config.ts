import { defineCollection, z } from 'astro:content';

const artworkCollection = defineCollection({
  schema: z.object({
    // Core identification
    title: z.string(),
    name: z.string(),
    cloudinaryId: z.string(), // Required for CloudinaryImage component

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
    sourceUrl: z.string().optional(),
    classNames: z.string().optional(),
    figcaptionClasses: z.string().optional(),
    transition: z.string().optional(),

    // Additional content collection specific fields
    'data-file': z.string().optional(),
    'content-type': z.string().optional(),
    image: z.string().optional(),
  })
});

const campCollection = defineCollection({
  schema: z.object({
    // Core identification
    name: z.string(),
    formalName: z.string().optional(), // e.g. "Central Utah Relocation Center"
    aka: z.array(z.string()).optional(), // Alternative names
    
    // Location
    city: z.string(),
    state: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }),
    
    // Historical data
    dateOpened: z.string(), // ISO date string
    dateClosed: z.string(), // ISO date string
    maxPopulation: z.number(),
    
    // Description and details
    description: z.string(),
    climate: z.string().optional(),
    landFeatures: z.string().optional(),
    
    // Related content
    artworkSlugs: z.array(z.string()), // References to artwork collection
    cloudinaryGalleryId: z.string().optional(), // For gallery folder in Cloudinary
    
    // Additional resources
    externalLinks: z.array(z.object({
      title: z.string(),
      url: z.string(),
      description: z.string().optional()
    })).optional(),
    
    // Display properties
    featuredImageId: z.string().optional(), // Cloudinary ID for featured image
  })
});

export const collections = {
  'artwork': artworkCollection,
  'camps': campCollection,
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
