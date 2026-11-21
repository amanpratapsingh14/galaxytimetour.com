"use client"

import { domMax, LazyMotion, MotionConfig } from "motion/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {/* LazyMotion + `m` components ship only the animation features we use (layout + gestures).
          `strict` makes an accidental full `motion.*` import fail loudly. */}
      <LazyMotion features={domMax} strict>
        {/* Honour the visitor's OS "reduce motion" setting for every animation */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </NextThemesProvider>
  )
}
