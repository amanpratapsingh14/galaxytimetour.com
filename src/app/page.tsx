import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Video from "@/components/Video";
import { Metadata } from "next";
import SectionHero from "./(heroComponent)/page";
import GalleryI from "@/components/Gallery/galleryI";
import Destination from "@/components/Destination";
import SectionTitle from "@/components/Common/SectionTitle";

export const metadata: Metadata = {
  title: "Galaxy Time Tour",
  description: "This is Home for galaxytimetour.com",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <SectionHero />
      <div className="mt-20 -mb-24 md:px-6">
        <SectionTitle title="Gallery" paragraph="Choose Your Destination" center  />
      </div>
      <GalleryI />      
      <Destination />
      <Video />
      <Contact />
    </>
  );
}
