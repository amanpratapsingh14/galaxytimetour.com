"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"

import { useCurrency } from "@/contexts/currency-context"
import type { Destination } from "@/data/destinations"
import { cn } from "@/lib/utils"

export function DestinationCard({ destination, className, eager }: { destination: Destination; className?: string; eager?: boolean }) {
  const { formatPrice } = useCurrency()

  return (
    <Link
      href={`/book/${destination.id}`}
      className={cn(
        "group relative isolate flex min-h-72 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-5 text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-violet/20",
        className,
      )}
    >
      <Image
        src={destination.image}
        alt={`${destination.name}, Thailand`}
        fill
        loading={eager ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="-z-20 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 to-black/0 transition-opacity duration-500 group-hover:from-black/90" />

      <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
        {destination.vibes.slice(0, 2).map((v) => (
          <span key={v} className="rounded-full border border-white/20 bg-black/30 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md">
            {v}
          </span>
        ))}
      </div>
      <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
        <ArrowUpRight className="size-5" />
      </span>

      <p className="flex items-center gap-1.5 text-xs font-medium text-white/70">
        <MapPin className="size-3.5" /> {destination.region}
      </p>
      <h3 className="mt-1 text-2xl font-bold sm:text-3xl">{destination.name}</h3>
      <p className="mt-1 text-sm text-white/80">{destination.tagline}</p>
      <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
        <p className="overflow-hidden text-sm text-white/70">
          <span className="block pt-2">{destination.description}</span>
        </p>
      </div>
      <p className="mt-3 text-sm">
        <span className="text-white/60">from </span>
        <span className="font-display text-lg font-bold">{formatPrice(destination.basePriceUSD)}</span>
        <span className="text-white/60"> / person</span>
      </p>
    </Link>
  )
}
