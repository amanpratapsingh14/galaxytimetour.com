export interface Destination {
  id: string
  name: string
  image: string
  description: string
  basePriceUSD: number
  basePriceINR: number
}

export const destinations: Destination[] = [
  {
    id: "pattaya",
    name: "Pattaya",
    image: "/pattaya/pattaya_1.png",
    description: "Sandy beaches, thrilling water sports, and seafood feasts await in this coastal gem popular with day trippers.",
    basePriceUSD: 605,
    basePriceINR: 50215,
  },
  {
    id: "bangkok",
    name: "Bangkok",
    image: "/bangkok/bgk_1.png",
    description: "Vibrant street life and stunning cultural landmarks like the Grand Palace and sacred Buddhist temples.",
    basePriceUSD: 665,
    basePriceINR: 55195,
  },
  {
    id: "phuket",
    name: "Phuket",
    image: "/phuket/phuket_1.png",
    description: "Home to iconic sights like the Big Buddha, Wat Chalong, and the famous Wang Talang shopping district.",
    basePriceUSD: 845,
    basePriceINR: 70135,
  },
  {
    id: "krabi",
    name: "Krabi",
    image: "/krabi/krabi_1.png",
    description: "Scenic rocky beaches perfect for hiking, scuba diving, and unforgettable snorkeling adventures.",
    basePriceUSD: 785,
    basePriceINR: 65155,
  },
  {
    id: "koh-samui",
    name: "Koh Samui",
    image: "/koh_samui/koh_samui_1.png",
    description: "A tropical paradise with lush nature, rich culture, and serene historical attractions to explore.",
    basePriceUSD: 720,
    basePriceINR: 59760,
  },
  {
    id: "chiang-mai",
    name: "Chiang Mai",
    image: "/chiang_mai/chiang_mai_1.png",
    description: "A charming and peaceful northern city known for its temples, markets, and mountain scenery.",
    basePriceUSD: 680,
    basePriceINR: 56440,
  },
  {
    id: "hua-hin",
    name: "Hua Hin",
    image: "/hua_hin/hua_hin_1.png",
    description: "Beautiful beaches and a cultural mix that make every moment feel timeless and relaxing.",
    basePriceUSD: 700,
    basePriceINR: 58100,
  },
  {
    id: "chiang-rai",
    name: "Chiang Rai",
    image: "/chiang_rai/chiang_rai_1.png",
    description: "Discover the Golden Triangle and explore unique temples in Thailand's northernmost province.",
    basePriceUSD: 650,
    basePriceINR: 53950,
  },
]
