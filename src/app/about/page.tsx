import Image from "next/image"
import { Calendar, Globe2, MapPin, Users2 } from "lucide-react"

export default function AboutUs() {
  const stats = [
    {
      icon: <Users2 className="w-6 h-6" />,
      value: "50K+",
      label: "Happy Travelers",
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      value: "100+",
      label: "Destinations",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      value: "15+",
      label: "Years Experience",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      value: "24/7",
      label: "Support",
    },
  ]


  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-12">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden mt-2 mb-10">
        <div className="relative w-full flex justify-center">
          <Image
            src="/ImgGallery/aboutUs_1.png"
            alt="Travel landscape"
            width={1536}
            height={1024}
            className="object-contain w-full h-auto max-h-[700px] rounded-lg shadow-lg"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Text overlay */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <div className="relative z-10 text-center text-white space-y-4 max-w-3xl px-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Journey in Creating Perfect Travels
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Crafting unforgettable experiences and turning travel dreams into reality since 2009
            </p>
          </div>
        </div> */}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5 rounded-lg">
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2009, our journey began with a simple yet powerful vision: to transform how people
                  experience the world. We believed that travel should be more than just visiting new places – it should
                  be about creating meaningful connections and unforgettable moments.
                </p>
                <p>
                  Over the years, we&apos;ve grown from a small team of passionate travelers to a global community of
                  adventure seekers and cultural enthusiasts. Our commitment to excellence and personalized service has
                  earned us the trust of thousands of travelers worldwide.
                </p>
                <p>
                  Today, we continue to innovate and expand our horizons, always staying true to our core mission of
                  providing exceptional travel experiences that inspire and transform.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                  src="/ImgGallery/package_32.png"
                  alt="Travel landscape"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16 bg-primary/5 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg"> */}
                {/* <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                /> */}
                {/* <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  )
}

