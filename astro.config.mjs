import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
// import icon from "@astrojs/icon";

import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  security: {
    csp: {
      mode: 'hash',
      directives: {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'wasm-unsafe-eval'",
          "'inline-speculation-rules'",
          "'sha256-NLYu7UJfoEeB6nLU4nPIrHnkWM4rwqoILy6B1aFj2d0='",
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com'
        ],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'img-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com', 'https://www.google-analytics.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'connect-src': ["'self'", 'https://analytics.google.com', 'https://www.google-analytics.com', 'https://www.googletagmanager.com'],
        'frame-src': ["'self'", 'https://www.youtube.com', 'https://td.doubleclick.net'],
        'worker-src': ["'self'", 'blob:'],
        'media-src': ["'self'", 'blob:']
      }
    }
  },
  renderers: [react()],
  integrations: [
    tailwind(),
    react(),
    icon(),
    mdx()
  ],
  vite: {
    resolve: {
      alias: {
        '@components': path.resolve('./src/components'),
        '@content': path.resolve('./src/content'),
        '@data': path.resolve('./src/data'),
        '@images': path.resolve('./src/images'),
        '@layouts': path.resolve('./src/layouts'),
        '@pages': path.resolve('./src/pages'),
        '@stores': path.resolve('./src/stores'),
        '@styles': path.resolve('./src/styles'),
        '@types': path.resolve('./src/types'),
        '@utils': path.resolve('./src/utils')
      }
    }
  },
  output: 'static',
  build: {
    inlineScripts: true
  }
});