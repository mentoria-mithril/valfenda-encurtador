import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // O front chama /api/... e o Vite repassa para a API. Assim não existe
    // URL de backend espalhada pelo código nem dor de cabeça com CORS.
    proxy: {
      "/api": { target: "http://localhost:3333", changeOrigin: true },
    },
  },
});
