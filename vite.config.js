import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Sinario Create App',
        short_name: 'SinarioCreate',
        description: 'A scenario creation application.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/SinarioCreate_Logo_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/SinarioCreate_Logo_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
