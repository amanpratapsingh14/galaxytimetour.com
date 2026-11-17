import type { MetadataRoute } from "next"

import { destinations } from "@/data/destinations"
import { mainNav, siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    ...mainNav.map((n) => ({
      url: `${siteConfig.url}${n.href}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: n.href === "/destinations" || n.href === "/packages" ? 0.9 : 0.7,
    })),
    ...destinations.map((d) => ({
      url: `${siteConfig.url}/book/${d.id}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: d.images.map((src) => `${siteConfig.url}${src}`),
    })),
  ]
}
