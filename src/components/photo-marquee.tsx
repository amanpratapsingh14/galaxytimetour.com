import Image from "next/image"

import { Marquee } from "@/components/marquee"

/** Pause-on-hover strip of photos that only animates while on screen. */
export function PhotoMarquee({ photos, reverse = false, className }: { photos: string[]; reverse?: boolean; className?: string }) {
  return (
    <Marquee reverse={reverse} {...(className ? { className } : {})}>
      {photos.map((src) => (
        <div key={src} className="relative mr-4 h-48 w-64 shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-80">
          <Image src={src} alt="" fill sizes="320px" className="object-cover transition-transform duration-700 hover:scale-110" />
        </div>
      ))}
    </Marquee>
  )
}
