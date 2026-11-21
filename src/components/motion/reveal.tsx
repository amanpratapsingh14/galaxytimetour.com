import { cn } from "@/lib/utils"

// Scroll reveals are pure CSS (see `.reveal` in globals.css): no JavaScript to download or
// hydrate, content is never hidden waiting for scripts, and unsupported browsers show it as-is.

type DivProps = React.ComponentProps<"div">

/** Fades and lifts its children in as they scroll into view. */
export function Reveal({ className, ...props }: DivProps) {
  return <div className={cn("reveal", className)} {...props} />
}

/** Layout wrapper for <StaggerItem>s; each item reveals as it enters, which staggers naturally. */
export function Stagger(props: DivProps) {
  return <div {...props} />
}

export function StaggerItem({ className, ...props }: DivProps) {
  return <div className={cn("reveal", className)} {...props} />
}
