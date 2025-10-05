"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'THB' | 'INR'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (usdPrice: number) => number
  formatPrice: (price: number) => string
  getCurrencySymbol: () => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Exchange rates (as of a recent date - in production, you'd want to fetch these from an API)
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110,
  CAD: 1.25,
  AUD: 1.35,
  THB: 33.5,
  INR: 83.0,
}

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  THB: '฿',
  INR: '₹',
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')

  // Load saved currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferred-currency') as Currency
    if (savedCurrency && exchangeRates[savedCurrency]) {
      setCurrency(savedCurrency)
    }
  }, [])

  // Save currency to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-currency', currency)
  }, [currency])

  const convertPrice = (usdPrice: number): number => {
    return Math.round(usdPrice * exchangeRates[currency] * 100) / 100
  }

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price)
    const symbol = getCurrencySymbol()
    
    if (currency === 'JPY') {
      // Japanese Yen doesn't use decimal places
      return `${symbol}${Math.round(convertedPrice).toLocaleString()}`
    }
    
    if (currency === 'INR') {
      // Indian Rupee formatting
      return `${symbol}${convertedPrice.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`
    }
    
    return `${symbol}${convertedPrice.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const getCurrencySymbol = (): string => {
    return currencySymbols[currency]
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
        getCurrencySymbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
