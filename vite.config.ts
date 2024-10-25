import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mark Formelle Dashboard",
        short_name: "Dashboard",
        description: "Dashboard для трикотажного участка",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#fff",
        icons: [
          {
            src: "windows11/Square44x44Logo.targetsize-256.png",
            sizes: "256x256",
          },
          {
            src: "android/android-launchericon-192-192.png",
            sizes: "192x192",
          },
        ],
        screenshots: [
          {
            src: "/images/desktop.png",
            sizes: "1200x800",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/mobile.png",
            sizes: "600x800",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
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
