import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-muted-foreground">
              We specialize in creating unforgettable travel experiences, combining luxury, adventure, and cultural
              immersion.
            </p>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-primary">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>145, 24, Muang Pattaya, Bang Lamung District, Chon Buri 20150, Thailand</li>
              <li>Phone: +66-951123458, +66-618800005</li>
              <li>Phone: +91 9871171680</li>
              <li>Email: info@galaxytimetour.com</li>
            </ul>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link 
                href="http://www.facebook.com/galaxytimetour" 
                className="text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="http://www.twitter.com/galaxytimetour" 
                className="text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="http://www.instagram.com/galaxytimetour" 
                className="text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GalaxyTimeTour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

