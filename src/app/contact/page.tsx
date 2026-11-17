import { Suspense } from "react"
import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { ContactForm } from "@/components/forms/contact-form"
import { MapEmbed } from "@/components/map-embed"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { PageHero } from "@/components/page-hero"
import { WhatsAppIcon } from "@/components/social-icons"
import { fullAddress, siteConfig, whatsappLink } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact Us — Plan Your Thailand Trip",
  description: `Talk to our Pattaya-based travel experts by WhatsApp, phone or email. We reply within an hour. ${fullAddress}.`,
  alternates: { canonical: "/contact" },
}

const channels = [
  {
    Icon: WhatsAppIcon,
    title: "WhatsApp",
    lines: ["Fastest reply — usually minutes"],
    href: whatsappLink("Hi Galaxy Time Tour! I'd like help planning a trip."),
    cta: "Start chat",
    external: true,
  },
  {
    Icon: Phone,
    title: "Call us",
    lines: siteConfig.phones.map((p) => `${p.display} (${p.label})`),
    href: siteConfig.phones[0].href,
    cta: "Call now",
  },
  {
    Icon: Mail,
    title: "Email",
    lines: [...siteConfig.emails],
    href: `mailto:${siteConfig.emails[0]}`,
    cta: "Send email",
  },
  {
    Icon: Clock,
    title: "Office hours",
    lines: [...siteConfig.hours, "24/7 support while travelling"],
  },
]

export default function ContactPage() {
  const mapQuery = encodeURIComponent(fullAddress)

  return (
    <>
      <PageHero
        image="/thailand/thai_4.png"
        eyebrow="Contact"
        title={<>Let&apos;s plan something <span className="text-gradient">unforgettable</span></>}
        description="Tell us where you'd like to go — or let us inspire you. A real person replies within the hour."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
      />

      <section className="relative z-10 container -mt-10 pb-16">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ Icon, title, lines, href, cta, external }) => (
            <StaggerItem key={title} className="flex flex-col rounded-3xl border bg-card p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <span className="bg-brand-gradient mb-4 grid size-11 place-items-center rounded-xl text-white"><Icon className="size-5" /></span>
              <h2 className="text-lg font-bold">{title}</h2>
              <ul className="mt-1 flex-1 space-y-0.5 text-sm text-muted-foreground">
                {lines.map((l) => <li key={l}>{l}</li>)}
              </ul>
              {href && (
                <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-4 text-sm font-semibold text-highlight hover:underline">
                  {cta} →
                </a>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container grid gap-8 pb-24 lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="ring-gradient rounded-[2rem] border bg-card p-6 shadow-2xl shadow-brand-violet/10 sm:p-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Send us a message</h2>
          <p className="mt-2 mb-6 text-muted-foreground">Share your plans and we&apos;ll come back with ideas, availability and a free quote.</p>
          <Suspense fallback={<div className="h-[520px] animate-pulse rounded-2xl bg-muted" />}>
            <ContactForm />
          </Suspense>
        </Reveal>

        <Reveal className="flex flex-col overflow-hidden rounded-[2rem] border bg-card">
          <MapEmbed query={fullAddress} title="Galaxy Time Tour office location" />
          <div className="flex items-start gap-3 p-6">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">Our office</p>
              <p className="text-sm text-muted-foreground">{fullAddress}</p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-highlight hover:underline">
                Get directions →
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
