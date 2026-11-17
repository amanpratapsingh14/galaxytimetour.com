"use client"

import { useEffect, useRef, useState } from "react"

import { Stagger, StaggerItem } from "@/components/motion/reveal"

const stats = [
  { value: 50, suffix: "K+", label: "Happy travellers" },
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 8, suffix: "", label: "Signature destinations" },
  { value: 24, suffix: "/7", label: "Multilingual support" },
]

/** Counts up once when scrolled into view. Renders the final value on the server, so it's never wrong without JS. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1600)
        setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { rootMargin: "-40px" })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-4">
      {stats.map((s) => (
        <StaggerItem key={s.label} className="bg-card/80 px-6 py-8 text-center backdrop-blur">
          <p className="text-gradient font-display text-4xl font-extrabold sm:text-5xl">
            <Counter value={s.value} suffix={s.suffix} />
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
