import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/V58-tier3-team-35/" : "/",
  // base: "/V58-tier3-team-35/",
}));
