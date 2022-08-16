const withMarkdoc = require("@markdoc/next.js")

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PASSWORD: "launchingseptember14"
  },
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  basePath: "/docs",
  experimental: {
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true
    }
  }
}

module.exports = withMarkdoc()(nextConfig)
