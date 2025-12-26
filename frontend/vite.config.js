import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/messages": {
        target: "http://localhost:5001", // backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
