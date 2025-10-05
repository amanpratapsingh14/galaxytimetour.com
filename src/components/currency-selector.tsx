"use client"

import { useCurrency, Currency } from '@/contexts/currency-context'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const currencies = [
  { code: 'USD' as Currency, name: 'US Dollar', symbol: '$' },
  { code: 'EUR' as Currency, name: 'Euro', symbol: '€' },
  { code: 'GBP' as Currency, name: 'British Pound', symbol: '£' },
  { code: 'JPY' as Currency, name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD' as Currency, name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD' as Currency, name: 'Australian Dollar', symbol: 'A$' },
  { code: 'THB' as Currency, name: 'Thai Baht', symbol: '฿' },
  { code: 'INR' as Currency, name: 'Indian Rupee', symbol: '₹' },
]

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Currency:</span>
      <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((curr) => (
            <SelectItem key={curr.code} value={curr.code}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{curr.symbol}</span>
                <span>{curr.code}</span>
                <span className="text-muted-foreground text-xs">({curr.name})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
