import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import GalleryI from "@/components/Gallery/galleryI";

export const metadata: Metadata = {
  title: "GalaxyTimeTour",
  description: "GalaxyTimeTour | Gallery",
};


const GridGallery = () => {
    return (
        <>
            <Breadcrumb pageName="Gallery" description="Gallery of Galaxy Time Tour." />
            <GalleryI />
        </>
    );
};

export default GridGallery;