module.exports = {
  extends: ["next", "prettier", "next/core-web-vitals"],
  plugins: ["simple-import-sort"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "@next/next/no-img-element": "off"
  }
}
