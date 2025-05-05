"use client"

import type React from "react"
import { useState } from "react"
import { Save, ArrowLeft, Upload, Star, StarHalf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Rating from "./Rating"
import BatertyLife from "./BateryLife"
import Feature from "./Feature"
import AdditionalFeautures from "./AdditionalFeatures"
import BasicInformation from "./BasicInfomation"
import HardwareSpecifications from "./HardwareSpecifications"



type RatingCategory = {
  name: string
  rating: number
  description: string
}

type LaptopFormData = {
  name: string
  brand: string
  cpu: string
  gpu: string
  ram: string
  hardDrive: string
  graphicsCard: string
  screen: string
  battery: string
  ports: string
  operatingSystem: string
  weight: string
  dimensions: string
  webcam: string
  wifiBluetooth: string
  keyboard: string
  speakersMicrophone: string
  watchingTime: string
  casualUseTime: string
  extremeUseTime: string
  ratings: {
    design: RatingCategory
    monitor: RatingCategory
    keyboard: RatingCategory
    touchpad: RatingCategory
    speaker: RatingCategory
    webcam: RatingCategory
    ports: RatingCategory
  }
}

export default function LaptopForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<LaptopFormData>({
    name: "",
    brand: "",
    cpu: "",
    gpu: "",
    ram: "",
    hardDrive: "",
    graphicsCard: "",
    screen: "",
    battery: "",
    ports: "",
    operatingSystem: "",
    weight: "",
    dimensions: "",
    webcam: "",
    wifiBluetooth: "",
    keyboard: "",
    speakersMicrophone: "",
    watchingTime: "",
    casualUseTime: "",
    extremeUseTime: "",
    ratings: {
      design: { name: "Design and Weight", rating: 5, description: "" },
      monitor: { name: "Monitor", rating: 5, description: "" },
      keyboard: { name: "Keyboard", rating: 5, description: "" },
      touchpad: { name: "Touch Pad", rating: 5, description: "" },
      speaker: { name: "Speaker", rating: 5, description: "" },
      webcam: { name: "Webcam", rating: 5, description: "" },
      ports: { name: "Ports", rating: 5, description: "" },
    },
  })

  const brands = ["Select Brand", "Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Microsoft", "Samsung", "Razer", "LG", "Xiaomi", "Others"];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (
    category: keyof typeof formData.ratings,
    field: keyof RatingCategory,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: {
          ...prev.ratings[category],
          [field]: field === "rating" ? Number(value) : value,
        },
      },
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", formData)
      alert("Laptop information saved successfully!")
      setIsSubmitting(false)
    }, 1500)
  }

  const renderRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    const emptyStars = 10 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <header className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-500 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to dashboard
            </Link>
            <h2 className="text-xl font-bold">Add New Laptop</h2>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
            disabled={isSubmitting}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save Laptop"}
          </button>
        </div>
      </header>




      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <BasicInformation formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} brands={brands}></BasicInformation>
          <HardwareSpecifications formData={formData} handleChange={handleChange}></HardwareSpecifications>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <AdditionalFeautures formData={formData} handleChange={handleChange}></AdditionalFeautures>
          <BatertyLife formData={formData} handleChange={handleChange}></BatertyLife>
        </div>
        <Rating formData={formData} handleRatingChange={handleRatingChange} renderRatingStars={renderRatingStars}></Rating>



        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="flex items-center px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
            disabled={isSubmitting}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save Laptop Information"}
          </button>
        </div>
      </form>
    </div>
  )
}
