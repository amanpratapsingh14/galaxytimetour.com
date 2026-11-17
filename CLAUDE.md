# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # dev server (Turbopack) on :3000
npm run build        # production build — also runs the TypeScript check
npm run lint         # eslint (flat config, eslint-config-next 16, React Compiler rules)
npm run type-check   # tsc --noEmit
npx next start -p 3001   # serve a production build (needed for realistic perf testing)
```

There is no test suite. Verify changes with `type-check`, `lint` and `build`, then check pages visually. Every route
except `/api/form-submit` is statically pre-rendered, so a page that builds but throws at runtime shows up in `build`.

On this Windows machine Node may not be on the Bash PATH: prefix commands with `export PATH="/c/Program Files/nodejs:$PATH";`.

## Next.js 16 specifics (see AGENTS.md)

- Read `node_modules/next/dist/docs/` before using unfamiliar APIs. Notable changes already applied here:
  - `next/image`: `priority` is deprecated. Use `preload` (one hero/LCP image) or `loading="eager"`.
  - `params` is a Promise.
  - `useSearchParams()` must sit under `<Suspense>`.
  - `next lint` no longer exists; use `eslint .`.
- Cache Components are **not** enabled.

## Architecture

**Content is data-driven.** Pages render from `src/data/*` (destinations, packages, gallery) and `src/lib/site.ts`
(phones, emails, address, WhatsApp number, socials). Change content there, not in JSX.
- `src/data/gallery.ts` is generated from the files in `public/` with their pixel dimensions. Regenerate it with sharp
  if photos are added or replaced.
- `/book/[destination]` uses `generateStaticParams` + `dynamicParams = false`, so its slugs must exist in
  `destinations.ts`.

**Prices** are stored in USD and formatted client-side by `useCurrency().formatPrice()`
(`src/contexts/currency-context.tsx`, indicative rates). Any component that shows a price must be a client component.

**Forms → `/api/form-submit`.**
- One zod schema per form lives in `src/lib/validation.ts`. Both the client forms (inline errors) and the API route
  (the real gate) use it.
  - `z.config({ jitless: true })` there is required: zod's eval probe otherwise violates the CSP.
- The API checks, in order: same-origin → rate limit (in-memory, best effort) → body size → honeypot (`website`) and
  minimum fill time (`startedAt`, which gets a *fake success* response) → schema.
- It then emails the admin (failure = error) and the customer (failure is only logged) via Gmail SMTP.
- Email HTML is built in `src/lib/email-templates.ts`. Every interpolated user value must go through `escapeHtml`.
- Env vars: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ADMIN_EMAIL` (optional). See `EMAIL_SETUP.md`.
- The booking form reads `?package=<id>&date=YYYY-MM-DD&adults=N`, and links to it end in `#plan`. It is keyed on the
  query string so in-page links re-apply the defaults.

**Security headers and the CSP** live in `next.config.ts`. Any new third-party script, iframe, font, image or API host
must be added to the matching directive, or it will be blocked in production.

## Design system & layout conventions

- Tokens (oklch colours, brand magenta/violet/cyan/gold, radii, keyframes) live in `src/app/globals.css` (Tailwind 4
  CSS-first, so there is no `tailwind.config`). The default theme is dark (`next-themes`, `.dark` class); light mode
  must keep working.
- Shared helper classes are defined in `globals.css`: `text-gradient`, `glass`, `ring-gradient`, `nebula`, `starfield`
  and `container`.
- **Every page must start with a dark hero** (`<PageHero>` or the homepage `<Hero>`). The fixed header is transparent
  with white text until scrolled (`src/components/site/header.tsx`), and `<main>` has no top padding.
- `tsconfig` uses `exactOptionalPropertyTypes`. Don't pass `prop={maybeUndefined}` to optional props; spread
  conditionally or default the value.

## Performance rules (learned from Lighthouse, Nov 2026)

These keep mobile Performance from regressing:

- **Never hide above-the-fold content until JavaScript runs.** Hero and page-hero entrances use the CSS classes `rise`
  (transform only, safe for the LCP headline) and `rise-fade`, with an optional `style={{ "--d": "120ms" }}` delay.
- **Scroll reveals are pure CSS.** `<Reveal>`, `<Stagger>` and `<StaggerItem>` in `src/components/motion/reveal.tsx`
  just add the `.reveal` class, which uses `animation-timeline: view()`. Browsers without support show content as-is.
  Full-page screenshots will show below-viewport sections faded; that is expected.
- `motion` is loaded through `<LazyMotion features={domMax} strict>` in `providers.tsx`. **Use `m.*` components,
  never `motion.*`** (strict mode throws). Only use it for layout/`layoutId`/`AnimatePresence` work.
- Continuously running animations must pause off-screen. `<Marquee>` does this with an IntersectionObserver, because a
  running marquee made Chrome re-layerize every frame.
  - Avoid animating `background-position` (non-composited).
  - Avoid `filter: blur` on large images.
  - The starfield only animates on `md+`.
- Heavy embeds load on demand: `<LazyVideo>` (About page video) and `<MapEmbed>` (click-to-load Google Map).
- All photos are ≤720px wide. Don't use them full-bleed except `/hero_image.webp`.

## Deployment

- Vercel auto-deploys `main` to production. Branches get login-protected preview URLs.
- DNS is at GoDaddy: `A @` → `216.198.79.1`, `CNAME www` → Vercel's project-specific target. Email is Google
  Workspace, so leave the MX/TXT records alone.
- Work on a branch and open a PR. Don't push to `main` directly.
