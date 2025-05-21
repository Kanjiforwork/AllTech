"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { SearchIcon, Heart } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { laptopService } from "@/services/firebaseServices"
import { Laptop as FirestoreLaptop } from "@/types/laptop"
import { Laptop } from "@/data/laptops"

import FilterPanel, { FilterState } from "@/components/filter-panel"
import BrowseLaptopsHeader from "@/components/browse-laptops-header"
import NotificationBell from "@/components/notification-bell"
import ComparisonStickyBar from "@/components/comparison/comparison-sticky-bar"
import LaptopCardSelectable from "@/components/comparison/laptop-card-selectable"
import QuickViewModal from "@/components/comparison/quick-view-modal"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

// Hàm chuyển đổi từ FirestoreLaptop sang Laptop cho UI
const convertFirestoreLaptopToUIFormat = (laptop: FirestoreLaptop): Laptop => {
  // Trích xuất giá từ chuỗi và xử lý nếu có
  const price = laptop.price || '';
  const salePrice = price ? parseInt(price.replace(/[^0-9]/g, "")) || 0 : 0;
  const originalPrice = laptop.originalPrice || null;
  
  // Tạo chuỗi specs từ các thuộc tính
  const specs = `${laptop.specs.cpu || ''}, ${laptop.specs.ram || ''}, ${laptop.specs.storage || ''}`;
  
  return {
    id: laptop.id,
    name: laptop.name,
    specs: specs,
    rating: 4.5, // Giá trị mặc định
    reviews: 120, // Giá trị mặc định
    salePrice: salePrice,
    originalPrice: originalPrice,
    saveAmount: originalPrice ? (parseInt(originalPrice.replace(/[^0-9]/g, "")) - salePrice).toString() : null,
    onSale: !!originalPrice,
    greatDeal: true,
    image: laptop.image || "/placeholder.svg?height=600&width=600",
    detailLink: `/laptops/${laptop.id}`,
    purchaseLink: '',  // Thêm thuộc tính còn thiếu
  };
};

export default function CompareSelectPage() {
  // State to track which laptop cards are visible
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  // Ref for the laptop grid container
  const laptopGridRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<{ email: string; username: string; avatar: string | null } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedLaptops, setSelectedLaptops] = useState<(number | string)[]>([])
  const [firestoreLaptops, setFirestoreLaptops] = useState<FirestoreLaptop[]>([])
  const [laptopData, setLaptopData] = useState<Laptop[]>([])
  const [dataSort, setDataSort] = useState<Laptop[]>([])
  const [quickViewLaptop, setQuickViewLaptop] = useState<number | string | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
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

  // Fetch laptop data from Firestore
  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        // Lấy dữ liệu từ Firestore
        const laptops = await laptopService.getAll();
        setFirestoreLaptops(laptops as FirestoreLaptop[]);
        
        // Chuyển đổi sang định dạng cho UI
        const convertedLaptops = (laptops as FirestoreLaptop[]).map(convertFirestoreLaptopToUIFormat);
        setLaptopData(convertedLaptops);
        setDataSort(convertedLaptops);
        
        // Khởi tạo visibleCards với độ dài đúng
        setVisibleCards(Array(laptops.length).fill(false));
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
  }, []);

  // Animation for laptop cards using Intersection Observer
  useEffect(() => {
    if (laptopData.length === 0) return;
    
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
    
  }, [laptopData])

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

  function handleSort(newListData: Laptop[]) {
    setDataSort(newListData)
  }

  // Áp dụng bộ lọc
  useEffect(() => {
    if (laptopData.length === 0) return;
    
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
    
    // Tìm dữ liệu Firestore tương ứng để lọc dựa trên các thuộc tính chi tiết
    const results = laptopData.filter(uiLaptop => {
      // Tìm laptop Firestore tương ứng
      const firestoreLaptop = firestoreLaptops.find(l => l.id === uiLaptop.id);
      if (!firestoreLaptop) return false;
      
      // Filter by brand
      if (filters.brands.length > 0) {
        const laptopBrands = filters.brands.map((brand: string) => brand.toLowerCase());
        const laptopName = uiLaptop.name.toLowerCase();
        if (!laptopBrands.some(brand => laptopName.includes(brand))) {
          return false;
        }
      }
      
      // Filter by CPU
      if (filters.cpuTypes.length > 0) {
        if (!filters.cpuTypes.some((cpuType: string) => 
          firestoreLaptop.specs.cpu?.toLowerCase().includes(cpuType.toLowerCase())
        )) {
          return false;
        }
      }
      
      // Filter by RAM
      if (filters.ramSizes.length > 0) {
        if (!filters.ramSizes.some((ramSize: string) => 
          firestoreLaptop.specs.ram?.toLowerCase().includes(ramSize.toLowerCase())
        )) {
          return false;
        }
      }
      
      // Filter by Storage
      if (filters.storageOptions.length > 0) {
        if (!filters.storageOptions.some((storageOption: string) => 
          firestoreLaptop.specs.storage?.toLowerCase().includes(storageOption.toLowerCase().replace(' ssd', ''))
        )) {
          return false;
        }
      }
      
      // Filter by price range
      if (filters.priceRanges.length > 0) {
        // Trích xuất giá từ chuỗi và chuyển đổi thành số
        const price = uiLaptop.salePrice || 0;
        
        // Kiểm tra xem giá có nằm trong một trong các khoảng giá được chọn không
        if (!filters.priceRanges.some((range: { min: number; max: number }) => 
          price >= range.min && price <= range.max
        )) {
          return false;
        }
      }
      
      return true;
    });
    
    // Set filtered data
    setDataSort(results);
  }, [filters, laptopData, firestoreLaptops]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium dark:text-white">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header />

      <main className="container px-4 py-8 mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold dark:text-white">Chọn Laptop để So sánh</h1>
          <p className="text-gray-600 dark:text-gray-300">Chọn tối đa 2 sản phẩm để so sánh chi tiết</p>
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
                handle={handleSort}
              />
              
              <div className="px-4 py-2 ml-4 text-sm font-medium bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg">
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
                  isSelectionDisabled={selectedLaptops.length >= 2 && !selectedLaptops.includes(laptop.id)}
                  onQuickView={handleQuickView}
                  isVisible={visibleCards[index]}
                />
              ))}
            </div>

            {/* Nút Compare */}
            <div className="mt-10 text-center">
              <button 
                onClick={() => {
                  if (selectedLaptops.length === 2) {
                    // Chuyển đến trang so sánh
                    const ids = selectedLaptops.join('-vs-')
                    router.push(`/compare/${ids}`)
                  }
                }}
                disabled={selectedLaptops.length < 2} 
                className={`flex items-center justify-center px-6 py-3 mx-auto space-x-2 text-base font-medium ${
                  selectedLaptops.length === 2 
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" 
                    : "bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                } rounded-lg transition-colors`}
              >
                <span>So sánh sản phẩm</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        {currentQuickViewLaptop && (
          <QuickViewModal
            laptop={currentQuickViewLaptop}
            isOpen={isQuickViewOpen}
            onClose={closeQuickView}
            onAddToCompare={toggleLaptopSelection}
            isInCompareList={selectedLaptops.includes(currentQuickViewLaptop.id)}
            isCompareDisabled={selectedLaptops.length >= 2 && !selectedLaptops.includes(currentQuickViewLaptop.id)}
          />
        )}
      </main>

      {/* Comparison Sticky Bar */}
      {selectedLaptops.length > 0 && (
        <ComparisonStickyBar
          selectedIds={selectedLaptops}
          laptopData={laptopData}
          onRemove={toggleLaptopSelection}
          onClearAll={clearSelection}
          maxSelections={2}
        />
      )}

      <Footer />
    </div>
  )
} 