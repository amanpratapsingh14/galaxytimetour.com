"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Phone } from "lucide-react"
import { m } from "motion/react"

import { CurrencySelector } from "@/components/currency-selector"
import { Logo } from "@/components/site/logo"
import { WhatsAppIcon } from "@/components/social-icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { mainNav, siteConfig, whatsappLink } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  // Every page opens with a dark hero, so the bar starts transparent with light text.
  const overHero = !scrolled && !open

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overHero ? "bg-transparent text-white" : "glass border-x-0 border-t-0 text-foreground shadow-lg shadow-black/5",
      )}
    >
      <nav className="container flex h-18 items-center justify-between gap-4" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(item.href) ? "" : "opacity-80 hover:opacity-100",
                )}
              >
                {item.name}
              </Link>
              {isActive(item.href) && (
                <m.span
                  layoutId="nav-pill"
                  className={cn("absolute inset-0 rounded-full", overHero ? "bg-white/15" : "bg-accent")}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <CurrencySelector className={cn(overHero && "[&_button]:border-white/25 [&_button]:bg-white/10 [&_button]:text-white")} />
          <ThemeToggle className={cn(overHero && "hover:bg-white/15 hover:text-white")} />
          <Button asChild size="sm" className="h-10 px-5">
            <Link href="/destinations">Plan my trip</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle className={cn(overHero && "hover:bg-white/15 hover:text-white")} />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className={cn(overHero && "hover:bg-white/15 hover:text-white")}>
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[86vw] max-w-sm flex-col gap-0 border-l p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <div className="border-b p-5">
                <Logo onClick={() => setOpen(false)} />
              </div>
              <ul className="flex flex-col gap-1 p-4">
                {mainNav.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 font-display text-lg font-semibold transition-colors",
                        isActive(item.href) ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                      )}
                    >
                      {item.name}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <div className="mt-auto space-y-3 border-t p-5">
                <CurrencySelector showLabel />
                <Button asChild className="w-full" size="lg">
                  <Link href="/destinations" onClick={() => setOpen(false)}>Plan my trip</Link>
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline">
                    <a href={siteConfig.phones[0].href}><Phone /> Call</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-4" /> WhatsApp</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
