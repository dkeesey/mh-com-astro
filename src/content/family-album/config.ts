// src/content/family-album/config.ts

interface Subsection {
  id: string;
  title: string;
}

interface ContentSection {
  id: string;
  title: string;
  slug: string;
  subsections?: Subsection[];
}

export interface Photographer {
  id: string;
  name: string;
  birthYear?: string;
  birthPlace?: string;
  deathYear?: string;
  deathPlace?: string;
  camp: string;
  image?: string;
  category: 'official' | 'amateur' | 'visitor' | 'canadian';
}

export const photographers: Photographer[] = [
  {
    id: 'miyatake',
    name: 'Toyo Miyatake',
    birthYear: '1895',
    birthPlace: 'Japan',
    deathYear: '1979',
    deathPlace: 'Los Angeles',
    camp: 'Manzanar Relocation Camp',
    image: '/src/images/family-album/miyatake.jpg',
    category: 'official'
  },
  {
    id: 'fukuyama',
    name: 'Hideharu Fukuyama',
    birthYear: '1905',
    birthPlace: 'Japan',
    deathYear: '1978',
    deathPlace: 'Los Angeles',
    camp: 'Gila River Relocation Camp',
    image: '/src/images/family-album/fukuyama5.gif',
    category: 'official'
  },
  // Add more photographers here
];

export const contentSections: ContentSection[] = [
  {
    id: 'introduction',
    title: 'The Family Album Pages',
    slug: '#introduction'
  },
  {
    id: 'official-photographers',
    title: 'Official Camp Photographers',
    slug: '#official-photographers',
    subsections: photographers
      .filter(p => p.category === 'official')
      .map(p => ({ id: p.id, title: p.name }))
  },
  {
    id: 'amateur-photographers',
    title: 'The Internee as Amateur Photographer',
    slug: '#amateur-photographers',
    subsections: photographers
      .filter(p => p.category === 'amateur')
      .map(p => ({ id: p.id, title: p.name }))
  },
  {
    id: 'canadian-photographers',
    title: 'The Japanese Canadian Incarceration',
    slug: '#canadian-photographers',
    subsections: photographers
      .filter(p => p.category === 'canadian')
      .map(p => ({ id: p.id, title: p.name }))
  }
];
