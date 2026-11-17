"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

import { Starfield } from "@/components/starfield"
import { Button } from "@/components/ui/button"

/**
 * Click-to-load Google Map. The embed pulls ~1.3 MB of Google scripts, so we show a light
 * placeholder until the visitor asks for the map.
 */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  const [show, setShow] = useState(false)

  if (show) {
    return (
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="min-h-80 w-full flex-1 border-0 grayscale-[30%] dark:invert-[90%] dark:hue-rotate-180"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  return (
    <div className="relative isolate flex min-h-80 flex-1 flex-col items-center justify-center gap-4 overflow-hidden bg-[oklch(0.16_0.05_275)] p-6 text-center text-white">
      <Starfield className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(var(--brand-cyan)_1px,transparent_1px),linear-gradient(90deg,var(--brand-cyan)_1px,transparent_1px)] [background-size:40px_40px]" />
      <span className="bg-brand-gradient grid size-14 place-items-center rounded-full shadow-xl shadow-brand-magenta/30">
        <MapPin className="size-7" />
      </span>
      <p className="max-w-xs text-sm text-white/75">Central Pattaya, Chon Buri — a short drive from Walking Street and the beach.</p>
      <Button variant="glass" onClick={() => setShow(true)}>Show interactive map</Button>
    </div>
  )
}
