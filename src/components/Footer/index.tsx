"use client";
import Image from "next/image";
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted py-8 md:py-12">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <div className="w-60 max-w-full px-2 xl:mr-12">
            <Image
                  src="/logo_1.png"
                  alt="logo"
                  width={120}
                  height={52}
                  className="w-full dark:hidden"
                />
              <Image
                  src="/logo_1.png"
                  alt="logo"
                  width={120}
                  height={52}
                  className="hidden w-full dark:block"
                />
            </div>
          </Link>
          <p className="text-muted-foreground mt-16">
            Discover the world with Galaxytimetour. Curating unforgettable experiences...
          </p>
        </div>
        <div className="grid gap-2 ml-8">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <Link href="/about" className="text-muted-foreground hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="/destination" className="text-muted-foreground hover:underline" prefetch={false}>
            Destinations
          </Link>          
          <Link href="/Contact" className="text-muted-foreground hover:underline" prefetch={false}>
            Contact
          </Link>
        </div>
        <div className="grid gap-2 mx-1">
          <h3 className="text-lg font-semibold">Connect with Us</h3>
          <div className="flex gap-4">
            <Link
              href="http://www.facebook.com/galaxytimetour"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
              aria-label="Visit Galaxy Time Tour on Facebook"
            >
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link
              href="http://www.twitter.com/galaxytimetour"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
              aria-label="Visit Galaxy Time Tour on Twitter"
            >
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.youtube.com/@galaxytimetour7379"
              className="text-muted-foreground hover:text-red-800"
              prefetch={false}
              aria-label="Visit Galaxy Time Tour on YouTube"
            >
              <YoutubeIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="flex items-start gap-2">
            <MapPinIcon className="h-14 w-14 text-muted-foreground mt-1.5" />
            <p className="text-muted-foreground">63/11 Moo 1, Nongplalai Banglamung, Chonburi Pattaya 20150 (Thailand)</p>
          </div>
          <div className="flex items-start gap-2">
            <PhoneIcon className="h-5 w-5 text-muted-foreground mt-1" />
            <p className="text-muted-foreground">Phone IN:<br /> Ali RAZA +66-951123458,<br /> +91 9871171680<br /> TH: SAMEER +66-618800005</p>
            <p className="text-muted-foreground"></p>
          </div>
          <div className="flex items-start gap-2">
            <MailIcon className="h-5 w-5 text-muted-foreground mt-1.5" />
            <p className="text-muted-foreground">Email: info@Galaxytimetour.com</p>
          </div>
        </div>
      </div>
      <div className="container bg-gradient-to-tr b max-w-7xl mt-8 flex items-center justify-between text-xs text-muted-foreground">
        <p className="flex justify-center text-center text-sm">&copy; 2022 Galaxytimetour. All rights reserved.</p>
        <Link href="#" className="hover:underline" prefetch={false}>
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}


function YoutubeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}