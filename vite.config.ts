import compression from 'vite-plugin-compression';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
      threshold: 10240, // Compress files larger than 10KB
    }),
  ],
  server: {
    port: 5173,
    open: false,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
});
