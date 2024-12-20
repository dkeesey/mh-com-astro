import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // Allow specific hashes that Astro's dev tools need
  response.headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' 'inline-speculation-rules' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https://res.cloudinary.com https://www.google-analytics.com; " +
    "media-src 'self' blob:; " +
    "connect-src 'self' https://analytics.google.com https://www.google-analytics.com https://www.googletagmanager.com; " +
    "worker-src 'self' blob:; " +
    "frame-src 'self' https://www.youtube.com https://td.doubleclick.net"
  );

  return response;
});
