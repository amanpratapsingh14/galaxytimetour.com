export interface PackageItinerary {
  day: number
  activity: string
}

export interface PackageInclusion {
  type: string
  description: string
}

export interface TravelPackage {
  id: string
  destinationId: string
  type: 'standard' | 'premium'
  title: string
  duration: { days: number; nights: number }
  inclusions: string[]
  itinerary: PackageItinerary[]
  priceUSD: number
  priceINR: number
  originalPriceUSD?: number
  originalPriceINR?: number
  discount?: number
  image: string
  description: string
}

export const packages: TravelPackage[] = [
  // Pattaya Packages
  {
    id: "pattaya-standard",
    destinationId: "pattaya",
    type: "standard",
    title: "Pattaya Coastal Escape",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Hotel (3★ / 4★)",
      "Daily Breakfast",
      "Coral Island tour with snorkeling",
      "Water sports activities",
      "Airport & intercity transfers",
      "Local guide assistance"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Pattaya, relax at beach, evening market visit" },
      { day: 2, activity: "Coral Island full-day tour with snorkeling & lunch" },
      { day: 3, activity: "Free day / optional water sports or local excursions" },
      { day: 4, activity: "Check-out and departure transfers" }
    ],
    priceUSD: 605,
    priceINR: 50215,
    originalPriceUSD: 720,
    originalPriceINR: 59760,
    discount: 16,
    image: "/pattaya/pattaya_1.png",
    description: "Perfect beach getaway with island tours and water activities"
  },
  {
    id: "pattaya-premium",
    destinationId: "pattaya",
    type: "premium",
    title: "Pattaya Deluxe Experience",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Luxury Hotel (5★ beachfront)",
      "Breakfast & Dinner",
      "Private Coral Island tour",
      "Premium water sports (jet ski, parasailing)",
      "VIP transfers with private guide",
      "Spa treatment (1 session)"
    ],
    itinerary: [
      { day: 1, activity: "VIP arrival, luxury transfer, beachfront dinner" },
      { day: 2, activity: "Private Coral Island tour with premium activities" },
      { day: 3, activity: "Optional Bangkok day trip or luxury spa day" },
      { day: 4, activity: "Departure with deluxe transfer service" }
    ],
    priceUSD: 850,
    priceINR: 70550,
    originalPriceUSD: 950,
    originalPriceINR: 78850,
    discount: 11,
    image: "/pattaya/pattaya_2.png",
    description: "Luxury coastal experience with premium amenities and private tours"
  },

  // Bangkok Packages
  {
    id: "bangkok-standard",
    destinationId: "bangkok",
    type: "standard",
    title: "Bangkok Cultural Journey",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Hotel (3★ / 4★)",
      "Daily Breakfast",
      "City & temple tours",
      "Chao Phraya River cruise",
      "Airport transfers",
      "Local guide for tours"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Bangkok, explore local markets & street food" },
      { day: 2, activity: "Grand Palace, Wat Pho, Wat Arun & river cruise" },
      { day: 3, activity: "Day trip to Ayutthaya historical park" },
      { day: 4, activity: "Final shopping & departure" }
    ],
    priceUSD: 665,
    priceINR: 55195,
    originalPriceUSD: 780,
    originalPriceINR: 64740,
    discount: 15,
    image: "/bangkok/bgk_1.png",
    description: "Immerse in Thai culture with temple tours and historical sites"
  },
  {
    id: "bangkok-premium",
    destinationId: "bangkok",
    type: "premium",
    title: "Bangkok Premium Explorer",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Luxury Hotel (5★)",
      "Breakfast & Dinner",
      "Private guided tours",
      "Luxury dinner river cruise",
      "VIP airport transfers",
      "Cultural show tickets"
    ],
    itinerary: [
      { day: 1, activity: "VIP pickup, luxury hotel check-in, evening cultural show" },
      { day: 2, activity: "Private Grand Palace & hidden temples tour" },
      { day: 3, activity: "Private Ayutthaya day trip with luxury transport" },
      { day: 4, activity: "Premium shopping experience & departure" }
    ],
    priceUSD: 950,
    priceINR: 78850,
    originalPriceUSD: 1100,
    originalPriceINR: 91300,
    discount: 14,
    image: "/bangkok/bgk_2.png",
    description: "Premium cultural experience with luxury accommodations and private tours"
  },

  // Phuket Packages
  {
    id: "phuket-standard",
    destinationId: "phuket",
    type: "standard",
    title: "Phuket Island Escape",
    duration: { days: 5, nights: 4 },
    inclusions: [
      "Hotel (4★ beachfront)",
      "Breakfast & Dinner",
      "Phi Phi Islands tour",
      "James Bond Island tour",
      "Snorkeling & kayaking",
      "Airport transfers"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Phuket, beach relaxation & local exploration" },
      { day: 2, activity: "Phi Phi Islands full-day tour with snorkeling" },
      { day: 3, activity: "James Bond Island & kayaking adventure" },
      { day: 4, activity: "Free day / optional local tours or spa" },
      { day: 5, activity: "Departure transfers" }
    ],
    priceUSD: 845,
    priceINR: 70135,
    originalPriceUSD: 980,
    originalPriceINR: 81340,
    discount: 14,
    image: "/phuket/phuket_1.png",
    description: "Complete island experience with famous Phi Phi and James Bond tours"
  },
  {
    id: "phuket-premium",
    destinationId: "phuket",
    type: "premium",
    title: "Phuket Luxury Retreat",
    duration: { days: 5, nights: 4 },
    inclusions: [
      "Luxury Resort (5★ beachfront)",
      "All meals included",
      "Private island tours",
      "Spa treatments (2 sessions)",
      "Sunrise cruise experience",
      "VIP transfers & concierge"
    ],
    itinerary: [
      { day: 1, activity: "VIP arrival, luxury resort check-in, welcome dinner" },
      { day: 2, activity: "Exclusive Phi Phi private tour with premium activities" },
      { day: 3, activity: "Private James Bond Island & luxury kayaking" },
      { day: 4, activity: "Luxury spa day or optional premium excursions" },
      { day: 5, activity: "Sunrise cruise & departure" }
    ],
    priceUSD: 1200,
    priceINR: 99600,
    originalPriceUSD: 1350,
    originalPriceINR: 112050,
    discount: 11,
    image: "/phuket/phuket_2.png",
    description: "Ultimate luxury island retreat with exclusive experiences and premium amenities"
  },

  // Krabi Packages
  {
    id: "krabi-standard",
    destinationId: "krabi",
    type: "standard",
    title: "Krabi Adventure & Relax",
    duration: { days: 5, nights: 4 },
    inclusions: [
      "Hotel (4★ beachfront)",
      "Breakfast & Dinner",
      "Four Islands tour",
      "Snorkeling activities",
      "Rock climbing or kayaking",
      "Airport transfers"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Krabi, beach relaxation & local market visit" },
      { day: 2, activity: "Four Islands tour with snorkeling & beach hopping" },
      { day: 3, activity: "Kayaking through hidden lagoons & caves" },
      { day: 4, activity: "Free day / optional rock climbing or spa" },
      { day: 5, activity: "Departure transfers" }
    ],
    priceUSD: 785,
    priceINR: 65155,
    originalPriceUSD: 920,
    originalPriceINR: 76360,
    discount: 15,
    image: "/krabi/krabi_1.png",
    description: "Perfect blend of adventure and relaxation with stunning limestone cliffs"
  },
  {
    id: "krabi-premium",
    destinationId: "krabi",
    type: "premium",
    title: "Krabi Ultimate Escape",
    duration: { days: 5, nights: 4 },
    inclusions: [
      "Luxury Resort (5★ beachfront)",
      "All meals included",
      "Private boat tours",
      "Adventure sports package",
      "Spa treatments (2 sessions)",
      "VIP transfers & guide"
    ],
    itinerary: [
      { day: 1, activity: "VIP arrival, luxury resort, beachfront dinner" },
      { day: 2, activity: "Private Four Islands tour with premium snorkeling" },
      { day: 3, activity: "Exclusive kayaking & hidden lagoon exploration" },
      { day: 4, activity: "Adventure sports day or luxury spa experience" },
      { day: 5, activity: "Departure with VIP service" }
    ],
    priceUSD: 1100,
    priceINR: 91300,
    originalPriceUSD: 1250,
    originalPriceINR: 103750,
    discount: 12,
    image: "/krabi/krabi_2.png",
    description: "Ultimate adventure luxury experience with exclusive access and premium services"
  },

  // Koh Samui Packages
  {
    id: "koh-samui-standard",
    destinationId: "koh-samui",
    type: "standard",
    title: "Koh Samui Seaside Bliss",
    duration: { days: 5, nights: 4 },
    inclusions: [
      "Hotel (4★ beachfront)",
      "Daily Breakfast",
      "Island hopping tours",
      "Snorkeling activities",
      "Temple & waterfall visits",
      "Airport transfers"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Koh Samui, beach relaxation & local exploration" },
      { day: 2, activity: "Island hopping tour with snorkeling & lunch" },
      { day: 3, activity: "Waterfall visits & local temple tours" },
      { day: 4, activity: "Free day / optional tours or beach activities" },
      { day: 5, activity: "Departure transfers" }
    ],
    priceUSD: 720,
    priceINR: 59760,
    originalPriceUSD: 850,
    originalPriceINR: 70550,
    discount: 15,
    image: "/koh_samui/koh_samui_1.png",
    description: "Tropical paradise experience with pristine beaches and cultural sites"
  },
  {
    id: "koh-samui-premium",
    destinationId: "koh-samui",
    type: "premium",
    title: "Koh Samui Luxe Retreat",
    duration: { days: 5, nights: 4 },
    inclusions: [
      "Luxury Resort (5★ beachfront)",
      "All meals included",
      "Private boat tours",
      "Spa & wellness package",
      "Sunset cruise experience",
      "VIP transfers & concierge"
    ],
    itinerary: [
      { day: 1, activity: "VIP arrival, luxury resort, beachfront welcome dinner" },
      { day: 2, activity: "Exclusive island hopping with private boat" },
      { day: 3, activity: "Waterfall & temple tours with private guide" },
      { day: 4, activity: "Luxury spa day or sunset cruise experience" },
      { day: 5, activity: "Departure with VIP service" }
    ],
    priceUSD: 1050,
    priceINR: 87150,
    originalPriceUSD: 1200,
    originalPriceINR: 99600,
    discount: 13,
    image: "/koh_samui/koh_samui_2.png",
    description: "Ultimate luxury tropical retreat with exclusive experiences and premium wellness"
  },

  // Chiang Mai Packages
  {
    id: "chiang-mai-standard",
    destinationId: "chiang-mai",
    type: "standard",
    title: "Chiang Mai Cultural Tour",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Hotel (3★ / 4★)",
      "Daily Breakfast",
      "Temple & market tours",
      "Nature & hill-tribe visits",
      "Airport transfers",
      "Local guide for tours"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Chiang Mai, city walk & night market" },
      { day: 2, activity: "Temple tours (Doi Suthep) & local markets" },
      { day: 3, activity: "Hill tribe village visit & nature excursion" },
      { day: 4, activity: "Final shopping & departure" }
    ],
    priceUSD: 680,
    priceINR: 56440,
    originalPriceUSD: 800,
    originalPriceINR: 66400,
    discount: 15,
    image: "/chiang_mai/chiang_mai_1.png",
    description: "Authentic northern Thai culture with temples, markets, and hill tribes"
  },
  {
    id: "chiang-mai-premium",
    destinationId: "chiang-mai",
    type: "premium",
    title: "Chiang Mai Deluxe Experience",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Luxury Hotel (5★ boutique)",
      "All meals included",
      "Private guided tours",
      "Cultural show & forest trek",
      "VIP transfers",
      "Spa treatment (1 session)"
    ],
    itinerary: [
      { day: 1, activity: "VIP arrival, luxury hotel, evening cultural show" },
      { day: 2, activity: "Private temple tours & hidden gems exploration" },
      { day: 3, activity: "Forest trek & authentic hill tribe experience" },
      { day: 4, activity: "Luxury spa & departure" }
    ],
    priceUSD: 950,
    priceINR: 78850,
    originalPriceUSD: 1100,
    originalPriceINR: 91300,
    discount: 14,
    image: "/chiang_mai/chiang_mai_2.png",
    description: "Premium cultural immersion with luxury accommodations and exclusive experiences"
  },

  // Hua Hin Packages
  {
    id: "hua-hin-standard",
    destinationId: "hua-hin",
    type: "standard",
    title: "Hua Hin Relax & Culture",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Hotel (3★ / 4★)",
      "Daily Breakfast",
      "Beach & local tours",
      "Cultural attractions & markets",
      "Airport transfers",
      "Local guide assistance"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Hua Hin, beach relaxation & local exploration" },
      { day: 2, activity: "Local sites, markets & cultural attractions" },
      { day: 3, activity: "Beach activities & optional local tours" },
      { day: 4, activity: "Final beach time & departure" }
    ],
    priceUSD: 700,
    priceINR: 58100,
    originalPriceUSD: 820,
    originalPriceINR: 68060,
    discount: 15,
    image: "/hua_hin/hua_hin_1.png",
    description: "Perfect beach relaxation with royal heritage and cultural experiences"
  },
  {
    id: "hua-hin-premium",
    destinationId: "hua-hin",
    type: "premium",
    title: "Hua Hin Luxe Holiday",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Luxury Resort (5★ beachfront)",
      "All meals included",
      "Private beach & water tours",
      "Spa & wellness package",
      "VIP transfers & guides",
      "Cultural show tickets"
    ],
    itinerary: [
      { day: 1, activity: "VIP arrival, luxury resort, beachfront dinner" },
      { day: 2, activity: "Private local tours & cultural attractions" },
      { day: 3, activity: "Luxury spa day or private beach activities" },
      { day: 4, activity: "Cultural show & departure" }
    ],
    priceUSD: 1000,
    priceINR: 83000,
    originalPriceUSD: 1150,
    originalPriceINR: 95450,
    discount: 13,
    image: "/hua_hin/hua_hin_2.png",
    description: "Ultimate luxury beach holiday with royal heritage and premium wellness"
  },

  // Chiang Rai Packages
  {
    id: "chiang-rai-standard",
    destinationId: "chiang-rai",
    type: "standard",
    title: "Chiang Rai Explorer",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Hotel (3★ / 4★)",
      "Daily Breakfast",
      "Golden Triangle tour",
      "Temple & market visits",
      "Countryside exploration",
      "Airport transfers"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Chiang Rai, local orientation & market visit" },
      { day: 2, activity: "Golden Triangle tour & hill tribe visits" },
      { day: 3, activity: "Temple tours & countryside exploration" },
      { day: 4, activity: "Final shopping & departure" }
    ],
    priceUSD: 650,
    priceINR: 53950,
    originalPriceUSD: 760,
    originalPriceINR: 63080,
    discount: 14,
    image: "/chiang_rai/chiang_rai_1.png",
    description: "Discover the Golden Triangle and unique temples in northern Thailand"
  },
  {
    id: "chiang-rai-premium",
    destinationId: "chiang-rai",
    type: "premium",
    title: "Chiang Rai Deluxe Tour",
    duration: { days: 4, nights: 3 },
    inclusions: [
      "Luxury Hotel (5★ boutique)",
      "All meals included",
      "Private Golden Triangle tours",
      "Countryside trek & experiences",
      "VIP transfers",
      "Cultural immersion activities"
    ],
    itinerary: [
      { day: 1, activity: "VIP arrival, luxury hotel, welcome dinner" },
      { day: 2, activity: "Luxury Golden Triangle & hill tribe experiences" },
      { day: 3, activity: "Private temple tours & countryside trek" },
      { day: 4, activity: "Cultural activities & departure" }
    ],
    priceUSD: 900,
    priceINR: 74700,
    originalPriceUSD: 1050,
    originalPriceINR: 87150,
    discount: 14,
    image: "/chiang_rai/chiang_rai_2.png",
    description: "Premium Golden Triangle experience with luxury accommodations and exclusive access"
  }
]

// Combo Packages
export const comboPackages: TravelPackage[] = [
  {
    id: "bangkok-phuket-combo",
    destinationId: "bangkok-phuket",
    type: "standard",
    title: "Bangkok & Phuket Combo",
    duration: { days: 6, nights: 5 },
    inclusions: [
      "Hotels (3★ / 4★)",
      "Daily Breakfast",
      "City & island tours",
      "Inter-city transfers",
      "Airport transfers",
      "Local guides"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Bangkok, city exploration" },
      { day: 2, activity: "Bangkok temples & river cruise" },
      { day: 3, activity: "Transfer to Phuket, beach time" },
      { day: 4, activity: "Phi Phi Islands tour" },
      { day: 5, activity: "James Bond Island tour" },
      { day: 6, activity: "Departure" }
    ],
    priceUSD: 1200,
    priceINR: 99600,
    originalPriceUSD: 1400,
    originalPriceINR: 116200,
    discount: 14,
    image: "/thailand/thai_1.png",
    description: "Perfect blend of culture and beach with Bangkok temples and Phuket islands"
  },
  {
    id: "chiang-mai-chiang-rai-combo",
    destinationId: "chiang-mai-chiang-rai",
    type: "standard",
    title: "Northern Thailand Combo",
    duration: { days: 5, nights: 4 },
    inclusions: [
      "Hotels (3★ / 4★)",
      "Daily Breakfast",
      "Temple & cultural tours",
      "Golden Triangle tour",
      "Inter-city transfers",
      "Local guides"
    ],
    itinerary: [
      { day: 1, activity: "Arrive Chiang Mai, city tour" },
      { day: 2, activity: "Chiang Mai temples & markets" },
      { day: 3, activity: "Transfer to Chiang Rai" },
      { day: 4, activity: "Golden Triangle & hill tribes" },
      { day: 5, activity: "Departure" }
    ],
    priceUSD: 950,
    priceINR: 78850,
    originalPriceUSD: 1100,
    originalPriceINR: 91300,
    discount: 14,
    image: "/thailand/thai_2.png",
    description: "Complete northern Thailand experience with temples, markets, and Golden Triangle"
  }
]

// Pricing Summary
export const pricingSummary = {
  singlePackagesAverage: 51211,
  comboPackagesAverage: 20999,
  totalBudget: 370429,
}
