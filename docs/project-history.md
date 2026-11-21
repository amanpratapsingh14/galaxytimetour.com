# Project history

A record of the November 2026 redesign of galaxytimetour.com: what was found, what was decided and how it was
verified. Work was done with Claude Code.

## 2026-11-17 — Setup

- Cloned the repo to `G:\workStationm\galaxytimetour.com`.
- Set up SSH access for GitHub (ed25519 key), the `gh` CLI (logged in as `amanpratapsingh14`) and a global git
  identity (Aman Pratap, amanpratapsingh1440@gmail.com).
- Installed Node.js 26 LTS.

## 2026-11-17 — Redesign (PR #15, merged)

**Problems found in the old site**
- Plain black-and-white look, an oversized logo video hero, and a visible `&apos;` bug in "Why Travel with Us".
- Broken hero images on About, Contact and Gallery (the referenced files didn't exist). Wrong favicon, manifest and
  share-image paths.
- The booking form only accepted Gmail, Yahoo, Hotmail and Outlook addresses. The customer and admin got different
  booking IDs. The customer email said "Confirmed" for what was only a request.
- `npm audit`: 20 vulnerabilities (2 critical, in Next.js 15.2).
- Form emails were only partly escaped, the contact form had no spam protection, and the admin email fell back to a
  hardcoded address.
- `.gitignore` still contained unresolved merge-conflict markers.

**Decisions**
- Visual direction: **"Cosmic brand"**, chosen by the owner. The palette comes from the logo (magenta, violet, cyan,
  gold), dark by default with a light mode. Fonts are Sora and Inter.
- Upgraded to Next.js 16, React 19.3, Tailwind 4 and nodemailer 10, and removed 14 unused packages (0 vulnerabilities
  after).
- Validation for the forms and the API shares one zod schema. Spam protection: honeypot, minimum fill time,
  same-origin check, size limit and rate limit.
- Every photo in `public/` is ≤720px wide, so the design avoids full-bleed photos except `hero_image.webp`.

**Verification:** type check, lint and build passed; every page was screenshotted (desktop and mobile, dark and light);
the form API was tested for validation, honeypot, origin and rate-limit cases.

## 2026-11-17 — Custom domain

- DNS is at GoDaddy. The old site was hosted on Bluehost (`119.18.49.18`).
- Changed `A @` to `216.198.79.1` and `CNAME www` to Vercel's project target. The Google Workspace MX/TXT records were
  left untouched.
- HTTPS was verified on both `galaxytimetour.com` and `www.galaxytimetour.com`.

## 2026-11-17/18 — Mobile performance (PR #16)

**Lighthouse on the live site (mobile):** Performance 62–73, and the homepage got no score (`NO_LCP`). Desktop scored
89–100.

**Root causes**
1. Hero text started at `opacity: 0` and waited for JavaScript hydration before appearing.
2. Off-screen CSS marquees made Chrome re-layerize every frame (about 220 ms of work per 2 s while idle).
3. Assets loaded up front: the About video (6 MB) and the Google Map (1.3 MB).
4. Extra paint cost from a blur filter on hero images and an animated gradient on text.
5. zod's eval probe violated the CSP. There were also low-contrast badges and out-of-order headings.

**Fixes:** CSS-only hero entrances; CSS scroll-driven reveals; marquees paused off-screen; `LazyMotion` + `m`
components; lazy video; click-to-load map; zod `jitless` mode; contrast and heading fixes.

**Results (mobile, same local production setup)**

| Page | Before | After |
|---|---|---|
| About | 55 | 78 |
| Destinations | 61 | 74 |
| Contact | 74 | 72 |
| Gallery | 64 | 70 |
| Phuket / Bangkok | 64 / 64 | 69 / 67 |
| Packages | 60 | 68 |

- Total Blocking Time fell from 0.9–1.7 s to 0.4–0.7 s.
- Accessibility and Best Practices reached 100 on every page.
- Contact scores about the same, but the map no longer loads unless the visitor asks for it.
- In a real-browser test at 4× CPU throttling, the homepage's main content appears at about 1.0 s.

## 2026-11-21 — Form validation fixes and first tests (PR #17, merged)

**Bugs found and reproduced**
1. The booking date only had its `YYYY-MM-DD` shape checked, so impossible dates were accepted: `2027-02-30` was
   emailed as "Tue, 2 Mar 2027", and `2026-13-45` as "Invalid Date".
2. The bot-trap fake success always returned a contact-style reference (`GTT-CT-…`), even for bookings, which made the
   trap detectable.
3. A JSON body of `null` crashed `/api/form-submit` with a 500 error.

**Fixes:** `z.iso.date()` for the travel date; the fake reference now matches the form type; non-object bodies return
400. Added Vitest with 26 unit tests, the site's first.

**Verification:** tests, type check, lint and build passed; production-server checks; each fix was reverted to confirm
a test fails; an independent review found 4 issues, all fixed.

## 2026-11-21 — Vitest security alerts (PR #18, merged)

PR #17 pinned Vitest 3.2.7 for Node 20 support, which triggered 5 Dependabot alerts (2 critical in `tinypool`, 3
moderate in `vitest` / `@vitest/mocker`). Vitest is dev-only, so the live site was never exposed. Upgraded to Vitest
4.1.12, which still supports Node 20 and drops `tinypool`: `npm audit` 0 vulnerabilities, all 5 alerts closed.

## Open items

- Replace the photos with ≥1600px versions.
- Confirm the WhatsApp number (+66 95 112 3458) and the marketing claims ("50K+ travellers", "15+ years", "replies
  within 1 hour").
- Optionally make `galaxytimetour.com` the primary domain, with `www` redirecting to it (Vercel → Domains).
- Optionally add a Vercel Firewall rate-limit rule on `POST /api/form-submit`.
- Send real booking and contact requests in production to confirm both emails arrive.
- Cancel the Bluehost hosting once the new site is confirmed stable.
