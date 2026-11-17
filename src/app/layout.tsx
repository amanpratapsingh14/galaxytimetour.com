import type { Metadata, Viewport } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/providers"
import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import { WhatsAppButton } from "@/components/site/whatsapp-button"
import { CurrencyProvider } from "@/contexts/currency-context"
import { destinations } from "@/data/destinations"
import { siteConfig } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap", weight: ["500", "600", "700", "800"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Tailor-made Thailand Tours & Holidays`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Thailand tour packages",
    "Thailand holiday",
    "Pattaya travel agency",
    "Bangkok tours",
    "Phuket packages",
    "Krabi island tours",
    "Chiang Mai tours",
    "Thailand honeymoon",
    "Thailand tour from India",
    "TAT licensed travel agent",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  category: "travel",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico", sizes: "any" },
      { url: "/favicon_io/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon_io/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Tailor-made Thailand Tours`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Tailor-made Thailand Tours`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7fd" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f2b" },
  ],
  width: "device-width",
  initialScale: 1,
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo_1.png`,
  image: `${siteConfig.url}/hero_image.webp`,
  telephone: siteConfig.phones.map((p) => p.href.replace("tel:", "")),
  email: siteConfig.emails[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  },
  geo: { "@type": "GeoCoordinates", latitude: siteConfig.address.lat, longitude: siteConfig.address.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ],
  knowsLanguage: siteConfig.languages,
  areaServed: { "@type": "Country", name: "Thailand" },
  priceRange: "$$",
  sameAs: Object.values(siteConfig.social),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Thailand destinations",
    itemListElement: destinations.map((d) => ({
      "@type": "Offer",
      itemOffered: { "@type": "TouristTrip", name: `${d.name} tour`, description: d.description },
      price: d.basePriceUSD,
      priceCurrency: "USD",
    })),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          // JSON.stringify output is safe here: the data is static and contains no "</script>".
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <CurrencyProvider>
            <a
              href="#main"
              className="sr-only z-[60] rounded-full bg-background px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main" className="min-h-dvh">
              {children}
            </main>
            <SiteFooter />
            <WhatsAppButton />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
