"use client";

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { imagesList } from '@/types/ImageData';
import Link from 'next/link';

export default function ImageGallery() {
  const pathname = usePathname();
  const isGalleryPage = pathname === '/gallery';
  const imagesToShow = isGalleryPage ? imagesList : imagesList.slice(0, 12);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {imagesToShow.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none"
              tabIndex={0}
            >
              {isGalleryPage ? (
                <Image 
                  src={image.src} 
                  width={image.width} 
                  height={image.height}
                  alt={image.alt} 
                  className="aspect-[3/2] w-full object-cover rounded-xl"
                  layout="responsive" 
                  objectFit="cover" 
                  priority={index < 4} 
                />
              ) : (
                <Link href="/gallery" passHref>
                    <Image 
                      src={image.src} 
                      width={image.width} 
                      height={image.height}
                      alt={image.alt} 
                      className="aspect-[3/2] w-full object-cover rounded-xl"
                      layout="responsive" 
                      objectFit="cover" 
                      priority={index < 4} 
                    />                  
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
