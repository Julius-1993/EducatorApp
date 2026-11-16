import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: { output: { manualChunks: { react: ['react', 'react-dom'], lucide: ['lucide-react'] } } },
  },
  server: { port: 5173, strictPort: true, proxy: { '/api': { target: 'http://localhost:3001', changeOrigin: true } } },
  test: {
    environment: 'jsdom',
    environmentOptions: { jsdom: { url: 'http://localhost:3000/' } },
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.{js,jsx}'],
    css: false,
    testTimeout: 20000,
  },
});
