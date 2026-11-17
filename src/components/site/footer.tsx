import Link from "next/link"
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"

import { Logo } from "@/components/site/logo"
import { FacebookIcon, InstagramIcon, WhatsAppIcon, XIcon } from "@/components/social-icons"
import { Starfield } from "@/components/starfield"
import { destinations } from "@/data/destinations"
import { fullAddress, mainNav, siteConfig, whatsappLink } from "@/lib/site"

const socials = [
  { name: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { name: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { name: "X", href: siteConfig.social.x, Icon: XIcon },
  { name: "WhatsApp", href: whatsappLink(), Icon: WhatsAppIcon },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t bg-[oklch(0.12_0.04_275)] text-white">
      <Starfield />
      <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-white/65">
            Tailor-made Thailand journeys from our team in Pattaya. Private transfers, island hopping, city breaks and
            group tours — with 24/7 support in {siteConfig.languages.join(", ")}.
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">
            <ShieldCheck className="size-4 text-brand-gold" /> {siteConfig.license}
          </p>
          <div className="flex gap-2">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:border-brand-cyan/60 hover:text-white"
              >
                <Icon className="size-4.5" />
              </a>
            ))}
          </div>
        </div>

        <FooterList title="Explore" links={mainNav.map((n) => ({ label: n.name, href: n.href }))} />
        <FooterList title="Destinations" links={destinations.map((d) => ({ label: d.name, href: `/book/${d.id}` }))} />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">Contact</h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-cyan" />
              <span>{fullAddress}</span>
            </li>
            {siteConfig.phones.map((p) => (
              <li key={p.href} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-cyan" />
                <a href={p.href} className="hover:text-white">
                  {p.display} <span className="text-white/45">({p.label})</span>
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-cyan" />
              <a href={`mailto:${siteConfig.emails[0]}`} className="hover:text-white">{siteConfig.emails[0]}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-cyan" />
              <span>{siteConfig.hours.join(" · ")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p>Prices shown are indicative and confirmed in your personal quote.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/75 transition hover:pl-1 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
