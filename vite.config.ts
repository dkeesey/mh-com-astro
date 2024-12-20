import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-scroll-area',
      '@radix/react-dialog',
      'class-variance-authority',
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ]
  },
  build: {
    sourcemap: true
  }
});
