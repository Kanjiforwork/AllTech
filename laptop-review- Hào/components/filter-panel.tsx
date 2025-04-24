"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FilterPanel() {
  const [expanded, setExpanded] = useState({
    brand: true,
    ram: true,
    gpu: true,
    storage: true,
  })

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-bold">Filter Laptops</h3>

      {/* Brand Filter */}
      <div className="mb-4 border-b pb-2">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("brand")}
        >
          <span className="font-medium">Brand</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.brand ? "rotate-180" : ""}`} />
        </button>

        {expanded.brand && (
          <div className="space-y-2 mt-2">
            {["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Microsoft"].map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RAM Filter */}
      <div className="mb-4 border-b pb-2">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("ram")}
        >
          <span className="font-medium">RAM</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.ram ? "rotate-180" : ""}`} />
        </button>

        {expanded.ram && (
          <div className="space-y-2 mt-2">
            {["8GB", "16GB", "32GB", "64GB"].map((ram) => (
              <div key={ram} className="flex items-center">
                <input
                  type="checkbox"
                  id={`ram-${ram}`}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor={`ram-${ram}`} className="ml-2 text-sm text-gray-700">
                  {ram}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GPU Filter */}
      <div className="mb-4 border-b pb-2">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("gpu")}
        >
          <span className="font-medium">GPU</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.gpu ? "rotate-180" : ""}`} />
        </button>

        {expanded.gpu && (
          <div className="space-y-2 mt-2">
            {[
              "Integrated",
              "NVIDIA RTX 3050",
              "NVIDIA RTX 4060",
              "NVIDIA RTX 4070",
              "NVIDIA RTX 4080",
              "AMD Radeon",
            ].map((gpu) => (
              <div key={gpu} className="flex items-center">
                <input
                  type="checkbox"
                  id={`gpu-${gpu}`}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor={`gpu-${gpu}`} className="ml-2 text-sm text-gray-700">
                  {gpu}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Storage Filter */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("storage")}
        >
          <span className="font-medium">Storage</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.storage ? "rotate-180" : ""}`} />
        </button>

        {expanded.storage && (
          <div className="space-y-2 mt-2">
            {["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"].map((storage) => (
              <div key={storage} className="flex items-center">
                <input
                  type="checkbox"
                  id={`storage-${storage}`}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor={`storage-${storage}`} className="ml-2 text-sm text-gray-700">
                  {storage}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
        Apply Filters
      </button>
    </div>
  )
}
