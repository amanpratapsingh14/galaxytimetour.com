"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { currencies, useCurrency, type Currency } from "@/contexts/currency-context"
import { cn } from "@/lib/utils"

export function CurrencySelector({ className, showLabel = false }: { className?: string; showLabel?: boolean }) {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showLabel && <span className="text-sm text-muted-foreground">Prices in</span>}
      <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
        <SelectTrigger size="sm" className="w-[104px] rounded-full" aria-label="Currency">
          <SelectValue>
            {currencies.find((c) => c.code === currency)?.symbol} {currency}
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="end">
          {currencies.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              <span className="w-6 font-semibold">{c.symbol}</span>
              <span>{c.code}</span>
              <span className="text-xs text-muted-foreground">{c.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
