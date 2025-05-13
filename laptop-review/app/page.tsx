"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { SearchIcon, Heart } from "lucide-react"
import { laptopData } from "@/data/laptops";

import LatestNews from "@/components/latest-news"
import ArticleHighlights from "@/components/article-highlights"
import FilterPanel, { FilterState } from "@/components/filter-panel"
//import ComparisonTool from "@/components/comparison-tool"
import RecommendedSection from "@/components/recommended-section"
//import FavoritesSection from "@/components/favorites-section"
//import ReviewsSection from "@/components/reviews-section"
import NotificationBell from "@/components/notification-bell"
import BrowseLaptopsHeader from "@/components/browse-laptops-header"
import Header from "@/components/common/header"

export default function Home() {
  // State to track which laptop cards are visible
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(laptopData.length).fill(false))
  // Ref for the laptop grid container
  const laptopGridRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<{ email: string; username: string; avatar: string | null } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
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

  const [dataSort, setDataSort] = useState(laptopData)
  const [filteredData, setFilteredData] = useState(laptopData)
  
  // Animation for laptop cards using Intersection Observer
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    // Xóa thông tin người dùng khỏi localStorage và cập nhật trạng thái
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully!");
  };

  // Xử lý sắp xếp theo giá
  function handleSort(newListData: typeof laptopData) {
    setDataSort(newListData)
  }
  
  // Áp dụng bộ lọc
  useEffect(() => {
    let results = [...laptopData];
    
    // Áp dụng các bộ lọc
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
    setFilteredData(results);
    setDataSort(results);
  }, [filters]);
  
  // Handle filter changes from FilterPanel
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* phần này đã đổi thành News */}
      <main className="container px-4 py-8 mx-auto">
        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold"></h2>
          <LatestNews />
        </section>

        {/* Recommended Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Recommended For You</h2>
          <RecommendedSection />
        </section>

        {/* Filter and Results */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <FilterPanel onFilter={handleFilterChange} />
          </div>
          <div className="lg:col-span-3 relative z-0">
            <BrowseLaptopsHeader laptopData={laptopData} handle={handleSort} />
            {/* Laptop Grid with animation */}
          
            <div 
              ref={laptopGridRef} 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-0"
            >
              {dataSort.map((laptop, index) => (
                <div 
                  key={laptop.id} 
                  className={`overflow-hidden bg-white border rounded-lg shadow-sm transition-all duration-500 ease-in-out ${
                    visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } hover:shadow-md hover:-translate-y-1`}
                >
                  <div className="p-4">
                    <Link href={laptop.detailLink}>
                      <div className="w-full h-40 mb-4 overflow-hidden bg-gray-200 rounded-md relative">
                        <Image 
                          src={laptop.image || "/placeholder.svg?height=600&width=600"} 
                          alt={laptop.name || "Laptop image"}
                          fill
                          style={{objectFit: 'contain'}}
                          className="p-2"
                        />
                      </div>
                    </Link>

                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{laptop.rating} ({laptop.reviews} reviews)</span>
                    </div>
                    
                    <Link href={laptop.detailLink}>
                      <h3 className="mb-1 text-lg font-semibold hover:text-blue-600">{laptop.name}</h3>
                    </Link>
                    <p className="mb-2 text-sm text-gray-600">{laptop.specs}</p>

                    {/* Phần hiển thị giá */}
                    <div className="mt-2">
                      {/* Các tag */}
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

                      {/* Giá */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">${laptop.salePrice}</span>
                        {laptop.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${laptop.originalPrice}</span>
                        )}
                        {laptop.saveAmount && (
                          <span className="text-sm font-medium text-green-600">Save ${laptop.saveAmount}</span>
                        )}
                      </div>

                      {/* Nút mua và so sánh */}
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Link href={`/compare-select?id=${laptop.id}`} className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          Compare
                        </Link>
                        <Link href={laptop.detailLink} className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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

        {/* Comparison Tool */}
        {/* <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Compare Laptops</h2>
          <ComparisonTool />
        </section> */}



        {/* Favorites Section */}
        {/* <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Your Favorites</h2>
          <FavoritesSection />
        </section> */}


        {/* Article Highlights */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Latest Articles</h2>
          <ArticleHighlights />
        </section>
        <div className="flex justify-center mt-10 mb-6">
          <button className="px-8 py-3 text-base font-medium text-gray-900 bg-white border-2 border-gray-900 rounded-lg hover:bg-gray-100 transition-colors shadow-sm flex items-center hover:shadow-md hover:-translate-y-1">
            View All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Reviews Section */}
        {/* <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Latest Reviews</h2>
          <ReviewsSection />
        </section> */}
      </main>

      <footer className="bg-gray-900 text-white py-5">
        <div className="text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} LapInsight. Made by 4Sheep.
        </div>
      </footer>
    </div>
  )
}