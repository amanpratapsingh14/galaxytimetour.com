"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Zap, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrencySelector } from "@/components/currency-selector"
import { useCurrency } from "@/contexts/currency-context"
import { packages, comboPackages } from "@/data/packages"


export default function PackagesPage() {
  const { formatPrice } = useCurrency()

  // Calculate dynamic pricing
  const calculatePricing = () => {
    const singlePrices = packages.map(pkg => pkg.priceUSD)
    const comboPrices = comboPackages.map(pkg => pkg.priceUSD)
    
    const avgSinglePrice = singlePrices.reduce((sum, price) => sum + price, 0) / singlePrices.length
    const avgComboPrice = comboPrices.reduce((sum, price) => sum + price, 0) / comboPrices.length
    const totalBudget = singlePrices.reduce((sum, price) => sum + price, 0) + comboPrices.reduce((sum, price) => sum + price, 0)
    
    return {
      avgSingle: Math.round(avgSinglePrice),
      avgCombo: Math.round(avgComboPrice),
      total: Math.round(totalBudget)
    }
  }

  const pricing = calculatePricing()

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
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Best Deals
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Secure Booking
                </Badge>
              </div>
              <CurrencySelector />
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
              {packages.map((pkg) => (
                <Card key={pkg.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                        {pkg.type.toUpperCase()}
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
                          <h2 className="text-xl font-bold">{pkg.title}</h2>
                          <Badge variant="secondary">{pkg.duration.days}D/{pkg.duration.nights}N</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Inclusions:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              <span>{inclusion}</span>
                            </div>
                          ))}
                          {pkg.inclusions.length > 4 && (
                            <div className="text-xs text-muted-foreground">
                              +{pkg.inclusions.length - 4} more inclusions
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">{formatPrice(pkg.priceUSD)}</p>
                        </div>
                        {pkg.originalPriceUSD && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(pkg.originalPriceUSD)}
                          </p>
                        )}
                      </div>
                      <Button asChild>
                        <Link href={`/book/${pkg.destinationId}`}>
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
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
                          <h2 className="text-xl font-bold">{pkg.title}</h2>
                          <Badge variant="secondary">{pkg.duration.days}D/{pkg.duration.nights}N</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Inclusions:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              <span>{inclusion}</span>
                            </div>
                          ))}
                          {pkg.inclusions.length > 4 && (
                            <div className="text-xs text-muted-foreground">
                              +{pkg.inclusions.length - 4} more inclusions
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">{formatPrice(pkg.priceUSD)}</p>
                        </div>
                        {pkg.originalPriceUSD && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(pkg.originalPriceUSD)}
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
          <div className="rounded-lg bg-card p-8 md:p-12 lg:p-16 border">
            <div className="text-center space-y-6 mb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-card-foreground">Package Pricing Summary</h2>
              <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
                Get the best value with our carefully curated packages
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">Single Packages</h3>
                <p className="text-3xl font-bold text-primary mb-2">{formatPrice(pricing.avgSingle)}</p>
                <p className="text-sm text-muted-foreground mb-4">Average per package</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• 4-5 days duration</p>
                  <p>• Hotel + meals included</p>
                  <p>• Airport transfers</p>
                </div>
              </div>
              
              <div className="text-center p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">Combo Packages</h3>
                <p className="text-3xl font-bold text-primary mb-2">{formatPrice(pricing.avgCombo)}</p>
                <p className="text-sm text-muted-foreground mb-4">Average per combo</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• 2 destinations</p>
                  <p>• Inter-city transfers</p>
                  <p>• Multi-city tours</p>
                </div>
              </div>
              
              <div className="text-center p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">Total Budget</h3>
                <p className="text-3xl font-bold text-primary mb-2">{formatPrice(pricing.total)}</p>
                <p className="text-sm text-muted-foreground mb-4">Complete Thailand tour</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• {packages.length + comboPackages.length} total packages</p>
                  <p>• {comboPackages.length} combos + {packages.length} singles</p>
                  <p>• All destinations covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/40">
        <div className="container mx-auto py-12 md:py-16">
          <div className="rounded-lg bg-card border p-8 md:p-12 lg:p-16 text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-card-foreground">Ready to Start Your Thai Adventure?</h2>
            <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
              Book your dream vacation today and get exclusive deals on our Thailand packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Our Travel Experts</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/destinations">Explore Destinations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

