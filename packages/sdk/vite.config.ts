/// <reference types="vitest" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { resolve } from "path"
import { dependencies, peerDependencies } from "./package.json"

export default defineConfig({
  plugins: [react()],
  test: {
    deps: { fallbackCJS: true },
    globals: true,
    environment: "jsdom"
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/sdk.ts"),
      fileName: (format) => `sdk.${format === "cjs" ? "cjs" : "js"}`,
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)]
    }
  }
})
