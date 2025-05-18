"use client"
import BasicInformation from "./basic-information"
import HardwareSpecifications from "./hardware-specifications"
import AdditionalFeatures from "./additional-features"
import BatteryLife from "./battery-life"
import RatingsReviews from "./ratings-reviews"
import ProsCons from "./pros-cons"
import DetailedAnalysis from "./detailed-analysis"
import LaptopLinkInput from "./linkShop"

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";


import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "recharts"


const firebaseConfig = {
  apiKey: "AIzaSyAFSVL94k5zXkrAy5oQKbO7rT6W5fPAk4M",
  authDomain: "laptop-review-all.firebaseapp.com",
  projectId: "laptop-review-all",
  storageBucket: "laptop-review-all.firebasestorage.app",
  messagingSenderId: "1044782876129",
  appId: "1:1044782876129:web:6e0891bf2753c5a3f63ea0"
};
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
    geekBenchV6Single: "",
    geekBenchV6Multi: "",
    cineBenchR23Single: "",
    cineBenchR23Multi: "",

    _3DMarkTimeSpy: "",
    _3DMarkWildlifeExtrme: "",
    geekBenchCompute: "",

    pluggedInG6Single: "",
    pluggedInG6Multi: "",
    pluggedInCinebenchR23Single: "",
    pluggedInCinebenchR23Multi: "",

    unpluggedG6Single: "",
    unpluggedG6Multi: "",
    unpluggedCinebenchR23Single: "",
    unpluggedCinebenchR23Multi: "",

    laptopLinkInput: "",
  })

  // Track validation errors for each field
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [showValidation, setShowValidation] = useState(false)

  // Required fields that must be filled
  const requiredFields = [
    { name: "laptopName", label: "Laptop Name" },
    { name: "brand", label: "Brand" },
    { name: "operatingSystem", label: "Operating System" },
    { name: "weight", label: "Weight" },
    { name: "dimensions", label: "dimensions" },

    { name: "cpu", label: "CPU / Processor" },
    { name: "gpu", label: "GPU" },
    { name: "ram", label: "RAM" },
    { name: "storage", label: "Storage" },
    { name: "display", label: "Display" },
    { name: "graphicsCard", label: "Graphics Card" },
    { name: "ports", label: "Ports" },
    { name: "colorGamut", label: "Color Gamut" },
    { name: "battery", label: "Battery" },
    { name: "charging", label: "Charging" },


    { name: "webcam", label: "Webcam" },
    { name: "wifiBluetooth", label: "WiFi / Bluetooth" },
    { name: "keyboard", label: "Keyboard" },
    { name: "speakersMicrophone", label: "Speakers / Microphone" },


    { name: "videoPlayback", label: "Video Playback" },
    { name: "casualUse", label: "Casual Use" },
    { name: "extremeUse", label: "Extreme Use" },

    { name: "geekBenchV6Single", label: "GeekBench V6 Single" },
    { name: "geekBenchV6Multi", label: "GeekBench V6 Multi" },
    { name: "cineBenchR23Single", label: "CineBench R23 Single" },
    { name: "cineBenchR23Multi", label: "CineBench R23 Multi" },

    { name: "_3DMarkTimeSpy", label: "3DMark Time Spy" },
    { name: "_3DMarkWildlifeExtrme", label: "3DMark Wildlife Extrme" },
    { name: "geekBenchCompute", label: "GeekBench Compute" },

    { name: "pluggedInG6Single", label: "Plugged In G6 Single" },
    { name: "pluggedInG6Multi", label: "Plugged In G6 Multi" },
    { name: "pluggedInCinebenchR23Single", Label: "Plugged In Cinebench R23 Single" },
    { name: "pluggedInCinebenchR23Multi", label: "Plugged In Cinebench R23 Multi" },

    { name: "unpluggedCinebenchR23Single", label: "Unplugged In Cinebench R23 Single" },
    { name: "unpluggedG6Single", label: "Unplugged G6 Single" },
    { name: "unpluggedG6Multi", label: "Unplugged Cinebench R23 Single" },
    { name: "unpluggedCinebenchR23Multi", label: "Unplugged Cinebench R23 Multi" },

    { name: "laptopLinkInput", label: "Laptop Link" }


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

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  async function saveReview() {
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        benchmarks: {
          battery: 6.5,
          build: 8,
          content: 8,
          display: 8,
          gaming: 8.5,
          overall: 8,
          productivity: 8.5,
          value: 7.5
        },
        cons: [
          "Pin trung bình",
          "Máy nặng và dày",
          "Nhiệt độ cao khi chơi game lâu"
        ],
        createdAt: serverTimestamp(),
        descriptions: "" 
      });

    } catch (e) {
      alert("Có lỗi xảy ra")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowValidation(true)

    if (validateForm()) {
      saveReview()
      alert("Laptop information saved successfully!")

    } else {

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
            formData={formData}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            fieldErrors={fieldErrors}
            showValidation={showValidation}
          />
        </div>

        <RatingsReviews />

        <ProsCons />

        <DetailedAnalysis
          formData={formData}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          fieldErrors={fieldErrors}
          showValidation={showValidation}
        />
        <LaptopLinkInput
          formData={formData}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          fieldErrors={fieldErrors}
          showValidation={showValidation}
        ></LaptopLinkInput>

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
