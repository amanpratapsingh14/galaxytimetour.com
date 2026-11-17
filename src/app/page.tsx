import Link from "next/link"
import { ArrowRight, BadgeCheck, Car, Headphones, Hotel, MessageSquareText, Mountain, Plane, Route, Sparkles, UtensilsCrossed, Wallet } from "lucide-react"

import { CtaBand } from "@/components/cta-band"
import { DestinationExplorer } from "@/components/destination-explorer"
import { Hero } from "@/components/home/hero"
import { PackageCarousel } from "@/components/home/package-carousel"
import { Stats } from "@/components/home/stats"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { PhotoMarquee } from "@/components/photo-marquee"
import { SectionHeading } from "@/components/section-heading"
import { Starfield } from "@/components/starfield"
import { Button } from "@/components/ui/button"
import { destinations } from "@/data/destinations"
import { galleryPhotos } from "@/data/gallery"
import { allPackages } from "@/data/packages"
import { siteConfig } from "@/lib/site"

const features = [
  {
    Icon: Mountain,
    title: "Thrilling adventures",
    description: "Cliff-jumping on the islands, jungle zip-lines, diving the Andaman — curated with trusted local operators.",
  },
  {
    Icon: UtensilsCrossed,
    title: "Authentic Thai cuisine",
    description: "Street-food trails, floating markets and cooking classes built around fresh herbs and regional flavours.",
  },
  {
    Icon: Hotel,
    title: "Stays for every style",
    description: "From cosy boutique inns to 5★ beachfront resorts — exclusive rates on hotels we've personally vetted.",
  },
  {
    Icon: Wallet,
    title: "Honest, unbeatable prices",
    description: "Direct contracts with hotels and transport mean premium experiences without the premium mark-up.",
  },
  {
    Icon: Car,
    title: "Private & shared transfers",
    description: "Airport pickups, intercity drives and island ferries — door to door, all arranged before you land.",
  },
  {
    Icon: Headphones,
    title: "24/7 multilingual support",
    description: `Our team speaks ${siteConfig.languages.join(", ")} and is on call before, during and after your trip.`,
  },
]

const steps = [
  { Icon: MessageSquareText, title: "Tell us your dream", description: "Share dates, budget and must-dos via the form or WhatsApp." },
  { Icon: Route, title: "Get your itinerary", description: "A tailored day-by-day plan and transparent quote — usually within the hour." },
  { Icon: Plane, title: "Travel stress-free", description: "We handle hotels, transfers and tours. You just enjoy Thailand." },
]

const marqueePhotos = galleryPhotos.filter((p) => p.place === "Moments" && p.width >= 340)

export default function HomePage() {
  const featured = allPackages.filter((p) => p.type === "premium" || p.id.endsWith("combo"))

  return (
    <>
      <Hero />

      {/* Destination ticker */}
      <div className="border-y bg-muted/40 py-4">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-10 font-display text-lg font-semibold text-muted-foreground">
            {[...destinations, ...destinations].map((d, i) => (
              <span key={i} aria-hidden={i >= destinations.length} className="flex items-center gap-10">
                {d.name} <span className="text-brand-gold">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Intro + stats */}
      <section id="discover" className="relative scroll-mt-20 overflow-hidden py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Why Galaxy Time Tour"
            title={
              <>
                Your trusted one-stop partner for <span className="text-gradient">Thailand</span>
              </>
            }
            description={
              <>
                {siteConfig.legalName} is licensed by the Tourism Authority of Thailand ({siteConfig.license.replace("TAT License ", "")}) with a
                Grade A classification. From our base in Pattaya we design personalised trips for families, couples,
                groups and B2B partners — and we answer every enquiry within an hour.
              </>
            }
          />
          <Stats />
        </div>
      </section>

      {/* Destinations */}
      <section className="relative py-20 md:py-28">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="Destinations"
            title="Where will Thailand take you?"
            description="Eight signature destinations, from Andaman islands to the misty mountains of the north. Filter by the vibe you're after."
          />
          <DestinationExplorer />
          <Reveal className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/destinations">
                Compare all destinations <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="relative isolate overflow-hidden bg-[oklch(0.12_0.04_275)] py-20 text-white md:py-28">
        <Starfield className="-z-10" dense />
        <div className="container space-y-14">
          <SectionHeading
            eyebrow="The Galaxy difference"
            title={
              <span className="text-white">
                Everything handled. <span className="text-gradient">Nothing ordinary.</span>
              </span>
            }
            description={<span className="text-white/70">Deep regional knowledge, exclusive hotel and transport deals, and a team that actually picks up the phone.</span>}
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ Icon, title, description }) => (
              <StaggerItem
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.08]"
              >
                <div className="bg-brand-gradient absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40" />
                <div className="bg-brand-gradient mb-5 grid size-12 place-items-center rounded-2xl shadow-lg shadow-brand-magenta/30">
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2 text-white/65">{description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 md:py-28">
        <div className="container space-y-12">
          <SectionHeading
            align="left"
            eyebrow="Handpicked packages"
            title="Premium escapes & multi-city combos"
            description="All-inclusive itineraries with hotels, transfers and guided tours. Every package can be tailored."
          />
          <PackageCarousel items={featured} />
          <Reveal>
            <Button asChild variant="outline" size="lg">
              <Link href="/packages">
                Browse all {allPackages.length} packages <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/40 py-20 md:py-28">
        <div className="container space-y-14">
          <SectionHeading eyebrow="How it works" title="From idea to itinerary in three steps" />
          <Stagger className="relative grid gap-6 md:grid-cols-3">
            <div aria-hidden className="absolute top-10 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-brand-magenta via-brand-violet to-brand-cyan md:block" />
            {steps.map(({ Icon, title, description }, i) => (
              <StaggerItem key={title} className="relative text-center">
                <div className="relative mx-auto grid size-20 place-items-center rounded-full border bg-card shadow-lg">
                  <Icon className="size-8 text-highlight" />
                  <span className="bg-brand-gradient absolute -top-1 -right-1 grid size-7 place-items-center rounded-full text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-muted-foreground">{description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Photo strip */}
      <section className="space-y-4 overflow-hidden py-20 md:py-28">
        <div className="container mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow="Travel moments" title="Real trips, real smiles" className="max-w-xl" />
          <Reveal>
            <Button asChild variant="outline">
              <Link href="/gallery">
                <Sparkles /> Open the gallery
              </Link>
            </Button>
          </Reveal>
        </div>
        <PhotoMarquee photos={marqueePhotos.slice(0, 12).map((p) => p.src)} />
        <PhotoMarquee photos={marqueePhotos.slice(12, 24).map((p) => p.src)} reverse />
      </section>

      <div className="container">
        <Reveal className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-success" /> {siteConfig.license}</span>
          <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-success" /> Grade A classification</span>
          <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-success" /> B2B partner rates</span>
        </Reveal>
      </div>

      <CtaBand />
    </>
  )
}
