import type { CollectionEntry } from 'astro:content';

// The schema for the content collection
export interface ArtworkData {
  // Core identification
  title: string;
  name: string;

  // Location information
  city: string;
  state: string;
  country?: string;

  // Artwork details
  year?: string | number;
  media?: string;
  size?: string;
  series: string;

  // Display/rendering properties
  cloudinaryId?: string;
  sourceUrl?: string;
  classNames?: string;
  figcaptionClasses?: string;
  transition?: string;

  // Additional content collection specific fields
  'data-file'?: string;
  'content-type'?: string;
  image?: string;
  altTag?: string;
}

// Type for the collection entry (with data property)
export interface ArtworkEntry extends CollectionEntry<'artwork'> {}

// Type for flattened artwork data (spread data with slug)
export interface Artwork extends ArtworkData {
  slug: string;
}

export type ArtworkType = Artwork;