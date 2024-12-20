import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // Remove any existing CSP headers
  response.headers.delete('Content-Security-Policy');
  response.headers.delete('Content-Security-Policy-Report-Only');
  
  // Set a permissive CSP for development
  response.headers.set('Content-Security-Policy', 
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; " +
    "script-src * 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' data: blob:; " +
    "style-src * 'unsafe-inline'; " +
    "img-src * data: blob:; " +
    "font-src * data:; " +
    "connect-src * data: blob:; " +
    "frame-src *; " +
    "worker-src * blob:;"
  );

  return response;
});
