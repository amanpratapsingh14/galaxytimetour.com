import Image from "next/image"
import { ChevronDown, Clock, Headphones, ShieldCheck } from "lucide-react"

import { Starfield } from "@/components/starfield"
import { TripPlanner } from "@/components/trip-planner"
import { destinations } from "@/data/destinations"

const floating = [
  { d: destinations[2]!, className: "right-[4%] top-[18%] rotate-6 w-44", delay: "600ms" },
  { d: destinations[5]!, className: "right-[19%] top-[44%] -rotate-3 w-36", delay: "800ms" },
  { d: destinations[3]!, className: "right-[3%] top-[58%] rotate-2 w-40", delay: "1000ms" },
]

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

// Server-rendered with CSS-only entrance animations so the headline (the LCP element)
// paints straight from HTML instead of waiting for JavaScript to fade it in.
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[oklch(0.12_0.04_275)] text-white">
      <Image
        src="/hero_image.webp"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover md:motion-safe:animate-kenburns"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.12_0.04_275/0.75)] via-[oklch(0.12_0.04_275/0.45)] to-[oklch(0.14_0.04_275)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[oklch(0.12_0.04_275/0.85)] via-transparent to-transparent" />
      <Starfield className="-z-10 opacity-80" dense />

      {floating.map(({ d: dest, className, delay }) => (
        <div key={dest.id} className={`rise-fade absolute hidden xl:block ${className}`} style={{ "--d": delay } as React.CSSProperties}>
          <div className="animate-float rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md" style={{ animationDelay: delay }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image src={dest.image} alt={dest.name} fill sizes="180px" className="object-cover" />
            </div>
            <p className="px-1 pt-2 pb-0.5 text-xs font-semibold">{dest.name}</p>
          </div>
        </div>
      ))}

      <div className="container relative pt-28 pb-24">
        <div className="max-w-3xl">
          <p className="rise-fade mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md sm:text-sm">
            <span className="size-2 animate-pulse rounded-full bg-brand-gold" />
            TAT-licensed Thailand specialists · Pattaya
          </p>

          <h1 className="text-5xl leading-[1.02] font-extrabold sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="rise block" style={d(100)}>Thailand,</span>
            <span className="rise block" style={d(220)}>beyond the</span>
            <span className="rise text-gradient-animated block pb-2" style={d(340)}>ordinary.</span>
          </h1>

          <p className="rise mt-6 max-w-xl text-lg text-white/80 sm:text-xl" style={d(450)}>
            Island hopping in the Andaman, temple trails in the north, rooftop nights in Bangkok — hand-crafted
            itineraries with local experts on call 24/7.
          </p>

          <div className="rise-fade mt-10" style={d(550)}>
            <TripPlanner className="max-w-4xl" />
          </div>

          <ul className="rise-fade mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75" style={d(700)}>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-brand-gold" /> Licensed & Grade A</li>
            <li className="flex items-center gap-2"><Clock className="size-4 text-brand-cyan" /> Replies within 1 hour</li>
            <li className="flex items-center gap-2"><Headphones className="size-4 text-brand-magenta" /> English · Hindi · Thai</li>
          </ul>
        </div>
      </div>

      <a href="#discover" aria-label="Scroll to content" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white">
        <ChevronDown className="size-7 animate-bounce" />
      </a>
    </section>
  )
}
