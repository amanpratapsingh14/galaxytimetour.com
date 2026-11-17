"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, MapPin, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { destinations } from "@/data/destinations"
import { cn } from "@/lib/utils"

/** Hero search bar: pick where/when/who and jump to that destination's booking page pre-filled. */
export function TripPlanner({ className }: { className?: string }) {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [adults, setAdults] = useState("2")
  const today = new Date().toISOString().slice(0, 10)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!destination) {
      router.push("/destinations")
      return
    }
    const params = new URLSearchParams({ adults })
    if (date) params.set("date", date)
    router.push(`/book/${destination}?${params}#plan`)
  }

  const fieldClass = "flex flex-1 items-center gap-3 rounded-2xl px-4 py-2 transition-colors hover:bg-white/10 md:rounded-full"
  const labelClass = "block text-[11px] font-semibold uppercase tracking-wider text-white/60"

  return (
    <form
      onSubmit={submit}
      className={cn(
        "glass flex flex-col gap-1 rounded-3xl border-white/15 bg-white/10 p-2 text-white shadow-2xl shadow-black/30 md:flex-row md:items-center md:rounded-full",
        className,
      )}
    >
      <div className={fieldClass}>
        <MapPin className="size-5 shrink-0 text-brand-cyan" />
        <div className="min-w-0 flex-1">
          <span className={labelClass}>Where</span>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger
              aria-label="Destination"
              className="h-7 w-full border-0 bg-transparent p-0 text-base font-medium text-white shadow-none backdrop-blur-none data-[placeholder]:text-white/80 [&_svg]:!text-white/60"
            >
              <SelectValue placeholder="Any destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name} <span className="text-xs text-muted-foreground">· {d.region}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="hidden h-8 w-px bg-white/15 md:block" />

      <label className={fieldClass}>
        <CalendarDays className="size-5 shrink-0 text-brand-gold" />
        <span className="min-w-0 flex-1">
          <span className={labelClass}>When</span>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-7 w-full bg-transparent text-base font-medium text-white outline-none [color-scheme:dark]"
            aria-label="Travel date"
          />
        </span>
      </label>

      <div className="hidden h-8 w-px bg-white/15 md:block" />

      <label className={cn(fieldClass, "md:max-w-44")}>
        <Users className="size-5 shrink-0 text-brand-magenta" />
        <span className="min-w-0 flex-1">
          <span className={labelClass}>Adults</span>
          <input
            type="number"
            min={1}
            max={20}
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className="h-7 w-full bg-transparent text-base font-medium text-white outline-none"
            aria-label="Number of adults"
          />
        </span>
      </label>

      <Button type="submit" size="xl" className="md:h-14 md:px-7">
        <Search /> Plan my trip
      </Button>
    </form>
  )
}
