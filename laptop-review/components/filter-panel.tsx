"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  ChevronDown, 
  Laptop, 
  Database, 
  HardDrive, 
  Cpu, 
  DollarSign, 
  Monitor, 
  Battery, 
  Sliders, 
  X,
  Plus
} from "lucide-react"
import { Laptop as LaptopType } from "@/types/laptop"

// Tạo mảng giá trị khoảng giá
const priceRanges = [
  { min: 0, max: 500, label: "Dưới $500" },
  { min: 500, max: 1000, label: "$500 - $1,000" },
  { min: 1000, max: 1500, label: "$1,000 - $1,500" },
  { min: 1500, max: 2000, label: "$1,500 - $2,000" },
  { min: 2000, max: 3000, label: "$2,000 - $3,000" },
  { min: 3000, max: Infinity, label: "Trên $3,000" },
]

export interface FilterState {
  brands: string[];
  cpuTypes: string[];
  ramSizes: string[];
  storageOptions: string[];
  priceRanges: Array<{ min: number; max: number }>;
  displaySizes: string[];
  batteryLife: string[];
  features: string[];
}

interface FilterPanelProps {
  onFilter?: (filters: FilterState) => void;
  allLaptops?: LaptopType[];
}

interface ExpandedState {
  brand: boolean;
  cpu: boolean;
  ram: boolean;
  storage: boolean;
  price: boolean;
  display: boolean;
  battery: boolean;
  [key: string]: boolean; // Index signature for dynamic access
}

export default function FilterPanel({ onFilter, allLaptops }: FilterPanelProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({
    brand: true,
    cpu: true,
    ram: true,
    storage: true,
    price: true,
    display: false,
    battery: false,
  })

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

  // State cho RAM tùy chỉnh
  const [customRam, setCustomRam] = useState<string>('')

  // Mảng các thương hiệu phổ biến - Đã thay Apple thành Macbook
  const brands = ["Macbook", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Microsoft", "Samsung", "Razer", "Gigabyte"]

  // Mảng các loại CPU - Đã thêm Apple M4
  const cpuTypes = ["Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 3", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9", "Apple M1", "Apple M2", "Apple M3", "Apple M4"]

  // Mảng các kích thước RAM
  const ramSizes = ["8GB", "16GB", "18GB", "32GB", "36GB", "64GB"]

  // Mảng các tùy chọn lưu trữ
  const storageOptions = ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"]

  // Mảng kích thước màn hình
  const displaySizes = ['13"', '13.3"', '13.6"', '14"', '14.2"', '15"', '15.6"', '16"', '16.2"', '17"']

  // Mảng dung lượng pin (thay thành Wh)
  const batteryCapacities = ["< 50Wh", "50-70Wh", "70-100Wh", "> 100Wh"]

  const toggleSection = (section: keyof ExpandedState) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFilterChange = useCallback((filterType: keyof FilterState, value: any) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters }
      
      if (filterType === 'priceRanges') {
        // Xử lý riêng cho khoảng giá
        const priceRange = value as { min: number; max: number }
        const index = newFilters.priceRanges.findIndex(range => range.min === priceRange.min && range.max === priceRange.max)
        
        if (index > -1) {
          newFilters.priceRanges = newFilters.priceRanges.filter((_, i) => i !== index)
        } else {
          newFilters.priceRanges = [...newFilters.priceRanges, priceRange]
        }
      } else {
        // Xử lý các loại filter khác (mảng string)
        const arr = newFilters[filterType] as string[]
        if (arr.includes(value)) {
          // @ts-ignore
          newFilters[filterType] = arr.filter(item => item !== value)
        } else {
          // @ts-ignore
          newFilters[filterType] = [...arr, value]
        }
      }
      
      return newFilters
    })
  }, [])

  // Hàm xử lý thêm RAM tùy chỉnh
  const handleAddCustomRam = () => {
    if (customRam && !filters.ramSizes.includes(customRam)) {
      setFilters(prev => ({
        ...prev,
        ramSizes: [...prev.ramSizes, customRam]
      }))
      setCustomRam('')
    }
  }

  // Khi filters thay đổi, truyền lên component cha
  useEffect(() => {
    if (onFilter) {
      onFilter(filters)
    }
  }, [filters, onFilter])

  // Hàm xóa tất cả các bộ lọc
  const clearAllFilters = () => {
    setFilters({
      brands: [],
      cpuTypes: [],
      ramSizes: [],
      storageOptions: [],
      priceRanges: [],
      displaySizes: [],
      batteryLife: [],
      features: [],
    })
  }

  // Hiển thị số lượng bộ lọc đang áp dụng
  const activeFilterCount = Object.values(filters).reduce((count, filterArray) => {
    return count + (Array.isArray(filterArray) ? filterArray.length : 0)
  }, 0)

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-blue-600" />
          Bộ lọc
        </h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Xóa tất cả ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Brand Filter */}
      <div className="mb-4 border-b pb-2">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("brand")}
        >
          <span className="font-medium flex items-center">
            <Laptop className="w-4 h-4 mr-2 text-blue-600" />
            Thương hiệu
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.brand ? "rotate-180" : ""}`} />
        </button>

        {expanded.brand && (
          <div className="space-y-2 mt-2 max-h-48 overflow-y-auto custom-scrollbar">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleFilterChange('brands', brand)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CPU Filter */}
      <div className="mb-4 border-b pb-2">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("cpu")}
        >
          <span className="font-medium flex items-center">
            <Cpu className="w-4 h-4 mr-2 text-blue-600" />
            CPU
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.cpu ? "rotate-180" : ""}`} />
        </button>

        {expanded.cpu && (
          <div className="space-y-2 mt-2 max-h-48 overflow-y-auto custom-scrollbar">
            {cpuTypes.map((cpu) => (
              <div key={cpu} className="flex items-center">
                <input
                  type="checkbox"
                  id={`cpu-${cpu}`}
                  checked={filters.cpuTypes.includes(cpu)}
                  onChange={() => handleFilterChange('cpuTypes', cpu)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`cpu-${cpu}`} className="ml-2 text-sm text-gray-700">
                  {cpu}
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
          <span className="font-medium flex items-center">
            <Database className="w-4 h-4 mr-2 text-blue-600" />
            RAM
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.ram ? "rotate-180" : ""}`} />
        </button>

        {expanded.ram && (
          <div className="space-y-2 mt-2">
            {ramSizes.map((ram) => (
              <div key={ram} className="flex items-center">
                <input
                  type="checkbox"
                  id={`ram-${ram}`}
                  checked={filters.ramSizes.includes(ram)}
                  onChange={() => handleFilterChange('ramSizes', ram)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`ram-${ram}`} className="ml-2 text-sm text-gray-700">
                  {ram}
                </label>
              </div>
            ))}
            
            {/* RAM tùy chỉnh */}
            <div className="mt-3 flex items-center">
              <input
                type="text"
                value={customRam}
                onChange={(e) => setCustomRam(e.target.value)}
                placeholder="Nhập dung lượng RAM"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleAddCustomRam}
                className="flex items-center justify-center p-1 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 border border-transparent"
                title="Thêm RAM"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Storage Filter */}
      <div className="mb-4 border-b pb-2">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("storage")}
        >
          <span className="font-medium flex items-center">
            <HardDrive className="w-4 h-4 mr-2 text-blue-600" />
            Bộ nhớ
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.storage ? "rotate-180" : ""}`} />
        </button>

        {expanded.storage && (
          <div className="space-y-2 mt-2">
            {storageOptions.map((storage) => (
              <div key={storage} className="flex items-center">
                <input
                  type="checkbox"
                  id={`storage-${storage}`}
                  checked={filters.storageOptions.includes(storage)}
                  onChange={() => handleFilterChange('storageOptions', storage)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`storage-${storage}`} className="ml-2 text-sm text-gray-700">
                  {storage}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-4 border-b pb-2">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("price")}
        >
          <span className="font-medium flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
            Khoảng giá
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.price ? "rotate-180" : ""}`} />
        </button>

        {expanded.price && (
          <div className="space-y-2 mt-2">
            {priceRanges.map((range) => (
              <div key={range.label} className="flex items-center">
                <input
                  type="checkbox"
                  id={`price-${range.label}`}
                  checked={filters.priceRanges.some(r => r.min === range.min && r.max === range.max)}
                  onChange={() => handleFilterChange('priceRanges', range)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`price-${range.label}`} className="ml-2 text-sm text-gray-700">
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display Size Filter */}
      <div className="mb-4 border-b pb-2">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("display")}
        >
          <span className="font-medium flex items-center">
            <Monitor className="w-4 h-4 mr-2 text-blue-600" />
            Kích thước màn hình
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.display ? "rotate-180" : ""}`} />
        </button>

        {expanded.display && (
          <div className="space-y-2 mt-2">
            {displaySizes.map((size) => (
              <div key={size} className="flex items-center">
                <input
                  type="checkbox"
                  id={`display-${size}`}
                  checked={filters.displaySizes.includes(size)}
                  onChange={() => handleFilterChange('displaySizes', size)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`display-${size}`} className="ml-2 text-sm text-gray-700">
                  {size}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Battery Capacity Filter - Đã đổi từ thời lượng pin thành dung lượng Wh */}
      <div className="mb-4 border-b pb-2">
        <button
          className="flex items-center justify-between w-full mb-2 text-left"
          onClick={() => toggleSection("battery")}
        >
          <span className="font-medium flex items-center">
            <Battery className="w-4 h-4 mr-2 text-blue-600" />
            Dung lượng pin
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.battery ? "rotate-180" : ""}`} />
        </button>

        {expanded.battery && (
          <div className="space-y-2 mt-2">
            {batteryCapacities.map((capacity) => (
              <div key={capacity} className="flex items-center">
                <input
                  type="checkbox"
                  id={`battery-${capacity}`}
                  checked={filters.batteryLife.includes(capacity)}
                  onChange={() => handleFilterChange('batteryLife', capacity)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`battery-${capacity}`} className="ml-2 text-sm text-gray-700">
                  {capacity}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Thêm các style custom cho scrollbar trong global.css nếu cần
// .custom-scrollbar::-webkit-scrollbar {
//   width: 6px;
// }
// .custom-scrollbar::-webkit-scrollbar-track {
//   background: #f1f1f1;
// }
// .custom-scrollbar::-webkit-scrollbar-thumb {
//   background: #888;
//   border-radius: 10px;
// }
// .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//   background: #555;
// }
