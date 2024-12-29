
import AboutSection from "@/components/About/AboutSection";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | GalaxyTimeTour",
  description: "This is About Page for GalaxyTimeTour | gtt | tour",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="We Give Top Quality Service To Our Clients With A Sense Of Warmth, Friendliness.
         We Provide Them A Kind Of Trip Which They Can Not Forget. 
         We Aim To Earn Our Clients Trust By Providing Them Highest Quality Of Service."
      />
      <AboutSection />
    </>
  );
};

export default AboutPage;
