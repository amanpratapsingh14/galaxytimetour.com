"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ContactUs() {
  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      details: ["+66-951123458", "+66-618800005", "+91 9871171680"],
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      details: ["info@galaxytimetour.com", "ali@galaxytimetour.com"],
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Office",
      details: ["145, 24, Muang Pattaya, Bang Lamung District, Chon Buri 20150, Thailand"],
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Working Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
    },
  ]

  const [formData, setFormData] = useState({
    "first-name": "",
    "last-name": "",
    email: "",
    phone: "",
    preferredContactMethod: "email",
    inquiryType: "",
    message: "",
  });
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, preferredContactMethod: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'contact' }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({
          "first-name": "",
          "last-name": "",
          email: "",
          phone: "",
          preferredContactMethod: "email",
          inquiryType: "",
          message: "",
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background ">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden mt-2 mb-10">
        <div className="relative w-full flex justify-center ">
          <Image
            src="/ImgGallery/download.jpg"
            alt="Travel landscape"
            width={1536}
            height={1024}
            className="object-contain w-full h-auto max-h-[700px] shadow-lg"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center ">
          <div className="relative z-10 text-center text-white space-y-4 max-w-3xl px-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              We&apos;re here to help you plan your perfect trip.
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Let&apos;s create your dream vacation together.
            </p>
          </div>
        </div>
      {/* </section> */}
        {/* <div className="container mx-auto px-4 relative h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Get in Touch</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            We&apos;re here to help you plan your perfect trip.
          </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Let&apos;s create your dream vacation together.
          </p>
        </div> */}
      </section>

      {/* Contact Information */}
      <section className="py-12 ">
        <div className="container mx-auto px-4 ">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {info.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Send us a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" name="first-name" placeholder="Enter your first name" value={formData["first-name"]} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" name="last-name" placeholder="Enter your last name" value={formData["last-name"]} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="Enter your email" type="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" name="phone" placeholder="Enter your phone number" type="tel" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label>Preferred contact method</Label>
                  <RadioGroup value={formData.preferredContactMethod} onValueChange={handleRadioChange} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email-radio" />
                      <Label htmlFor="email-radio">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone-radio" />
                      <Label htmlFor="phone-radio">Phone</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">Type of inquiry</Label>
                  <Select value={formData.inquiryType} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="booking">Booking Question</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    className="min-h-[150px]"
                    id="message"
                    name="message"
                    placeholder="Tell us about your travel plans or questions..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
                {status === 'success' && (
                  <p className="text-green-600 text-center">Message sent! Check your email for confirmation.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-center">There was an error sending your message. Please try again.</p>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

