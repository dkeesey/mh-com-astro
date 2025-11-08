import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
// import icon from "@astrojs/icon";

import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'https://internment.masumihayashi.com',
  devToolbar: {
    enabled: false,
  },
  security: {
    csp: false
  },
  experimental: {
    clientPrerender: true, // Enables faster page transitions
  },
  integrations: [
    react({
      include: ['**/react/*', '**/components/**/*.tsx', '**/components/**/*.jsx'],
      mode: 'development'
    }),
    tailwind(),
    icon(),
    mdx(),
    sitemap()
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