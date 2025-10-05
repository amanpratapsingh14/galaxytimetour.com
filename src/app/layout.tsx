import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/providers"
import { CurrencyProvider } from "@/contexts/currency-context"

export const metadata: Metadata = {
  title: {
    default: "Galaxy Time Tour - Premium Travel Experiences in Thailand",
    template: "%s | Galaxy Time Tour"
  },
  description: "Discover unforgettable travel experiences in Thailand with Galaxy Time Tour. From pristine beaches to cultural adventures, we offer premium tours, comfortable accommodations, and authentic Thai experiences.",
  keywords: [
    "Thailand travel",
    "Thai tours",
    "Bangkok tours",
    "Phuket travel",
    "Pattaya tours",
    "Thai culture",
    "beach vacations",
    "adventure travel",
    "luxury tours",
    "budget travel",
    "Thai cuisine",
    "island hopping",
    "cultural tours",
    "eco-tourism",
    "family vacations"
  ],
  authors: [{ name: "Galaxy Time Tour Team" }],
  creator: "Galaxy Time Tour",
  publisher: "Galaxy Time Tour",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://galaxytimetour.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'th': '/th',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://galaxytimetour.com',
    siteName: 'Galaxy Time Tour',
    title: 'Galaxy Time Tour - Premium Travel Experiences in Thailand',
    description: 'Discover unforgettable travel experiences in Thailand with Galaxy Time Tour. From pristine beaches to cultural adventures, we offer premium tours, comfortable accommodations, and authentic Thai experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Galaxy Time Tour - Thailand Travel Experiences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galaxy Time Tour - Premium Travel Experiences in Thailand',
    description: 'Discover unforgettable travel experiences in Thailand with Galaxy Time Tour.',
    images: ['/og-image.jpg'],
    creator: '@galaxytimetour',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'travel',
  classification: 'travel agency',
  other: {
    'geo.region': 'TH',
    'geo.placename': 'Thailand',
    'geo.position': '13.7563;100.5018',
    'ICBM': '13.7563, 100.5018',
    'DC.title': 'Galaxy Time Tour - Premium Travel Experiences in Thailand',
    'DC.creator': 'Galaxy Time Tour Team',
    'DC.subject': 'Thailand Travel, Tours, Cultural Experiences',
    'DC.description': 'Premium travel experiences in Thailand',
    'DC.publisher': 'Galaxy Time Tour',
    'DC.contributor': 'Galaxy Time Tour Team',
    'DC.date': '2025',
    'DC.type': 'website',
    'DC.format': 'text/html',
    'DC.identifier': 'https://galaxytimetour.com',
    'DC.language': 'en',
    'DC.coverage': 'Thailand',
    'DC.rights': 'Copyright 2025 Galaxy Time Tour',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0369a1' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Galaxy Time Tour",
              "description": "Premium travel experiences in Thailand",
              "url": "https://galaxytimetour.com",
              "logo": "https://galaxytimetour.com/logo.png",
              "image": "https://galaxytimetour.com/hero-image.jpg",
              "telephone": "+66-951123458",
              "email": "info@galaxytimetour.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "145, 24, Muang Pattaya",
                "addressLocality": "Bang Lamung District",
                "addressRegion": "Chon Buri",
                "postalCode": "20150",
                "addressCountry": "TH"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 13.7563,
                "longitude": 100.5018
              },
              "openingHours": "Mo-Su 09:00-18:00",
              "priceRange": "$",
              "currenciesAccepted": "THB, USD, EUR",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "areaServed": "Thailand",
              "serviceType": "Travel Agency",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Thailand Travel Packages",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "TouristTrip",
                      "name": "Phuket Beach Adventure",
                      "description": "Explore pristine beaches and crystal clear waters"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.facebook.com/galaxytimetour",
                "https://twitter.com/galaxytimetour",
                "https://www.instagram.com/galaxytimetour"
              ]
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CurrencyProvider>
            <div className="relative min-h-screen flex flex-col">
              <MainNav />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

