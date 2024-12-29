"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const TITLE_TEXT = " Discover Thailand with Us";
const SUBTITLE_TEXT = "Embark on unforgettable adventures and create lasting memories with our premium travel and tour packages.";

export default function SectionHero() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const animateText = useCallback((text: string, setText: React.Dispatch<React.SetStateAction<string>>, delay: number) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setText(prev => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);
    return interval;
  }, []);

  useEffect(() => {
    const titleInterval = animateText(TITLE_TEXT, setTitle, 100);
    const subtitleInterval = animateText(SUBTITLE_TEXT, setSubtitle, 50);

    return () => {
      clearInterval(titleInterval);
      clearInterval(subtitleInterval);
    };
  }, [animateText]);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden pt-10 lg:pt-16 lg:pb-16">
      <div className="container relative space-y-24 mt-20 mb-24 lg:space-y-28 lg:mb-28" />
      <video autoPlay loop muted playsInline className="absolute inset-0 rounded-2xl w-full h-full object-cover">
        <source src="/Videos/vid2.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">{subtitle}</p>
        <Link
        href="/contact"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-800 shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
      >
        Book Now
      </Link>
      </div>
    </section>
  );
}