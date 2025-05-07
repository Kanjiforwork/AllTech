"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setMessage("Thank you for subscribing!")
      setEmail("")
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }, 1000)
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Subscribe to Newsletter</h3>
      <p className="text-gray-600 text-sm mb-4">
        Get the latest laptop news and reviews in your inbox.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-3">
          <Mail className="w-4 h-4 mr-2 text-gray-500" />
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-sm"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
        
        {message && (
          <p className="mt-2 text-green-600 text-sm text-center">{message}</p>
        )}
      </form>
    </div>
  )
} 