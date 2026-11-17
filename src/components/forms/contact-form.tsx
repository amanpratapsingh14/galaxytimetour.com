"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Loader2, Mail, Phone, Send } from "lucide-react"
import { m } from "motion/react"

import { Field, fieldA11y, Honeypot } from "@/components/forms/field"
import { submitForm } from "@/components/forms/submit"
import { WhatsAppIcon } from "@/components/social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { contactSchema, fieldErrors, inquiryTypes, type ContactData } from "@/lib/validation"

const methods = [
  { value: "email", label: "Email", Icon: Mail },
  { value: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon },
  { value: "phone", label: "Phone", Icon: Phone },
] as const

export function ContactForm() {
  const params = useSearchParams()
  const requested = params.get("inquiry")
  const initialInquiry = inquiryTypes.some((t) => t.value === requested) ? (requested as ContactData["inquiryType"]) : ""

  const [startedAt] = useState(() => Date.now())
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContactMethod: "email" as ContactData["preferredContactMethod"],
    inquiryType: initialInquiry as ContactData["inquiryType"] | "",
    message: "",
    website: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle")
  const [serverError, setServerError] = useState("")
  const [reference, setReference] = useState("")

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(({ [key]: _, ...rest }) => rest)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const payload = { ...form, formType: "contact" as const, startedAt }
    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error))
      return
    }
    setStatus("submitting")
    setServerError("")
    const res = await submitForm(payload)
    if (res.ok) {
      setReference(res.reference)
      setStatus("done")
    } else {
      setStatus("idle")
      setServerError(res.error)
      if (res.fields) setErrors(res.fields)
    }
  }

  if (status === "done") {
    return (
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 py-10 text-center">
        <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="bg-brand-gradient mx-auto grid size-20 place-items-center rounded-full shadow-xl shadow-brand-magenta/30">
          <Check className="size-10 text-white" strokeWidth={3} />
        </m.div>
        <h3 className="text-2xl font-bold">Message sent!</h3>
        <p className="text-muted-foreground">Thanks {form.firstName} — we&apos;ll reply by {form.preferredContactMethod} shortly.</p>
        <p className="inline-block rounded-full border bg-muted px-4 py-2 font-mono text-sm">Ref: {reference}</p>
      </m.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="relative space-y-5">
      <Honeypot value={form.website} onChange={(v) => update("website", v)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="firstName" label="First name" required error={errors.firstName}>
          <Input autoComplete="given-name" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} {...fieldA11y("firstName", errors.firstName)} />
        </Field>
        <Field id="lastName" label="Last name" required error={errors.lastName}>
          <Input autoComplete="family-name" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} {...fieldA11y("lastName", errors.lastName)} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="email" label="Email" required error={errors.email}>
          <Input type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} {...fieldA11y("email", errors.email)} />
        </Field>
        <Field id="phone" label="Phone / WhatsApp" error={errors.phone}>
          <Input type="tel" autoComplete="tel" placeholder="Optional" value={form.phone} onChange={(e) => update("phone", e.target.value)} {...fieldA11y("phone", errors.phone)} />
        </Field>
      </div>

      <Field id="inquiryType" label="How can we help?" required error={errors.inquiryType}>
        <Select name="inquiryType" value={form.inquiryType} onValueChange={(v) => update("inquiryType", v as ContactData["inquiryType"])}>
          <SelectTrigger id="inquiryType" className="w-full" aria-invalid={errors.inquiryType ? true : undefined}>
            <SelectValue placeholder="Choose a topic" />
          </SelectTrigger>
          <SelectContent>
            {inquiryTypes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Preferred reply</legend>
        <div className="grid grid-cols-3 gap-2">
          {methods.map(({ value, label, Icon }) => (
            <label
              key={value}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                form.preferredContactMethod === value ? "border-transparent bg-primary text-primary-foreground shadow-md shadow-primary/25" : "hover:border-highlight/50",
              )}
            >
              <input type="radio" name="preferredContactMethod" value={value} checked={form.preferredContactMethod === value} onChange={() => update("preferredContactMethod", value)} className="sr-only" />
              <Icon className="size-4" /> {label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="message" label="Message" required error={errors.message} hint={`${form.message.length}/2000`}>
        <Textarea rows={5} maxLength={2000} placeholder="Dates, number of travellers, places you'd love to see…" value={form.message} onChange={(e) => update("message", e.target.value)} {...fieldA11y("message", errors.message)} />
      </Field>

      {serverError && (
        <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{serverError}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? <><Loader2 className="animate-spin" /> Sending…</> : <><Send /> Send message</>}
      </Button>
    </form>
  )
}
