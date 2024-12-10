import typography from '@tailwindcss/typography'
import { familyAlbumTheme, familyAlbumPlugin } from './src/theme/index.ts'

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  plugins: [
    typography,
    familyAlbumPlugin
  ],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: familyAlbumTheme.colors,
      fontFamily: familyAlbumTheme.fontFamily,
      boxShadow: {
        upward: "0 -4px 10px -5px rgba(0, 0, 0, 0.3)",
      },
    },
  },
};
