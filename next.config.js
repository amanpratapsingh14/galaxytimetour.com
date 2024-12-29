/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.galaxytimetour.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
