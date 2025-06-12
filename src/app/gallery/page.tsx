"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, Heart, MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type GalleryImage = {
  id: number
  url: string
  location: string
  category: string
  likes: number
  photographer: string
  description: string
  profilePic: string
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [activeFilter, setActiveFilter] = useState("all")

  const categories = ["all", "beaches", "mountains", "cities", "wildlife", "culture", "food"]

  const images: GalleryImage[] = [
    {
      id: 1,
      url: "/placeholder.svg?height=600&width=800",
      location: "Bali, Indonesia",
      category: "beaches",
      likes: 1234,
      photographer: "Sarah Wilson",
      description: "Sunset at Uluwatu Temple - one of the most magical moments of our trip!",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      url: "/placeholder.svg?height=800&width=600",
      location: "Swiss Alps",
      category: "mountains",
      likes: 892,
      photographer: "Mike Chen",
      description: "The majestic Alps never cease to amaze. Worth every step of the hike!",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      url: "/placeholder.svg?height=600&width=800",
      location: "Tokyo, Japan",
      category: "cities",
      likes: 1567,
      photographer: "Emma Davis",
      description: "The perfect blend of tradition and modernity in the heart of Tokyo.",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      url: "/placeholder.svg?height=800&width=600",
      location: "Serengeti, Tanzania",
      category: "wildlife",
      likes: 2103,
      photographer: "James Thompson",
      description: "Witnessed this incredible moment during the great migration!",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      url: "/placeholder.svg?height=600&width=800",
      location: "Kyoto, Japan",
      category: "culture",
      likes: 945,
      photographer: "Lisa Anderson",
      description: "A peaceful morning at the Golden Pavilion.",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      url: "/placeholder.svg?height=800&width=600",
      location: "Rome, Italy",
      category: "food",
      likes: 756,
      photographer: "Marco Rossi",
      description: "The best pasta I've ever had! A hidden gem in Rome.",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 7,
      url: "/placeholder.svg?height=600&width=800",
      location: "Santorini, Greece",
      category: "cities",
      likes: 1890,
      photographer: "Elena Papadopoulos",
      description: "Blue domes and white buildings - postcard perfect Santorini!",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 8,
      url: "/placeholder.svg?height=800&width=600",
      location: "Machu Picchu, Peru",
      category: "culture",
      likes: 2341,
      photographer: "Carlos Martinez",
      description: "Sunrise at Machu Picchu - an unforgettable experience!",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 9,
      url: "/placeholder.svg?height=600&width=800",
      location: "Great Barrier Reef, Australia",
      category: "wildlife",
      likes: 1678,
      photographer: "Tom Wilson",
      description: "Amazing underwater world at the Great Barrier Reef!",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
  ]

  const filteredImages = images.filter((image) => (activeFilter === "all" ? true : image.category === activeFilter))

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/placeholder.svg?height=1000&width=2000"
          alt="Travel Gallery"
          width={2000}
          height={1000}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Travel Moments</h1>
          <p className="text-lg text-gray-200">Experiences shared by our amazing travelers</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.location}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{image.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src={image.profilePic || "/placeholder.svg"}
                          alt={image.photographer}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span>{image.photographer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Travel Photo Details</DialogTitle>
            <DialogDescription>View details about this travel moment</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <>
              <div className="flex items-center gap-2 mt-4">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-semibold">{selectedImage.location}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src={selectedImage.profilePic || "/placeholder.svg"}
                  alt={selectedImage.photographer}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-medium">{selectedImage.photographer}</span>
              </div>
              <div className="relative aspect-[4/3] mt-4">
                <Image
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.location}
                  width={1200}
                  height={900}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground">{selectedImage.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {selectedImage.likes}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    {selectedImage.category}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

