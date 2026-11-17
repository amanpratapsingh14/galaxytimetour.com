import type { Metadata } from "next"
import Link from "next/link"

import { CtaBand } from "@/components/cta-band"
import { DestinationExplorer } from "@/components/destination-explorer"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { destinations, type DestinationRegion } from "@/data/destinations"

export const metadata: Metadata = {
  title: "Thailand Destinations — Islands, Cities & Mountains",
  description: "Compare Pattaya, Bangkok, Phuket, Krabi, Koh Samui, Chiang Mai, Hua Hin and Chiang Rai. Find the Thailand destination that matches your travel style.",
  alternates: { canonical: "/destinations" },
}

const regionNotes: Record<DestinationRegion, string> = {
  Central: "Capital buzz, royal history and the best street food on earth.",
  "East Coast": "Easy beach breaks a short drive from Bangkok.",
  "Andaman Sea": "Turquoise water, limestone karsts and world-class island hopping.",
  "Gulf of Thailand": "Calmer seas, palm-fringed beaches and laid-back luxury.",
  North: "Cool mountain air, ancient temples and hill-tribe culture.",
}

export default function DestinationsPage() {
  const regions = Object.keys(regionNotes) as DestinationRegion[]

  return (
    <>
      <PageHero
        image="/hero_image.webp"
        eyebrow="Destinations"
        title={<>Eight ways to fall for <span className="text-gradient">Thailand</span></>}
        description="Whether you crave island sunsets, temple trails or rooftop nights, start with a destination — we'll handle everything else."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Destinations" }]}
      />

      <section className="container py-16 md:py-20">
        <DestinationExplorer bentoLayout={false} />
      </section>

      <section className="border-y bg-muted/40 py-20">
        <div className="container space-y-12">
          <SectionHeading eyebrow="By region" title="Thailand at a glance" description="Each region has its own character. Mix two or three for the ultimate trip." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {regions.map((r, i) => (
              <Reveal key={r} delay={i * 0.06} className="rounded-3xl border bg-card p-6">
                <h3 className="text-lg font-bold">{r}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{regionNotes[r]}</p>
                <p className="mt-4 flex flex-wrap gap-1.5">
                  {destinations.filter((d) => d.region === r).map((d) => (
                    <Link key={d.id} href={`/book/${d.id}`} className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground hover:bg-primary hover:text-primary-foreground">
                      {d.name}
                    </Link>
                  ))}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Can't choose just one?" description="Our combo itineraries pair the islands with the cities or the north — ask us for a multi-city plan." />
    </>
  )
}
