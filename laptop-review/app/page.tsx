"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { SearchIcon, Heart } from "lucide-react"
import { laptopService } from "@/services/firebaseServices"
import { Laptop } from "@/types/laptop"

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
import Footer from "@/components/common/footer"
import Head from 'next/head'

const ITEMS_PER_HOMEPAGE = 9; // Giới hạn số lượng laptop hiển thị

export default function Home() {
  // State to track which laptop cards are visible
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  // Ref for the laptop grid container
  const laptopGridRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<{ email: string; username: string; avatar: string | null } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const maxScrollsAllowed = 5; // Maximum scrolls before login prompt
  const scrollThrottleRef = useRef(false);
  const hasShownPromptRef = useRef(false);
  

  
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
  const [allLaptops, setAllLaptops] = useState<Laptop[]>([]);
  // filteredData lưu trữ toàn bộ danh sách laptop sau khi áp dụng filter
  const [filteredData, setFilteredData] = useState<Laptop[]>([]) 
  // dataSort chỉ lưu trữ 9 sản phẩm để hiển thị, lấy từ filteredData đã được sắp xếp/lọc
  const [dataSort, setDataSort] = useState<Laptop[]>([])
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;
  
  // Fetch laptop data from Firestore
  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const laptops = await laptopService.getAll();
        setAllLaptops(laptops as Laptop[]);
        setFilteredData(laptops as Laptop[]);
        setDataSort((laptops as Laptop[]).slice(0, ITEMS_PER_HOMEPAGE));
        setVisibleCards(Array((laptops as Laptop[]).slice(0, ITEMS_PER_HOMEPAGE).length).fill(false));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching laptops:", error);
        setLoading(false);
      }
    };
    
    fetchLaptops();
    
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Animation for laptop cards using Intersection Observer
  useEffect(() => {
    if (dataSort.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start staggered fade in of laptop cards when they enter viewport
          dataSort.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                // Đảm bảo prev có đúng độ dài
                const currentDisplayLength = dataSort.length;
                const newState = prev.length === currentDisplayLength ? [...prev] : Array(currentDisplayLength).fill(false);
                if (index < newState.length) {
                  newState[index] = true;
                }
                return newState;
              })
            }, 100 * index) // 100ms delay between each card
          })
          
          // Disconnect observer after triggering animations for the initial set
          if (laptopGridRef.current) {
            observer.unobserve(laptopGridRef.current);
          }
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
    
  }, [dataSort]) // Chạy khi dataSort thay đổi
  
  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage và cập nhật trạng thái
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully!");
  };

  // Xử lý sắp xếp theo giá
  // newListData là danh sách đã được lọc và sắp xếp đầy đủ
  function handleSort(newListData: Laptop[]) {
    setFilteredData(newListData); // Cập nhật filteredData với danh sách đã sắp xếp
    setDataSort(newListData.slice(0, ITEMS_PER_HOMEPAGE)); // Hiển thị 9 item đầu tiên
  }
  useEffect(() => {
  // Skip if user is logged in or prompt already shown in this session
  if (isLoggedIn || hasShownPromptRef.current) return;
  
  const handleScroll = () => {
    // Dừng đếm và hiển thị prompt khi đạt tối đa số lần cuộn (từ 0 đến 5 = 6 lần)
    if (scrollCount >= maxScrollsAllowed) {
      setShowLoginPrompt(true);
      hasShownPromptRef.current = true;
      return;
    }
    
    // Throttle scroll events
    if (scrollThrottleRef.current) return;
    
    scrollThrottleRef.current = true;
    setTimeout(() => {
      scrollThrottleRef.current = false;
    }, 1000); // Don't count scrolls more than once per second
    
    setScrollCount(prev => {
      const newCount = Math.min(prev + 1, maxScrollsAllowed); // Đảm bảo không vượt quá maxScrollsAllowed
      
      // Show login prompt after max scrolls
      if (newCount >= maxScrollsAllowed && !hasShownPromptRef.current) {
        setShowLoginPrompt(true);
        hasShownPromptRef.current = true;
      }
      
      return newCount;
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [isLoggedIn, scrollCount, maxScrollsAllowed]);

  // Reset when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setShowLoginPrompt(false);
    }
  }, [isLoggedIn]);
  
  // Handle login prompt close
  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };
  // Áp dụng bộ lọc
  useEffect(() => {
    if (allLaptops.length === 0) return;
    
    let results = [...allLaptops]; // Bắt đầu với toàn bộ dữ liệu gốc
    
    // Áp dụng các bộ lọc
    // Filter by brand
    if (filters.brands.length > 0) {
      results = results.filter(laptop => {
        // Kiểm tra brand trong tên laptop
        const laptopName = laptop.name.toLowerCase();
        return filters.brands.some(brand => {
          const brandLower = brand.toLowerCase();
          return laptopName.includes(brandLower);
        });
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
        return filters.displaySizes.some(size => {
          const displayText = laptop.specs.display.toLowerCase();
          const sizeValue = size.replace('"', '').toLowerCase();
          return displayText.includes(sizeValue + '"') || displayText.includes(sizeValue + ' inch');
        });
      });
    }
    
    // Set filtered data (chứa tất cả kết quả lọc)
    setFilteredData(results);
    // Set dataSort (chỉ 9 item đầu để hiển thị)
    setDataSort(results.slice(0, ITEMS_PER_HOMEPAGE));
  }, [filters, allLaptops]);
  
  // Handle filter changes from FilterPanel
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header />
      
          {/* Favicon cơ bản */}
          <link rel="icon" href="/favicon.ico" />
          
          {/* Cho các thiết bị Apple */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          
          {/* Favicon SVG chất lượng cao */}
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
 {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="text-center">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Tiếp tục đọc với LapInsight</h3>
              
              {/* Progress bar showing scrolls used */}
             <div className="w-full h-2 mb-4 bg-gray-200 rounded-full overflow-hidden">
  <div 
    className="h-2 bg-blue-500 rounded-full" 
    style={{ 
      width: `${Math.min((scrollCount / maxScrollsAllowed) * 100, 100)}%` 
    }}
  />
</div>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Bạn đã xài {scrollCount}/{maxScrollsAllowed} lượt miễn phí
              </p>
              
              <div className="flex flex-col gap-3">
  <Link href="/login" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
    Đăng nhập
  </Link>
  <Link href="/register" className="w-full px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50">
    Tạo tài khoản
  </Link>
  {/* Chỉ hiển thị nút "Để sau" khi chưa đạt đến giới hạn cuộn tối đa */}
  {scrollCount < maxScrollsAllowed && (
    <button 
      onClick={handleCloseLoginPrompt} 
      className="w-full px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
    >
      Để sau
    </button> )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* phần này đã đổi thành News */}
       <main className={`container px-4 py-8 mx-auto transition-all ${showLoginPrompt ? 'filter blur-sm' : ''}`}>
        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold dark:text-white"></h2>
          <LatestNews />
        </section>

        {/* Recommended Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold dark:text-white">Gợi ý dành cho bạn</h2>
          <RecommendedSection />
        </section>

        {/* Filter and Results */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <FilterPanel onFilter={handleFilterChange} />
          </div>
          <div className="lg:col-span-3 relative z-0">
            {/* Truyền filteredData cho BrowseLaptopsHeader để nó sắp xếp trên dữ liệu đã lọc */}
            <BrowseLaptopsHeader laptopData={filteredData} handle={handleSort} />
            {/* Laptop Grid with animation */}
          
            <div 
              ref={laptopGridRef} 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-0"
            >
              {loading ? (
                <div className="col-span-3 flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              ) : dataSort.length === 0 ? (
                <div className="col-span-3 text-center py-20">
                  <p className="text-gray-600 dark:text-gray-300">Không tìm thấy laptop nào phù hợp với bộ lọc.</p>
                </div>
              ) : (
                dataSort.map((laptop, index) => (
                  <div 
                    key={laptop.id} 
                    className={`overflow-hidden bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm transition-all duration-500 ease-in-out ${
                      visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    } hover:shadow-md hover:-translate-y-1 flex flex-col`}
                  >
                    <div className="p-4 flex flex-col flex-grow">
                      <Link href={`/laptops/${laptop.id}`}>
                        <div className="w-full h-40 mb-4 overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-md relative">
                          {laptop.image ? (
                              <Image 
                                  src={laptop.image} 
                                  alt={laptop.name || "Laptop image"}
                                  fill
                                  style={{objectFit: 'contain'}}
                                  className="p-2"
                              />
                          ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-300 p-2 text-center">
                                  {laptop.name}
                              </div>
                          )}
                        </div>
                      </Link>

                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <svg key={j} className={`w-4 h-4 ${j < Math.floor(laptop.benchmarks?.overall || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                          {laptop.benchmarks?.overall ? laptop.benchmarks.overall.toFixed(1) : "N/A"}
                        </span>
                      </div>
                      
                      <Link href={`/laptops/${laptop.id}`}>
                        <h3 className="mb-1 text-lg font-semibold hover:text-blue-600 dark:text-white dark:hover:text-blue-400 line-clamp-2">{laptop.name}</h3>
                      </Link>
                      <p className="mb-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {laptop.specs.cpu}, {laptop.specs.ram}, {laptop.specs.storage}
                      </p>

                      {/* Phần hiển thị giá, tags và nút - được đẩy xuống dưới */}
                      <div className="mt-auto">
                        {/* Các tag - chiều cao cố định */}
                        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2 h-12 items-start">
                          {laptop.price !== laptop.originalPrice && (
                            <span className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-md">
                              Giảm giá
                            </span>
                          )}
                          {(laptop.benchmarks?.value !== undefined && laptop.benchmarks.value > 8.5) && (
                            <span className="px-2 py-1 text-xs font-medium text-white bg-blue-800 rounded-md">
                              Được yêu thích nhất
                            </span>
                          )}
                        </div>

                        {/* Giá */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold dark:text-white">{laptop.price}</span>
                          {laptop.originalPrice && laptop.price !== laptop.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">{laptop.originalPrice}</span>
                          )}
                        </div>

                        {/* Nút so sánh */}
                        <div className="mt-2">
                          <Link href={`/compare-select?current=${laptop.id}`} className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            So sánh
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Nút Load More */}
            <div className="flex justify-center mt-10 mb-6">
              <Link
                href="/all-laptops"
                className="px-8 py-3 text-base font-medium text-gray-900 bg-white border-2 border-gray-900 rounded-lg hover:bg-gray-100 transition-colors shadow-sm flex items-center hover:shadow-md hover:-translate-y-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Nhiều hơn nữa
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Article Highlights */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold dark:text-white">BÀI VIẾT MỚI NHẤT</h2>
          <ArticleHighlights />
        </section>
        <div className="flex justify-center mt-10 mb-6">
          <button className="px-8 py-3 text-base font-medium text-gray-900 bg-white border-2 border-gray-900 rounded-lg hover:bg-gray-100 transition-colors shadow-sm flex items-center hover:shadow-md hover:-translate-y-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">
            Đọc Thêm
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        
      </main>

      <Footer />
    </div>
  )
}
