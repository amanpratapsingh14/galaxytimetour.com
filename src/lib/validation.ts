import { z } from "zod"

import { destinations } from "@/data/destinations"
import { allPackages } from "@/data/packages"

// Shared by the client forms (instant feedback) and /api/form-submit (the real gate).

const name = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(100, `${label} must be under 100 characters`)
    .regex(/^[\p{L}\p{M}\s.'-]+$/u, `${label} can only contain letters, spaces, . ' and -`)

const email = z.string().trim().toLowerCase().max(254).pipe(z.email("Please enter a valid email address"))

const phone = z
  .string()
  .trim()
  .refine((v) => /^\+?\d{7,15}$/.test(v.replace(/[\s\-().]/g, "")), "Please enter a valid phone number (7–15 digits)")

const intInRange = (label: string, min: number, max: number) =>
  z.coerce
    .number({ error: `${label} is required` })
    .int(`${label} must be a whole number`)
    .min(min, `${label} must be at least ${min}`)
    .max(max, `${label} cannot exceed ${max}`)

function isoDay(offsetDays: number) {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

// Anti-spam fields every form sends: a hidden honeypot and when the form was first rendered.
const antiSpam = {
  website: z.string().max(0, "Invalid submission").optional().default(""),
  startedAt: z.number().int().positive(),
}

export const bookingSchema = z.object({
  formType: z.literal("booking"),
  destination: z.string().refine((id) => destinations.some((d) => d.id === id), "Unknown destination"),
  packageId: z
    .string()
    .optional()
    .refine((id) => !id || allPackages.some((p) => p.id === id), "Unknown package"),
  fullName: name("Full name"),
  email,
  phone,
  nationality: name("Nationality").max(50, "Nationality must be under 50 characters"),
  // Compared as YYYY-MM-DD strings; one day of slack covers time-zone differences.
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Travel date is required")
    .refine((d) => d >= isoDay(-1), "Travel date cannot be in the past")
    .refine((d) => d <= isoDay(366), "Travel date must be within the next 12 months"),
  numberOfDays: intInRange("Number of days", 1, 30),
  numberOfAdults: intInRange("Adults", 1, 20),
  numberOfChildren: intInRange("Children", 0, 10),
  includeBreakfast: z.boolean(),
  includeLunch: z.boolean(),
  includeDinner: z.boolean(),
  additionalNotes: z.string().trim().max(1000, "Notes must be under 1000 characters").optional().default(""),
  ...antiSpam,
})

export const contactSchema = z.object({
  formType: z.literal("contact"),
  firstName: name("First name"),
  lastName: name("Last name"),
  email,
  phone: z.union([z.literal(""), phone]).optional().default(""),
  preferredContactMethod: z.enum(["email", "phone", "whatsapp"]),
  inquiryType: z.enum(["general", "booking", "custom-trip", "group", "partnership", "support"], {
    error: "Please choose an inquiry type",
  }),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000, "Message must be under 2000 characters"),
  ...antiSpam,
})

export const formSchema = z.discriminatedUnion("formType", [bookingSchema, contactSchema])

export type BookingInput = z.input<typeof bookingSchema>
export type BookingData = z.output<typeof bookingSchema>
export type ContactInput = z.input<typeof contactSchema>
export type ContactData = z.output<typeof contactSchema>

export const inquiryTypes: { value: ContactData["inquiryType"]; label: string }[] = [
  { value: "general", label: "General question" },
  { value: "booking", label: "Existing booking" },
  { value: "custom-trip", label: "Plan a custom trip" },
  { value: "group", label: "Group / corporate travel" },
  { value: "partnership", label: "B2B partnership" },
  { value: "support", label: "Support during my trip" },
]

/** Flattens a ZodError into { fieldName: firstMessage } for inline form errors. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form")
    out[key] ??= issue.message
  }
  return out
}
