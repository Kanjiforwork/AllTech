"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { SearchIcon, Heart } from "lucide-react"
import { laptopData } from "@/data/laptops"
import { useSearchParams } from "next/navigation"

import FilterPanel, { FilterState } from "@/components/filter-panel"
import BrowseLaptopsHeader from "@/components/browse-laptops-header"
import NotificationBell from "@/components/notification-bell"
import ComparisonStickyBar from "@/components/comparison/comparison-sticky-bar"
import LaptopCardSelectable from "@/components/comparison/laptop-card-selectable"
import QuickViewModal from "@/components/comparison/quick-view-modal"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

export default function CompareSelectPage() {
  // State to track which laptop cards are visible
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(laptopData.length).fill(false))
  // Ref for the laptop grid container
  const laptopGridRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<{ email: string; username: string; avatar: string | null } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedLaptops, setSelectedLaptops] = useState<(number | string)[]>([])
  const [dataSort, setDataSort] = useState(laptopData)
  const [quickViewLaptop, setQuickViewLaptop] = useState<number | string | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const searchParams = useSearchParams()
  
  // State cho bộ lọc
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    cpuTypes: [],
    ramSizes: [],
    storageOptions: [],
    priceRanges: [],
    displaySizes: [],
    batteryLife: [],
    features: [],
  })

  // Animation for laptop cards using Intersection Observer
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start staggered fade in of laptop cards when they enter viewport
          laptopData.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, 100 * index) // 100ms delay between each card
          })
          
          // Disconnect observer after triggering animations
          observer.disconnect()
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    )

    if (laptopGridRef.current) {
      observer.observe(laptopGridRef.current)
    }

    return () => {
      observer.disconnect() // Clean up on unmount
    }
    
  }, [])

  // Đọc tham số current từ URL và thêm laptop đó vào danh sách đã chọn
  useEffect(() => {
    const currentLaptopId = searchParams.get('current')
    if (currentLaptopId) {
      setSelectedLaptops([currentLaptopId])
    }
  }, [searchParams])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    alert("Logged out successfully!")
  }

  function handleSort(newListData: typeof laptopData) {
    setDataSort(newListData)
  }

  // Áp dụng bộ lọc
  useEffect(() => {
    if (filters.brands.length === 0 && 
        filters.cpuTypes.length === 0 && 
        filters.ramSizes.length === 0 && 
        filters.storageOptions.length === 0 && 
        filters.priceRanges.length === 0 && 
        filters.displaySizes.length === 0 && 
        filters.batteryLife.length === 0 && 
        filters.features.length === 0) {
      setDataSort(laptopData);
      return;
    }
    
    let results = [...laptopData];
    
    // Filter by brand
    if (filters.brands.length > 0) {
      results = results.filter(laptop => {
        const laptopBrands = filters.brands.map((brand: string) => brand.toLowerCase());
        const laptopBrand = laptop.name.split(' ')[0].toLowerCase();
        return laptopBrands.includes(laptopBrand);
      });
    }
    
    // Filter by CPU
    if (filters.cpuTypes.length > 0) {
      results = results.filter(laptop => {
        return filters.cpuTypes.some((cpuType: string) => 
          laptop.specs.includes(cpuType)
        );
      });
    }
    
    // Filter by RAM
    if (filters.ramSizes.length > 0) {
      results = results.filter(laptop => {
        return filters.ramSizes.some((ramSize: string) => 
          laptop.specs.includes(ramSize)
        );
      });
    }
    
    // Filter by Storage
    if (filters.storageOptions.length > 0) {
      results = results.filter(laptop => {
        return filters.storageOptions.some((storageOption: string) => 
          laptop.specs.includes(storageOption.replace(' SSD', ''))
        );
      });
    }
    
    // Filter by price range
    if (filters.priceRanges.length > 0) {
      results = results.filter(laptop => {
        return filters.priceRanges.some((range: { min: number; max: number }) => 
          laptop.salePrice >= range.min && laptop.salePrice <= range.max
        );
      });
    }
    
    // Set filtered data
    setDataSort(results);
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const toggleLaptopSelection = (laptopId: number | string) => {
    if (selectedLaptops.includes(laptopId)) {
      // Remove from selection
      setSelectedLaptops(selectedLaptops.filter(id => id !== laptopId))
    } else {
      // Add to selection if less than 2 laptops selected
      if (selectedLaptops.length < 2) {
        setSelectedLaptops([...selectedLaptops, laptopId])
      } else {
        // Show "maximum selected" message
        alert("Đã chọn tối đa 2 sản phẩm để so sánh. Vui lòng bỏ chọn một sản phẩm trước khi chọn sản phẩm mới.")
      }
    }
  }

  const clearSelection = () => {
    setSelectedLaptops([])
  }

  const handleQuickView = (laptopId: number | string) => {
    setQuickViewLaptop(laptopId)
    setIsQuickViewOpen(true)
  }

  const closeQuickView = () => {
    setIsQuickViewOpen(false)
  }

  // Get the current laptop for quick view
  const currentQuickViewLaptop = quickViewLaptop !== null 
    ? laptopData.find(laptop => laptop.id === quickViewLaptop) || null
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <main className="container px-4 py-8 mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold">Chọn Laptop để So sánh</h1>
          <p className="text-gray-600">Chọn tối đa 2 sản phẩm để so sánh chi tiết</p>
        </div>

        {/* Filter and Results */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <FilterPanel onFilter={handleFilterChange} />
          </div>
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <BrowseLaptopsHeader 
                laptopData={laptopData} 
                handle={(newList: typeof laptopData) => handleSort(newList)}
              />
              
              <div className="px-4 py-2 ml-4 text-sm font-medium bg-gray-100 rounded-lg">
                Đã chọn: {selectedLaptops.length}/2 sản phẩm
              </div>
            </div>
            
            {/* Laptop Grid with animation */}
            <div 
              ref={laptopGridRef} 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {dataSort.map((laptop, index) => (
                <LaptopCardSelectable
                  key={laptop.id}
                  laptop={laptop}
                  isSelected={selectedLaptops.includes(laptop.id)}
                  onToggleSelect={toggleLaptopSelection}
                  isSelectionDisabled={selectedLaptops.length >= 2}
                  onQuickView={handleQuickView}
                  isVisible={visibleCards[index]}
                />
              ))}
            </div>

            {/* Nút Load More */}
            <div className="flex justify-center mt-10 mb-6">
              <Link
                href="/all-laptops"
                className="px-8 py-3 text-base font-medium text-gray-900 bg-white border-2 border-gray-900 rounded-lg hover:bg-gray-100 transition-colors shadow-sm flex items-center hover:shadow-md hover:-translate-y-1"
              >
                Load More
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky bottom bar for selected laptops */}
      <ComparisonStickyBar
        selectedIds={selectedLaptops}
        laptopData={laptopData}
        onRemove={toggleLaptopSelection}
        onClearAll={clearSelection}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        laptop={currentQuickViewLaptop}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
        onAddToCompare={toggleLaptopSelection}
        isInCompareList={quickViewLaptop !== null ? selectedLaptops.includes(quickViewLaptop) : false}
        isCompareDisabled={selectedLaptops.length >= 2}
      />

      <Footer />
    </div>
  )
} 