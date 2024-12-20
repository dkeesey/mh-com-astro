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
    csp: false
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