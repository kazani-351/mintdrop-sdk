import analyze from "rollup-plugin-analyzer"
import { visualizer } from "rollup-plugin-visualizer"
import { terser } from "rollup-plugin-terser"
import { uglify } from "rollup-plugin-uglify"

import config from "./rollup.config"

config.output = [
  {
    file: "dist/widget.js",
    format: "iife",
    sourcemap: false,
    inlineDynamicImports: true,
    plugins: [
      terser(),
      uglify(),
      analyze({
        limit: 10,
        summaryOnly: true
      }),
      visualizer({
        filename: "./dist/stats.html",
        template: "treemap"
      })
    ]
  }
]

export default config
