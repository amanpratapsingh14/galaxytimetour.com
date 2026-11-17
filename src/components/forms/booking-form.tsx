"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Coffee, Loader2, Minus, Moon, Plus, Sandwich, ShieldCheck, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Field, fieldA11y, Honeypot } from "@/components/forms/field"
import { submitForm } from "@/components/forms/submit"
import { WhatsAppIcon } from "@/components/social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCurrency } from "@/contexts/currency-context"
import { getDestination } from "@/data/destinations"
import { getPackagesForDestination } from "@/data/packages"
import { whatsappLink } from "@/lib/site"
import { cn } from "@/lib/utils"
import { bookingSchema, fieldErrors } from "@/lib/validation"

const tripFields = ["packageId", "date", "numberOfDays", "numberOfAdults", "numberOfChildren"] as const
const detailFields = ["fullName", "email", "phone", "nationality", "additionalNotes"] as const

const meals = [
  { key: "includeBreakfast", label: "Breakfast", Icon: Coffee },
  { key: "includeLunch", label: "Lunch", Icon: Sandwich },
  { key: "includeDinner", label: "Dinner", Icon: Moon },
] as const

function clampInt(value: string, min: number, max: number, fallback: number) {
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback
}

export function BookingForm({ destinationId }: { destinationId: string }) {
  const params = useSearchParams()
  // Re-mount when the query changes (e.g. "Request this package" links) so the defaults apply.
  return <BookingFormInner key={params.toString()} destinationId={destinationId} params={params} />
}

function BookingFormInner({ destinationId, params }: { destinationId: string; params: URLSearchParams }) {
  const { formatPrice } = useCurrency()
  const destination = getDestination(destinationId)!
  const options = getPackagesForDestination(destinationId)
  const requestedPackage = params.get("package")
  const initialPackage = options.find((p) => p.id === requestedPackage) ?? options[0]

  const [step, setStep] = useState<0 | 1>(0)
  const [startedAt] = useState(() => Date.now())
  const [form, setForm] = useState({
    packageId: initialPackage?.id ?? "",
    date: params.get("date") ?? "",
    numberOfDays: String(initialPackage?.duration.days ?? 4),
    numberOfAdults: String(clampInt(params.get("adults") ?? "", 1, 20, 2)),
    numberOfChildren: "0",
    includeBreakfast: true,
    includeLunch: false,
    includeDinner: false,
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    additionalNotes: "",
    website: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle")
  const [serverError, setServerError] = useState("")
  const [result, setResult] = useState({ reference: "", confirmationSent: true })

  const selected = options.find((p) => p.id === form.packageId)
  const adults = clampInt(form.numberOfAdults, 1, 20, 1)
  const today = new Date().toISOString().slice(0, 10)

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(({ [key]: _, ...rest }) => rest)
  }

  function choosePackage(id: string) {
    const pkg = options.find((p) => p.id === id)
    setForm((f) => ({ ...f, packageId: id, numberOfDays: pkg ? String(pkg.duration.days) : f.numberOfDays }))
  }

  function payload() {
    return { ...form, formType: "booking" as const, destination: destinationId, packageId: form.packageId || undefined, startedAt }
  }

  function validate(fields: readonly string[]) {
    const parsed = bookingSchema.safeParse(payload())
    const all = parsed.success ? {} : fieldErrors(parsed.error)
    const relevant = Object.fromEntries(Object.entries(all).filter(([k]) => fields.includes(k)))
    setErrors(relevant)
    return Object.keys(relevant).length === 0
  }

  function next() {
    if (validate(tripFields)) setStep(1)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (step === 0) return next()
    if (!validate([...tripFields, ...detailFields])) return
    setStatus("submitting")
    setServerError("")
    const res = await submitForm(payload())
    if (res.ok) {
      setResult({ reference: res.reference, confirmationSent: res.confirmationSent })
      setStatus("done")
    } else {
      setStatus("idle")
      setServerError(res.error)
      if (res.fields) {
        setErrors(res.fields)
        if (Object.keys(res.fields).some((k) => (tripFields as readonly string[]).includes(k))) setStep(0)
      }
    }
  }

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 py-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
          className="bg-brand-gradient mx-auto grid size-20 place-items-center rounded-full shadow-xl shadow-brand-magenta/30"
        >
          <Check className="size-10 text-white" strokeWidth={3} />
        </motion.div>
        <h3 className="text-2xl font-bold">Request received!</h3>
        <p className="text-muted-foreground">
          Thanks, {form.fullName.split(" ")[0]}. A travel expert will send your {destination.name} itinerary and quote shortly
          {result.confirmationSent ? ` — a copy of your request is on its way to ${form.email}.` : "."}
        </p>
        <p className="inline-block rounded-full border bg-muted px-4 py-2 font-mono text-sm">Ref: {result.reference}</p>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          <Button asChild variant="outline">
            <a href={whatsappLink(`Hi! I just requested a ${destination.name} trip. Reference: ${result.reference}`)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" /> Chat about it now
            </a>
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="relative space-y-6">
      <Honeypot value={form.website} onChange={(v) => update("website", v)} />

      {/* Progress */}
      <div className="flex items-center gap-3 text-sm">
        {["Your trip", "Your details"].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => (i === 0 ? setStep(0) : next())}
            className={cn("flex items-center gap-2 font-medium transition-colors", step >= i ? "text-foreground" : "text-muted-foreground")}
          >
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full border text-xs font-bold transition-all",
                step > i ? "bg-success border-transparent text-white" : step === i ? "bg-brand-gradient border-transparent text-white" : "",
              )}
            >
              {step > i ? <Check className="size-4" /> : i + 1}
            </span>
            {label}
          </button>
        ))}
        <div className="ml-auto h-1.5 w-20 overflow-hidden rounded-full bg-muted">
          <motion.div className="bg-brand-gradient h-full" animate={{ width: step === 0 ? "50%" : "100%" }} />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === 0 ? (
          <motion.div key="trip" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-6">
            <fieldset className="space-y-3">
              <legend className="mb-3 text-sm font-medium">Choose your package</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {[...options.map((p) => ({ id: p.id, title: p.title, sub: `${p.duration.days}D / ${p.duration.nights}N · ${p.type}`, price: p.priceUSD })), { id: "", title: "Tailor-made", sub: "Build it with our experts", price: 0 }].map((o) => (
                  <label
                    key={o.id || "custom"}
                    className={cn(
                      "relative flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-all hover:border-highlight/50",
                      form.packageId === o.id && "border-transparent bg-accent/60 ring-2 ring-primary",
                    )}
                  >
                    <input type="radio" name="packageId" value={o.id} checked={form.packageId === o.id} onChange={() => choosePackage(o.id)} className="sr-only" />
                    <span className="font-semibold">{o.title}</span>
                    <span className="text-xs text-muted-foreground capitalize">{o.sub}</span>
                    <span className="mt-1 font-display text-lg font-bold">{o.price ? formatPrice(o.price) : <Sparkles className="size-5 text-brand-gold" />}</span>
                    {form.packageId === o.id && (
                      <motion.span layoutId="pkg-check" className="bg-brand-gradient absolute top-3 right-3 grid size-6 place-items-center rounded-full text-white">
                        <Check className="size-3.5" />
                      </motion.span>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="date" label="Travel date" required error={errors.date}>
                <Input type="date" min={today} value={form.date} onChange={(e) => update("date", e.target.value)} {...fieldA11y("date", errors.date)} />
              </Field>
              <Field id="numberOfDays" label="Number of days" required error={errors.numberOfDays}>
                <Input type="number" min={1} max={30} inputMode="numeric" value={form.numberOfDays} onChange={(e) => update("numberOfDays", e.target.value)} {...fieldA11y("numberOfDays", errors.numberOfDays)} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Stepper id="numberOfAdults" label="Adults" hint="Age 12+" min={1} max={20} value={form.numberOfAdults} onChange={(v) => update("numberOfAdults", v)} error={errors.numberOfAdults} />
              <Stepper id="numberOfChildren" label="Children" hint="Age 2–11" min={0} max={10} value={form.numberOfChildren} onChange={(v) => update("numberOfChildren", v)} error={errors.numberOfChildren} />
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-medium">Meals to include</legend>
              <div className="flex flex-wrap gap-2">
                {meals.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={form[key]}
                    onClick={() => update(key, !form[key])}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      form[key] ? "border-transparent bg-primary text-primary-foreground shadow-md shadow-primary/25" : "hover:border-highlight/50",
                    )}
                  >
                    <Icon className="size-4" /> {label}
                  </button>
                ))}
              </div>
            </fieldset>

            {selected && (
              <div className="flex items-center justify-between rounded-2xl border border-dashed bg-muted/50 px-4 py-3 text-sm">
                <span className="text-muted-foreground">Estimated from ({adults} adult{adults > 1 ? "s" : ""})</span>
                <span className="font-display text-xl font-bold">{formatPrice(selected.priceUSD * adults)}</span>
              </div>
            )}

            <Button type="button" size="lg" className="w-full" onClick={next}>
              Continue <ArrowRight />
            </Button>
          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} className="space-y-5">
            <Field id="fullName" label="Full name" required error={errors.fullName}>
              <Input autoComplete="name" placeholder="As on your passport" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} {...fieldA11y("fullName", errors.fullName)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="email" label="Email" required error={errors.email}>
                <Input type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} {...fieldA11y("email", errors.email)} />
              </Field>
              <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
                <Input type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => update("phone", e.target.value)} {...fieldA11y("phone", errors.phone)} />
              </Field>
            </div>
            <Field id="nationality" label="Nationality" required error={errors.nationality}>
              <Input autoComplete="country-name" placeholder="e.g. Indian" value={form.nationality} onChange={(e) => update("nationality", e.target.value)} {...fieldA11y("nationality", errors.nationality)} />
            </Field>
            <Field id="additionalNotes" label="Anything else?" error={errors.additionalNotes} hint="Honeymoon, dietary needs, hotel preferences, flight times…">
              <Textarea rows={4} maxLength={1000} value={form.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} {...fieldA11y("additionalNotes", errors.additionalNotes)} />
            </Field>

            {serverError && (
              <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {serverError}
              </p>
            )}

            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" onClick={() => setStep(0)} aria-label="Back to trip details">
                <ArrowLeft />
              </Button>
              <Button type="submit" size="lg" className="flex-1" disabled={status === "submitting"}>
                {status === "submitting" ? <><Loader2 className="animate-spin" /> Sending…</> : <>Request my itinerary <ArrowRight /></>}
              </Button>
            </div>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-success" /> No payment now · free quote · we never share your details
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

function Stepper({
  id,
  label,
  hint,
  min,
  max,
  value,
  onChange,
  error,
}: {
  id: string
  label: string
  hint: string
  min: number
  max: number
  value: string
  onChange: (v: string) => void
  error?: string | undefined
}) {
  const n = clampInt(value, min, max, min)
  return (
    <Field id={id} label={label} error={error}>
      <div className="flex h-11 items-center justify-between rounded-xl border bg-background/60 px-1.5">
        <Button type="button" variant="ghost" size="icon-sm" onClick={() => onChange(String(Math.max(min, n - 1)))} disabled={n <= min} aria-label={`Fewer ${label.toLowerCase()}`}>
          <Minus />
        </Button>
        <div className="text-center leading-tight">
          <output id={id} aria-live="polite" className="block font-display text-lg font-bold tabular-nums">{n}</output>
          <span className="text-[10px] text-muted-foreground">{hint}</span>
        </div>
        <Button type="button" variant="ghost" size="icon-sm" onClick={() => onChange(String(Math.min(max, n + 1)))} disabled={n >= max} aria-label={`More ${label.toLowerCase()}`}>
          <Plus />
        </Button>
      </div>
    </Field>
  )
}
