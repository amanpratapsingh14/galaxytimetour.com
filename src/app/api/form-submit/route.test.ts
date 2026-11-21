import { NextRequest } from "next/server"
import { describe, expect, it } from "vitest"

import { POST } from "./route"

// Every test uses its own client IP so the in-memory rate limiter never interferes.
let ip = 0

function post(body: string, headers: Record<string, string> = {}) {
  ip++
  return POST(
    new NextRequest("http://localhost:3000/api/form-submit", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": `10.0.0.${ip}`, ...headers },
      body,
    }),
  )
}

const MINUTE = 60_000

describe("POST /api/form-submit — bot trap", () => {
  it("gives a trapped booking a booking-style reference", async () => {
    const res = await post(JSON.stringify({ formType: "booking", website: "spam.example", startedAt: Date.now() - MINUTE }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.reference).toMatch(/^GTT-BK-[0-9A-F]{8}$/)
  })

  it("gives a booking submitted too fast a booking-style reference", async () => {
    const res = await post(JSON.stringify({ formType: "booking", startedAt: Date.now() }))
    expect(res.status).toBe(200)
    expect((await res.json()).reference).toMatch(/^GTT-BK-[0-9A-F]{8}$/)
  })

  it("gives a trapped contact message a contact-style reference", async () => {
    const res = await post(JSON.stringify({ formType: "contact", website: "spam.example", startedAt: Date.now() - MINUTE }))
    expect(res.status).toBe(200)
    expect((await res.json()).reference).toMatch(/^GTT-CT-[0-9A-F]{8}$/)
  })

  it("falls back to a contact-style reference when the form type is missing", async () => {
    const res = await post(JSON.stringify({ website: "spam.example", startedAt: Date.now() - MINUTE }))
    expect(res.status).toBe(200)
    expect((await res.json()).reference).toMatch(/^GTT-CT-[0-9A-F]{8}$/)
  })
})

describe("POST /api/form-submit — booking validation", () => {
  it("rejects a real-looking booking with an impossible date before any email is sent", async () => {
    const booking = {
      formType: "booking",
      destination: "pattaya",
      fullName: "Jane Doe",
      email: "jane@example.com",
      phone: "+66951123458",
      nationality: "Indian",
      date: "2027-02-30",
      numberOfDays: 3,
      numberOfAdults: 2,
      numberOfChildren: 0,
      includeBreakfast: true,
      includeLunch: false,
      includeDinner: false,
      startedAt: Date.now() - MINUTE,
    }
    const res = await post(JSON.stringify(booking))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.fields).toEqual({ date: "Please choose a valid travel date" })
  })
})

describe("POST /api/form-submit — malformed requests", () => {
  it.each(["null", "[]", "5", '"text"'])("rejects the non-object body %s with 400", async (body) => {
    const res = await post(body)
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ success: false, error: "Invalid request." })
  })

  it("still rejects invalid JSON with 400", async () => {
    const res = await post("{not json")
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ success: false, error: "Invalid request." })
  })

  it("still rejects a request from another site with 403", async () => {
    const res = await post("{}", { origin: "https://evil.example" })
    expect(res.status).toBe(403)
  })
})
