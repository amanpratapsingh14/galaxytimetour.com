import Link from "next/link"

import { cn } from "@/lib/utils"

/** Wordmark echoing the logo: orbit mark, magenta→cyan "Galaxy", gold accent. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" {...(onClick ? { onClick } : {})} className={cn("group flex items-center gap-2.5", className)} aria-label="Galaxy Time Tour — home">
      <svg viewBox="0 0 40 40" className="size-9 shrink-0 transition-transform duration-700 group-hover:rotate-[20deg]" aria-hidden>
        <defs>
          <linearGradient id="logo-orbit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--brand-magenta)" />
            <stop offset="0.5" stopColor="var(--brand-violet)" />
            <stop offset="1" stopColor="var(--brand-cyan)" />
          </linearGradient>
        </defs>
        <circle cx="22" cy="18" r="9" fill="var(--brand-gold)" />
        <path d="M13 22a9 9 0 0 0 18 0" fill="var(--brand-cyan)" opacity=".9" />
        <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="url(#logo-orbit)" strokeWidth="2.4" transform="rotate(-28 20 20)" />
        <circle cx="5" cy="9" r="1.3" fill="var(--brand-gold)" />
        <circle cx="35" cy="33" r="1" fill="var(--brand-cyan)" />
      </svg>
      <span className="font-display text-lg leading-none font-bold tracking-tight">
        <span className="text-gradient">Galaxy</span> <span>Time Tour</span>
      </span>
    </Link>
  )
}
