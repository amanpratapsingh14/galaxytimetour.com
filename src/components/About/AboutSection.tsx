"use client";
import { useState, useEffect } from 'react';
import SectionTitle from "../Common/SectionTitle";

const AboutSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Ensure the component is mounted before trying to play the video
    const video = document.querySelector('video');
    if (video) {
      video.play().catch(error => console.error("Error playing the video:", error));
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section id="about" className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-6 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap items-start justify-between px-4">      
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 mt-28 relative">
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <p>Loading video...</p>
            </div>
          )}
          <video 
            src="/Videos/vid2.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            onLoadedData={handleVideoLoad}
            className={`w-full rounded-lg ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Travel scenes video"
          />
        </div>
        <div className="w-full -mt-16 -mb-16 lg:w-1/2 lg:pl-8">
          <SectionTitle 
            title="Unleash Your Adventure: Discover Thailand with Galaxy Time Tour Co., Ltd."
            paragraph={`We are your ultimate travel companion in Thailand!
              Fully licensed and a proud member of the Tourism Authority of Thailand (TAT No. 14/03381), 
              we operate from vibrant Pattaya, offering top-notch services for leisure and group travelers. 
              Our experienced team knows Thailand inside out, ready to craft unforgettable experiences. 
              As a premier Destination Management Company (DMC), we offer exclusive holiday packages across Thailand, 
              featuring a wide range of hotels and countless sightseeing options. Our comprehensive transport service 
              connects all major islands and cities, with 24-hour customer support in Hindi, English, and Thai. 
              We ensure a seamless journey with private/shared airport transfers and dedicated English-speaking representatives.
              Our competitive B2B deals guarantee a high-quality tour experience. At Galaxy Time Tour, we strive to answer all 
              your queries within an hour, promising efficiency and excellence. Get ready for an adventure of a lifetime!`}
            center={false}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;