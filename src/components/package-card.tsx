"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Clock, Crown, Layers } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCurrency } from "@/contexts/currency-context"
import type { TravelPackage } from "@/data/packages"
import { cn } from "@/lib/utils"

export function PackageCard({
  pkg,
  combo = false,
  onDetails,
  className,
}: {
  pkg: TravelPackage
  combo?: boolean
  onDetails?: () => void
  className?: string
}) {
  const { formatPrice } = useCurrency()
  const premium = pkg.type === "premium"
  const bookHref = combo ? "/contact?inquiry=custom-trip" : `/book/${pkg.destinationId}?package=${pkg.id}#plan`

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-violet/15",
        premium && "ring-gradient",
        className,
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {combo ? (
            <Badge variant="gradient"><Layers /> Combo</Badge>
          ) : premium ? (
            <Badge variant="gold"><Crown /> Premium</Badge>
          ) : (
            <Badge variant="glass">Standard</Badge>
          )}
        </div>
        {pkg.discount && (
          <span className="absolute top-3 right-3 rounded-full bg-[oklch(0.5_0.2_25)] px-2.5 py-1 text-xs font-bold text-white shadow">
            -{pkg.discount}%
          </span>
        )}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
          <Clock className="size-3.5" /> {pkg.duration.days} days · {pkg.duration.nights} nights
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-xl font-bold">{pkg.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{pkg.description}</p>
        </div>
        <ul className="space-y-1.5 text-sm">
          {pkg.inclusions.slice(0, 3).map((inc) => (
            <li key={inc} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              <span className="text-muted-foreground">{inc}</span>
            </li>
          ))}
          {pkg.inclusions.length > 3 && (
            <li className="pl-6 text-xs font-medium text-highlight">+{pkg.inclusions.length - 3} more included</li>
          )}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">from / person</p>
            <p className="font-display text-2xl font-extrabold">{formatPrice(pkg.priceUSD)}</p>
            {pkg.originalPriceUSD && (
              <p className="text-xs text-muted-foreground line-through">{formatPrice(pkg.originalPriceUSD)}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Button asChild size="sm" className="h-9 px-4">
              <Link href={bookHref}>
                {combo ? "Customise" : "Book"} <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            {onDetails && (
              <button type="button" onClick={onDetails} className="text-xs font-medium text-highlight hover:underline">
                View itinerary
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
