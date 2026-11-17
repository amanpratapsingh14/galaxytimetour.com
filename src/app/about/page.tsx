import type { Metadata } from "next"
import Image from "next/image"
import { Award, Compass, HeartHandshake, Languages, ShieldCheck, Sparkles } from "lucide-react"

import { CtaBand } from "@/components/cta-band"
import { Stats } from "@/components/home/stats"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "About Us — TAT-licensed Thailand Travel Experts",
  description: `Meet ${siteConfig.legalName}: a Grade A, TAT-licensed travel company in Pattaya crafting personalised Thailand trips since 2009.`,
  alternates: { canonical: "/about" },
}

const values = [
  { Icon: Compass, title: "Local by design", text: "We live where you'll travel. Every hotel, guide and boat operator is someone we know personally." },
  { Icon: HeartHandshake, title: "Personal, always", text: "No templates. Each itinerary is built around your pace, budget and the moments you'll remember." },
  { Icon: Languages, title: "We speak your language", text: `Support in ${siteConfig.languages.join(", ")} — before you book, while you travel and after you're home.` },
  { Icon: ShieldCheck, title: "Licensed & accountable", text: `${siteConfig.license}, Grade A classification. Your trip is in safe, regulated hands.` },
]

const milestones = [
  { year: "2009", text: "Founded with a simple idea: travel should create meaningful connections, not just photos." },
  { year: "Growth", text: "From a small team of passionate travellers to a trusted partner for families, groups and agencies." },
  { year: "B2B", text: "Competitive partner pricing and one-hour response times for travel agencies worldwide." },
  { year: "Today", text: "Eight signature destinations, thousands of happy travellers and a team on call 24/7." },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/thailand/thai_3.png"
        eyebrow="About us"
        title={<>Crafting Thailand journeys <span className="text-gradient">since 2009</span></>}
        description="We're a Pattaya-based, TAT-licensed team turning travel dreams into seamless, unforgettable trips."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
      />

      <section className="container grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border shadow-2xl">
            <video
              className="absolute inset-0 size-full object-cover"
              src="/Videos/about_vid_1.mp4"
              poster="/hero_image.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Galaxy Time Tour travel highlights"
            />
          </div>
          <div className="glass absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl p-4 shadow-xl sm:-left-8">
            <span className="bg-brand-gradient grid size-11 place-items-center rounded-xl text-white"><Award className="size-6" /></span>
            <div>
              <p className="font-display font-bold">Grade A</p>
              <p className="text-xs text-muted-foreground">{siteConfig.license}</p>
            </div>
          </div>
        </Reveal>
        <div className="space-y-6">
          <SectionHeading align="left" eyebrow="Our story" title="More than a trip — a story you'll keep telling" />
          <Reveal delay={0.1} className="space-y-4 text-muted-foreground">
            <p>
              Our journey began in 2009 with a simple yet powerful vision: to transform how people experience Thailand.
              We believe travel should be more than visiting new places — it should create meaningful connections and
              unforgettable moments.
            </p>
            <p>
              Today {siteConfig.legalName} is a fully licensed, Grade A travel company based in Pattaya. Our team
              combines deep regional knowledge with exclusive hotel and transport deals, private and shared transfers,
              sightseeing across every major city and island, and custom packages for families, groups and leisure
              travellers.
            </p>
            <p>We respond to every enquiry within an hour, and we guarantee competitive B2B pricing with the personal touch your clients deserve.</p>
          </Reveal>
        </div>
      </section>

      <section className="container pb-20">
        <Stats />
      </section>

      <section className="border-y bg-muted/40 py-20">
        <div className="container space-y-12">
          <SectionHeading eyebrow="What we stand for" title="The way we travel" />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }) => (
              <StaggerItem key={title} className="rounded-3xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="bg-brand-gradient mb-5 grid size-12 place-items-center rounded-2xl text-white shadow-lg shadow-brand-magenta/25"><Icon className="size-6" /></span>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container grid gap-12 py-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <SectionHeading align="left" eyebrow="Our journey" title="Built on trust, one trip at a time" />
          <Reveal className="relative hidden aspect-square overflow-hidden rounded-[2rem] lg:block">
            <Image src="/ImgGallery/package_32.png" alt="Travellers exploring Thailand" fill sizes="40vw" className="object-cover" />
          </Reveal>
        </div>
        <ol className="relative space-y-8 border-l border-dashed pl-8">
          {milestones.map((m, i) => (
            <li key={m.year} className="relative">
              <Reveal delay={i * 0.08}>
                <span className="bg-brand-gradient absolute top-1 -left-[42px] grid size-5 place-items-center rounded-full ring-4 ring-background">
                  <Sparkles className="size-3 text-white" />
                </span>
                <p className="font-display text-2xl font-extrabold text-gradient">{m.year}</p>
                <p className="mt-1 text-muted-foreground">{m.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand />
    </>
  )
}
