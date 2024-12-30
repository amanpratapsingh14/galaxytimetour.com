/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ["localhost", "www.galaxytimetour.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.galaxytimetour.com",
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
    return config;
  },
};

module.exports = nextConfig;
