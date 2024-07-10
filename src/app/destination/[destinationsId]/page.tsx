import { Metadata } from "next";
import { packagesData } from "@/types/packagesData";
import ErrorPage from "@/app/error/page";
import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import FormComponent from "@/components/Common/FormPopup";
import BookNowButton from "@/components/Common/FormPopup";

export const metadata: Metadata = {
  title: "GalaxyTimeTour | Destinations",
  description: "GalaxyTimeTour Your next Travel Guide to Thailand.",
};

const PackageForm = ({ params }) => {
  const decodedDestinationId = decodeURIComponent(params.destinationsId);
  const packageDetails = packagesData.find(pkg => pkg.id.toLowerCase() === decodedDestinationId.toLowerCase());
  if (!packageDetails) {
    return (
      <>
        <ErrorPage />
        <p>Package not found</p>
      </>
    );
  }

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 my-10">
          <SectionTitle title={packageDetails.name} paragraph={packageDetails.locations} center  />          
            <div className="flex flex-wrap my-14">
              <div className="w-full md:w-1/3 px-2">
              <Link href={"/gallery"}>
                <img src={packageDetails.images[0]} alt={`${packageDetails.name} 1`} className="w-full h-auto rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300" /></Link>
              </div>
              <div className="w-full my-4 md:w-2/3 flex flex-wrap">
                {packageDetails.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="w-1/2 md:w-1/3 px-2 mb-4"><Link href={"/gallery"}>
                    <img src={image} alt={`${packageDetails.name} ${index + 2}`} className="w-full h-auto rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300" /></Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="wow fadeInUp mx-auto max-w-[800px] text-center p-6 rounded-lg shadow-md" data-wow-delay=".2s">
              <p className="dark:text-body-color-dark mb-8 text-lg font-semibold text-gray-800 leading-relaxed sm:text-lg md:text-xl">
                {packageDetails.duration}, {packageDetails.locations} <br />
              </p>
              <p className="text-xl font-bold text-teal-600 mb-8">
                {packageDetails.price}                
              </p>
              <ul className="list-disc list-inside text-left mx-auto mb-6">
                {packageDetails.includes.map((include, index) => (
                  <li key={index} className="flex items-center mb-2 text-dark dark:text-white">
                    <svg className="w-5 h-5 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L10 12.586l4.293-4.293a1 1 0 011.414 1.414l-5 5A1 1 0 0110 15z" />
                    </svg>
                    {include}</li>
                ))}
              </ul>
            </div>
            <BookNowButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageForm;
