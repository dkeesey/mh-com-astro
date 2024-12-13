export interface Artwork {
  // Core identification
  slug: string;
  title: string;
  name: string;

  // Location information
  city: string;
  state: string;
  country?: string;

  // Artwork details
  year?: string;
  media?: string;
  size?: string;

  // Display/rendering properties
  cloudinaryId?: string;
  sourceUrl?: string;
  classNames?: string;
  figcaptionClasses?: string;
  transition?: string;
}
