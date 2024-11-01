// vite.config.ts
import { defineConfig } from "file:///C:/Users/a.nigmatzhonov/Desktop/markformelle/test/markformelle_admin/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/a.nigmatzhonov/Desktop/markformelle/test/markformelle_admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/a.nigmatzhonov/Desktop/markformelle/test/markformelle_admin/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mark Formelle Dashboard",
        short_name: "Dashboard",
        description: "Dashboard \u0434\u043B\u044F \u0442\u0440\u0438\u043A\u043E\u0442\u0430\u0436\u043D\u043E\u0433\u043E \u0443\u0447\u0430\u0441\u0442\u043A\u0430",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#fff",
        icons: [
          {
            src: "windows11/Square44x44Logo.targetsize-256.png",
            sizes: "256x256"
          },
          {
            src: "android/android-launchericon-192-192.png",
            sizes: "192x192"
          }
        ],
        screenshots: [
          {
            src: "/images/desktop.png",
            sizes: "1200x800",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "/images/mobile.png",
            sizes: "600x800",
            type: "image/png",
            form_factor: "narrow"
          }
        ]
      }
    })
  ],
  // base: "./assets",
  publicDir: "public",
  build: {
    outDir: "dist"
  },
  server: {
    port: 7777,
    host: true
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
      views: "/src/views"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "scss/_mixins.scss";'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhLm5pZ21hdHpob25vdlxcXFxEZXNrdG9wXFxcXG1hcmtmb3JtZWxsZVxcXFx0ZXN0XFxcXG1hcmtmb3JtZWxsZV9hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYS5uaWdtYXR6aG9ub3ZcXFxcRGVza3RvcFxcXFxtYXJrZm9ybWVsbGVcXFxcdGVzdFxcXFxtYXJrZm9ybWVsbGVfYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2EubmlnbWF0emhvbm92L0Rlc2t0b3AvbWFya2Zvcm1lbGxlL3Rlc3QvbWFya2Zvcm1lbGxlX2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogXCJNYXJrIEZvcm1lbGxlIERhc2hib2FyZFwiLFxyXG4gICAgICAgIHNob3J0X25hbWU6IFwiRGFzaGJvYXJkXCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGFzaGJvYXJkIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0NDJcdTA0NDBcdTA0MzhcdTA0M0FcdTA0M0VcdTA0NDJcdTA0MzBcdTA0MzZcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDQzXHUwNDQ3XHUwNDMwXHUwNDQxXHUwNDQyXHUwNDNBXHUwNDMwXCIsXHJcbiAgICAgICAgc3RhcnRfdXJsOiBcIi9cIixcclxuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcclxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiNmZmZmZmZcIixcclxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcIndpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28udGFyZ2V0c2l6ZS0yNTYucG5nXCIsXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjI1NngyNTZcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkL2FuZHJvaWQtbGF1bmNoZXJpY29uLTE5Mi0xOTIucG5nXCIsXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzY3JlZW5zaG90czogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL2ltYWdlcy9kZXNrdG9wLnBuZ1wiLFxyXG4gICAgICAgICAgICBzaXplczogXCIxMjAweDgwMFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICBmb3JtX2ZhY3RvcjogXCJ3aWRlXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL2ltYWdlcy9tb2JpbGUucG5nXCIsXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjYwMHg4MDBcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgZm9ybV9mYWN0b3I6IFwibmFycm93XCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIC8vIGJhc2U6IFwiLi9hc3NldHNcIixcclxuICBwdWJsaWNEaXI6IFwicHVibGljXCIsXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogXCJkaXN0XCIsXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDc3NzcsXHJcbiAgICBob3N0OiB0cnVlLFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgY29tcG9uZW50czogXCIvc3JjL2NvbXBvbmVudHNcIixcclxuICAgICAgaG9va3M6IFwiL3NyYy9ob29rc1wiLFxyXG4gICAgICBsYXlvdXQ6IFwiL3NyYy9sYXlvdXRcIixcclxuICAgICAgc2NzczogXCIvc3JjL3Njc3NcIixcclxuICAgICAgc2VydmljZXM6IFwiL3NyYy9zZXJ2aWNlc1wiLFxyXG4gICAgICBzdG9yZTogXCIvc3JjL3N0b3JlXCIsXHJcbiAgICAgIHV0aWxzOiBcIi9zcmMvdXRpbHNcIixcclxuICAgICAgdmlld3M6IFwiL3NyYy92aWV3c1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwic2Nzcy9fbWl4aW5zLnNjc3NcIjsnLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0WSxTQUFTLG9CQUFvQjtBQUN6YSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLFdBQVc7QUFBQSxRQUNYLFNBQVM7QUFBQSxRQUNULGtCQUFrQjtBQUFBLFFBQ2xCLGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLFFBQ0EsYUFBYTtBQUFBLFVBQ1g7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLGFBQWE7QUFBQSxVQUNmO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sYUFBYTtBQUFBLFVBQ2Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBLEVBRUEsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
