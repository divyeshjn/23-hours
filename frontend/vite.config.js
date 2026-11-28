import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "app-icon.svg",
        "icon-180.png",
        "icon-192.png",
        "icon-512.png"
      ],

      manifest: {
        id: "/",

        name: "23 Hours",

        short_name: "23 Hours",

        description:
          "Personal nutrition, fitness and progress tracker.",

        theme_color: "#0B0B0B",

        background_color: "#0B0B0B",

        display: "standalone",

        orientation: "portrait",

        start_url: "/",

        scope: "/",

        lang: "en",

        categories: [
          "health",
          "fitness",
          "lifestyle"
        ],

        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },

          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          }
        ]
      },

      workbox: {
        cleanupOutdatedCaches: true,

        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,woff,woff2}"
        ],

        navigateFallback: "/index.html",

        navigateFallbackDenylist: [
          /^\/api(?:\/|$)/
        ],

        runtimeCaching: []
      },

      devOptions: {
        enabled: false
      }
    })
  ]
});