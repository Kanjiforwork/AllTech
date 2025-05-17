"use client"
import BasicInformation from "./basic-information"
import HardwareSpecifications from "./hardware-specifications"
import AdditionalFeatures from "./additional-features"
import BatteryLife from "./battery-life"
import RatingsReviews from "./ratings-reviews"
import ProsCons from "./pros-cons"
import DetailedAnalysis from "./detailed-analysis"


import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LaptopForm() {
  const router = useRouter()

  // Define all form fields in a single state object
  const [formData, setFormData] = useState({
    // Basic Information
    laptopName: "",
    brand: "",
    operatingSystem: "",
    weight: "",
    dimensions: "",

    // Hardware Specifications
    cpu: "",
    gpu: "",
    ram: "",
    storage: "",
    graphicsCard: "",
    ports: "",
    display: "",
    colorGamut: "",
    battery: "",
    charging: "",

    // Additional Features
    webcam: "",
    wifiBluetooth: "",
    keyboard: "",
    speakersMicrophone: "",

    // Battery Life
    videoPlayback: "",
    casualUse: "",
    extremeUse: "",

    // Detailed Analysis
    performanceSummary: "",
  })

  // Track validation errors for each field
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [showValidation, setShowValidation] = useState(false)

  // Required fields that must be filled
  const requiredFields = [
    { name: "laptopName", label: "Laptop Name" },
    { name: "brand", label: "Brand" },
    { name: "cpu", label: "CPU / Processor" },
    { name: "ram", label: "RAM" },
    { name: "storage", label: "Storage" },
    { name: "display", label: "Display" },
    { name: "operatingSystem", label: "Operating System" },
    { name: "weight", label: "Weight" },
    { name: "dimensions", label: "dimensions" },
  ]

  const validateForm = () => {
    const errors: string[] = []
    const newFieldErrors: Record<string, boolean> = {}

    // Check all required fields
    requiredFields.forEach((field) => {
      if (!formData[field.name as keyof typeof formData]) {
        errors.push(`${field.label} is required`)
        newFieldErrors[field.name] = true
      }
    })

    setFieldErrors(newFieldErrors)
    setFormErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowValidation(true)

    if (validateForm()) {
      // Form is valid, proceed with submission
      alert("Laptop information saved successfully!")
      // In a real application, you would submit the data to your backend here
    } else {
      // Scroll to the top to show errors
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field as soon as user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: false,
      }))

      // Also update the form errors list
      if (showValidation) {
        const fieldLabel = requiredFields.find((f) => f.name === field)?.label || field
        setFormErrors((prev) => prev.filter((error) => !error.includes(fieldLabel)))
      }
    }
  }

  const handleInputFocus = (field: string) => {
    // Clear error for this field when user focuses on it
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: false,
      }))

      // Also update the form errors list
      if (showValidation) {
        const fieldLabel = requiredFields.find((f) => f.name === field)?.label || field
        setFormErrors((prev) => prev.filter((error) => !error.includes(fieldLabel)))
      }
    }
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

      {showValidation && formErrors.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium">Please fix the following errors:</div>
            <ul className="list-disc pl-5 mt-2">
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <BasicInformation
            formData={formData}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            fieldErrors={fieldErrors}
            showValidation={showValidation}
          />
          <HardwareSpecifications
            formData={formData}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            fieldErrors={fieldErrors}
            showValidation={showValidation}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AdditionalFeatures
            formData={formData}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            fieldErrors={fieldErrors}
            showValidation={showValidation}
          />
          <BatteryLife

          />
        </div>

        <RatingsReviews />

        <ProsCons />

        <DetailedAnalysis

        />

        {showValidation && formErrors.length > 0 && (
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
