import SingleDestination from "@/components/Destination/SingleDestination";
import packageData from "@/components/Destination/packageData";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GalaxyTimeTour",
  description: "GalaxyTimeTour | Destinations",
};


const Destination = () => {
  return (
    <>
      <Breadcrumb
        pageName="Destinations"
        description="Our prefect packages lists"
      />
      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
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
};

export default Destination;
