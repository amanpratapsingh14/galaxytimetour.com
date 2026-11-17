export type SubmitResult =
  | { ok: true; reference: string; confirmationSent: boolean }
  | { ok: false; error: string; fields?: Record<string, string> }

export async function submitForm(payload: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/form-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const body = await res.json().catch(() => ({}))
    if (res.ok && body.success) {
      return { ok: true, reference: String(body.reference ?? ""), confirmationSent: body.confirmationSent !== false }
    }
    return { ok: false, error: body.error ?? "Something went wrong. Please try again.", fields: body.fields }
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again." }
  }
}
