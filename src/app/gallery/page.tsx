import type { Metadata } from "next"

import { CtaBand } from "@/components/cta-band"
import { GalleryGrid } from "@/components/gallery-grid"
import { PageHero } from "@/components/page-hero"
import { galleryPhotos } from "@/data/gallery"

export const metadata: Metadata = {
  title: "Gallery — Thailand Travel Moments",
  description: "Photos from our trips across Thailand: Phuket, Krabi, Bangkok, Chiang Mai, Pattaya and more.",
  alternates: { canonical: "/gallery" },
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        image="/thailand/thai_1.png"
        eyebrow="Gallery"
        title={<>Travel <span className="text-gradient">moments</span></>}
        description={`${galleryPhotos.length} snapshots from beaches, temples, markets and mountains across Thailand. Tap any photo to explore.`}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Gallery" }]}
      />
      <section className="container py-12 md:py-16">
        <GalleryGrid />
      </section>
      <CtaBand title="Picture yourself here?" />
    </>
  )
}
