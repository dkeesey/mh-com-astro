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
  inventory?: string;
}

// The full Artwork type including the generated slug
export interface Artwork extends Pick<CollectionEntry<'artwork'>, 'slug'>, ArtworkData {}
