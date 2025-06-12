import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { BeanIcon as Beach, Coffee, Hotel, MapPin, Plane, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PackageFeature {
  icon: ReactNode
  label: string
}

interface TravelPackage {
  id: string
  destination: string
  title: string
  description: string
  image: string
  price: number
  duration: string
  features: PackageFeature[]
}

export default function PackagesPage() {
  const packages: TravelPackage[] = [
    {
      id: "phuket",
      destination: "Phuket",
      title: "Tropical Paradise Escape",
      description:
        "Experience the pristine beaches, crystal-clear waters, and vibrant nightlife of Thailand's largest island.",
      image: "/placeholder.svg?height=400&width=600",
      price: 1299,
      duration: "5 days, 4 nights",
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "4-Star Resort Accommodation" },
        { icon: <Utensils className="h-4 w-4" />, label: "Daily Breakfast & Dinner" },
        { icon: <Beach className="h-4 w-4" />, label: "Island Hopping Tour" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    },
    {
      id: "bangkok",
      destination: "Bangkok",
      title: "City & Culture Explorer",
      description:
        "Dive into the bustling streets, ancient temples, and modern attractions of Thailand's capital city.",
      image: "/placeholder.svg?height=400&width=600",
      price: 1099,
      duration: "4 days, 3 nights",
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Luxury Hotel Stay" },
        { icon: <Coffee className="h-4 w-4" />, label: "Daily Breakfast" },
        { icon: <MapPin className="h-4 w-4" />, label: "Temple & City Tours" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    },
    {
      id: "krabi",
      destination: "Krabi",
      title: "Adventure & Relaxation",
      description: "Discover limestone cliffs, hidden lagoons, and peaceful beaches in this natural paradise.",
      image: "/placeholder.svg?height=400&width=600",
      price: 1199,
      duration: "5 days, 4 nights",
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Beachfront Resort" },
        { icon: <Utensils className="h-4 w-4" />, label: "All-Inclusive Meals" },
        { icon: <Beach className="h-4 w-4" />, label: "Rock Climbing & Kayaking" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    },
    {
      id: "pattaya",
      destination: "Pattaya",
      title: "Coastal City Getaway",
      description: "Enjoy beautiful beaches, water sports, and exciting nightlife in this vibrant coastal city.",
      image: "/placeholder.svg?height=400&width=600",
      price: 999,
      duration: "4 days, 3 nights",
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Seaside Hotel" },
        { icon: <Utensils className="h-4 w-4" />, label: "Daily Breakfast" },
        { icon: <Beach className="h-4 w-4" />, label: "Water Activities" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    },
    {
      id: "hua-hin",
      destination: "Hua Hin",
      title: "Royal Coast Retreat",
      description:
        "Experience the charm of this historic royal beach resort town with its perfect blend of city and sea.",
      image: "/placeholder.svg?height=400&width=600",
      price: 1099,
      duration: "4 days, 3 nights",
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Boutique Resort" },
        { icon: <Utensils className="h-4 w-4" />, label: "Daily Breakfast & Dinner" },
        { icon: <Beach className="h-4 w-4" />, label: "Beach Activities" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Thailand beaches"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/60" />
        </div>
        <div className="container mx-auto relative z-10 py-24 md:py-32">
          <div className="flex flex-col items-center text-center gap-4 max-w-[640px] mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">Thailand Packages</h1>
            <p className="max-w-[600px] text-lg sm:text-xl text-muted-foreground md:text-2xl">
              Discover the perfect Thai getaway with our carefully curated travel packages
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="container mx-auto py-12 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.destination}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">{pkg.destination}</h2>
                      <Badge variant="secondary">{pkg.duration}</Badge>
                    </div>
                    <h3 className="text-lg font-medium text-muted-foreground">{pkg.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{pkg.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        {feature.icon}
                        <span>{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-2xl font-bold">${pkg.price}</p>
                  </div>
                  <Button asChild>
                    <Link href={`/packages/${pkg.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/40">
        <div className="container mx-auto py-12 md:py-16">
          <div className="rounded-lg bg-primary-foreground p-8 md:p-12 lg:p-16 text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
              Let us create a custom package tailored to your preferences and budget.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Contact Our Travel Experts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

