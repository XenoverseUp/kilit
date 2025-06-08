// @ts-check
import { defineConfig } from "astro/config"
import tsconfigPaths from "vite-tsconfig-paths"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tsconfigPaths()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:5173",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    base: "/",
    build: {
      outDir: "dist",
    },
  },
})
