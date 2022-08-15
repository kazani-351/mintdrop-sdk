// import alias from "@rollup/plugin-alias"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import typescript from "@rollup/plugin-typescript"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import babel from "@rollup/plugin-babel"
import dotenv from "rollup-plugin-dotenv"

import postcss from "rollup-plugin-postcss"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import nested from "postcss-nested"
import cssnano from "cssnano"

export default {
  input: "src/widget.tsx",
  plugins: [
    // alias({
    //   entries: [
    //     { find: "react", replacement: "preact/compat" },
    //     { find: "react-dom", replacement: "preact/compat" }
    //   ]
    // }),
    dotenv(),
    replace({
      __buildDate__: () => JSON.stringify(new Date()),
      // __buildVersion: 15,
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      preventAssignment: true
    }),
    json(),

    resolve({
      jsnext: true,
      browser: true,
      main: false,
      dedupe: ["react"],
      // preferBuiltins: true,
      extensions: [".js", ".ts", ".tsx"]
    }),

    typescript(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"]
    }),
    commonjs(),

    postcss({
      plugins: [
        tailwindcss(),
        nested(),
        autoprefixer(),
        cssnano({
          preset: ["lite", { discardComments: { removeAll: true } }]
        })
      ],
      inject: true
    })
  ]
}
