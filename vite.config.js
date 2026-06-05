import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: '/SSVD-Constructions/',
  plugins: [
    ViteImageOptimizer({
      png: {
        // Compress PNGs – quality 0-100
        quality: 70,
      },
      jpeg: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
      webp: {
        lossless: false,
        quality: 75,
      },
    }),
  ],
  build: {
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Expose to LAN – mobile on same Wi-Fi can open http://192.168.0.6:5173
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});

