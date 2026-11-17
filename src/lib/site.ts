export const siteConfig = {
  name: "Galaxy Time Tour",
  legalName: "Galaxy Time Tour Co., Ltd.",
  url: "https://galaxytimetour.com",
  tagline: "Thailand, beyond the ordinary.",
  description:
    "TAT-licensed Thailand travel experts based in Pattaya. Tailor-made tours, island escapes and city breaks across Bangkok, Phuket, Krabi, Chiang Mai and more — with 24/7 multilingual support.",
  license: "TAT License No. 14/03381",
  address: {
    street: "145, 24, Muang Pattaya",
    locality: "Bang Lamung District",
    region: "Chon Buri",
    postalCode: "20150",
    country: "Thailand",
    countryCode: "TH",
    lat: 12.9236,
    lng: 100.8825,
  },
  phones: [
    { label: "Thailand", display: "+66 95 112 3458", href: "tel:+66951123458" },
    { label: "Thailand", display: "+66 61 880 0005", href: "tel:+66618800005" },
    { label: "India", display: "+91 98711 71680", href: "tel:+919871171680" },
  ],
  whatsapp: "66951123458",
  emails: ["info@galaxytimetour.com", "ali@galaxytimetour.com"],
  hours: ["Mon – Fri: 9:00 – 18:00", "Sat: 10:00 – 16:00"],
  languages: ["English", "Hindi", "Thai"],
  social: {
    facebook: "https://www.facebook.com/galaxytimetour",
    instagram: "https://www.instagram.com/galaxytimetour",
    x: "https://x.com/galaxytimetour",
  },
} as const

export const mainNav = [
  { name: "Destinations", href: "/destinations" },
  { name: "Packages", href: "/packages" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${siteConfig.whatsapp}${text}`
}

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}, ${siteConfig.address.country}`
