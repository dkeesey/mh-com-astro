// src/content/family-album/config.ts
export const contentSections = [
  {
    id: 'introduction',
    title: 'The Family Album Pages',
    slug: '#introduction'
  },
  {
    id: 'camera-and-photographer',
    title: 'The Camera & The Photographer',
    slug: '#camera-and-photographer'
  },
  {
    id: 'amateur-photographers',
    title: 'The Internee as Amateur Photographer',
    slug: '#amateur-photographers',
    subsections: [
      { id: 'grace-akiya', title: 'Grace Akiya' },
      { id: 'june-morioka', title: 'June Utako Morioka' }
      // etc
    ]
  },
  {
    id: 'canadian-incarceration',
    title: 'The Japanese Canadian Incarceration',
    slug: '#canadian-incarceration'
  }
];

