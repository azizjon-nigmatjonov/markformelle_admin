import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "./assets",
  publicDir: "public",
  build: {
    outDir: "dist",
  },
  server: {
    port: 7777,
    host: true,
  },
  resolve: {
    alias: {
      components: "/src/components",
      hooks: "/src/hooks",
      layout: "/src/layout",
      scss: "/src/scss",
      services: "/src/services",
      store: "/src/store",
      utils: "/src/utils",
      views: "/src/views",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "scss/_mixins.scss";',
      },
    },
  },
});
