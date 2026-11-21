"use client"

import { useState } from "react"
import { AnimatePresence, m } from "motion/react"

import { DestinationCard } from "@/components/destination-card"
import { destinations, type DestinationVibe } from "@/data/destinations"
import { cn } from "@/lib/utils"

const vibes: ("All" | DestinationVibe)[] = ["All", "Beach", "Culture", "Nature", "City", "Adventure", "Nightlife"]

// Bento sizing for the 8-card "All" view on large screens: fills a 4×3 grid exactly.
const bento = ["lg:col-span-2 lg:row-span-2", "", "", "lg:row-span-2", "", "", "", ""]

export function DestinationExplorer({ bentoLayout = true }: { bentoLayout?: boolean }) {
  const [vibe, setVibe] = useState<(typeof vibes)[number]>("All")
  const list = vibe === "All" ? destinations : destinations.filter((d) => d.vibes.includes(vibe))
  const useBento = bentoLayout && vibe === "All"

  return (
    <div className="space-y-8">
      <div role="tablist" aria-label="Filter destinations by vibe" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:justify-center">
        {vibes.map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={vibe === v}
            onClick={() => setVibe(v)}
            className={cn(
              "relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              vibe === v ? "border-transparent text-white" : "hover:border-highlight/50 hover:text-highlight",
            )}
          >
            {vibe === v && (
              <m.span layoutId="vibe-pill" className="bg-brand-gradient absolute inset-0 -z-10 rounded-full" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
            )}
            {v}
          </button>
        ))}
      </div>

      <m.div layout className="grid auto-rows-[18rem] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((d, i) => (
            <m.div
              key={d.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn("flex", useBento && bento[i])}
            >
              <DestinationCard destination={d} className="w-full" eager={i < 2} />
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>
    </div>
  )
}
