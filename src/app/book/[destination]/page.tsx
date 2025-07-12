"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Calendar, Clock, MapPin, Users, Shield, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// CAPTCHA component
function Captcha({ onVerify }: { onVerify: (isValid: boolean) => void }) {
  const [captchaValue, setCaptchaValue] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState('')

  // Generate random CAPTCHA (math or alphanumeric)
  const generateCaptcha = () => {
    const captchaType = Math.random() < 0.5 ? 'math' : 'alphanumeric'
    
    if (captchaType === 'math') {
      // Math CAPTCHA
      const num1 = Math.floor(Math.random() * 10) + 1
      const num2 = Math.floor(Math.random() * 10) + 1
      const answer = num1 + num2
      setCaptchaValue(`${num1} + ${num2} = ?`)
      setCorrectAnswer(answer.toString())
    } else {
      // Alphanumeric CAPTCHA
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let result = ''
      for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setCaptchaValue(`Enter: ${result}`)
      setCorrectAnswer(result)
    }
    
    setIsCorrect(false)
    onVerify(false)
  }

  // Initialize CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleCaptchaChange = (value: string) => {
    setUserAnswer(value)
    const isValid = value.toUpperCase() === correctAnswer
    setIsCorrect(isValid)
    onVerify(isValid)
  }

  const refreshCaptcha = () => {
    generateCaptcha()
    setUserAnswer('')
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="captcha" className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        Security Verification
        <span className="text-xs text-gray-500 font-normal">
          ({captchaValue.includes('+') ? 'Math' : 'Code'})
        </span>
      </Label>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            id="captcha"
            type="text"
            value={userAnswer}
            onChange={(e) => handleCaptchaChange(e.target.value)}
            placeholder="Enter the answer"
            className={`${isCorrect ? 'border-green-500' : userAnswer ? 'border-red-500' : ''}`}
            required
            autoComplete="off"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 bg-blue-100 border-2 border-blue-300 rounded-md font-mono text-lg min-w-[80px] text-center text-blue-800 font-bold">
            {captchaValue}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={refreshCaptcha}
            className="p-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {userAnswer && !isCorrect && (
        <p className="text-red-500 text-sm">Incorrect answer. Please try again.</p>
      )}
      {isCorrect && (
        <p className="text-green-500 text-sm flex items-center gap-1">
          <Shield className="h-4 w-4" />
          Verification successful
        </p>
      )}
    </div>
  )
}

export default function BookingPage() {
  const params = useParams()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
    // Honeypot field - hidden from users but bots might fill it
    website: "", // This should always be empty
  })
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [loading, setLoading] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot
    if (formData.website) {
      console.log('Honeypot triggered - potential bot detected');
      setStatus('error');
      return;
    }

    // Check CAPTCHA
    if (!captchaValid) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'booking' }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
          specialRequests: "",
          website: "",
        });
        setCaptchaValid(false);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Book Your Trip to {params.destination?.toString().split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "Selected Destination"}
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Secure Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select
                    value={formData.guests}
                    onValueChange={(value: string) => handleSelectChange("guests", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5+">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Any special requirements or preferences?"
                    rows={4}
                  />
                </div>

                {/* Honeypot field - hidden from users */}
                <div className="hidden">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="text"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* CAPTCHA */}
                <Captcha onVerify={setCaptchaValid} />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !captchaValid}
                >
                  {loading ? 'Submitting...' : 'Confirm Secure Booking'}
                </Button>
                
                {status === 'success' && (
                  <p className="text-green-600 text-center flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    Booking submitted securely! Check your email for confirmation.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-center">
                    There was an error submitting your booking. Please try again.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">
                    {params.destination?.toString().split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "Selected Destination"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Flexible dates available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Customizable timing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Group bookings welcome</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Features Card */}
            {/* <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Shield className="h-5 w-5" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-green-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>SSL/TLS Encrypted Transmission</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>CAPTCHA Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Anti-Spam Honeypot</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Rate Limiting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Input Validation & Sanitization</span>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  )
} 