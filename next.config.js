/** @type {import('next').NextConfig} */
const nextConfig = {
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
