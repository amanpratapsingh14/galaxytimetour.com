import { cn } from "@/lib/utils"

/**
 * Decorative deep-space backdrop: nebula glow plus star layers (pure CSS).
 * The stars only drift/twinkle on md+ screens — on phones the static field looks the same
 * and saves the GPU from compositing a double-height layer on every frame.
 */
export function Starfield({ className, dense = false }: { className?: string; dense?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="nebula absolute inset-0" />
      <div className="starfield absolute inset-x-0 top-0 h-full opacity-70 md:h-[200%] md:motion-safe:animate-drift" />
      {dense && <div className="starfield-lg absolute inset-0 md:motion-safe:animate-twinkle" />}
    </div>
  )
}
