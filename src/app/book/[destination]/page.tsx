"use client"

import { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle, Suspense, lazy, useMemo } from "react"
import { useParams } from "next/navigation"
import { Calendar, Clock, MapPin, Users, Shield, RefreshCw, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Lazy load the CAPTCHA component for better performance
const CaptchaComponent = forwardRef<{ refreshCaptcha: () => void }, { onVerify: (isValid: boolean) => void }>(
  ({ onVerify }, ref) => {
    const [captchaValue, setCaptchaValue] = useState('')
    const [userAnswer, setUserAnswer] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState('')

    // Generate random CAPTCHA (math or alphanumeric)
    const generateCaptcha = useCallback(() => {
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
    }, [onVerify])

    // Initialize CAPTCHA on component mount
    useEffect(() => {
      generateCaptcha()
    }, [generateCaptcha])

    const handleCaptchaChange = (value: string) => {
      setUserAnswer(value)
      const isValid = value.toUpperCase() === correctAnswer
      setIsCorrect(isValid)
      onVerify(isValid)
    }

    const refreshCaptcha = useCallback(() => {
      generateCaptcha()
      setUserAnswer('')
    }, [generateCaptcha])

    // Expose refreshCaptcha method via ref
    useImperativeHandle(ref, () => ({
      refreshCaptcha
    }), [refreshCaptcha])

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
      </div>
    )
  }
)

CaptchaComponent.displayName = 'Captcha'

// Lazy load the CAPTCHA component
const Captcha = lazy(() => Promise.resolve({ default: CaptchaComponent }))

// Skeleton components for loading state
const FormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="space-y-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
    <div className="h-10 bg-gray-200 rounded"></div>
  </div>
)

const BookingSummarySkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  </div>
)

export default function BookingPage() {
  const params = useParams()
  const [isFormReady, setIsFormReady] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    date: "",
    numberOfDays: "",
    numberOfAdults: "",
    numberOfChildren: "",
    includeBreakfast: false,
    includeLunch: false,
    includeDinner: false,
    additionalNotes: "",
    website: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaValid, setCaptchaValid] = useState(false)
  const captchaRef = useRef<{ refreshCaptcha: () => void }>(null)

  // Memoize destination name formatting to avoid recalculation on every render
  const destinationName = useMemo(() => {
    return params.destination?.toString().split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ") || "Selected Destination"
  }, [params.destination])

  // Show form after a brief delay to improve perceived performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormReady(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        if (value.trim().length > 100) return 'Full name must be less than 100 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Full name can only contain letters and spaces';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) return 'Please enter a valid phone number';
        return '';
      
      case 'date':
        if (!value) return 'Travel date is required';
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return 'Travel date cannot be in the past';
        if (selectedDate > new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000)) return 'Travel date cannot be more than 1 year in the future';
        return '';
      
      case 'numberOfDays':
        if (!value) return 'Number of days is required';
        const days = parseInt(value);
        if (isNaN(days) || days < 1) return 'Number of days must be at least 1';
        if (days > 30) return 'Number of days cannot exceed 30';
        return '';
      
      case 'numberOfAdults':
        if (!value) return 'Number of adults is required';
        const adults = parseInt(value);
        if (isNaN(adults) || adults < 1) return 'Number of adults must be at least 1';
        if (adults > 20) return 'Number of adults cannot exceed 20';
        return '';
      
      case 'nationality':
        if (!value.trim()) return 'Nationality is required';
        if (value.trim().length < 2) return 'Nationality must be at least 2 characters';
        if (value.trim().length > 50) return 'Nationality must be less than 50 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Nationality can only contain letters and spaces';
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate required fields
    ['fullName', 'email', 'phone', 'nationality', 'date', 'numberOfDays', 'numberOfAdults'].forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData] as string);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    if (!captchaValid) {
      alert("Please complete the CAPTCHA verification");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          destination: destinationName,
          formType: 'booking' 
        }),
      });

      if (res.ok) {
        alert('Booking submitted successfully! Check your email for confirmation.');
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          nationality: "",
          date: "",
          numberOfDays: "",
          numberOfAdults: "",
          numberOfChildren: "",
          includeBreakfast: false,
          includeLunch: false,
          includeDinner: false,
          additionalNotes: "",
          website: "",
        });
        setErrors({});
        setCaptchaValid(false);
        // Refresh CAPTCHA after successful submission
        if (captchaRef.current) {
          captchaRef.current.refreshCaptcha();
        }
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Something went wrong'}`);
      }
    } catch {
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          {isFormReady ? (
            <>Book Your Trip to {destinationName}</>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span>Loading...</span>
            </div>
          )}
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
                <p className="text-sm text-white-600 mb-4">
                  Fields marked with * are required.
                </p>
                
                {isFormReady ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality *</Label>
                      <Input
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        placeholder="e.g., American, British, Indian"
                        required
                      />
                      {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="date">Travel Date *</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="numberOfDays">Number of Days *</Label>
                        <Input
                          id="numberOfDays"
                          name="numberOfDays"
                          type="number"
                          min="1"
                          max="30"
                          value={formData.numberOfDays}
                          onChange={handleChange}
                          placeholder="e.g., 7"
                          required
                        />
                        {errors.numberOfDays && <p className="text-red-500 text-sm">{errors.numberOfDays}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="numberOfAdults">Number of Adults *</Label>
                        <Input
                          id="numberOfAdults"
                          name="numberOfAdults"
                          type="number"
                          min="1"
                          max="20"
                          value={formData.numberOfAdults}
                          onChange={handleChange}
                          placeholder="e.g., 2"
                          required
                        />
                        {errors.numberOfAdults && <p className="text-red-500 text-sm">{errors.numberOfAdults}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="numberOfChildren">Number of Children</Label>
                        <Input
                          id="numberOfChildren"
                          name="numberOfChildren"
                          type="number"
                          min="0"
                          max="10"
                          value={formData.numberOfChildren}
                          onChange={handleChange}
                          placeholder="e.g., 1"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Meal Preferences</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="includeBreakfast"
                            name="includeBreakfast"
                            checked={formData.includeBreakfast}
                            onChange={(e) => handleCheckboxChange("includeBreakfast", e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <Label htmlFor="includeBreakfast" className="text-sm font-normal">Include Breakfast</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="includeLunch"
                            name="includeLunch"
                            checked={formData.includeLunch}
                            onChange={(e) => handleCheckboxChange("includeLunch", e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <Label htmlFor="includeLunch" className="text-sm font-normal">Include Lunch</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="includeDinner"
                            name="includeDinner"
                            checked={formData.includeDinner}
                            onChange={(e) => handleCheckboxChange("includeDinner", e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <Label htmlFor="includeDinner" className="text-sm font-normal">Include Dinner</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalNotes">Additional Notes</Label>
                      <Textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder="Any special requirements, preferences, or additional information?"
                        rows={4}
                        className="bg-white border-gray-300 focus:border-primary focus:ring-primary"
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
                    <Suspense fallback={<Loader2 className="h-6 w-6 animate-spin text-primary" />}>
                      <Captcha onVerify={setCaptchaValid} ref={captchaRef} />
                    </Suspense>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting || !captchaValid}
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Secure Booking'}
                    </Button>
                    
                    {/* Status messages */}
                    {/* The original code had status messages here, but they were removed by the user's edit.
                        Re-adding them based on the original file's structure. */}
                    {/* The original code had status messages here, but they were removed by the user's edit.
                        Re-adding them based on the original file's structure. */}
                  </>
                ) : (
                  <FormSkeleton />
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
                {isFormReady ? (
                  <>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">
                        {destinationName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Flexible travel dates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Customizable duration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Adults & children welcome</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Meal options available</span>
                    </div>
                  </>
                ) : (
                  <BookingSummarySkeleton />
                )}
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