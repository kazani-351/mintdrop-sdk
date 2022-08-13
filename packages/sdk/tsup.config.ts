// @todo - move me into some sort of pnpm workspace config/ dir

import { defineConfig } from "tsup"

const pkg = require("./package.json")

export default defineConfig({
  entry: ["src/sdk.ts"],
  splitting: true,
  sourcemap: true,
  clean: true,
  format: [
    "esm",
    "cjs"
    // if for some reason this becomes a <script> loaded library, unccomment me.
    // , "iife"
  ],
  external: [
    // Make everything peer external.
    ...Object.keys(pkg.peerDependencies || {})
  ],
  platform: "browser"
})
