"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SectionHero() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    const titleText = "Discover the Thailand with Us";
    const subtitleText = "Embark on unforgettable adventures and create lasting memories with our premium travel and tour packages.";
    let titleIndex = 0;
    let subtitleIndex = 0;

    const titleInterval = setInterval(() => {
      if (titleIndex < titleText.length) {
        setTitle(titleText.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleInterval);
      }
    }, 100);

    const subtitleInterval = setInterval(() => {
      if (subtitleIndex < subtitleText.length) {
        setSubtitle(subtitleText.slice(0, subtitleIndex + 1));
        subtitleIndex++;
      } else {
        clearInterval(subtitleInterval);
      }
    }, 50);

    return () => {
      clearInterval(titleInterval);
      clearInterval(subtitleInterval);
    };
  }, []);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden pt-10 lg:pt-16 lg:pb-16">
      <div className="container relative space-y-24 mt-20 mb-24 lg:space-y-28 lg:mb-28">

      </div>
      <video autoPlay loop muted playsInline className="absolute inset-0 rounded-2xl w-full h-full object-cover">
        <source src="Videos/vid2.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">{subtitle}</p>
        <Link href="/contact" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}>
          Book Now
        </Link>
      </div>
    </section>
  );
}
