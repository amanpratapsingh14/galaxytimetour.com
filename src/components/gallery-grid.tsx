"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand, MapPin, X } from "lucide-react"
import { AnimatePresence, m } from "motion/react"

import { galleryPhotos, galleryPlaces } from "@/data/gallery"
import { cn } from "@/lib/utils"

const PAGE = 24

export function GalleryGrid() {
  const [place, setPlace] = useState("All")
  const [limit, setLimit] = useState(PAGE)
  const [index, setIndex] = useState<number | null>(null)

  const filtered = place === "All" ? galleryPhotos : galleryPhotos.filter((p) => p.place === place)
  const visible = filtered.slice(0, limit)
  const current = index !== null ? filtered[index] : undefined

  const count = filtered.length
  const go = (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + count) % count))

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % count))
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + count) % count))
      if (e.key === "Escape") setIndex(null)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [index, count])

  return (
    <div className="space-y-8">
      <div role="tablist" aria-label="Filter photos by place" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:flex-wrap sm:justify-center">
        {galleryPlaces.map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={place === p}
            onClick={() => {
              setPlace(p)
              setLimit(PAGE)
            }}
            className={cn("relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors", place === p ? "border-transparent text-white" : "hover:border-highlight/50")}
          >
            {place === p && <m.span layoutId="place-pill" className="bg-brand-gradient absolute inset-0 -z-10 rounded-full" />}
            {p}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
        {visible.map((photo, i) => (
          <m.button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl"
            aria-label={`Open photo ${i + 1} — ${photo.place}`}
          >
            <Image
              src={photo.src}
              alt={`${photo.place}, Thailand`}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-transparent p-3 text-left text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex items-center gap-1"><MapPin className="size-3.5" /> {photo.place}</span>
              <Expand className="size-4" />
            </span>
          </m.button>
        ))}
      </div>

      {limit < filtered.length && (
        <div className="text-center">
          <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="rounded-full border px-6 py-3 text-sm font-semibold transition hover:border-highlight/50 hover:text-highlight">
            Load more ({filtered.length - limit} left)
          </button>
        </div>
      )}

      <AnimatePresence>
        {current && index !== null && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setIndex(null)}
          >
            <m.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={`${current.place}, Thailand`}
                width={current.width}
                height={current.height}
                sizes="90vw"
                quality={90}
                className="max-h-[80dvh] w-auto rounded-2xl object-contain shadow-2xl"
                style={{ maxWidth: "min(90vw, 900px)" }}
              />
              <p className="mt-3 flex items-center justify-between text-sm text-white/80">
                <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {current.place}</span>
                <span className="tabular-nums">{index + 1} / {filtered.length}</span>
              </p>
            </m.div>

            <button type="button" aria-label="Close" onClick={() => setIndex(null)} className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X />
            </button>
            <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1) }} className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6">
              <ChevronLeft />
            </button>
            <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1) }} className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6">
              <ChevronRight />
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
