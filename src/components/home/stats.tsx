"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "motion/react"

import { Stagger, StaggerItem } from "@/components/motion/reveal"

const stats = [
  { value: 50, suffix: "K+", label: "Happy travellers" },
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 8, suffix: "", label: "Signature destinations" },
  { value: 24, suffix: "/7", label: "Multilingual support" },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value])

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
