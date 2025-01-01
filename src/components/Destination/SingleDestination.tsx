import { Destination } from "@/types/destination";
import Image from "next/image";
import Link from "next/link";


const SingleDestination = ({ destination }: { destination: Destination }) => {
  const { title, image, paragraph } = destination;
  return (
    <div className="wow fadeInUp -mt-10 mb-6 justify-between hover:shadow-two dark:hover:shadow-gray-dark group relative overflow-hidden rounded-lg bg-white shadow-one duration-300 dark:bg-dark"
      data-wow-delay=".1s">
      <Link href={`/destination/${title}`} className="relative block aspect-[37/22] w-full">
        <Image 
          src={image} 
          alt="image" 
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </Link>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h2>
          <Link href={`/destination/${title}`}
            className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
          >
            {title}
          </Link>
        </h2>
        <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleDestination;
