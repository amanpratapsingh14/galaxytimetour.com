import "server-only"

import { getDestination } from "@/data/destinations"
import { getPackage } from "@/data/packages"
import { fullAddress, siteConfig, whatsappLink } from "@/lib/site"
import { inquiryTypes, type BookingData, type ContactData } from "@/lib/validation"

/** Escapes every character that is meaningful in HTML text or attribute context. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const e = escapeHtml
const nl2br = (v: string) => e(v).replace(/\r?\n/g, "<br/>")

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`
}

function formatDate(isoDay: string) {
  return new Date(`${isoDay}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}

type Row = [label: string, valueHtml: string]

function rowsTable(rows: Row[]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:20px 0;font-size:14px">
${rows
  .map(
    ([label, value], i) => `<tr style="background:${i % 2 ? "#ffffff" : "#f6f5fb"}">
<td style="padding:12px 14px;color:#6b6889;width:38%;vertical-align:top">${e(label)}</td>
<td style="padding:12px 14px;color:#16142b;font-weight:600">${value}</td></tr>`,
  )
  .join("\n")}
</table>`
}

function layout({ preheader, title, body }: { preheader: string; title: string; body: string }) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(title)}</title></head>
<body style="margin:0;padding:0;background:#eeedf5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#16142b">
<span style="display:none;max-height:0;overflow:hidden">${e(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eeedf5;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:#0d0f2b;padding:28px 32px">
  <div style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:.3px">✦ Galaxy Time Tour</div>
  <div style="font-size:13px;color:#a9a6d6;margin-top:4px">${e(siteConfig.tagline)}</div>
</td></tr>
<tr><td style="height:4px;background:linear-gradient(90deg,#e0409f,#7b4be0,#2fc3e6);font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td style="padding:32px">
  <h1 style="margin:0 0 16px;font-size:22px;color:#16142b">${e(title)}</h1>
  ${body}
</td></tr>
<tr><td style="padding:20px 32px;background:#f6f5fb;font-size:12px;color:#6b6889;line-height:1.6">
  ${e(siteConfig.legalName)} · ${e(siteConfig.license)}<br/>${e(fullAddress)}<br/>
  ${siteConfig.phones.map((p) => e(p.display)).join(" · ")} · <a href="mailto:${siteConfig.emails[0]}" style="color:#7b4be0">${siteConfig.emails[0]}</a>
</td></tr>
</table></td></tr></table></body></html>`
}

function button(href: string, label: string) {
  return `<a href="${e(href)}" style="display:inline-block;background:#e0409f;background-image:linear-gradient(110deg,#e0409f,#7b4be0);color:#ffffff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:999px;font-size:14px">${e(label)}</a>`
}

function bookingRows(data: BookingData, reference: string): Row[] {
  const destination = getDestination(data.destination)
  const pkg = data.packageId ? getPackage(data.packageId) : undefined
  const meals = [data.includeBreakfast && "Breakfast", data.includeLunch && "Lunch", data.includeDinner && "Dinner"].filter(Boolean)
  return [
    ["Reference", e(reference)],
    ["Destination", e(destination?.name ?? data.destination)],
    ["Package", e(pkg ? `${pkg.title} (${pkg.duration.days}D/${pkg.duration.nights}N)` : "Custom / not selected")],
    ["Travel date", e(formatDate(data.date))],
    ["Duration", e(plural(data.numberOfDays, "day", "days"))],
    ["Travellers", e(`${plural(data.numberOfAdults, "adult", "adults")}, ${plural(data.numberOfChildren, "child", "children")}`)],
    ["Meals", e(meals.length ? meals.join(", ") : "None requested")],
    ["Name", e(data.fullName)],
    ["Email", e(data.email)],
    ["Phone", e(data.phone)],
    ["Nationality", e(data.nationality)],
    ["Notes", data.additionalNotes ? nl2br(data.additionalNotes) : "—"],
  ]
}

export function bookingCustomerEmail(data: BookingData, reference: string) {
  const destination = getDestination(data.destination)?.name ?? data.destination
  return {
    subject: `We've received your ${destination} trip request · ${reference}`,
    html: layout({
      preheader: `Your request ${reference} is with our travel team. We'll reply within a few hours.`,
      title: `Thanks, ${data.fullName.split(" ")[0]}! Your trip request is in.`,
      body: `<p style="margin:0 0 12px;line-height:1.6">We've received your request for <strong>${e(destination)}</strong>. This isn't a confirmed booking yet — one of our travel experts will check availability and send you a tailored itinerary and quote, usually within a few hours.</p>
${rowsTable(bookingRows(data, reference))}
<p style="margin:0 0 20px;line-height:1.6">Want to talk sooner? Message us on WhatsApp and quote <strong>${e(reference)}</strong>.</p>
${button(whatsappLink(`Hi! My booking reference is ${reference}.`), "Chat on WhatsApp")}`,
    }),
  }
}

export function bookingAdminEmail(data: BookingData, reference: string) {
  const destination = getDestination(data.destination)?.name ?? data.destination
  return {
    subject: `New booking request · ${destination} · ${data.fullName} · ${reference}`,
    html: layout({
      preheader: `${data.fullName} wants to visit ${destination} on ${data.date}.`,
      title: "New booking request",
      body: `<p style="margin:0 0 12px;line-height:1.6">Reply directly to this email to reach the customer.</p>
${rowsTable(bookingRows(data, reference))}
${button(`mailto:${data.email}?subject=${encodeURIComponent(`Your ${destination} trip · ${reference}`)}`, "Reply to customer")}`,
    }),
  }
}

function contactRows(data: ContactData): Row[] {
  const inquiry = inquiryTypes.find((t) => t.value === data.inquiryType)?.label ?? data.inquiryType
  return [
    ["Name", e(`${data.firstName} ${data.lastName}`)],
    ["Email", e(data.email)],
    ["Phone", e(data.phone || "—")],
    ["Preferred contact", e(data.preferredContactMethod)],
    ["Inquiry", e(inquiry)],
    ["Message", nl2br(data.message)],
  ]
}

export function contactCustomerEmail(data: ContactData, reference: string) {
  return {
    subject: `We've got your message · ${reference}`,
    html: layout({
      preheader: "Thanks for reaching out — we usually reply within a few hours.",
      title: `Thanks for getting in touch, ${data.firstName}!`,
      body: `<p style="margin:0 0 12px;line-height:1.6">Our team has your message and will reply by ${e(data.preferredContactMethod)}, usually within a few hours during business hours (Thailand time).</p>
${rowsTable([["Reference", e(reference)], ...contactRows(data)])}`,
    }),
  }
}

export function contactAdminEmail(data: ContactData, reference: string) {
  return {
    subject: `New inquiry · ${data.firstName} ${data.lastName} · ${reference}`,
    html: layout({
      preheader: data.message.slice(0, 120),
      title: "New contact inquiry",
      body: `<p style="margin:0 0 12px;line-height:1.6">Reply directly to this email to reach the customer.</p>
${rowsTable([["Reference", e(reference)], ...contactRows(data)])}`,
    }),
  }
}
