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
      url: "/ImgGallery/package_1.png",
      location: "Pattaya, Thailand",
      category: "beaches",
      likes: 1234,
      photographer: "Galaxy Time Tour",
      description: "Beautiful coastal views and pristine beaches in Pattaya!",
      profilePic: "/ImgGallery/aboutUs.png",
    },
    {
      id: 2,
      url: "/ImgGallery/package_2.png",
      location: "Bangkok, Thailand",
      category: "cities",
      likes: 892,
      photographer: "Galaxy Time Tour",
      description: "The vibrant capital city with stunning temples and culture!",
      profilePic: "/ImgGallery/aboutUs.png",
    },
    {
      id: 3,
      url: "/ImgGallery/package_3.png",
      location: "Phuket, Thailand",
      category: "beaches",
      likes: 1567,
      photographer: "Galaxy Time Tour",
      description: "Tropical paradise with crystal clear waters and amazing islands.",
      profilePic: "/ImgGallery/aboutUs.png",
    },
    {
      id: 4,
      url: "/ImgGallery/package_4.png",
      location: "Krabi, Thailand",
      category: "mountains",
      likes: 2103,
      photographer: "Galaxy Time Tour",
      description: "Stunning limestone cliffs and hidden lagoons await!",
      profilePic: "/ImgGallery/aboutUs.png",
    },
    {
      id: 5,
      url: "/ImgGallery/package_5.png",
      location: "Koh Samui, Thailand",
      category: "culture",
      likes: 945,
      photographer: "Galaxy Time Tour",
      description: "A peaceful tropical island with rich cultural heritage.",
      profilePic: "/ImgGallery/aboutUs.png",
    },
    {
      id: 6,
      url: "/ImgGallery/package_6.png",
      location: "Chiang Mai, Thailand",
      category: "food",
      likes: 756,
      photographer: "Galaxy Time Tour",
      description: "Authentic Thai cuisine and traditional northern culture!",
      profilePic: "/ImgGallery/aboutUs.png",
    },
    {
      id: 7,
      url: "/ImgGallery/package_7.png",
      location: "Hua Hin, Thailand",
      category: "beaches",
      likes: 1890,
      photographer: "Galaxy Time Tour",
      description: "Royal beach destination with perfect blend of relaxation!",
      profilePic: "/ImgGallery/aboutUs.png",
    },
    {
      id: 8,
      url: "/ImgGallery/package_8.png",
      location: "Chiang Rai, Thailand",
      category: "culture",
      likes: 2341,
      photographer: "Galaxy Time Tour",
      description: "Golden Triangle and unique temples in northern Thailand!",
      profilePic: "/ImgGallery/aboutUs.png",
    },
    {
      id: 9,
      url: "/ImgGallery/package_9.png",
      location: "Thai Islands",
      category: "wildlife",
      likes: 1678,
      photographer: "Galaxy Time Tour",
      description: "Amazing marine life and underwater adventures!",
      profilePic: "/ImgGallery/aboutUs.png",
    },
  ]

  const filteredImages = images.filter((image) => (activeFilter === "all" ? true : image.category === activeFilter))

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/ImgGallery/AboutUs.jpg"
          alt="Travel Gallery"
          width={2000}
          height={1000}
          className="absolute inset-0 object-cover w-full h-full"
          priority
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
                    src={image.url}
                    alt={image.location}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
                          src={image.profilePic}
                          alt={image.photographer}
                          width={32}
                          height={32}
                          className="rounded-full"
                          loading="lazy"
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
                  src={selectedImage.profilePic}
                  alt={selectedImage.photographer}
                  width={40}
                  height={40}
                  className="rounded-full"
                  loading="lazy"
                />
                <span className="font-medium">{selectedImage.photographer}</span>
              </div>
              <div className="relative aspect-[4/3] mt-4">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.location}
                  width={1200}
                  height={900}
                  className="rounded-lg object-cover w-full h-full"
                  loading="lazy"
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

