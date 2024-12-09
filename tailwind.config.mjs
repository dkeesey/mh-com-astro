/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  plugins: [require("@tailwindcss/typography")],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Family Album theme colors
        'fa': {
          // Text colors
          text: {
            primary: '#ffffff',      // High contrast for all main text
            accent: '#ffd700',       // Gold accent for special emphasis
          },
          // Interactive elements
          interactive: {
            link: '#60a5fa',         // Default link state
            hover: '#93c5fd',        // Hover state
            visited: '#818cf8',      // Visited state
            active: '#3b82f6',       // Active state
          },
          // Background colors
          bg: {
            primary: '#000000',      // Main background
            secondary: '#1a1a1a',    // Slightly lighter background for contrast
          }
        }
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
