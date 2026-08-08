import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const normalizedId = id.replace(/\\/g, "/");
            if (
              normalizedId.includes("node_modules/react/") ||
              normalizedId.includes("node_modules/react-dom/") ||
              normalizedId.includes("node_modules/react-router-dom/") ||
              normalizedId.includes("node_modules/@remix-run/router/")
            ) {
              return "vendor-react";
            }
            if (normalizedId.includes("node_modules/framer-motion/")) {
              return "vendor-motion";
            }
            if (normalizedId.includes("node_modules/lucide-react/")) {
              return "vendor-icons";
            }
          }
        },
      },
    },
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
