"use client";

import SectionTitle from "../Common/SectionTitle";
import { useState, useEffect } from "react";

const Video = () => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const videoSection = document.querySelector("#video-section");
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="video-section" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="We are ready to help"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                {isInView && (
                  <video
                    src="/Videos/vid1.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full rounded-lg"
                    aria-label="travel scenes video"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
