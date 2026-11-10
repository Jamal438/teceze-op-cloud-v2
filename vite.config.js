import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// The app calls https://api.anthropic.com/v1/messages for its AI features.
// src/main.jsx rewrites those calls to /anthropic, and this proxy forwards
// them to Anthropic with your API key added on the server side, so the key
// never reaches the browser. Set ANTHROPIC_API_KEY in a .env file.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const anthropicProxy = {
    "/anthropic": {
      target: "https://api.anthropic.com",
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/anthropic/, ""),
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
    },
  };
  return {
    plugins: [react()],
    server: { port: 5173, open: true, proxy: anthropicProxy },
    preview: { port: 4173, proxy: anthropicProxy },
    build: { chunkSizeWarningLimit: 4000 },
  };
});
