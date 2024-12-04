/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  plugins: [require("@tailwindcss/typography")],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "museum-black": "#000",
        "museum-white": "#fff",
        "museum-red": "#b83237", // A muted variant of the original red
        "museum-gray": "#f0f0f0",
        "museum-beige": "#faf8f5",
        "museum-gold": "#bdaa8f", // Soft metallic gold for highlighting
                // Adding custom link colors
        "link-normal": "#1d4ed8", // Example: blue for normal links
        "link-hover": "#3b82f6", // Example: brighter blue for hover to create more contrast
        "link-visited": "#4b5563", // Example: dark gray for visited
        "link-active": "#1e40af", // Example: dark blue for active
      },
      boxShadow: {
        upward: "0 -4px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        robotoCondensed: ['Roboto Condensed', 'sans-serif'],
      },
    },
  },
};
