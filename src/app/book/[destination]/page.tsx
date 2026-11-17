import { Suspense } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, ChevronDown, Clock, Headphones, MapPin, ShieldCheck, Sparkles } from "lucide-react"

import { CtaBand } from "@/components/cta-band"
import { DestinationCard } from "@/components/destination-card"
import { BookingForm } from "@/components/forms/booking-form"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { destinations, getDestination } from "@/data/destinations"
import { getPackagesForDestination } from "@/data/packages"
import { siteConfig } from "@/lib/site"

type Props = { params: Promise<{ destination: string }> }

// Only the destinations we sell exist; anything else is a real 404.
export const dynamicParams = false

export function generateStaticParams() {
  return destinations.map((d) => ({ destination: d.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDestination((await params).destination)
  if (!d) return {}
  const title = `${d.name} Tour Packages — ${d.tagline}`
  return {
    title,
    description: `${d.description} Book a tailor-made ${d.name} trip from $${d.basePriceUSD} per person with ${siteConfig.name}.`,
    alternates: { canonical: `/book/${d.id}` },
    openGraph: { title, description: d.description, images: [{ url: d.image }] },
  }
}

export default async function DestinationPage({ params }: Props) {
  const d = getDestination((await params).destination)
  if (!d) notFound()
  const pkgs = getPackagesForDestination(d.id)
  const others = destinations.filter((o) => o.id !== d.id && (o.region === d.region || o.vibes.some((v) => d.vibes.includes(v)))).slice(0, 3)

  return (
    <>
      <PageHero
        image={d.images[1] ?? d.image}
        eyebrow={`${d.region} · Thailand`}
        title={
          <>
            {d.name} <span className="text-gradient block text-3xl sm:text-4xl md:text-5xl">{d.tagline}</span>
          </>
        }
        description={d.description}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Destinations", href: "/destinations" }, { name: d.name }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          {d.vibes.map((v) => (
            <Badge key={v} variant="glass" className="px-3 py-1 text-sm">{v}</Badge>
          ))}
          <a href="#plan" className="ml-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-cyan hover:underline">
            Plan this trip <ArrowRight className="size-4" />
          </a>
        </div>
      </PageHero>

      <div className="container grid gap-12 py-16 lg:grid-cols-[1fr_440px] lg:gap-16">
        <div className="min-w-0 space-y-16">
          {/* Photo mosaic */}
          <Stagger className="grid h-[420px] grid-cols-4 grid-rows-2 gap-3 sm:h-[480px]">
            {d.images.slice(0, 5).map((src, i) => (
              <StaggerItem
                key={src}
                className={i === 0 ? "relative col-span-4 row-span-1 overflow-hidden rounded-3xl sm:col-span-2 sm:row-span-2" : "relative col-span-2 hidden overflow-hidden rounded-2xl sm:col-span-1 sm:block"}
              >
                <Image src={src} alt={`${d.name} photo ${i + 1}`} fill loading={i === 0 ? "eager" : "lazy"} sizes={i === 0 ? "(max-width: 640px) 100vw, 40vw" : "20vw"} className="object-cover transition-transform duration-700 hover:scale-110" />
              </StaggerItem>
            ))}
          </Stagger>

          {/* Highlights */}
          <section className="space-y-6">
            <SectionHeading align="left" eyebrow="Don't miss" title={`Top things to do in ${d.name}`} />
            <Stagger className="grid gap-3 sm:grid-cols-2">
              {d.highlights.map((h) => (
                <StaggerItem key={h} className="flex items-center gap-3 rounded-2xl border bg-card p-4">
                  <span className="bg-brand-gradient grid size-9 shrink-0 place-items-center rounded-xl text-white">
                    <Sparkles className="size-4" />
                  </span>
                  <span className="font-medium">{h}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          {/* Packages + itineraries */}
          <section className="space-y-6">
            <SectionHeading align="left" eyebrow="Packages" title="Pick your pace" description="Both packages can be extended, combined with another city, or rebuilt from scratch." />
            <div className="space-y-4">
              {pkgs.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <details className="group overflow-hidden rounded-3xl border bg-card open:shadow-xl" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl sm:size-24">
                        <Image src={p.image} alt="" fill sizes="96px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={p.type === "premium" ? "gold" : "secondary"} className="capitalize">{p.type}</Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3.5" /> {p.duration.days}D / {p.duration.nights}N</span>
                        </div>
                        <h3 className="mt-1.5 truncate text-lg font-bold sm:text-xl">{p.title}</h3>
                        <p className="line-clamp-1 text-sm text-muted-foreground">{p.description}</p>
                      </div>
                      <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="grid gap-6 border-t p-5 sm:grid-cols-2 sm:p-6">
                      <div>
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Itinerary</h4>
                        <ol className="relative space-y-4 border-l border-dashed pl-6">
                          {p.itinerary.map((day) => (
                            <li key={day.day} className="relative">
                              <span className="bg-brand-gradient absolute top-0.5 -left-[34px] grid size-5 place-items-center rounded-full text-[10px] font-bold text-white">{day.day}</span>
                              <p className="text-sm">{day.activity}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Included</h4>
                        <ul className="space-y-2">
                          {p.inclusions.map((inc) => (
                            <li key={inc} className="flex items-start gap-2 text-sm">
                              <Check className="mt-0.5 size-4 shrink-0 text-success" /> {inc}
                            </li>
                          ))}
                        </ul>
                        <Link href={`?package=${p.id}#plan`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-highlight hover:underline">
                          Request this package <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky booking card */}
        <aside id="plan" className="scroll-mt-24">
          <div className="sticky top-24 space-y-4">
            <div className="ring-gradient rounded-3xl border bg-card p-5 shadow-2xl shadow-brand-violet/10 sm:p-6">
              <div className="mb-5">
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="size-4 text-primary" /> {d.name}, Thailand</p>
                <h2 className="mt-1 text-2xl font-bold">Plan your {d.name} trip</h2>
              </div>
              <Suspense fallback={<div className="h-[560px] animate-pulse rounded-2xl bg-muted" />}>
                <BookingForm key={d.id} destinationId={d.id} />
              </Suspense>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <li className="flex items-center gap-2 rounded-2xl border bg-card p-3"><ShieldCheck className="size-4 shrink-0 text-success" /> TAT licensed</li>
              <li className="flex items-center gap-2 rounded-2xl border bg-card p-3"><Headphones className="size-4 shrink-0 text-highlight" /> 24/7 on-trip support</li>
            </ul>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="container space-y-10 pb-8">
          <SectionHeading align="left" eyebrow="You might also love" title="Pair it with…" />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <StaggerItem key={o.id} className="flex">
                <DestinationCard destination={o} className="w-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      <CtaBand title={`Not sure ${d.name} is the one?`} description="Tell us what you love and we'll suggest the perfect mix of cities, islands and mountains." />
    </>
  )
}
