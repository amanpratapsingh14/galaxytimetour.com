import type { Metadata } from "next"
import { BadgePercent, Hotel, Plane, Route } from "lucide-react"

import { CtaBand } from "@/components/cta-band"
import { CurrencySelector } from "@/components/currency-selector"
import { PackagesExplorer } from "@/components/packages-explorer"
import { PageHero } from "@/components/page-hero"
import { allPackages } from "@/data/packages"

export const metadata: Metadata = {
  title: "Thailand Tour Packages — Standard, Premium & Combos",
  description: `Compare ${allPackages.length} all-inclusive Thailand tour packages with hotels, transfers and guided tours. Prices in your currency, fully customisable.`,
  alternates: { canonical: "/packages" },
}

const perks = [
  { Icon: Hotel, label: "Hand-picked hotels" },
  { Icon: Plane, label: "Airport transfers" },
  { Icon: Route, label: "Guided tours" },
  { Icon: BadgePercent, label: "Up to 16% off" },
]

export default function PackagesPage() {
  return (
    <>
      <PageHero
        image="/thailand/thai_5.png"
        eyebrow="Tour packages"
        title={<>All-inclusive escapes, <span className="text-gradient">your way</span></>}
        description="Standard, premium and multi-city combos — each one a starting point we tailor to your dates, budget and travel style."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Packages" }]}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {perks.map(({ Icon, label }) => (
            <span key={label} className="flex items-center gap-2 text-sm text-white/80">
              <Icon className="size-4 text-brand-cyan" /> {label}
            </span>
          ))}
          <CurrencySelector showLabel className="[&_span]:text-white/70" />
        </div>
      </PageHero>

      <section className="container py-12 md:py-16">
        <h2 className="sr-only">All packages</h2>
        <PackagesExplorer />
      </section>

      <CtaBand title="Want something different?" description="Honeymoon, family reunion, corporate offsite or a 3-city adventure — we'll design it around you." />
    </>
  )
}
