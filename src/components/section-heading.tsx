import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "left"
  className?: string
}) {
  return (
    <Reveal className={cn("max-w-2xl space-y-4", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-highlight">
          <span aria-hidden className="mr-2 text-brand-gold">✦</span>
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="text-lg text-muted-foreground">{description}</p>}
    </Reveal>
  )
}
