import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV !== "production"

// Next.js injects inline bootstrap scripts, so script-src needs 'unsafe-inline' unless
// every page is rendered dynamically with a nonce. Everything else is locked to our origin.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src https://www.google.com https://maps.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ")

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/:dir(Videos|bangkok|chiang_mai|chiang_rai|hua_hin|koh_samui|krabi|pattaya|phuket|thailand|ImgGallery)/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ]
  },

  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/tours", destination: "/packages", permanent: true },
      { source: "/book", destination: "/destinations", permanent: false },
    ]
  },
}

export default nextConfig
