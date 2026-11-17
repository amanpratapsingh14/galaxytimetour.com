import { randomBytes } from "node:crypto"

import { NextResponse, type NextRequest } from "next/server"
import nodemailer, { type Transporter } from "nodemailer"

import {
  bookingAdminEmail,
  bookingCustomerEmail,
  contactAdminEmail,
  contactCustomerEmail,
} from "@/lib/email-templates"
import { checkRateLimit } from "@/lib/rate-limit"
import { siteConfig } from "@/lib/site"
import { fieldErrors, formSchema } from "@/lib/validation"

export const runtime = "nodejs"

const MAX_BODY_BYTES = 16 * 1024
const MIN_FILL_MS = 3_000 // humans need more than 3s to fill these forms
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000

let transporter: Transporter | undefined

function getTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) return undefined
  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  })
  return transporter
}

function clientIp(req: NextRequest) {
  return req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
}

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } })
}

function newReference(prefix: "BK" | "CT") {
  return `GTT-${prefix}-${randomBytes(4).toString("hex").toUpperCase()}`
}

export async function POST(req: NextRequest) {
  // Only accept submissions from our own pages.
  const origin = req.headers.get("origin")
  if (origin && URL.parse(origin)?.host !== req.headers.get("host")) {
    return json({ success: false, error: "Forbidden" }, 403)
  }

  if (!checkRateLimit(`form:${clientIp(req)}`, { limit: 5, windowMs: 60_000 })) {
    return json({ success: false, error: "Too many requests. Please wait a minute and try again." }, 429)
  }

  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) {
    return json({ success: false, error: "Submission is too large." }, 413)
  }

  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return json({ success: false, error: "Invalid request." }, 400)
  }

  // Bots fill the hidden "website" field or submit instantly. Pretend success so they don't adapt.
  const maybe = payload as { website?: unknown; startedAt?: unknown }
  const elapsed = typeof maybe.startedAt === "number" ? Date.now() - maybe.startedAt : -1
  if ((typeof maybe.website === "string" && maybe.website !== "") || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
    return json({ success: true, reference: newReference("CT") })
  }

  const parsed = formSchema.safeParse(payload)
  if (!parsed.success) {
    return json({ success: false, error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) }, 400)
  }

  const mailer = getTransporter()
  if (!mailer) {
    console.error("form-submit: GMAIL_USER / GMAIL_APP_PASSWORD are not configured")
    return json(
      { success: false, error: `Our booking system is temporarily unavailable. Please email ${siteConfig.emails[0]} or message us on WhatsApp.` },
      503,
    )
  }

  const data = parsed.data
  const from = `"${siteConfig.name}" <${process.env.GMAIL_USER}>`
  const adminTo = process.env.ADMIN_EMAIL || process.env.GMAIL_USER
  const reference = newReference(data.formType === "booking" ? "BK" : "CT")
  const [customerMail, adminMail] =
    data.formType === "booking"
      ? [bookingCustomerEmail(data, reference), bookingAdminEmail(data, reference)]
      : [contactCustomerEmail(data, reference), contactAdminEmail(data, reference)]

  const [admin, customer] = await Promise.allSettled([
    mailer.sendMail({ from, to: adminTo, replyTo: data.email, ...adminMail }),
    mailer.sendMail({ from, to: data.email, replyTo: siteConfig.emails[0], ...customerMail }),
  ])

  // The team must receive the request; the customer copy is a courtesy.
  if (admin.status === "rejected") {
    console.error("form-submit: admin email failed", admin.reason)
    return json({ success: false, error: "We couldn't send your request. Please try again or contact us on WhatsApp." }, 502)
  }
  if (customer.status === "rejected") {
    console.error("form-submit: customer confirmation failed", customer.reason)
  }

  return json({ success: true, reference, confirmationSent: customer.status === "fulfilled" })
}
