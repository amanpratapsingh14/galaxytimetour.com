"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Phone } from "lucide-react"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { CurrencySelector } from "@/components/currency-selector"

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  const navigation = [
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">GalaxyTimeTour</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <CurrencySelector />
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              <Phone className="mr-2 h-4 w-4" />
              1-888-TRAVEL
            </Button>
            <Button>Book Now</Button>
          </div>

          {/* Mobile navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <VisuallyHidden.Root>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Mobile navigation menu with links to destinations, packages, about us, and contact pages
                  </SheetDescription>
                </VisuallyHidden.Root>
                <div className="flex flex-col space-y-4 pt-4 pl-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2">
                    <CurrencySelector />
                    <div className="flex items-center">
                      <ThemeToggle />
                    </div>
                  </div>
                  <Button className="w-full">Book Now</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}

