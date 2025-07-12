"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Globe2, MapPin, Star, Users2, ChevronLeft, ChevronRight, Phone } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const slides = [
    {
      type: 'video',
      content: '/Videos/vid1.mp4'
    },
    {
      type: 'image',
      content: '/hero_image.webp',
      title: "Your Journey Begins Here",
      description: "Discover extraordinary destinations and create unforgettable memories with our expertly curated travel experiences."
    }
  ];

  useEffect(() => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.addEventListener('ended', () => {
        setCurrentSlide(1);
      });
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const features = [
    {
      icon: <Globe2 className="h-8 w-8" />,
      title: "🧗‍♂️ Thrilling Adventures",
      description: "Discover the wild side of Thailand with unforgettable adventure sports—from island cliff-jumping to jungle zip-lining.",
    },
    {
      icon: <Users2 className="h-8 w-8" />,
      title: "🍜 Authentic Thai Cuisine",
      description: "Savor rich flavors with traditional Thai dishes made from unique blends of fresh herbs, spices, and regional ingredients.",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "🏨 Comfortable & Affordable Stays",
      description: "Whether it&apos;s a cozy budget inn or a luxury 5-star resort, we offer hotel options to suit every traveler&apos;s style and budget.",
    },
    {
      icon: <CheckCircle2 className="h-8 w-8" />,
      title: "💰 Unbeatable Prices",
      description: "Premium travel experiences at prices no one can match—crafted for value without compromise."
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "� 24/7 Support",
      description: "Travel stress-free knowing our multilingual support team is available around the clock—before, during, and after your trip."
    }
  ]

  const destinations = [
    {
      name: "Pattaya",
      image: "/pattaya/pattaya_1.png",
      description: "Sandy beaches, thrilling water sports, and seafood feasts await in this coastal gem popular with day trippers.",
    },
    {
      name: "Bangkok",
      image: "/bangkok/bgk_1.png",
      description: "Vibrant street life and stunning cultural landmarks like the Grand Palace and sacred Buddhist temples.",
    },
    {
      name: "Phuket",
      image: "/phuket/phuket_1.png",
      description: "Home to iconic sights like the Big Buddha, Wat Chalong, and the famous Wang Talang shopping district.",
    },
    {
      name: "Krabi",
      image: "/krabi/krabi_1.png",
      description: "Scenic rocky beaches perfect for hiking, scuba diving, and unforgettable snorkeling adventures.",
    },
    {
      name: "Koh Samui",
      image: "/koh_samui/koh_samui_1.png",
      description: "A tropical paradise with lush nature, rich culture, and serene historical attractions to explore.",
    },
    {
      name: "Chiang Mai",
      image: "/chiang_mai/chiang_mai_1.png",
      description: "A charming and peaceful northern city known for its temples, markets, and mountain scenery.",
    },
    {
      name: "Hua Hin",
      image: "/hua_hin/hua_hin_1.png",
      description: "Beautiful beaches and a cultural mix that make every moment feel timeless and relaxing.",
    },
    // {
    //   name: "Phuket + Krabi",
    //   image: "/images/phuket-krabi.jpg",
    //   description: "Explore the best of both worlds with scenic beauty, island vibes, and exciting excursions.",
    // }
  ];
  
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh]">
          <div className="absolute inset-0">
            {currentSlide === 0 && (
              <video
                src="/Videos/vid1.mp4"
                autoPlay
                muted
                loop={false}
                playsInline
                className="object-cover w-full h-full"
              />
            )}
            {currentSlide === 1 && (
              <Image
                src="/hero_image.webp"
                alt="Travel destinations"
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-background/30" />
          </div>
          
          <div className="container mx-auto relative h-full flex items-center">
            <div className="flex flex-col items-center text-center gap-4 max-w-[640px] mx-auto transition-opacity duration-500"
                 style={{ opacity: currentSlide === 1 ? 1 : 0 }}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
                Your Journey Begins Here
              </h1>
              <p className="max-w-[600px] text-lg sm:text-xl text-white/90 md:text-2xl drop-shadow-md">
                Discover extraordinary destinations and create unforgettable memories with our expertly curated travel
                experiences.
              </p>
              <Button size="lg" asChild className="bg-white/90 hover:bg-white text-black">
                <Link href="/destinations">
                  Start Planning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white text-black"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white text-black"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid gap-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why Travel with Us?</h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                At Galaxy Time Tour Co., Ltd., we specialize in crafting personalized, high-quality travel experiences across Thailand. With full licensing by the Tourism Authority of Thailand (TAT No. 14/03381), and a Grade A classification, we&apos;re your trusted one-stop travel partner based in Pattaya.
                Our experienced team combines deep regional knowledge, 24/7 multilingual support (English, Hindi & Thai), exclusive hotel and transport deals, and unbeatable customer service. Whether it&apos;s private or shared transfers, sightseeing across major cities and islands, or custom packages for groups and leisure travelers—we ensure every trip is seamless and unforgettable.
                We respond to all your queries within an hour and guarantee competitive B2B pricing with the personal touch your clients deserve.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardContent className="p-6 space-y-2">
                    <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">{feature.icon}</div>
                    <h3 className="font-semibold text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description.replace(/'/g, "&apos;")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="border-t bg-muted/40">
          <div className="container mx-auto py-16 md:py-24">
            <div className="grid gap-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Popular Destinations</h2>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                  Explore our most sought-after destinations, each offering unique experiences and unforgettable
                  moments.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {destinations
                  .slice(0, showAllDestinations ? destinations.length : 6)
                  .map((destination) => (
                  <Card key={destination.name} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={destinations.indexOf(destination) < 6}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold text-xl">{destination.name}</h3>
                        </div>
                        <p className="text-muted-foreground">{destination.description}</p>
                        <Button variant="link" className="p-0 group-hover:text-primary transition-colors" asChild>
                          <Link href={`/destinations/${destination.name.toLowerCase().replace(/,?\s+/g, "-")}`}>
                            Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => setShowAllDestinations(!showAllDestinations)}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {showAllDestinations ? "Show Less" : "View All Destinations"} 
                  <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${showAllDestinations ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t">
          <div className="container mx-auto py-16 md:py-24">
            <div className="rounded-lg bg-primary-foreground p-8 md:p-12 lg:p-16 text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Adventure?</h2>
              <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
                Let us help you plan the perfect trip. Our travel experts are ready to create your dream vacation.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Us Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
