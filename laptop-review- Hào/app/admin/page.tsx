"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save, Trash, Upload } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    price: "",
    processor: "",
    ram: "",
    storage: "",
    display: "",
    gpu: "",
    battery: "",
    weight: "",
    description: "",
    pros: [""],
    cons: [""],
    rating: "4.5",
    tags: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (index: number, value: string, field: "pros" | "cons") => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData((prev) => ({ ...prev, [field]: newArray }))
  }

  const addArrayItem = (field: "pros" | "cons") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }))
  }

  const removeArrayItem = (index: number, field: "pros" | "cons") => {
    const newArray = [...formData[field]]
    newArray.splice(index, 1)
    setFormData((prev) => ({ ...prev, [field]: newArray }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to Firebase Firestore
    console.log("Saving review:", formData)
    alert("Review saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-500 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to site
            </Link>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Review
          </button>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h2 className="mb-6 text-xl font-bold">Create/Edit Review</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                  Review Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. MacBook Pro 16 (2025) Review"
                  required
                />
              </div>

              <div>
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-700">
                  Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="Apple">Apple</option>
                  <option value="Dell">Dell</option>
                  <option value="HP">HP</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="ASUS">ASUS</option>
                  <option value="Acer">Acer</option>
                  <option value="MSI">MSI</option>
                  <option value="Microsoft">Microsoft</option>
                </select>
              </div>

              <div>
                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-700">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. MacBook Pro 16"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. $2,999"
                  required
                />
              </div>

              <div>
                <label htmlFor="processor" className="block mb-2 text-sm font-medium text-gray-700">
                  Processor
                </label>
                <input
                  type="text"
                  id="processor"
                  name="processor"
                  value={formData.processor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. Apple M3 Max"
                />
              </div>

              <div>
                <label htmlFor="ram" className="block mb-2 text-sm font-medium text-gray-700">
                  RAM
                </label>
                <input
                  type="text"
                  id="ram"
                  name="ram"
                  value={formData.ram}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 32GB"
                />
              </div>

              <div>
                <label htmlFor="storage" className="block mb-2 text-sm font-medium text-gray-700">
                  Storage
                </label>
                <input
                  type="text"
                  id="storage"
                  name="storage"
                  value={formData.storage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 1TB SSD"
                />
              </div>

              <div>
                <label htmlFor="display" className="block mb-2 text-sm font-medium text-gray-700">
                  Display
                </label>
                <input
                  type="text"
                  id="display"
                  name="display"
                  value={formData.display}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 16-inch Liquid Retina XDR"
                />
              </div>

              <div>
                <label htmlFor="gpu" className="block mb-2 text-sm font-medium text-gray-700">
                  GPU
                </label>
                <input
                  type="text"
                  id="gpu"
                  name="gpu"
                  value={formData.gpu}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. Apple M3 Max (38-core)"
                />
              </div>

              <div>
                <label htmlFor="battery" className="block mb-2 text-sm font-medium text-gray-700">
                  Battery Life
                </label>
                <input
                  type="text"
                  id="battery"
                  name="battery"
                  value={formData.battery}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. Up to 22 hours"
                />
              </div>

              <div>
                <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-700">
                  Weight
                </label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. 4.8 lbs"
                />
              </div>

              <div>
                <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-700">
                  Rating (out of 5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.1"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-700">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. Apple, MacBook, Creator"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                Review Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Write your detailed review here..."
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Pros</label>
                {formData.pros.map((pro, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={pro}
                      onChange={(e) => handleArrayChange(index, e.target.value, "pros")}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                      placeholder={`Pro ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, "pros")}
                      className="p-2 ml-2 text-red-500 bg-white border rounded-md hover:bg-red-50"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("pros")}
                  className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Add Pro
                </button>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Cons</label>
                {formData.cons.map((con, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={con}
                      onChange={(e) => handleArrayChange(index, e.target.value, "cons")}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                      placeholder={`Con ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, "cons")}
                      className="p-2 ml-2 text-red-500 bg-white border rounded-md hover:bg-red-50"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("cons")}
                  className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Add Con
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Images</label>
              <div className="p-4 border-2 border-dashed rounded-md border-gray-300">
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-1 text-sm font-medium text-gray-700">Drag and drop images here</p>
                  <p className="mb-4 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                  >
                    Browse Files
                  </button>
                  <input type="file" className="hidden" multiple />
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
