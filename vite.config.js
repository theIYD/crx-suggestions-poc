import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
// import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest: {
        manifest_version: 3,
        name: "CRXJS React Vite Example",
        version: "1.0.0",
        action: { default_popup: "index.html" },
        content_scripts: [
          {
            js: ["src/content.jsx"],
            matches: ["<all_urls>"],
          },
        ],
        background: {
          service_worker: "src/background.js",
          type: "module",
        },
        web_accessible_resources: [
          {
            resources: ["icons/*.png"],
            matches: [],
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
