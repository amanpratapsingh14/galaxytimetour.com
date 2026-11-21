# Galaxy Time Tour

Website for **Galaxy Time Tour Co., Ltd.**, a TAT-licensed (No. 14/03381) Thailand travel company based in Pattaya.
Live at **[galaxytimetour.com](https://galaxytimetour.com)**, hosted on Vercel.

Visitors can browse eight destinations and 18 tour packages, view a photo gallery, and send booking or contact
requests, which are emailed to the team and confirmed to the customer.

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) |
| Styling | Tailwind CSS 4 (CSS-first config in `src/app/globals.css`) · shadcn/ui-style components on Radix UI |
| Animation | CSS (entrances, scroll-driven reveals) + `motion` via `LazyMotion` for layout animations |
| Forms | zod schemas shared by client and server · Nodemailer over Gmail SMTP |
| Testing | Vitest (unit tests for the form schema and API route) |
| Hosting | Vercel (auto-deploys `main`; every branch gets a preview URL) · DNS at GoDaddy |

## Getting started

Requires **Node.js 20.9+**.

```bash
git clone git@github.com:amanpratapsingh14/galaxytimetour.com.git
cd galaxytimetour.com
npm install
npm run dev          # http://localhost:3000
```

To send form emails locally, create `.env.local` (see [EMAIL_SETUP.md](EMAIL_SETUP.md)):

```bash
GMAIL_USER=your-address@gmail.com
GMAIL_APP_PASSWORD=your16charapppassword
ADMIN_EMAIL=bookings@yourdomain.com   # optional, defaults to GMAIL_USER
```

Without these, the site works but forms answer "temporarily unavailable — please email or WhatsApp us".

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (pages are pre-rendered as static HTML) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run type-check` | `tsc --noEmit` |
| `npm test` | Unit tests (Vitest): form validation and the `/api/form-submit` guards |

Before opening a PR, run `npm test`, `npm run type-check`, `npm run lint` and `npm run build`. Tests live next to
the code as `*.test.ts` files under `src/`.

## Pages

| Route | Description |
|---|---|
| `/` | Hero with trip planner, stats, filterable destination grid, package carousel, how-it-works, photo strips |
| `/destinations` | All destinations with vibe filters, plus a by-region overview |
| `/packages` | Standard, premium and combo packages with filters, sorting and an itinerary dialog |
| `/book/[destination]` | Destination detail: photos, highlights, itineraries and a two-step booking form (8 static pages; unknown slugs 404) |
| `/gallery` | Masonry gallery of ~110 photos, filterable by place, with a keyboard-navigable lightbox |
| `/about` | Company story, values, timeline |
| `/contact` | Contact channels, contact form, click-to-load map |
| `/api/form-submit` | POST endpoint for booking and contact forms |

Also generated: `sitemap.xml`, `robots.txt`, `manifest.webmanifest` and a branded Open Graph share image.

## Project structure

```
src/
├── app/                    # Routes, layout, metadata, API route
│   ├── api/form-submit/    # Validates, rate-limits and emails form submissions
│   ├── book/[destination]/ # Destination detail + booking
│   └── globals.css         # Design tokens (colours, fonts, animations) — dark "cosmic" theme + light mode
├── components/
│   ├── ui/                 # Primitives: button, input, select, dialog, sheet…
│   ├── site/               # Header, footer, logo, WhatsApp button
│   ├── home/               # Homepage sections
│   └── forms/              # Booking and contact forms
├── contexts/               # Currency (prices stored in USD, shown in 8 currencies)
├── data/                   # destinations, packages, gallery — edit these to change content
└── lib/
    ├── site.ts             # Company details: phones, emails, address, WhatsApp, socials
    ├── validation.ts       # zod schemas shared by forms and API (tests: validation.test.ts)
    └── email-templates.ts  # HTML emails (all user input escaped)
public/                     # Photos (per destination), videos, favicons
```

### Editing content

- **Contact details, address, social links:** `src/lib/site.ts`
- **Destinations (text, highlights, photos, prices):** `src/data/destinations.ts`
- **Packages and itineraries:** `src/data/packages.ts`
- **Gallery:** `src/data/gallery.ts`, which lists files in `public/` with their dimensions
- **Photos:** replace files in `public/<destination>/`. Current images are ≤720px wide; use ≥1600px for sharp results.

## Security

- Security headers including a Content-Security-Policy (`next.config.ts`)
- Form API: shared zod validation, full HTML escaping in emails, a honeypot field, a minimum fill time, a same-origin
  check, a 16 KB body limit and a per-IP rate limit (best effort on serverless; add a Vercel Firewall rule for a
  hard limit). Booking dates must be real calendar dates. These guards are covered by unit tests.
- `npm audit`: 0 known vulnerabilities at the time of writing

## Deployment

Pushing to `main` deploys to production on Vercel. Other branches get preview deployments, which are protected by
Vercel login.

DNS is managed at GoDaddy: the `A @` record points to `216.198.79.1`, and `CNAME www` points to Vercel's
project-specific target. Email runs on Google Workspace (the MX records), so don't change those when editing DNS.

Set `GMAIL_USER`, `GMAIL_APP_PASSWORD` and optionally `ADMIN_EMAIL` in Vercel → Settings → Environment Variables, for
both Production and Preview.

## Author

Aman Pratap Singh
