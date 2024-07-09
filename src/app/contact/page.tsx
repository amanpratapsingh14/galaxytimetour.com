import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | galaxytimetour",
  description: "This is Contact Page for Galaxy time tour | gtt",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Get in touch with us for any inquiries or booking assistance. We're here to help!"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
