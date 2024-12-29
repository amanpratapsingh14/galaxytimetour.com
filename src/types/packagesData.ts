export type Package = {
  id: string;
  name: string;
  duration: string;
  locations: string;
  price: string;
  includes: string[];
  images: string[];
};

export const packagesData: Package[] = [
  {
    id: "Pattaya",
    name: "Pattaya",
    duration: "10 days",
    locations: "Pattaya1, Pattaya2, Pattaya3",
    price: "$80 per person",
    includes: [
      "Roundtrip airfare",
      "9 nights of hotel accommodation",
      "Daily breakfast",
      "Private transportation",
      "Guided tours and activities"
    ],
    images: [
      "/pattaya/pattaya_1.png",
      "/pattaya/pattaya_2.png",
      "/pattaya/pattaya_3.png",
      "/pattaya/pattaya_4.png",
      "/pattaya/pattaya_5.png",
    ]
  },
  {
    id: "Bangkok",
    name: "Bangkok",
    duration: "9 days",
    locations: "bangkok1, bangkok2, bangkok3",
    price: "$85 per person",
    includes: [
      "Roundtrip airfare",
      "9 nights of hotel accommodation",
      "Daily breakfast",
      "Private transportation",
      "Guided tours and activities"
    ],
    images: [
      "/bangkok/bgk_1.png",
      "/bangkok/bgk_2.png",
      "/bangkok/bgk_3.png",
      "/bangkok/bgk_4.png",
      "/bangkok/bgk_5.png",
    ]
  },
  {
    id: "Phuket",
    name: "Phuket",
    duration: "9 days",
    locations: "Phuket1, Phuket2, Phuket3",
    price: "$83 per person",
    includes: [
      "Roundtrip airfare",
      "9 nights of hotel accommodation",
      "Daily breakfast",
      "Private transportation",
      "Guided tours and activities"
    ],
    images: [
      "/phuket/phuket_1.png",
      "/phuket/phuket_2.png",
      "/phuket/phuket_3.png",
      "/phuket/phuket_4.png",
      "/phuket/phuket_5.png",
    ]
  },
  {
    id: "Krabi",
    name: "Krabi",
    duration: "9 days",
    locations: "Krabi1, Krabi2, Krabi3",
    price: "$83 per person",
    includes: [
      "Roundtrip airfare",
      "9 nights of hotel accommodation",
      "Daily breakfast",
      "Private transportation",
      "Guided tours and activities"
    ],
    images: [
      "/krabi/krabi_1.png",
      "/krabi/krabi_2.png",
      "/krabi/krabi_3.png",
      "/krabi/krabi_4.png",
      "/krabi/krabi_5.png",
    ]
  },
  {
    id: "Koh Samui",
    name: "Koh Samui",
    duration: "9 days",
    locations: "Koh Samui1, Koh Samui2, Koh Samui3",
    price: "$83 per person",
    includes: [
      "Roundtrip airfare",
      "9 nights of hotel accommodation",
      "Daily breakfast",
      "Private transportation",
      "Guided tours and activities"
    ],
    images: [
      "/koh_samui/koh_samui_1.png",
      "/koh_samui/koh_samui_2.png",
      "/koh_samui/koh_samui_3.png",
      "/koh_samui/koh_samui_4.png",
      "/koh_samui/koh_samui_5.png",
    ]
  },
  {
    id: "Chiang Mai",
    name: "Chiang Mai",
    duration: "9 days",
    locations: "Chiang Mai1, Chiang Mai2, Chiang Mai3",
    price: "$83 per person",
    includes: [
      "Roundtrip airfare",
      "9 nights of hotel accommodation",
      "Daily breakfast",
      "Private transportation",
      "Guided tours and activities"
    ],
    images: [
      "/chiang_mai/chiang_mai_1.png",
      "/chiang_mai/chiang_mai_2.png",
      "/chiang_mai/chiang_mai_3.png",
      "/chiang_mai/chiang_mai_4.png",
      "/chiang_mai/chiang_mai_5.png",
    ]
  },
  {
    id: "Hua Hin",
    name: "Hua Hin",
    duration: "9 days",
    locations: "Hua Hin1, Hua Hin2, Hua Hin3",
    price: "$83 per person",
    includes: [
      "Roundtrip airfare",
      "9 nights of hotel accommodation",
      "Daily breakfast",
      "Private transportation",
      "Guided tours and activities"
    ],
    images: [
      "/hua_hin/hua_hin_1.png",
      "/hua_hin/hua_hin_2.png",
      "/hua_hin/hua_hin_3.png",
      "/hua_hin/hua_hin_4.png",
      "/hua_hin/hua_hin_5.png",
    ]
  },
];
