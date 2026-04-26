import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/sos-carro/",
  plugins: [tanstackRouter(), react(), tsconfigPaths(), tailwindcss()],
});
