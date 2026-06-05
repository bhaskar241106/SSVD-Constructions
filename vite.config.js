import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Raise the asset inline limit so small images get inlined as base64
    assetsInlineLimit: 4096,
    // Enable CSS code splitting
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Better chunking for caching
        manualChunks: undefined,
      },
    },
  },
  // Serve assets with correct MIME types
  server: {
    host: true,        // expose to LAN so mobile devices on the same Wi-Fi can access it
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
