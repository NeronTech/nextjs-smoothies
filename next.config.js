/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // App Router
  },
  images: {
    domains: ["readdy.ai", "via.placeholder.com", "picsum.photos"], // Add all external domains here
  },
};

module.exports = nextConfig;
