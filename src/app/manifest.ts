import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Galaxy Tour",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0d0f2b",
    theme_color: "#0d0f2b",
    icons: [
      { src: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
