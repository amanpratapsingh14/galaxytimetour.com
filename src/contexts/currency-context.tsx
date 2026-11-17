"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "CAD" | "AUD" | "THB" | "INR"

export const currencies: { code: Currency; name: string; symbol: string; rate: number }[] = [
  // Indicative rates vs USD — prices are always confirmed in the final quote.
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 83 },
  { code: "THB", name: "Thai Baht", symbol: "฿", rate: 33.5 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.35 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.25 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 110 },
]

const STORAGE_KEY = "preferred-currency"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  /** Formats a USD amount in the visitor's chosen currency, rounded to whole units. */
  formatPrice: (usdPrice: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring a saved preference after hydration
      if (saved && currencies.some((c) => c.code === saved)) setCurrencyState(saved as Currency)
    } catch {
      // Storage can be unavailable (private mode); fall back to USD.
    }
  }, [])

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }, [])

  const formatPrice = useCallback(
    (usdPrice: number) => {
      const { rate, symbol } = currencies.find((c) => c.code === currency)!
      const amount = Math.round(usdPrice * rate)
      return `${symbol}${amount.toLocaleString(currency === "INR" ? "en-IN" : "en-US")}`
    },
    [currency],
  )

  const value = useMemo(() => ({ currency, setCurrency, formatPrice }), [currency, setCurrency, formatPrice])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider")
  return context
}
