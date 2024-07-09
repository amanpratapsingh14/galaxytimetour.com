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
      "/pattaya/pattaya-1.png",
      "/pattaya/pattaya-2.png",
      "/pattaya/pattaya-3.png",
      "/pattaya/pattaya-4.png",
      "/pattaya/pattaya-5.png",
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
      "/bangkok/bgk-1.png",
      "/bangkok/bgk-2.png",
      "/bangkok/bgk-3.png",
      "/bangkok/bgk-4.png",
      "/bangkok/bgk-5.png",
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
      "/phuket/phuket-1.png",
      "/phuket/phuket-2.png",
      "/phuket/phuket-3.png",
      "/phuket/phuket-4.png",
      "/phuket/phuket-5.png",
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
      "/krabi/krabi-1.png",
      "/krabi/krabi-2.png",
      "/krabi/krabi-3.png",
      "/krabi/krabi-4.png",
      "/krabi/krabi-5.png",
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
      "/koh_samui/koh_samui-1.png",
      "/koh_samui/koh_samui-2.png",
      "/koh_samui/koh_samui-3.png",
      "/koh_samui/koh_samui-4.png",
      "/koh_samui/koh_samui-5.png",
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
      "/chiang_mai/chiang_mai-1.png",
      "/chiang_mai/chiang_mai-2.png",
      "/chiang_mai/chiang_mai-3.png",
      "/chiang_mai/chiang_mai-4.png",
      "/chiang_mai/chiang_mai-5.png",
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
      "/hua_hin/hua_hin-1.png",
      "/hua_hin/hua_hin-2.png",
      "/hua_hin/hua_hin-3.png",
      "/hua_hin/hua_hin-4.png",
      "/hua_hin/hua_hin-5.png",
    ]
  },
];
