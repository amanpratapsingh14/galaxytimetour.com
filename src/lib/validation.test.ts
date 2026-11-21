import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { bookingSchema, fieldErrors } from "@/lib/validation"

// A booking that passes every rule; each test changes only the field it is about.
const validBooking = {
  formType: "booking",
  destination: "pattaya",
  fullName: "Jane Doe",
  email: "jane@example.com",
  phone: "+66 95 112 3458",
  nationality: "Indian",
  date: "2027-07-15",
  numberOfDays: 3,
  numberOfAdults: 2,
  numberOfChildren: 0,
  includeBreakfast: true,
  includeLunch: false,
  includeDinner: false,
  startedAt: 1,
}

function dateError(date: string) {
  const result = bookingSchema.safeParse({ ...validBooking, date })
  return result.success ? undefined : fieldErrors(result.error).date
}

describe("booking travel date", () => {
  // Pin "today" so the past / 12-month window doesn't depend on when the tests run.
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2027-06-01T12:00:00Z"))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it.each(["2027-06-31", "2027-13-05", "2027-07-00", "2027-09-31", "2028-02-30", "2027-07-32"])(
    "rejects the impossible calendar date %s",
    (date) => {
      expect(dateError(date)).toBe("Please choose a valid travel date")
    },
  )

  it("rejects 29 February in a non-leap year", () => {
    vi.setSystemTime(new Date("2026-12-01T12:00:00Z")) // puts Feb 2027 inside the window
    expect(dateError("2027-02-29")).toBe("Please choose a valid travel date")
  })

  it("accepts a real date inside the window", () => {
    expect(dateError("2027-07-15")).toBeUndefined()
  })

  it("accepts 29 February in a leap year", () => {
    expect(dateError("2028-02-29")).toBeUndefined()
  })

  it("accepts yesterday (one day of time-zone slack)", () => {
    expect(dateError("2027-05-31")).toBeUndefined()
  })

  it("still rejects a date in the past", () => {
    expect(dateError("2027-05-30")).toBe("Travel date cannot be in the past")
  })

  it("still rejects a date more than 12 months ahead", () => {
    expect(dateError("2028-06-03")).toBe("Travel date must be within the next 12 months")
  })

  // Today is 2027-06-01, so the last bookable day is 366 days later: 2028-06-01 (2028 is a leap year).
  it("accepts the last day of the 12-month window", () => {
    expect(dateError("2028-06-01")).toBeUndefined()
  })

  it("rejects the first day after the 12-month window", () => {
    expect(dateError("2028-06-02")).toBe("Travel date must be within the next 12 months")
  })

  it("still says the date is required when it is empty", () => {
    expect(dateError("")).toBe("Travel date is required")
  })
})
