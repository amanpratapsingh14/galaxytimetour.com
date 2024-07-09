import SectionTitle from "../Common/SectionTitle";
import SingleDestination from "./SingleDestination";
import packageData from "./packageData";



const Destination = () => {
  return (
      <section id="destination" 
        className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle title="Our Destinations." paragraph="Choose Yours Destination." center/>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
            {packageData.map((destination) => (
              <div key={destination.id} className="w-full">
                <SingleDestination destination={destination} />
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Destination;
