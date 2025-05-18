"use client"
import BasicInformation from "./basic-information"
import HardwareSpecifications from "./hardware-specifications"
import AdditionalFeatures from "./additional-features"
import BatteryLife from "./battery-life"
import RatingsReviews from "./ratings-reviews"
import ProsCons from "./pros-cons"
import DetailedAnalysis from "./detailed-analysis"
import LaptopLinkInput from "./linkShop"

import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProsConsItem {
  id: string
  text: string
}

const firebaseConfig = {
  apiKey: "AIzaSyAFSVL94k5zXkrAy5oQKbO7rT6W5fPAk4M",
  authDomain: "laptop-review-all.firebaseapp.com",
  projectId: "laptop-review-all",
  storageBucket: "laptop-review-all.firebasestorage.app",
  messagingSenderId: "1044782876129",
  appId: "1:1044782876129:web:6e0891bf2753c5a3f63ea0",
}
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

  const [ratingsData, setRatingsData] = useState({
    ratings: {
      designWeight: 5,
      monitor: 5,
      keyboard: 5,
      touchPad: 5,
      speaker: 5,
      webcam: 5,
      ports: 5,
    },
    descriptions: {
      designWeight: "",
      monitor: "",
      keyboard: "",
      touchPad: "",
      speaker: "",
      webcam: "",
      ports: "",
    },
    images: {
      designWeight: null as File | null,
      monitor: null as File | null,
      keyboard: null as File | null,
      touchPad: null as File | null,
      speaker: null as File | null,
      webcam: null as File | null,
      ports: null as File | null,
    },
  })

  const [prosConsData, setProsConsData] = useState({
    pros: [{ id: "pro-1", text: "" }] as ProsConsItem[],
    cons: [{ id: "con-1", text: "" }] as ProsConsItem[],
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

    { name: "laptopLinkInput", label: "Laptop Link" },

    { name: "designWeight", label: "Design and Weight" },
    { name: "monitor", label: "Monitor" },
    { name: "keyboard", label: "Keyboard" },
    { name: "touchPad", label: "Touchpad" },
    { name: "speaker", label: "Speaker" },
    { name: "webcam", label: "Webcam" },
    { name: "ports", label: "Ports" },
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

    // Make sure we have ratings data
    if (Object.values(ratingsData.ratings).some((rating) => rating === 0)) {
      errors.push("All ratings must be provided")
    }

    // Check if at least one pro and one con is provided
    if (prosConsData.pros.length === 0 || prosConsData.pros.every((pro) => !pro.text.trim())) {
      errors.push("At least one pro must be provided")
    }

    if (prosConsData.cons.length === 0 || prosConsData.cons.every((con) => !con.text.trim())) {
      errors.push("At least one con must be provided")
    }

    setFieldErrors(newFieldErrors)
    setFormErrors(errors)
    return errors.length === 0
  }

  const handleRatingsChange = useCallback((ratings: any, descriptions: any, images: any) => {
    setRatingsData({
      ratings,
      descriptions,
      images,
    })
  }, [])

  // Handle pros and cons data
  const handleProsConsChange = useCallback((pros: ProsConsItem[], cons: ProsConsItem[]) => {
    setProsConsData({
      pros,
      cons,
    })
  }, [])

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  async function saveReview() {
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        // Basic information
        laptopName: formData.laptopName,
        brand: formData.brand,
        operatingSystem: formData.operatingSystem,
        weight: formData.weight,
        dimensions: formData.dimensions,

        // Hardware specifications
        cpu: formData.cpu,
        gpu: formData.gpu,
        ram: formData.ram,
        storage: formData.storage,
        graphicsCard: formData.graphicsCard,
        ports: formData.ports,
        display: formData.display,
        colorGamut: formData.colorGamut,
        battery: formData.battery,
        charging: formData.charging,

        // Additional features
        webcam: formData.webcam,
        wifiBluetooth: formData.wifiBluetooth,
        keyboard: formData.keyboard,
        speakersMicrophone: formData.speakersMicrophone,

        // Battery life
        videoPlayback: formData.videoPlayback,
        casualUse: formData.casualUse,
        extremeUse: formData.extremeUse,

        // Detailed analysis
        performanceSummary: formData.performanceSummary,
        geekBenchV6Single: formData.geekBenchV6Single,
        geekBenchV6Multi: formData.geekBenchV6Multi,
        cineBenchR23Single: formData.cineBenchR23Single,
        cineBenchR23Multi: formData.cineBenchR23Multi,
        _3DMarkTimeSpy: formData._3DMarkTimeSpy,
        _3DMarkWildlifeExtrme: formData._3DMarkWildlifeExtrme,
        geekBenchCompute: formData.geekBenchCompute,
        pluggedInG6Single: formData.pluggedInG6Single,
        pluggedInG6Multi: formData.pluggedInG6Multi,
        pluggedInCinebenchR23Single: formData.pluggedInCinebenchR23Single,
        pluggedInCinebenchR23Multi: formData.pluggedInCinebenchR23Multi,
        unpluggedG6Single: formData.unpluggedG6Single,
        unpluggedG6Multi: formData.unpluggedG6Multi,
        unpluggedCinebenchR23Single: formData.unpluggedCinebenchR23Single,
        unpluggedCinebenchR23Multi: formData.unpluggedCinebenchR23Multi,

        // Ratings and reviews
        ratings: ratingsData.ratings,
        ratingDescriptions: ratingsData.descriptions,

        // Pros and cons
        pros: prosConsData.pros.map((pro) => pro.text).filter((text) => text.trim() !== ""),
        cons: prosConsData.cons.map((con) => con.text).filter((text) => text.trim() !== ""),

        // Link
        laptopLinkInput: formData.laptopLinkInput,

        // Metadata
        createdAt: serverTimestamp(),
      })
      console.log("Document written with ID: ", docRef.id)
      return true
    } catch (e) {
      console.error("Error adding document: ", e)
      alert("Có lỗi xảy ra")
      return false
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
      console.log(prosConsData)
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

        <RatingsReviews onChange={handleRatingsChange} />

        <ProsCons onChange={handleProsConsChange} />

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
