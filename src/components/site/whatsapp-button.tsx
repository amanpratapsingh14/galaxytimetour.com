"use client"

import { motion } from "motion/react"

import { WhatsAppIcon } from "@/components/social-icons"
import { whatsappLink } from "@/lib/site"

export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink("Hi Galaxy Time Tour! I'd like help planning a trip to Thailand.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-xl shadow-[#25D366]/30 sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.5s]" />
      <WhatsAppIcon className="size-6" />
      <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-hover:pr-1">
        Chat with us
      </span>
    </motion.a>
  )
}
