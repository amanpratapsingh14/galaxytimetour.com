import { WhatsAppIcon } from "@/components/social-icons"
import { whatsappLink } from "@/lib/site"

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hi Galaxy Time Tour! I'd like help planning a trip to Thailand.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{ "--d": "1200ms" } as React.CSSProperties}
      className="group rise-fade fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-30 motion-safe:animate-ping [animation-duration:2.5s]" />
      <WhatsAppIcon className="size-6" />
      <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-hover:pr-1">
        Chat with us
      </span>
    </a>
  )
}
