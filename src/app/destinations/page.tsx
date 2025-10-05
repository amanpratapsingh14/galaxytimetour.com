"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CurrencySelector } from "@/components/currency-selector"
import { useCurrency } from "@/contexts/currency-context"
import { destinations } from "@/data/destinations"

export default function TravelDestinations() {
  const { formatPrice } = useCurrency()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Popular Travel Destinations</h1>
        <CurrencySelector />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <div key={destination.id} className="bg-card rounded-lg shadow-md overflow-hidden border">
            <Image
              src={destination.image}
              alt={destination.name}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-card-foreground">{destination.name}</h2>
              <p className="text-muted-foreground mb-4">{destination.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-primary">{formatPrice(destination.basePriceUSD)}</div>
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

