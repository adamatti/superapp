import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import {Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    importToCDN({
      prodUrl: 'https://unpkg.com/{name}@{version}/{path}',
      modules: [
          autoComplete('react'),          
          autoComplete('react-dom'),
          // TODO add others here
      ],
    }),
    reactRefresh(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: Number(process.env.PORT || 8080),
    strictPort: true
  },
  build: {
    chunkSizeWarningLimit: 1024,
  }
})
