"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"



import BasicInformation from "./basic-information"
import HardwareSpecifications from "./hardware-specifications"
import AdditionalFeatures from "./additional-features"
import BatteryLife from "./battery-life"
import RatingsReviews from "./ratings-reviews"
import ProsCons from "./pros-cons"
import DetailedAnalysis from "./detailed-analysis"


export default function LaptopForm() {
  const router = useRouter()
  const [formErrors, setFormErrors] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would validate and submit the form data here
    // For demo purposes, we'll just show a success message
    alert("Laptop information saved successfully!")
  }

  const handleBackToDashboard = () => {
    // In a real application, this would navigate back to the dashboard
    router.push("/")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-muted-foreground"
          onClick={handleBackToDashboard}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to dashboard
        </Button>
        <h1 className="text-2xl font-bold">Add New Laptop</h1>
        <Button onClick={handleSubmit}>Save Laptop</Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <BasicInformation />
          <HardwareSpecifications />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AdditionalFeatures />
          <BatteryLife />
        </div>

        <RatingsReviews />

        <ProsCons />

        <DetailedAnalysis />

        {formErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There are {formErrors.length} issues with your submission. Please check the form and try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Save Laptop Information
          </Button>
        </div>
      </form>
    </div>
  )
}
