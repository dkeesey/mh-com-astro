import typography from '@tailwindcss/typography'
import { primaryTheme, familyAlbumTheme, artworkTheme, familyAlbumPlugin, artworkGalleryPlugin } from './src/theme/index.ts'

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  plugins: [
    typography,
    familyAlbumPlugin,
    artworkGalleryPlugin
  ],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ...primaryTheme.colors,
        ...familyAlbumTheme.colors,
        ...artworkTheme.colors,
      },
      fontFamily: {
        ...primaryTheme.fontFamily,
        ...familyAlbumTheme.fontFamily,
        ...artworkTheme.fontFamily,
      },
      boxShadow: {
        upward: "0 -4px 10px -5px rgba(0, 0, 0, 0.3)",
      },
    },
  },
};
