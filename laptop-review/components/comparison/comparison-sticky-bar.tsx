"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { Laptop } from '@/data/laptops'

interface ComparisonStickyBarProps {
  selectedIds: (number | string)[]
  laptopData: Laptop[]
  onRemove: (id: number | string) => void
  onClearAll: () => void
  maxSelections?: number
}

export default function ComparisonStickyBar({
  selectedIds,
  laptopData,
  onRemove,
  onClearAll,
  maxSelections = 2
}: ComparisonStickyBarProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  // Get selected laptop objects
  const selectedLaptops = laptopData.filter(laptop => 
    selectedIds.includes(laptop.id)
  )
  
  // Calculate comparison URL
  const comparisonUrl = selectedIds.length >= 2 
    ? `/compare/${selectedIds.join('-vs-')}` 
    : "#"
  
  // Add animation when component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (selectedIds.length === 0) return null
  
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-md transform transition-transform duration-300 ${
        isMounted ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container flex items-center justify-between p-4 mx-auto">
        <div className="flex items-center gap-4">
          <span className="font-medium">Đã chọn: {selectedIds.length}/{maxSelections}</span>
          <div className="flex gap-3">
            {selectedLaptops.map(laptop => (
              <div key={laptop.id} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <span className="text-sm font-medium">{laptop.name}</span>
                <button 
                  onClick={() => onRemove(laptop.id)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Remove laptop"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={onClearAll}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Xóa tất cả
          </button>
          
          <Link
            href={comparisonUrl}
            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition-colors ${
              selectedIds.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            onClick={e => {
              if (selectedIds.length < 2) {
                e.preventDefault()
              }
            }}
          >
            So sánh ngay
          </Link>
        </div>
      </div>
    </div>
  )
} 