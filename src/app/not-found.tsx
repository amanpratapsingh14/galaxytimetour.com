import Link from "next/link"
import { Compass, Home } from "lucide-react"

import { Starfield } from "@/components/starfield"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[oklch(0.12_0.04_275)] px-4 text-center text-white">
      <Starfield className="-z-10" dense />
      <div>
        <p className="text-gradient-animated font-display text-[9rem] leading-none font-extrabold sm:text-[12rem]">404</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Lost in space?</h1>
        <p className="mx-auto mt-3 max-w-md text-white/70">This page drifted out of orbit. Let&apos;s get you back to somewhere beautiful.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg"><Link href="/"><Home /> Back home</Link></Button>
          <Button asChild size="lg" variant="glass"><Link href="/destinations"><Compass /> Explore destinations</Link></Button>
        </div>
      </div>
    </section>
  )
}
