import { Metadata } from "next";
import SingleDestination from "@/components/Destination/SingleDestination";
import packageData from "@/components/Destination/packageData";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
  title: "GalaxyTimeTour | Destinations",
  description: "Our perfect package lists for your next adventure",
};

export default function DestinationPage() {
  return (
    <>
      <Breadcrumb
        pageName="Destinations"
        description="Our perfect packages list"
      />
      <section className="py-[120px]">
        <div className="container">
          <div className="flex flex-wrap justify-center -mx-4">
            {packageData.map((destination) => (
              <div
                key={destination.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleDestination destination={destination} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}