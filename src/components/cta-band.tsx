import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { WhatsAppIcon } from "@/components/social-icons"
import { Starfield } from "@/components/starfield"
import { Button } from "@/components/ui/button"
import { siteConfig, whatsappLink } from "@/lib/site"

export function CtaBand({
  title = "Ready to write your Thailand story?",
  description = "Tell us your dates and dream list — we'll send a personalised itinerary and quote, usually within the hour.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="container py-20 md:py-28">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-[oklch(0.16_0.06_285)] px-6 py-16 text-center text-white shadow-2xl sm:px-12 md:py-20">
        <div className="bg-brand-gradient absolute inset-0 -z-20 opacity-40" />
        <Starfield className="-z-10" dense />
        <div className="absolute -top-24 left-1/2 -z-10 size-72 -translate-x-1/2 rounded-full bg-brand-gold/30 blur-3xl" />
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold sm:text-4xl md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="xl" variant="solid" className="bg-white text-[oklch(0.2_0.06_285)] hover:bg-white/90">
            <Link href="/contact">
              Start planning <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="xl" variant="glass">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" /> WhatsApp us
            </a>
          </Button>
        </div>
        <a href={siteConfig.phones[0].href} className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <Phone className="size-4" /> or call {siteConfig.phones[0].display}
        </a>
      </Reveal>
    </section>
  )
}
