# Email setup — booking & contact forms

The booking form (`/book/[destination]`) and contact form (`/contact`) post to `/api/form-submit`,
which sends two emails through Gmail SMTP:

1. **To your team** (`ADMIN_EMAIL`) — full request details. Hitting *Reply* goes straight to the customer.
2. **To the customer** — a branded "we've received your request" confirmation with a reference like `GTT-BK-1A2B3C4D`.

If the team email fails the customer sees an error; if only the customer copy fails the request still succeeds.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GMAIL_USER` | yes | Gmail address that sends the emails |
| `GMAIL_APP_PASSWORD` | yes | 16-character Gmail **App Password** (not your normal password) |
| `ADMIN_EMAIL` | no | Where new requests are delivered. Defaults to `GMAIL_USER` |

Without `GMAIL_USER` / `GMAIL_APP_PASSWORD` the forms stay usable but show
"temporarily unavailable — please email or WhatsApp us".

### Get a Gmail App Password

1. Turn on 2-Step Verification: <https://myaccount.google.com/security>
2. Create an app password: <https://myaccount.google.com/apppasswords>
3. Copy the 16 characters (without spaces).

### Local development

Create `.env.local` in the project root (it is git-ignored):

```bash
GMAIL_USER=your-address@gmail.com
GMAIL_APP_PASSWORD=abcdabcdabcdabcd
ADMIN_EMAIL=bookings@yourdomain.com
```

Restart `npm run dev` after editing it.

### Vercel

Project → **Settings → Environment Variables** → add the same variables for *Production* and *Preview*, then redeploy.

## Spam & abuse protection

- **Shared validation** (`src/lib/validation.ts`, zod) — the exact same rules run in the browser and on the server.
- **Honeypot** — a hidden `website` field; bots that fill it get a fake success and nothing is sent.
- **Time trap** — submissions faster than 3 seconds after the form loads are treated as bots.
- **Same-origin check** — requests from other websites are rejected.
- **Rate limit** — 5 submissions per minute per IP (best-effort, per server instance).
  For a hard limit add a Vercel Firewall rule: *Firewall → Add rule → Path `/api/form-submit`, Method POST → Rate limit*.
- **HTML escaping** — every user-supplied value is escaped before it is placed in an email.
- **Body size limit** — requests over 16 KB are refused.
