import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function TravelDestinations() {
  const destinations = [
    {
      id: "paris-france",
      name: "Paris, France",
      image: "/placeholder.svg?height=400&width=600",
      description: "Experience the romance and culture of the City of Light.",
      price: "$1,299",
    },
    {
      id: "bali-indonesia",
      name: "Bali, Indonesia",
      image: "/placeholder.svg?height=400&width=600",
      description: "Relax on pristine beaches and explore lush tropical landscapes.",
      price: "$1,499",
    },
    {
      id: "tokyo-japan",
      name: "Tokyo, Japan",
      image: "/placeholder.svg?height=400&width=600",
      description: "Immerse yourself in the vibrant blend of tradition and technology.",
      price: "$1,599",
    },
    {
      id: "santorini-greece",
      name: "Santorini, Greece",
      image: "/placeholder.svg?height=400&width=600",
      description: "Enjoy breathtaking sunsets and iconic white-washed buildings.",
      price: "$1,399",
    },
    {
      id: "new-york-city-usa",
      name: "New York City, USA",
      image: "/placeholder.svg?height=400&width=600",
      description: "Explore the bustling streets and iconic landmarks of the Big Apple.",
      price: "$1,199",
    },
    {
      id: "machu-picchu-peru",
      name: "Machu Picchu, Peru",
      image: "/placeholder.svg?height=400&width=600",
      description: "Discover the ancient Incan citadel high in the Andes Mountains.",
      price: "$1,699",
    },
    {
      id: "dubai-uae",
      name: "Dubai, UAE",
      image: "/placeholder.svg?height=400&width=600",
      description: "Experience luxury and futuristic architecture in the desert oasis.",
      price: "$1,799",
    },
    {
      id: "cape-town-south-africa",
      name: "Cape Town, South Africa",
      image: "/placeholder.svg?height=400&width=600",
      description: "Enjoy stunning landscapes, wildlife, and vibrant culture.",
      price: "$1,599",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Popular Travel Destinations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">${destination.price}</div>
                <Link href={`/book/${destination.id}`}>
                  <Button>Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

