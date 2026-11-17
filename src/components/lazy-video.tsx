"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Muted looping background video that only downloads once it is near the viewport,
 * and never on "Save-Data" connections (the poster image is shown instead).
 */
export function LazyVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (!el || conn?.saveData) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setLoad(true)
        observer.disconnect()
      }
    }, { rootMargin: "200px" })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      src={load ? src : undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  )
}
