import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
// import icon from "@astrojs/icon";

import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import devtoolBreakpoints from "astro-devtool-breakpoints";
import partytown from "@astrojs/partytown";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  renderers: [react()],
  integrations: [tailwind(), react(), icon(), mdx(), devtoolBreakpoints(), partytown({
      config: {
        forward: ["dataLayer.push"],
    }
  })],
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
  },
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://www.googletagmanager.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: blob: https://res.cloudinary.com;
        media-src 'self' blob:;
        connect-src 'self';
        object-src 'none';
        frame-ancestors 'none';
        worker-src 'self' blob:;
        form-action 'self'
      `.replace(/\s+/g, ' ').trim()
    }
  }
});