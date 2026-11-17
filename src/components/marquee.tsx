"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Infinite horizontal scroller. Children are rendered twice for a seamless loop.
 *
 * The animation only runs while the strip is on screen: a running marquee makes Chrome
 * re-layerize and commit every frame (~100 ms/s of main-thread work on mid-range phones),
 * which delayed page load when it ran off-screen.
 */
export function Marquee({
  children,
  reverse = false,
  className,
  trackClassName,
}: {
  children: React.ReactNode
  reverse?: boolean
  className?: string
  trackClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn("group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}>
      <div
        className={cn(
          "flex w-max animate-marquee group-hover:[animation-play-state:paused]",
          !visible && "[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
          trackClassName,
        )}
      >
        {children}
        <div aria-hidden className="contents">{children}</div>
      </div>
    </div>
  )
}
