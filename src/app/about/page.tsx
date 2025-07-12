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

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Travel enthusiast with 15+ years of experience in luxury travel planning.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Expert in creating seamless travel experiences and managing global partnerships.",
    },
    {
      name: "Emma Rodriguez",
      role: "Travel Curator",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Specialist in crafting unique, personalized travel itineraries.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/placeholder.svg?height=1000&width=2000"
          alt="Travel landscape"
          width={2000}
          height={1000}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white space-y-4 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Journey in Creating Perfect Travels</h1>
          <p className="text-lg md:text-xl text-gray-200">
            Crafting unforgettable experiences and turning travel dreams into reality since 2009
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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
                src="/placeholder.svg?height=800&width=600"
                alt="Our journey"
                width={600}
                height={800}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

