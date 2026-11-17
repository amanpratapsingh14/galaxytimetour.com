"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Clock, SlidersHorizontal } from "lucide-react"
import { AnimatePresence, m } from "motion/react"

import { PackageCard } from "@/components/package-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCurrency } from "@/contexts/currency-context"
import { destinations } from "@/data/destinations"
import { comboPackages, isCombo, packages, type TravelPackage } from "@/data/packages"
import { cn } from "@/lib/utils"

type Kind = "all" | "standard" | "premium" | "combo"
type Sort = "popular" | "price-asc" | "price-desc" | "discount"

const kinds: { value: Kind; label: string }[] = [
  { value: "all", label: "All" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "combo", label: "Combos" },
]

export function PackagesExplorer() {
  const { formatPrice } = useCurrency()
  const [kind, setKind] = useState<Kind>("all")
  const [destination, setDestination] = useState("all")
  const [sort, setSort] = useState<Sort>("popular")
  const [open, setOpen] = useState<TravelPackage | null>(null)

  const list = useMemo(() => {
    let items = kind === "combo" ? comboPackages : kind === "all" ? [...packages, ...comboPackages] : packages.filter((p) => p.type === kind)
    if (destination !== "all") items = items.filter((p) => p.destinationId === destination || p.destinationId.includes(destination))
    const sorted = [...items]
    if (sort === "price-asc") sorted.sort((a, b) => a.priceUSD - b.priceUSD)
    if (sort === "price-desc") sorted.sort((a, b) => b.priceUSD - a.priceUSD)
    if (sort === "discount") sorted.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
    return sorted
  }, [kind, destination, sort])

  return (
    <div className="space-y-8">
      <div className="glass sticky top-20 z-30 flex flex-col gap-3 rounded-3xl p-3 shadow-lg md:flex-row md:items-center">
        <div role="tablist" aria-label="Package type" className="flex gap-1 overflow-x-auto">
          {kinds.map((k) => (
            <button
              key={k.value}
              role="tab"
              aria-selected={kind === k.value}
              onClick={() => setKind(k.value)}
              className={cn("relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors", kind === k.value ? "text-white" : "hover:bg-muted")}
            >
              {kind === k.value && <m.span layoutId="kind-pill" className="bg-brand-gradient absolute inset-0 -z-10 rounded-full" />}
              {k.label}
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-center gap-2 md:justify-end">
          <SlidersHorizontal className="hidden size-4 text-muted-foreground md:block" />
          <Select name="destination" value={destination} onValueChange={setDestination}>
            <SelectTrigger size="sm" className="flex-1 md:w-44 md:flex-none" aria-label="Destination">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All destinations</SelectItem>
              {destinations.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select name="sort" value={sort} onValueChange={(v) => setSort(v as Sort)}>
            <SelectTrigger size="sm" className="flex-1 md:w-44 md:flex-none" aria-label="Sort by">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Recommended</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
              <SelectItem value="discount">Biggest savings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing <strong className="text-foreground">{list.length}</strong> package{list.length === 1 ? "" : "s"}
      </p>

      <m.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((pkg) => (
            <m.div key={pkg.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
              <PackageCard pkg={pkg} combo={isCombo(pkg)} onDetails={() => setOpen(pkg)} />
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>

      {list.length === 0 && (
        <div className="rounded-3xl border border-dashed p-12 text-center">
          <p className="text-lg font-semibold">No packages match those filters.</p>
          <p className="mt-1 text-muted-foreground">We build custom trips every day — just ask.</p>
          <Button asChild className="mt-6"><Link href="/contact?inquiry=custom-trip">Request a custom trip</Link></Button>
        </div>
      )}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{open.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <Clock className="size-4" /> {open.duration.days} days / {open.duration.nights} nights · from {formatPrice(open.priceUSD)} per person
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 sm:grid-cols-2">
                <ol className="relative space-y-4 border-l border-dashed pl-6">
                  {open.itinerary.map((d) => (
                    <li key={d.day} className="relative text-sm">
                      <span className="bg-brand-gradient absolute top-0.5 -left-[34px] grid size-5 place-items-center rounded-full text-[10px] font-bold text-white">{d.day}</span>
                      {d.activity}
                    </li>
                  ))}
                </ol>
                <ul className="space-y-2">
                  {open.inclusions.map((inc) => (
                    <li key={inc} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-success" /> {inc}</li>
                  ))}
                </ul>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href={isCombo(open) ? "/contact?inquiry=custom-trip" : `/book/${open.destinationId}?package=${open.id}#plan`}>
                  {isCombo(open) ? "Customise this combo" : "Request this package"} <ArrowRight />
                </Link>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
