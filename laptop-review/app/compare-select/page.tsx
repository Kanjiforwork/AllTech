"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { SearchIcon, Heart } from "lucide-react"
import { laptopData } from "@/data/laptops"

import FilterPanel from "@/components/filter-panel"
import BrowseLaptopsHeader from "@/components/browse-laptops-header"
import NotificationBell from "@/components/notification-bell"
import ComparisonStickyBar from "@/components/comparison/comparison-sticky-bar"
import LaptopCardSelectable from "@/components/comparison/laptop-card-selectable"
import QuickViewModal from "@/components/comparison/quick-view-modal"

export default function CompareSelectPage() {
  // State to track which laptop cards are visible
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(laptopData.length).fill(false))
  // Ref for the laptop grid container
  const laptopGridRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<{ email: string; username: string; avatar: string | null } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedLaptops, setSelectedLaptops] = useState<number[]>([])
  const [dataSort, setDataSort] = useState(laptopData)
  const [quickViewLaptop, setQuickViewLaptop] = useState<number | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

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

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    alert("Logged out successfully!")
  }

  function handleSort(newListData: typeof laptopData) {
    setDataSort(newListData)
  }

  const toggleLaptopSelection = (laptopId: number) => {
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

  const handleQuickView = (laptopId: number) => {
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
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container flex items-center h-16 px-4 mx-auto">
          {/* Logo và Danh mục */}
          <div className="flex items-center space-x-8 mr-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/placeholder.svg" alt="TechReview Logo" width={40} height={40} className="rounded" />
              <span className="text-xl font-bold">TechReview</span>
            </Link>

            <Link href="/#categories" className="flex items-center text-sm font-bold hover:text-gray-700">
              Danh mục
            </Link>
          </div>

          {/* thanh tìm kiếm */}
          <div className="relative hidden md:block flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Search laptops..."
              className="w-full h-10 pl-10 pr-4 text-sm bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <SearchIcon className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          </div>

          {/* Các nút bên phải */}
          <div className="flex items-center ml-auto space-x-8">
            <Link href="/compare-select" className="flex items-center text-sm font-bold text-blue-600">
              So sánh
            </Link>
            <Link href="/#favorites" className="flex items-center text-sm font-bold hover:text-gray-700">
              <Heart className="w-5 h-5 mr-1" />
              <span>Yêu thích</span>
            </Link>

            <NotificationBell/>
           {/* Hiển thị avatar nếu đã đăng nhập */}
           {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={user.avatar || "/user-circle.svg"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p>{user.username}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <hr />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold">Chọn Laptop để So sánh</h1>
          <p className="text-gray-600">Chọn tối đa 2 sản phẩm để so sánh chi tiết</p>
        </div>

        {/* Filter and Results */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <FilterPanel />
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
              <button className="px-8 py-3 text-base font-medium text-gray-900 bg-white border-2 border-gray-900 rounded-lg hover:bg-gray-100 transition-colors shadow-sm flex items-center hover:shadow-md hover:-translate-y-1">
                Load More
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
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

      <footer className="py-8 text-white bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">TechReview</h3>
              <p className="text-sm text-gray-400">
                Your trusted source for laptop reviews and comparisons since 2023.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Gaming Laptops
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Ultrabooks
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Budget Laptops
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Business Laptops
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase">Subscribe</h4>
              <p className="mb-4 text-sm text-gray-400">Stay updated with the latest reviews and news.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm text-black bg-white rounded-l-md focus:outline-none"
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-r-md hover:bg-gray-600">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 text-sm text-center text-gray-400 border-t border-gray-800">
            &copy; {new Date().getFullYear()} TechReview. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
} 