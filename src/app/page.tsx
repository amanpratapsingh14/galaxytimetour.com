import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Globe2, MapPin, Star, Users2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  const features = [
    {
      icon: <Globe2 className="h-8 w-8" />,
      title: "Worldwide Destinations",
      description: "Explore handpicked destinations across all continents, from hidden gems to popular landmarks.",
    },
    {
      icon: <Users2 className="h-8 w-8" />,
      title: "Expert Local Guides",
      description: "Travel with knowledgeable local guides who provide authentic cultural experiences.",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Luxury Accommodations",
      description: "Stay in carefully selected premium hotels and unique properties for maximum comfort.",
    },
    {
      icon: <CheckCircle2 className="h-8 w-8" />,
      title: "Hassle-free Planning",
      description:
        "Let our travel experts handle all the details, from flights to activities and everything in between.",
    },
  ]

  const destinations = [
    {
      name: "Paris, France",
      image: "/placeholder.svg?height=400&width=600",
      description: "Experience the romance and culture of the City of Light.",
    },
    {
      name: "Bali, Indonesia",
      image: "/placeholder.svg?height=400&width=600",
      description: "Discover tropical paradise and rich cultural heritage.",
    },
    {
      name: "Tokyo, Japan",
      image: "/placeholder.svg?height=400&width=600",
      description: "Immerse yourself in the perfect blend of tradition and modernity.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1000&width=2000"
              alt="Travel destinations collage"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background to-background/60" />
          </div>
          <div className="container mx-auto relative z-10 py-24 md:py-32">
            <div className="flex flex-col items-center text-center gap-4 max-w-[640px] mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your Journey Begins Here
              </h1>
              <p className="max-w-[600px] text-lg sm:text-xl text-muted-foreground md:text-2xl">
                Discover extraordinary destinations and create unforgettable memories with our expertly curated travel
                experiences.
              </p>
              <Button size="lg" asChild>
                <Link href="/destinations">
                  Start Planning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid gap-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why Travel with Us?</h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                We combine expertise, personalization, and attention to detail to create the perfect travel experience
                for you.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardContent className="p-6 space-y-2">
                    <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">{feature.icon}</div>
                    <h3 className="font-semibold text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="border-t bg-muted/40">
          <div className="container mx-auto py-16 md:py-24">
            <div className="grid gap-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Popular Destinations</h2>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                  Explore our most sought-after destinations, each offering unique experiences and unforgettable
                  moments.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {destinations.map((destination) => (
                  <Card key={destination.name} className="overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold text-xl">{destination.name}</h3>
                        </div>
                        <p className="text-muted-foreground">{destination.description}</p>
                        <Button variant="link" className="p-0" asChild>
                          <Link href={`/destinations/${destination.name.toLowerCase().replace(/,?\s+/g, "-")}`}>
                            Learn more <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/destinations">
                    View All Destinations <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t">
          <div className="container mx-auto py-16 md:py-24">
            <div className="rounded-lg bg-primary-foreground p-8 md:p-12 lg:p-16 text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Adventure?</h2>
              <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
                Let us help you plan the perfect trip. Our travel experts are ready to create your dream vacation.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Us Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
