"use client"

import type React from "react"

import { useState } from "react"
import { Save, ArrowLeft, Upload, Star, StarHalf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="pb-4 mb-6 border-b">
              <h3 className="text-lg font-medium">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                  Laptop Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. MacBook Pro 16"
                  required
                />
              </div>

              <div>
                <label htmlFor="brand" className="block mb-1 text-sm font-medium text-gray-700">
                  Brand *
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  required
                >
                  {brands.map((item)=>{
                    return (
                      <option value={item}>{item}</option>
                    )
                  })}
                  
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="operatingSystem" className="block mb-1 text-sm font-medium text-gray-700">
                Operating System
              </label>
              <input
                type="text"
                id="operatingSystem"
                name="operatingSystem"
                value={formData.operatingSystem}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. Windows 11 Home"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="weight" className="block mb-1 text-sm font-medium text-gray-700">
                  Weight
                </label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 2.1 kg"
                />
              </div>

              <div>
                <label htmlFor="dimensions" className="block mb-1 text-sm font-medium text-gray-700">
                  Dimensions
                </label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 355.7 x 248.1 x 16.8 mm"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Laptop Images</label>
              <div className="p-4 border-2 border-dashed rounded-md border-gray-300">
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-1 text-sm font-medium text-gray-700">Drag and drop images here</p>
                  <p className="mb-4 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  <label
                    htmlFor="laptop-image"
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer"
                  >
                    Browse Files
                    <input
                      id="laptop-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {imagePreview && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">Preview:</p>
                    <div className="relative h-40 w-full overflow-hidden rounded-md">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Laptop preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hardware Specifications */}
          <div className="space-y-6">
            <div className="pb-4 mb-6 border-b">
              <h3 className="text-lg font-medium">Hardware Specifications</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cpu" className="block mb-1 text-sm font-medium text-gray-700">
                  CPU / Processor
                </label>
                <input
                  type="text"
                  id="cpu"
                  name="cpu"
                  value={formData.cpu}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. Intel Core i7-12700H"
                />
              </div>

              <div>
                <label htmlFor="gpu" className="block mb-1 text-sm font-medium text-gray-700">
                  GPU
                </label>
                <input
                  type="text"
                  id="gpu"
                  name="gpu"
                  value={formData.gpu}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. NVIDIA GeForce RTX 3060"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ram" className="block mb-1 text-sm font-medium text-gray-700">
                  RAM
                </label>
                <input
                  type="text"
                  id="ram"
                  name="ram"
                  value={formData.ram}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 16GB DDR4 3200MHz"
                />
              </div>

              <div>
                <label htmlFor="hardDrive" className="block mb-1 text-sm font-medium text-gray-700">
                  Hard Drive / Storage
                </label>
                <input
                  type="text"
                  id="hardDrive"
                  name="hardDrive"
                  value={formData.hardDrive}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 512GB NVMe SSD"
                />
              </div>
            </div>

            <div>
              <label htmlFor="graphicsCard" className="block mb-1 text-sm font-medium text-gray-700">
                Graphics Card
              </label>
              <input
                type="text"
                id="graphicsCard"
                name="graphicsCard"
                value={formData.graphicsCard}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. NVIDIA GeForce RTX 3060 6GB GDDR6"
              />
            </div>

            <div>
              <label htmlFor="screen" className="block mb-1 text-sm font-medium text-gray-700">
                Screen / Display
              </label>
              <input
                type="text"
                id="screen"
                name="screen"
                value={formData.screen}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. 15.6-inch FHD (1920 x 1080) 144Hz IPS"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="battery" className="block mb-1 text-sm font-medium text-gray-700">
                  Battery
                </label>
                <input
                  type="text"
                  id="battery"
                  name="battery"
                  value={formData.battery}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 80Wh, 4-cell Li-ion"
                />
              </div>

              <div>
                <label htmlFor="ports" className="block mb-1 text-sm font-medium text-gray-700">
                  Ports
                </label>
                <input
                  type="text"
                  id="ports"
                  name="ports"
                  value={formData.ports}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 2x USB-C, 2x USB-A, HDMI, SD card"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="pb-4 mb-6 border-b">
              <h3 className="text-lg font-medium">Additional Features</h3>
            </div>

            <div>
              <label htmlFor="webcam" className="block mb-1 text-sm font-medium text-gray-700">
                Webcam
              </label>
              <input
                type="text"
                id="webcam"
                name="webcam"
                value={formData.webcam}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. 720p HD webcam with privacy shutter"
              />
            </div>

            <div>
              <label htmlFor="wifiBluetooth" className="block mb-1 text-sm font-medium text-gray-700">
                WiFi / Bluetooth
              </label>
              <input
                type="text"
                id="wifiBluetooth"
                name="wifiBluetooth"
                value={formData.wifiBluetooth}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. WiFi 6E (802.11ax), Bluetooth 5.2"
              />
            </div>

            <div>
              <label htmlFor="keyboard" className="block mb-1 text-sm font-medium text-gray-700">
                Keyboard
              </label>
              <input
                type="text"
                id="keyboard"
                name="keyboard"
                value={formData.keyboard}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. Backlit keyboard with numpad"
              />
            </div>

            <div>
              <label htmlFor="speakersMicrophone" className="block mb-1 text-sm font-medium text-gray-700">
                Speakers / Microphone
              </label>
              <input
                type="text"
                id="speakersMicrophone"
                name="speakersMicrophone"
                value={formData.speakersMicrophone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. Stereo speakers, dual-array microphones"
              />
            </div>
          </div>

          {/* Battery Life */}
          <div className="space-y-6">
            <div className="pb-4 mb-6 border-b">
              <h3 className="text-lg font-medium">Battery Life</h3>
            </div>

            <div>
              <label htmlFor="watchingTime" className="block mb-1 text-sm font-medium text-gray-700">
                Watching Online Videos
              </label>
              <input
                type="text"
                id="watchingTime"
                name="watchingTime"
                value={formData.watchingTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. Up to 10 hours"
              />
            </div>

            <div>
              <label htmlFor="casualUseTime" className="block mb-1 text-sm font-medium text-gray-700">
                Casual Use
              </label>
              <input
                type="text"
                id="casualUseTime"
                name="casualUseTime"
                value={formData.casualUseTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. Up to 8 hours"
              />
            </div>

            <div>
              <label htmlFor="extremeUseTime" className="block mb-1 text-sm font-medium text-gray-700">
                Extreme Use
              </label>
              <input
                type="text"
                id="extremeUseTime"
                name="extremeUseTime"
                value={formData.extremeUseTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="e.g. Up to 2 hours"
              />
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className="mt-8">
          <div className="pb-4 mb-6 border-b">
            <h3 className="text-lg font-medium">Ratings & Reviews</h3>
            <p className="text-sm text-gray-500">Rate each category from 1 to 10 and provide a brief description</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Object.entries(formData.ratings).map(([key, value]) => (
              <div key={key} className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{value.name}</h4>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      step="0.5"
                      value={value.rating}
                      onChange={(e) =>
                        handleRatingChange(key as keyof typeof formData.ratings, "rating", e.target.value)
                      }
                      className="w-16 px-2 py-1 mr-2 text-center border rounded-md"
                    />
                    <div className="flex">{renderRatingStars(value.rating)}</div>
                  </div>
                </div>
                <textarea
                  value={value.description}
                  onChange={(e) =>
                    handleRatingChange(key as keyof typeof formData.ratings, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder={`Describe the ${value.name.toLowerCase()}...`}
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>

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
