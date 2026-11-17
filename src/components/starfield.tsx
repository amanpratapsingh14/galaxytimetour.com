import { cn } from "@/lib/utils"

/** Decorative deep-space backdrop: nebula glow plus two slowly drifting star layers (pure CSS). */
export function Starfield({ className, dense = false }: { className?: string; dense?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="nebula absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-[200%] starfield animate-drift opacity-70" />
      {dense && <div className="absolute inset-x-0 top-0 h-[200%] starfield-lg animate-twinkle" />}
    </div>
  )
}
