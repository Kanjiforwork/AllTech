"use client"

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Laptop } from '@/data/laptops'

interface QuickViewModalProps {
  laptop: Laptop | null
  isOpen: boolean
  onClose: () => void
  onAddToCompare: (id: number) => void
  isInCompareList: boolean
  isCompareDisabled: boolean
}

export default function QuickViewModal({
  laptop,
  isOpen,
  onClose,
  onAddToCompare,
  isInCompareList,
  isCompareDisabled
}: QuickViewModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])
  
  // Animation on mount
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isOpen || !laptop) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className={`bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[85vh] overflow-hidden transform transition-all duration-300 ${
          isMounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{laptop.name}</h3>
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Modal content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left column - Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg h-80">
              <div className="text-gray-500">[Laptop Image]</div>
            </div>
            
            {/* Right column - Details */}
            <div className="space-y-4">
              {/* Rating */}
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className={`w-5 h-5 ${j < Math.floor(laptop.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">{laptop.rating} ({laptop.reviews} reviews)</span>
              </div>
              
              {/* Price and tags */}
              <div>
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
                
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">${laptop.salePrice}</span>
                  {laptop.originalPrice && (
                    <span className="text-gray-500 line-through">${laptop.originalPrice}</span>
                  )}
                  {laptop.saveAmount && (
                    <span className="text-sm font-medium text-green-600">Save ${laptop.saveAmount}</span>
                  )}
                </div>
              </div>
              
              {/* Specifications */}
              <div>
                <h4 className="mb-2 font-medium">Specifications</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{laptop.specs}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processor</span>
                      <span className="font-medium">Intel Core i7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RAM</span>
                      <span className="font-medium">16GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Storage</span>
                      <span className="font-medium">512GB SSD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Display</span>
                      <span className="font-medium">15.6" FHD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GPU</span>
                      <span className="font-medium">Integrated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal footer */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={() => onAddToCompare(laptop.id)}
            disabled={isCompareDisabled && !isInCompareList}
            className={`px-4 py-2 text-white rounded-lg ${
              isInCompareList
                ? 'bg-red-600 hover:bg-red-700'
                : isCompareDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isInCompareList ? 'Remove from Compare' : 'Add to Compare'}
          </button>
        </div>
      </div>
    </div>
  )
} 