"use client"

import { useState } from 'react'
import { Laptop } from '@/data/laptops'
import { Eye } from 'lucide-react'

interface LaptopCardSelectableProps {
  laptop: Laptop
  isSelected: boolean
  onToggleSelect: (id: number | string) => void
  isSelectionDisabled: boolean
  onQuickView?: (id: number | string) => void
  isVisible?: boolean
}

export default function LaptopCardSelectable({
  laptop,
  isSelected,
  onToggleSelect,
  isSelectionDisabled,
  onQuickView,
  isVisible = true
}: LaptopCardSelectableProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`overflow-hidden bg-white border rounded-lg shadow-sm transition-all duration-500 ease-in-out 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${isSelected ? 'border-blue-400 ring-2 ring-blue-100' : 'hover:shadow-md hover:-translate-y-1'} 
        relative group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox for comparison selection */}
      <div className="absolute top-2 right-2 z-10">
        <input 
          type="checkbox" 
          id={`compare-${laptop.id}`}
          checked={isSelected}
          onChange={() => onToggleSelect(laptop.id)}
          disabled={isSelectionDisabled && !isSelected}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <label 
          htmlFor={`compare-${laptop.id}`} 
          className="sr-only"
        >
          Chọn để so sánh
        </label>
      </div>

      {/* Quick View Button - visible on hover */}
      {onQuickView && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity z-[5]">
          <button 
            onClick={() => onQuickView(laptop.id)}
            className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
          >
            <Eye size={16} />
            Xem nhanh
          </button>
        </div>
      )}

      <div className="p-4">
        <div className="relative w-full h-40 mb-4 overflow-hidden bg-gray-200 rounded-md">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            {laptop.name}
          </div>
        </div>

        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, j) => (
            <svg key={j} className={`w-4 h-4 ${j < Math.floor(laptop.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-600">{laptop.rating} ({laptop.reviews} reviews)</span>
        </div>
        <h3 className="mb-1 font-semibold">{laptop.name}</h3>
        <p className="mb-2 text-sm text-gray-600">{laptop.specs}</p>

        {/* Price section */}
        <div className="mt-2">
          {/* Tags */}
          <div className="flex gap-2 mb-2">
            {laptop.onSale && (
              <span className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-md">
                On Sale
              </span>
            )}
            {laptop.greatDeal && (
              <span className="px-2 py-1 text-xs font-medium text-white bg-blue-800 rounded-md">
                Great Deal
              </span>
            )}
          </div>

          {/* Price display */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">${laptop.salePrice}</span>
            {laptop.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${laptop.originalPrice}</span>
            )}
            {laptop.saveAmount && (
              <span className="text-sm font-medium text-green-600">Save ${laptop.saveAmount}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 