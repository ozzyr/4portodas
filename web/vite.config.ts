import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true, // Expõe em 0.0.0.0 para acesso de celulares e outros dispositivos na rede local
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true
      }
    }
  }
});
