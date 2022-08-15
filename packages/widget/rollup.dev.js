import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"

import config from "./rollup.config"

config.output = [
  {
    file: "dist/widget.dev.js",
    format: "iife",
    sourcemap: true,
    inlineDynamicImports: true
  }
]

config.plugins.push(
  serve({
    verbose: true,
    contentBase: ["", "public"],
    host: "localhost",
    port: 3001,
    open: false
  })
)

config.plugins.push(livereload({ watch: "dist" }))

export default config
