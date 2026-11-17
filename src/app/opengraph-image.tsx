import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/site"

// Branded share card shown when links are posted on WhatsApp, Facebook, X, LinkedIn…
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const stars = Array.from({ length: 70 }, (_, i) => ({
  left: (i * 137.5) % 1200,
  top: (i * 89.3) % 630,
  s: (i % 3) + 1,
  o: 0.3 + ((i * 7) % 10) / 15,
}))

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(circle at 15% 20%, #5b1f6e 0%, transparent 45%), radial-gradient(circle at 85% 80%, #12506b 0%, transparent 45%), #0d0f2b",
          color: "white",
          position: "relative",
        }}
      >
        {stars.map((st, i) => (
          <div key={i} style={{ position: "absolute", left: st.left, top: st.top, width: st.s, height: st.s, borderRadius: 99, background: "white", opacity: st.o }} />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 48, height: 48, borderRadius: 99, background: "#f5b731", display: "flex" }} />
          <span style={{ color: "#f07ac0" }}>Galaxy</span>
          <span>Time Tour</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40, fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
          <span>Thailand, beyond the</span>
          <span style={{ backgroundImage: "linear-gradient(90deg,#e0409f,#7b4be0,#2fc3e6)", backgroundClip: "text", color: "transparent" }}>ordinary.</span>
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: 44, fontSize: 26, color: "rgba(255,255,255,.75)" }}>
          <span>• {siteConfig.license}</span>
          <span>• 24/7 support</span>
          <span>• Pattaya · Phuket · Bangkok · Krabi</span>
        </div>
      </div>
    ),
    size,
  )
}
