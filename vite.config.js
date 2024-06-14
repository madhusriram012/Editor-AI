import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/_mixins.scss";`,
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp("/*.*"),
            handler: "NetworkFirst",
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
});
