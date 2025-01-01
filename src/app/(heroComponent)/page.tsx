import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const TITLE_TEXT = "Discover Thailand with Us";
const SUBTITLE_TEXT = "Embark on unforgettable adventures and create lasting memories with our premium travel and tour packages.";

export default function SectionHero() {
  return (
    <>
      <Head>
        <title>Discover Thailand with Us | Galaxy Time Tour</title>
        <meta name="description" content={SUBTITLE_TEXT} />
        <meta name="keywords" content="Thailand, travel, tour, adventure, premium packages" />
      </Head>
      <section className="relative w-full h-[90vh] overflow-hidden pt-10 lg:pt-16 lg:pb-16">
        <Image
          src="/hero_image.webp"
          alt="Beautiful landscape of Thailand"
          fill={true}
          className="absolute inset-0 rounded-2xl object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {TITLE_TEXT}
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
            {SUBTITLE_TEXT}
          </p>
          <Link 
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-800 shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
          >
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
