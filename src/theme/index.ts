import plugin from 'tailwindcss/plugin'

export const familyAlbumTheme = {
  colors: {
    'fa': {
      'text': {
        'primary': '#ffffff',      // High contrast for headings
        'secondary': '#b3b3b3',    // Lower contrast for body text
        'accent': '#ffd700',       // Gold accent for special emphasis
      },
      'interactive': {
        'link': '#60a5fa',         // Default link state
        'hover': '#93c5fd',        // Hover state
        'visited': '#818cf8',      // Visited state
        'active': '#3b82f6',       // Active state
      },
      'bg': {
        'primary': '#000000',      // Main background
        'secondary': '#1a1a1a',    // Slightly lighter background for contrast
      }
    }
  },
  fontFamily: {
    montserrat: ['Montserrat', 'sans-serif'],
    robotoCondensed: ['Roboto Condensed', 'sans-serif'],
  }
}

export const familyAlbumPlugin = plugin(
  function({ addComponents, theme }) {
    addComponents({
      '.family-album': {
        backgroundColor: theme('colors.fa.bg.primary'),
        // Default text style
        color: theme('colors.fa.text.secondary'),
        fontFamily: theme('fontFamily.montserrat'),
        
        // Headers
        'h1, h2, h3, h4, h5, h6': {
          color: theme('colors.fa.text.primary'),
          fontFamily: theme('fontFamily.robotoCondensed'),
        },
        
        // Links
        'a': {
          color: theme('colors.fa.interactive.link'),
          '&:hover': {
            color: theme('colors.fa.interactive.hover'),
          },
          '&:visited': {
            color: theme('colors.fa.interactive.visited'),
          },
        },
      },
    })
  }
)
