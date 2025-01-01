/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ["localhost", "https://www.galaxytimetour.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://www.galaxytimetour.com",
        port: "",
      },
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.minimize = true; // Ensure minification in production
      config.optimization.minimizer = [
        new (require('terser-webpack-plugin'))({
          terserOptions: {
            compress: {
              drop_console: true, // Removes console logs in production
            },
          },
        }),
      ];
    }
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false, // Prevent 'fs' module errors in client-side code
      path: false, // Prevent 'path' module errors in client-side code
    };

    return config;
  },
};

module.exports = nextConfig;
