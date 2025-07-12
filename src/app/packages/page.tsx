import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { BeanIcon as Beach, Coffee, Hotel, MapPin, Plane, Utensils, Star, Clock, Users, Zap, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  priceINR: number
  priceUSD: number
  duration: string
  features: PackageFeature[]
  type: 'single' | 'combo'
  originalPrice?: number
  discount?: number
}

export default function PackagesPage() {
  const singlePackages: TravelPackage[] = [
    {
      id: "phuket-tropical",
      destination: "Phuket",
      title: "Tropical Escape",
      description: "Beach resort, breakfast & dinner, island tour + airport transfers",
      image: "/phuket/phuket_1.png",
      priceINR: 70000,
      priceUSD: 845,
      duration: "5 days / 4 nights",
      type: 'single',
      originalPrice: 84000,
      discount: 17,
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Beach Resort" },
        { icon: <Utensils className="h-4 w-4" />, label: "Breakfast & Dinner" },
        { icon: <Beach className="h-4 w-4" />, label: "Island Tour" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    },
    {
      id: "bangkok-city",
      destination: "Bangkok",
      title: "City & Culture",
      description: "Luxury hotel, breakfast, temples & city tours, transfers",
      image: "/bangkok/bgk_1.png",
      priceINR: 55000,
      priceUSD: 665,
      duration: "4 days / 3 nights",
      type: 'single',
      originalPrice: 61000,
      discount: 10,
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Luxury Hotel" },
        { icon: <Coffee className="h-4 w-4" />, label: "Daily Breakfast" },
        { icon: <MapPin className="h-4 w-4" />, label: "Temples & City Tours" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    },
    {
      id: "krabi-adventure",
      destination: "Krabi",
      title: "Adventure & Relaxation",
      description: "Beachfront stay, all-inclusive meals, rock-climbing + kayaking",
      image: "/krabi/krabi_1.png",
      priceINR: 65000,
      priceUSD: 785,
      duration: "5 days / 4 nights",
      type: 'single',
      originalPrice: 75000,
      discount: 13,
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Beachfront Resort" },
        { icon: <Utensils className="h-4 w-4" />, label: "All-Inclusive Meals" },
        { icon: <Beach className="h-4 w-4" />, label: "Rock Climbing & Kayaking" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    },
    {
      id: "pattaya-coastal",
      destination: "Pattaya",
      title: "Coastal City",
      description: "Seaside hotel, breakfast, water sports, transfers",
      image: "/pattaya/pattaya_1.png",
      priceINR: 50000,
      priceUSD: 605,
      duration: "4 days / 3 nights",
      type: 'single',
      originalPrice: 55000,
      discount: 9,
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Seaside Hotel" },
        { icon: <Coffee className="h-4 w-4" />, label: "Daily Breakfast" },
        { icon: <Beach className="h-4 w-4" />, label: "Water Sports" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    },
    {
      id: "hua-hin-royal",
      destination: "Hua Hin",
      title: "Royal Coast Retreat",
      description: "Boutique resort, breakfast & dinner, beach activities + transfers",
      image: "/hua_hin/hua_hin_1.png",
      priceINR: 58000,
      priceUSD: 700,
      duration: "4 days / 3 nights",
      type: 'single',
      originalPrice: 65000,
      discount: 11,
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Boutique Resort" },
        { icon: <Utensils className="h-4 w-4" />, label: "Breakfast & Dinner" },
        { icon: <Beach className="h-4 w-4" />, label: "Beach Activities" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
      ],
    },
    {
      id: "phuket-budget",
      destination: "Phuket",
      title: "Budget Option",
      description: "Hotel, transfers, sightseeing—may exclude some meals",
      image: "/phuket/phuket_2.png",
      priceINR: 8500,
      priceUSD: 103,
      duration: "4 nights",
      type: 'single',
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Hotel Accommodation" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport Transfers" },
        { icon: <MapPin className="h-4 w-4" />, label: "Sightseeing Tours" },
        { icon: <Users className="h-4 w-4" />, label: "Group Tours" },
      ],
    }
  ]

  const comboPackages: TravelPackage[] = [
    {
      id: "krabi-phuket-combo",
      destination: "Krabi + Phuket",
      title: "Adventure & Beach Combo",
      description: "2 nights each, hotels, cabs, meals, sightseeing",
      image: "/krabi/krabi_2.png",
      priceINR: 14200,
      priceUSD: 170,
      duration: "4N/5D",
      type: 'combo',
      originalPrice: 16799,
      discount: 15,
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "2 Nights Each Location" },
        { icon: <Plane className="h-4 w-4" />, label: "Inter-city Transfers" },
        { icon: <Utensils className="h-4 w-4" />, label: "Meals Included" },
        { icon: <MapPin className="h-4 w-4" />, label: "Sightseeing Tours" },
      ],
    },
    {
      id: "phuket-bangkok-combo",
      destination: "Phuket + Bangkok",
      title: "Beach & City Combo",
      description: "3 nights Phuket, 2 nights Bangkok, hotels, transfers, sightseeing",
      image: "/phuket/phuket_3.png",
      priceINR: 20100,
      priceUSD: 240,
      duration: "4N/5D",
      type: 'combo',
      originalPrice: 23799,
      discount: 15,
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "3N Phuket + 2N Bangkok" },
        { icon: <Plane className="h-4 w-4" />, label: "Airport & Inter-city Transfers" },
        { icon: <MapPin className="h-4 w-4" />, label: "City & Island Tours" },
        { icon: <Utensils className="h-4 w-4" />, label: "Meals Included" },
      ],
    },
    {
      id: "4-city-mini",
      destination: "Phuket + Krabi + Pattaya + Bangkok",
      title: "4-City Mini Tour",
      description: "Includes airport transfers, hotels, basic meals",
      image: "/thailand/thai_1.png",
      priceINR: 28999,
      priceUSD: 350,
      duration: "6N/7D",
      type: 'combo',
      features: [
        { icon: <Hotel className="h-4 w-4" />, label: "Multiple City Stays" },
        { icon: <Plane className="h-4 w-4" />, label: "All Airport Transfers" },
        { icon: <Utensils className="h-4 w-4" />, label: "Basic Meals" },
        { icon: <MapPin className="h-4 w-4" />, label: "Multi-city Sightseeing" },
      ],
    }
  ]

  const formatPrice = (price: number, currency: 'INR' | 'USD') => {
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`
    }
    return `$${price.toLocaleString('en-US')}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/hero_image.webp"
            alt="Thailand packages"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/60" />
        </div>
        <div className="container mx-auto relative z-10 py-24 md:py-32">
          <div className="flex flex-col items-center text-center gap-4 max-w-[640px] mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">Thailand Tour Packages</h1>
            <p className="max-w-[600px] text-lg sm:text-xl text-muted-foreground md:text-2xl">
              Discover the perfect Thai getaway with our carefully curated travel packages
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                Best Deals
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Secure Booking
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Tabs */}
      <section className="container mx-auto py-12 md:py-24">
        <Tabs defaultValue="single" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="single" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Single Destinations
              </TabsTrigger>
              <TabsTrigger value="combo" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Combo Packages
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="single" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Single-Destination Packages</h2>
              <p className="text-muted-foreground">Perfect for focused exploration of one amazing location</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {singlePackages.map((pkg) => (
                <Card key={pkg.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={pkg.image}
                        alt={pkg.destination}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {pkg.discount && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                          {pkg.discount}% OFF
                        </Badge>
                      )}
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
                      <p className="text-muted-foreground text-sm">{pkg.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            {feature.icon}
                            <span className="text-xs">{feature.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">{formatPrice(pkg.priceINR, 'INR')}</p>
                          <p className="text-sm text-muted-foreground">({formatPrice(pkg.priceUSD, 'USD')})</p>
                        </div>
                        {pkg.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(pkg.originalPrice, 'INR')}
                          </p>
                        )}
                      </div>
                      <Button asChild>
                        <Link href={`/book/${pkg.destination.toLowerCase().replace(' ', '-')}`}>
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="combo" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Combo Packages</h2>
              <p className="text-muted-foreground">Experience multiple destinations in one amazing journey</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comboPackages.map((pkg) => (
                <Card key={pkg.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-2 border-primary/20">
                  <CardHeader className="p-0">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={pkg.image}
                        alt={pkg.destination}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                        COMBO
                      </Badge>
                      {pkg.discount && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                          {pkg.discount}% OFF
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold">{pkg.destination}</h2>
                          <Badge variant="secondary">{pkg.duration}</Badge>
                        </div>
                        <h3 className="text-lg font-medium text-muted-foreground">{pkg.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">{pkg.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            {feature.icon}
                            <span className="text-xs">{feature.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">{formatPrice(pkg.priceINR, 'INR')}</p>
                          <p className="text-sm text-muted-foreground">({formatPrice(pkg.priceUSD, 'USD')})</p>
                        </div>
                        {pkg.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(pkg.originalPrice, 'INR')}
                          </p>
                        )}
                      </div>
                      <Button asChild>
                        <Link href="/contact">Customize</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Pricing Summary */}
      <section className="border-t bg-muted/40">
        <div className="container mx-auto py-12 md:py-16">
          <div className="rounded-lg bg-primary-foreground p-8 md:p-12 lg:p-16">
            <div className="text-center space-y-6 mb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Package Pricing Summary</h2>
              <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
                Get the best value with our carefully curated packages
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-2">Single Packages</h3>
                <p className="text-3xl font-bold text-primary mb-2">₹58,000</p>
                <p className="text-sm text-muted-foreground mb-4">Average per package</p>
                <div className="space-y-2 text-sm">
                  <p>• 4-5 days duration</p>
                  <p>• Hotel + meals included</p>
                  <p>• Airport transfers</p>
                </div>
              </div>
              
              <div className="text-center p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-2">Combo Packages</h3>
                <p className="text-3xl font-bold text-primary mb-2">₹21,000</p>
                <p className="text-sm text-muted-foreground mb-4">Average per combo</p>
                <div className="space-y-2 text-sm">
                  <p>• 2 destinations</p>
                  <p>• Inter-city transfers</p>
                  <p>• Multi-city tours</p>
                </div>
              </div>
              
              <div className="text-center p-6 rounded-lg border bg-primary text-primary-foreground">
                <h3 className="text-xl font-bold mb-2">Total Budget</h3>
                <p className="text-3xl font-bold mb-2">₹247,000</p>
                <p className="text-sm mb-4">≈ $2,975 USD</p>
                <div className="space-y-2 text-sm">
                  <p>• 6 total packages</p>
                  <p>• 3 combos + 3 singles</p>
                  <p>• Complete Thailand tour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="container mx-auto py-12 md:py-16">
          <div className="rounded-lg bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 lg:p-16 text-center space-y-6 text-primary-foreground">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Thai Adventure?</h2>
            <p className="mx-auto max-w-[600px] text-lg opacity-90">
              Book your dream vacation today and get exclusive deals on our Thailand packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Our Travel Experts</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/destinations">Explore Destinations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

