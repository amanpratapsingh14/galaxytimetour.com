"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { PackageCard } from "@/components/package-card"
import { Button } from "@/components/ui/button"
import type { TravelPackage } from "@/data/packages"

/** Horizontal scroll-snap rail with arrow controls (native swipe on touch). */
export function PackageCarousel({ items }: { items: TravelPackage[] }) {
  const rail = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div className="absolute -top-16 right-0 hidden gap-2 md:flex">
        <Button variant="outline" size="icon" onClick={() => scrollBy(-1)} aria-label="Previous packages">
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon" onClick={() => scrollBy(1)} aria-label="Next packages">
          <ChevronRight />
        </Button>
      </div>
      <div
        ref={rail}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {items.map((pkg) => (
          <div key={pkg.id} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </div>
    </div>
  )
}
