import Image from "next/image"

import { cn } from "@/lib/utils"

/** Infinite, pause-on-hover strip of photos. The list is rendered twice for a seamless loop. */
export function PhotoMarquee({ photos, reverse = false, className }: { photos: string[]; reverse?: boolean; className?: string }) {
  return (
    <div className={cn("group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}>
      <div className={cn("flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}>
        {[...photos, ...photos].map((src, i) => (
          <div key={i} aria-hidden={i >= photos.length} className="relative h-48 w-64 shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-80">
            <Image src={src} alt="" fill sizes="320px" className="object-cover transition-transform duration-700 hover:scale-110" />
          </div>
        ))}
      </div>
    </div>
  )
}
