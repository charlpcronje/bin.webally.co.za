/* frontend/vite.config.js */
/**
 * @file frontend/vite.config.js
 * Vite configuration for React with Tailwind.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
