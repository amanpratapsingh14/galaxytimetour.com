"use client"

import Image from "next/image"
import { ChevronDown, Clock, Headphones, ShieldCheck } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"

import { Starfield } from "@/components/starfield"
import { TripPlanner } from "@/components/trip-planner"
import { destinations } from "@/data/destinations"

const ease = [0.22, 1, 0.36, 1] as const

const floating = [
  { d: destinations[2]!, className: "right-[4%] top-[18%] rotate-6 w-44", delay: 0.6 },
  { d: destinations[5]!, className: "right-[19%] top-[44%] -rotate-3 w-36", delay: 0.8 },
  { d: destinations[3]!, className: "right-[3%] top-[58%] rotate-2 w-40", delay: 1 },
]

export function Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, 160])
  const contentY = useTransform(scrollY, [0, 600], [0, -60])
  const fade = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[oklch(0.12_0.04_275)] text-white">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <Image
          src="/hero_image.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          quality={90}
          className="animate-kenburns object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.12_0.04_275/0.75)] via-[oklch(0.12_0.04_275/0.45)] to-[oklch(0.14_0.04_275)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[oklch(0.12_0.04_275/0.85)] via-transparent to-transparent" />
      <Starfield className="-z-10 opacity-80" dense />

      {floating.map(({ d, className, delay }) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay, ease }}
          className={`absolute hidden xl:block ${className}`}
        >
          <div className="animate-float rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md" style={{ animationDelay: `${delay}s` }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image src={d.image} alt={d.name} fill sizes="180px" className="object-cover" />
            </div>
            <p className="px-1 pt-2 pb-0.5 text-xs font-semibold">{d.name}</p>
          </div>
        </motion.div>
      ))}

      <motion.div style={{ y: contentY, opacity: fade }} className="container relative pt-28 pb-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md sm:text-sm"
          >
            <span className="size-2 animate-pulse rounded-full bg-brand-gold" />
            TAT-licensed Thailand specialists · Pattaya
          </motion.p>

          <h1 className="text-5xl leading-[1.02] font-extrabold sm:text-6xl md:text-7xl lg:text-8xl">
            {["Thailand,", "beyond the"].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              className="text-gradient-animated block pb-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.34, ease }}
            >
              ordinary.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl"
          >
            Island hopping in the Andaman, temple trails in the north, rooftop nights in Bangkok — hand-crafted
            itineraries with local experts on call 24/7.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
            className="mt-10"
          >
            <TripPlanner className="max-w-4xl" />
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75"
          >
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-brand-gold" /> Licensed & Grade A</li>
            <li className="flex items-center gap-2"><Clock className="size-4 text-brand-cyan" /> Replies within 1 hour</li>
            <li className="flex items-center gap-2"><Headphones className="size-4 text-brand-magenta" /> English · Hindi · Thai</li>
          </motion.ul>
        </div>
      </motion.div>

      <motion.a
        href="#discover"
        aria-label="Scroll to content"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white"
      >
        <ChevronDown className="size-7 animate-bounce" />
      </motion.a>
    </section>
  )
}
