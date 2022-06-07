/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
  },
  webpack: (config) => {
    config.experiments.asyncWebAssembly = true
    return config
  },
})

module.exports = nextConfig
