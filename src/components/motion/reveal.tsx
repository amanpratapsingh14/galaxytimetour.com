"use client"

import { motion, type HTMLMotionProps } from "motion/react"

const ease = [0.22, 1, 0.36, 1] as const

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  y?: number
}

/** Fades and lifts its children into view once, when scrolled into the viewport. */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Parent for <StaggerItem>s: reveals children one after another. */
export function Stagger({ children, stagger = 0.08, ...props }: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
