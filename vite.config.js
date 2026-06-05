import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
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

