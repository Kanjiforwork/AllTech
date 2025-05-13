"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { SearchIcon, Heart, ChevronLeft, Filter, ChevronRight } from "lucide-react"
import { laptopService } from "@/services/firebaseServices"
import { Laptop } from "@/types/laptop"

import FilterPanel, { FilterState } from "@/components/filter-panel"
import NotificationBell from "@/components/notification-bell"
import FavoriteButton from '@/components/common/FavoriteButton'
import Header from "@/components/common/header"

export default function AllLaptopsPage() {
  // State for animation of laptop cards
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  // Reference for the laptop grid container
  const laptopGridRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<{ email: string; username: string; avatar: string | null } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [sortOption, setSortOption] = useState('relevance')
  
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
  
  // State để lưu trữ dữ liệu laptop từ Firestore
  const [allLaptops, setAllLaptops] = useState<Laptop[]>([])
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>([])
  const [displayedLaptops, setDisplayedLaptops] = useState<Laptop[]>([])
  const [loading, setLoading] = useState(true)
  
  // Total number of pages for pagination
  const totalPages = Math.ceil(filteredLaptops.length / itemsPerPage)
  
  // Fetch laptop data from Firestore
  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const laptops = await laptopService.getAll();
        setAllLaptops(laptops as Laptop[]);
        setFilteredLaptops(laptops as Laptop[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching laptops:", error);
        setLoading(false);
      }
    };
    
    fetchLaptops();
    
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  
  // Sort and filter laptops
  useEffect(() => {
    if (filteredLaptops.length === 0) return;
    
    let sorted = [...filteredLaptops]
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => 
          parseInt(a.price?.replace(/[^0-9]/g, '') || '0') - 
          parseInt(b.price?.replace(/[^0-9]/g, '') || '0')
        )
        break
      case 'price-high':
        sorted.sort((a, b) => 
          parseInt(b.price?.replace(/[^0-9]/g, '') || '0') - 
          parseInt(a.price?.replace(/[^0-9]/g, '') || '0')
        )
        break
      case 'rating':
        sorted.sort((a, b) => 
          (b.benchmarks?.overall || 0) - (a.benchmarks?.overall || 0)
        )
        break
      // Default is 'relevance', no sorting needed
    }
    
    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    setDisplayedLaptops(sorted.slice(indexOfFirstItem, indexOfLastItem))
    
    // Reset visibleCards whenever we change displayed laptops
    setVisibleCards(Array(sorted.slice(indexOfFirstItem, indexOfLastItem).length).fill(false))
    
    // Use a small timeout to trigger the animation
    setTimeout(() => {
      sorted.slice(indexOfFirstItem, indexOfLastItem).forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
        }, 50 * index)
      })
    }, 100)
    
  }, [filteredLaptops, currentPage, itemsPerPage, sortOption])
  
  // Handle search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLaptops(allLaptops)
    } else {
      const query = searchQuery.toLowerCase()
      const results = allLaptops.filter(
        laptop => 
          laptop.name.toLowerCase().includes(query) ||
          laptop.specs.cpu.toLowerCase().includes(query) ||
          laptop.specs.gpu.toLowerCase().includes(query) ||
          laptop.specs.ram.toLowerCase().includes(query) ||
          laptop.specs.storage.toLowerCase().includes(query)
      )
      setFilteredLaptops(results)
      setCurrentPage(1) // Reset to first page when search changes
    }
  }, [searchQuery, allLaptops])

  // Apply filters to laptops
  useEffect(() => {
    if (allLaptops.length === 0) return;
    
    let results = [...allLaptops];
    
    // Apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        laptop => 
          laptop.name.toLowerCase().includes(query) ||
          laptop.specs.cpu.toLowerCase().includes(query) ||
          laptop.specs.gpu.toLowerCase().includes(query) ||
          laptop.specs.ram.toLowerCase().includes(query) ||
          laptop.specs.storage.toLowerCase().includes(query)
      );
    }
    
    // Apply filters
    // Filter by brand
    if (filters.brands.length > 0) {
      results = results.filter(laptop => {
        // Extract brand from laptop name
        const laptopBrands = filters.brands.map((brand: string) => brand.toLowerCase());
        const laptopBrand = laptop.name.split(' ')[0].toLowerCase();
        return laptopBrands.includes(laptopBrand);
      });
    }
    
    // Filter by CPU
    if (filters.cpuTypes.length > 0) {
      results = results.filter(laptop => {
        return filters.cpuTypes.some((cpuType: string) => 
          laptop.specs.cpu.toLowerCase().includes(cpuType.toLowerCase())
        );
      });
    }
    
    // Filter by RAM
    if (filters.ramSizes.length > 0) {
      results = results.filter(laptop => {
        return filters.ramSizes.some((ramSize: string) => 
          laptop.specs.ram.toLowerCase().includes(ramSize.toLowerCase())
        );
      });
    }
    
    // Filter by Storage
    if (filters.storageOptions.length > 0) {
      results = results.filter(laptop => {
        return filters.storageOptions.some((storageOption: string) => 
          laptop.specs.storage.toLowerCase().includes(storageOption.toLowerCase().replace(' ssd', ''))
        );
      });
    }
    
    // Filter by price range
    if (filters.priceRanges.length > 0) {
      results = results.filter(laptop => {
        // Trích xuất giá từ chuỗi và chuyển đổi thành số
        const price = parseInt(laptop.price?.replace(/[^0-9]/g, '') || '0');
        
        // Kiểm tra xem giá có nằm trong một trong các khoảng giá được chọn không
        return filters.priceRanges.some((range: { min: number; max: number }) => 
          price >= range.min && price <= range.max
        );
      });
    }
    
    // Filter by display size
    if (filters.displaySizes.length > 0) {
      results = results.filter(laptop => {
        return filters.displaySizes.some((size: string) => 
          laptop.specs.display.includes(size)
        );
      });
    }
    
    // Filter by battery life
    if (filters.batteryLife.length > 0) {
      results = results.filter(laptop => {
        if (!laptop.benchmarks?.batteryLifeCasual) return false;
        
        const batteryHours = parseInt(laptop.benchmarks.batteryLifeCasual);
        
        return filters.batteryLife.some((range: string) => {
          if (range === '<6 giờ') return batteryHours < 6;
          if (range === '6-10 giờ') return batteryHours >= 6 && batteryHours <= 10;
          if (range === '> 10 giờ') return batteryHours > 10;
          return false;
        });
      });
    }
    
    // Feature filters would require more detailed data, can be expanded later
    
    setFilteredLaptops(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allLaptops, searchQuery, filters]);
  
  // Handle filter changes from FilterPanel
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    alert("Logged out successfully!")
  }

  // Function to handle page changes
  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <main className="container px-4 py-8 mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center mb-2">
              <Link
                href="/compare-select"
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mr-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Compare
              </Link>
            </div>
            <h1 className="text-2xl font-bold">All Laptops</h1>
            <p className="text-gray-600">
              {loading ? 'Đang tải dữ liệu...' : `Showing ${filteredLaptops.length} laptops`}
            </p>
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg md:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Filter and Results */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-4">
          {/* Filter Panel - hidden on mobile unless toggled */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterPanel onFilter={handleFilterChange} allLaptops={allLaptops} />
          </div>
          
          {/* Laptop grid */}
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
              <div className="w-full md:w-auto">
                <select 
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
              
              <div className="flex md:items-center space-x-4">
                <div className="block md:hidden w-full">
                  <input
                    type="text"
                    placeholder="Search laptops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Show:</span>
                  <select
                    className="px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
                      setCurrentPage(1) // Reset to first page when changing items per page
                    }}
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                    <option value={48}>48</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Laptop Grid with animation */}
            <div 
              ref={laptopGridRef} 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {displayedLaptops.map((laptop, index) => (
                <Link 
                  href={`/laptops/${laptop.id}`} 
                  key={laptop.id}
                  className={`overflow-hidden bg-white border rounded-lg shadow-sm transition-all duration-500 ease-in-out 
                    ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
                    hover:shadow-md hover:-translate-y-1 relative`}
                >
                  {/* Nút yêu thích */}
                  <div className="absolute top-2 right-2 z-10">
                    <FavoriteButton
                      laptopId={laptop.id}
                      size={20}
                      className="p-1.5 bg-white rounded-full shadow-sm"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="relative w-full h-40 mb-4 overflow-hidden bg-gray-200 rounded-md">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        {laptop.name}
                      </div>
                    </div>

                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className={`w-4 h-4 ${j < Math.floor(laptop.benchmarks?.overall || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {laptop.benchmarks?.overall ? laptop.benchmarks.overall.toFixed(1) : "N/A"}
                      </span>
                    </div>
                    
                    <h3 className="mb-1 font-semibold line-clamp-2">{laptop.name}</h3>
                    
                    <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                      {laptop.specs.cpu}, {laptop.specs.ram}, {laptop.specs.storage}
                    </p>

                    {/* Price section */}
                    <div className="mt-2">
                      {/* Price tags */}
                      <div className="flex gap-2 mb-2">
                        {laptop.price !== laptop.originalPrice && (
                          <span className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-md">
                            On Sale
                          </span>
                        )}
                        {(laptop.benchmarks?.value !== undefined && laptop.benchmarks.value > 8.5) && (
                          <span className="px-2 py-1 text-xs font-medium text-white bg-blue-800 rounded-md">
                            Great Value
                          </span>
                        )}
                      </div>

                      {/* Price display */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">{laptop.price}</span>
                        {laptop.originalPrice && laptop.price !== laptop.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{laptop.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Pagination */}
            {filteredLaptops.length > 0 && (
              <div className="flex items-center justify-center mt-10 space-x-2">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1
                    
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNumber === 1 || 
                      pageNumber === totalPages || 
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => changePage(pageNumber)}
                          className={`w-8 h-8 text-sm font-medium rounded-md ${
                            currentPage === pageNumber
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    }
                    
                    // Show ellipsis for gaps
                    if (
                      (pageNumber === 2 && currentPage > 3) || 
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return <span key={pageNumber} className="text-gray-500">...</span>
                    }
                    
                    return null
                  })}
                </div>
                
                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* No results message */}
            {filteredLaptops.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-1 text-lg font-medium">No laptops found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

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