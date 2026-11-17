import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Starfield } from "@/components/starfield"
import { cn } from "@/lib/utils"

/** Dark banner used at the top of every inner page (the header sits transparent over it). */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
  children,
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  image?: string
  breadcrumbs?: { name: string; href?: string }[]
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-[oklch(0.12_0.04_275)] pt-36 pb-20 text-white md:pt-44 md:pb-28", className)}>
      {image && (
        <>
          <Image src={image} alt="" fill preload sizes="100vw" className="-z-20 animate-kenburns object-cover opacity-50 blur-[2px]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.12_0.04_275/0.7)] to-[oklch(0.14_0.04_275)]" />
        </>
      )}
      <Starfield className="-z-10" dense />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-background" />

      <div className="container">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              {breadcrumbs.map((b, i) => (
                <li key={b.name} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5" />}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-white">{b.name}</Link>
                  ) : (
                    <span aria-current="page" className="text-white">{b.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
              <span aria-hidden className="mr-2 text-brand-gold">✦</span>
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl leading-[1.05] font-extrabold sm:text-5xl md:text-6xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-lg text-white/75 md:text-xl">{description}</p>}
        </Reveal>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
