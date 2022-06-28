/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = withPWA({
  reactStrictMode: false,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  eslint: {
    // Ignore eslint checks during `next build` run on CI, because it's checked on a separate step before
    ignoreDuringBuilds: process.env.NEXT_CI_BUILD === 'true',
  },
  typescript: {
    // Ignore typescript checks during `next build` run on CI, because it's checked on a separate step before
    ignoreBuildErrors: process.env.NEXT_CI_BUILD === 'true',
  },
  webpack: (config) => {
    config.experiments.asyncWebAssembly = true
    return config
  },
})

module.exports = nextConfig
