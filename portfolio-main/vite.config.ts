import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: mode === "development"
      ? {
          "/api": {
            target: "https://rohit-khankriyal-new-portfolio.onrender.com",
            changeOrigin: true,
            secure: false,
          },
        }
      : undefined,
  },
  build: {
    // optional: change outDir to match firebase if you prefer 'build'
    // outDir: 'build'
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
