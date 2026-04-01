/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Reduce file descriptor pressure in local dev to avoid EMFILE.
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/.git/**', '**/.next/**', '**/node_modules/**'],
      };
    }
    return config;
  },
}

module.exports = nextConfig
