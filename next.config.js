/** @type {import('next').NextConfig} */
const repo = 'daffakbar13.github.io'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`
const nextConfig = {
  assetPrefix,
  basePath,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'imgix',
    path: `${repo}/`,
  },
}

module.exports = nextConfig
