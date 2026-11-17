export type DestinationRegion = "Central" | "East Coast" | "Andaman Sea" | "Gulf of Thailand" | "North"
export type DestinationVibe = "Beach" | "City" | "Culture" | "Nature" | "Nightlife" | "Adventure"

export interface Destination {
  id: string
  name: string
  tagline: string
  region: DestinationRegion
  vibes: DestinationVibe[]
  image: string
  images: string[]
  description: string
  highlights: string[]
  basePriceUSD: number
  basePriceINR: number
}

export const destinations: Destination[] = [
  {
    id: "pattaya",
    name: "Pattaya",
    tagline: "Sun, sea & non-stop energy",
    region: "East Coast",
    vibes: ["Beach", "Nightlife", "Adventure"],
    image: "/pattaya/pattaya_1.png",
    images: ["/pattaya/pattaya_1.png", "/pattaya/pattaya_2.png", "/pattaya/pattaya_3.png", "/pattaya/pattaya_4.png", "/pattaya/pattaya_5.png"],
    description: "Sandy beaches, thrilling water sports, and seafood feasts await in this coastal gem popular with day trippers.",
    highlights: ["Coral Island snorkeling", "Water sports & parasailing", "Walking Street nightlife", "Seafood by the sea"],
    basePriceUSD: 605,
    basePriceINR: 50215,
  },
  {
    id: "bangkok",
    name: "Bangkok",
    tagline: "Temples, tuk-tuks & rooftop nights",
    region: "Central",
    vibes: ["City", "Culture", "Nightlife"],
    image: "/bangkok/bgk_1.png",
    images: ["/bangkok/bgk_1.png", "/bangkok/bgk_2.png", "/bangkok/bgk_3.png", "/bangkok/bgk_4.png", "/bangkok/bgk_5.png", "/bangkok/bgk_6.png"],
    description: "Vibrant street life and stunning cultural landmarks like the Grand Palace and sacred Buddhist temples.",
    highlights: ["Grand Palace & Wat Pho", "Chao Phraya river cruise", "Floating markets", "Street-food tours"],
    basePriceUSD: 665,
    basePriceINR: 55195,
  },
  {
    id: "phuket",
    name: "Phuket",
    tagline: "Island hopping in the Andaman",
    region: "Andaman Sea",
    vibes: ["Beach", "Adventure", "Nightlife"],
    image: "/phuket/phuket_1.png",
    images: ["/phuket/phuket_1.png", "/phuket/phuket_2.png", "/phuket/phuket_3.png", "/phuket/phuket_4.png", "/phuket/phuket_5.png"],
    description: "Home to iconic sights like the Big Buddha, Wat Chalong, and the famous Wang Talang shopping district.",
    highlights: ["Phi Phi Islands day trip", "Big Buddha & Wat Chalong", "Old Phuket Town", "Patong Beach"],
    basePriceUSD: 845,
    basePriceINR: 70135,
  },
  {
    id: "krabi",
    name: "Krabi",
    tagline: "Limestone cliffs & hidden lagoons",
    region: "Andaman Sea",
    vibes: ["Beach", "Nature", "Adventure"],
    image: "/krabi/krabi_1.png",
    images: ["/krabi/krabi_1.png", "/krabi/krabi_2.png", "/krabi/krabi_3.png", "/krabi/krabi_4.png", "/krabi/krabi_5.png"],
    description: "Scenic rocky beaches perfect for hiking, scuba diving, and unforgettable snorkeling adventures.",
    highlights: ["4 Islands longtail tour", "Railay Beach climbing", "Emerald Pool & hot springs", "Sunset kayaking"],
    basePriceUSD: 785,
    basePriceINR: 65155,
  },
  {
    id: "koh-samui",
    name: "Koh Samui",
    tagline: "Palm-fringed island calm",
    region: "Gulf of Thailand",
    vibes: ["Beach", "Nature"],
    image: "/koh_samui/koh_samui_1.png",
    images: ["/koh_samui/koh_samui_1.png", "/koh_samui/koh_samui_2.png", "/koh_samui/koh_samui_3.png", "/koh_samui/koh_samui_4.png", "/koh_samui/koh_samui_5.png"],
    description: "A tropical paradise with lush nature, rich culture, and serene historical attractions to explore.",
    highlights: ["Ang Thong Marine Park", "Big Buddha Temple", "Na Muang waterfalls", "Beachfront spas"],
    basePriceUSD: 720,
    basePriceINR: 59760,
  },
  {
    id: "chiang-mai",
    name: "Chiang Mai",
    tagline: "Mountain temples & night bazaars",
    region: "North",
    vibes: ["Culture", "Nature"],
    image: "/chiang_mai/chiang_mai_1.png",
    images: ["/chiang_mai/chiang_mai_1.png", "/chiang_mai/chiang_mai_2.png", "/chiang_mai/chiang_mai_3.png", "/chiang_mai/chiang_mai_4.png", "/chiang_mai/chiang_mai_5.png", "/chiang_mai/chian_mai_6.png"],
    description: "A charming and peaceful northern city known for its temples, markets, and mountain scenery.",
    highlights: ["Doi Suthep temple", "Ethical elephant sanctuary", "Old City & night bazaar", "Thai cooking class"],
    basePriceUSD: 680,
    basePriceINR: 56440,
  },
  {
    id: "hua-hin",
    name: "Hua Hin",
    tagline: "Royal seaside escape",
    region: "Gulf of Thailand",
    vibes: ["Beach", "Culture"],
    image: "/hua_hin/hua_hin_1.png",
    images: ["/hua_hin/hua_hin_1.png", "/hua_hin/hua_hin_2.png", "/hua_hin/hua_hin_3.png", "/hua_hin/hua_hin_4.png", "/hua_hin/hua_hin_5.png"],
    description: "Beautiful beaches and a cultural mix that make every moment feel timeless and relaxing.",
    highlights: ["Hua Hin railway station", "Cicada night market", "Khao Takiab viewpoint", "Vineyard tours"],
    basePriceUSD: 700,
    basePriceINR: 58100,
  },
  {
    id: "chiang-rai",
    name: "Chiang Rai",
    tagline: "Golden Triangle wonders",
    region: "North",
    vibes: ["Culture", "Nature"],
    image: "/chiang_rai/chiang_rai_1.png",
    images: ["/chiang_rai/chiang_rai_1.png", "/chiang_rai/chiang_rai_2.png", "/chiang_rai/chiang_rai_3.png", "/chiang_rai/chiang_rai_4.png", "/chiang_rai/chiang_rai_5.png"],
    description: "Discover the Golden Triangle and explore unique temples in Thailand's northernmost province.",
    highlights: ["White Temple (Wat Rong Khun)", "Blue Temple", "Golden Triangle viewpoint", "Hill-tribe villages"],
    basePriceUSD: 650,
    basePriceINR: 53950,
  },
]

export function getDestination(id: string) {
  return destinations.find((d) => d.id === id)
}
