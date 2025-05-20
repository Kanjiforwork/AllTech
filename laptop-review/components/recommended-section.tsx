"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function RecommendedSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const categories = [
    {
      id: 1,
      name: "Dành cho học sinh/sinh viên",
      description: "Nhẹ, pin lâu, giá phải chăng",
      image: "/placeholder.svg",
      laptops: [
        {
          id: "macbook-air-13-m3",
          name: "MacBook Air M3",
          image: "/placeholder.svg",
          price: "25,000,000 VNĐ",
        },
        {
          id: "dell-xps-15",
          name: "Dell XPS 15",
          image: "/placeholder.svg",
          price: "15,000,000 VNĐ",
        },
        {
          id: "lenovo-ideapad-5-pro-16",
          name: "Lenovo Ideapad 5 Pro 16",
          image: "/placeholder.svg",
          price: "18,000,000 VNĐ",
        },
      ],
    },
    {
      id: 2,
      name: "Dành cho Gaming",
      description: "Chip đồ họa mạnh mẽ, màn hình tần số quét cao, hệ thống làm mát tiên tiến",
      image: "/placeholder.svg",
      laptops: [
        {
          id: "asus-rog-zephyrus-g14",
          name: "Asus ROG Zephyrus G14",
          image: "/placeholder.svg",
          price: "30,000,000 VNĐ",
        },
        {
          id: "acer-nitro-5",
          name: "Acer Nitro 5",
          image: "/placeholder.svg",
          price: "25,000,000 VNĐ",
        },
        {
          id: "acer-predator-helios-neo-16-ph316-54s",
          name: "Acer Predator Helios Neo 16 PH316-54S",
          image: "/placeholder.svg",
          price: "50,000,000 VNĐ",
        },
      ],
    },
    {
      id: 3,
      name: "Dành cho công việc",
      description: "Màn hình hiển thị màu sắc chính xác, CPU mạnh mẽ, hiệu suất ổn định",
      image: "/placeholder.svg",
      laptops: [
        {
          id: "macbook-pro-14-m3-pro",
          name: "MacBook Pro 14 M3 Pro",
          image: "/placeholder.svg",
          price: "45,000,000 VNĐ",
        },
        {
          id: "microsoft-surface-laptop-studio",
          name: "Microsoft Surface Laptop Studio",
          image: "/placeholder.svg",
          price: "28,990,000 VNĐ",
        },
        {
          id: "acer-swift-3-oled-sf314-71-74x6",
          name: "Acer Swift 3 OLED SF314-71-74X6",
          image: "/placeholder.svg",
          price: "21,990,000 VNĐ",
        },
      ],
    },
  ]

  // Xử lý sự kiện kéo chuột
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - startX
    const containerWidth = sliderRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.2 // Phần trăm kéo tối thiểu để chuyển slide
    
    // Giới hạn khoảng di chuyển
    const maxTranslate = containerWidth * 0.25
    const clampedDelta = Math.max(Math.min(deltaX, maxTranslate), -maxTranslate)
    
    setTranslateX(clampedDelta)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - startX
    const containerWidth = sliderRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.2 // Phần trăm kéo tối thiểu để chuyển slide
    
    if (deltaX > threshold) {
      prevSlide()
    } else if (deltaX < -threshold) {
      nextSlide()
    }
    
    setIsDragging(false)
    setTranslateX(0)
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      setTranslateX(0)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === categories.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? categories.length - 1 : prev - 1))
  }

  // Thêm sự kiện để ngăn việc kéo ảnh
  useEffect(() => {
    const preventDefault = (e: Event) => {
      if (isDragging) {
        e.preventDefault()
      }
    }
    
    document.addEventListener('dragstart', preventDefault)
    return () => {
      document.removeEventListener('dragstart', preventDefault)
    }
  }, [isDragging])

  return (
    <div 
      className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm p-6"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
            transitionProperty: isDragging ? 'none' : 'transform'
          }}
        >
          {categories.map((category) => (
            <div key={category.id} className="w-full flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
                  <div className="relative w-full overflow-hidden rounded-lg md:w-1/3 flex flex-col">
                    <div className="relative w-full h-48 md:h-auto flex-grow">
                      <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
                        <h3 className="text-2xl font-bold text-white text-center">{category.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 flex flex-col">
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{category.description}</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-auto">
                      {category.laptops.map((laptop) => (
                        <Link key={laptop.id} href={`/laptops/${laptop.id}`} className="group flex">
                          <div className="flex flex-col w-full overflow-hidden transition-all duration-200 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-lg group-hover:shadow-md">
                            <div className="relative w-full h-40">
                              <Image
                                src={laptop.image || "/placeholder.svg"}
                                alt={laptop.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-3 flex flex-col flex-grow">
                              <h4 className="text-sm font-medium dark:text-white line-clamp-2">{laptop.name}</h4>
                              <p className="mt-auto text-sm font-bold text-gray-900 dark:text-gray-100 pt-1">{laptop.price}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Các chấm chỉ báo slide - bên trong container nền trắng */}
      <div className="mt-6 flex justify-center space-x-3 py-2">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-gray-800 dark:bg-gray-200" 
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}





//old codes incase anyone want to re-use it later


// import Image from "next/image"
// import Link from "next/link"

// export default function RecommendedSection() {
//   const categories = [
//     {
//       id: 1,
//       name: "For Students",
//       description: "Lightweight, long battery life, affordable",
//       image: "/placeholder.svg",
//       laptops: [
//         {
//           id: 101,
//           name: "MacBook Air M3",
//           image: "/placeholder.svg",
//           price: "$999",
//         },
//         {
//           id: 102,
//           name: "Dell XPS 13",
//           image: "/placeholder.svg",
//           price: "$899",
//         },
//         {
//           id: 103,
//           name: "Lenovo ThinkPad X1 Carbon",
//           image: "/placeholder.svg",
//           price: "$1,199",
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "For Gaming",
//       description: "Powerful GPUs, high refresh rate displays, advanced cooling",
//       image: "/placeholder.svg",
//       laptops: [
//         {
//           id: 201,
//           name: "ASUS ROG Strix G15",
//           image: "/placeholder.svg",
//           price: "$1,499",
//         },
//         {
//           id: 202,
//           name: "Razer Blade 15",
//           image: "/placeholder.svg",
//           price: "$1,999",
//         },
//         {
//           id: 203,
//           name: "MSI GE76 Raider",
//           image: "/placeholder.svg",
//           price: "$2,299",
//         },
//       ],
//     },
//     {
//       id: 3,
//       name: "For Professionals",
//       description: "Color-accurate displays, powerful CPUs, reliable performance",
//       image: "/placeholder.svg",
//       laptops: [
//         {
//           id: 301,
//           name: "MacBook Pro 14",
//           image: "/placeholder.svg",
//           price: "$1,999",
//         },
//         {
//           id: 302,
//           name: "Dell Precision 5570",
//           image: "/placeholder.svg",
//           price: "$2,399",
//         },
//         {
//           id: 303,
//           name: "HP ZBook Studio G9",
//           image: "/placeholder.svg",
//           price: "$2,499",
//         },
//       ],
//     },
//   ]

//   return (
//     <div className="space-y-8">
//       {categories.map((category) => (
//         <div key={category.id} className="p-6 bg-white border rounded-lg shadow-sm">
//           <div className="flex flex-col gap-6 md:flex-row">
//             <div className="relative w-full h-48 overflow-hidden rounded-lg md:w-1/3">
//               <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
//               <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                 <h3 className="text-2xl font-bold text-white">{category.name}</h3>
//               </div>
//             </div>

//             <div className="md:w-2/3">
//               <p className="mb-4 text-gray-600">{category.description}</p>
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                 {category.laptops.map((laptop) => (
//                   <Link key={laptop.id} href={`/laptops/${laptop.id}`} className="group">
//                     <div className="overflow-hidden transition-all duration-200 bg-gray-50 border rounded-lg group-hover:shadow-md">
//                       <div className="relative h-32">
//                         <Image
//                           src={laptop.image || "/placeholder.svg"}
//                           alt={laptop.name}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div className="p-3">
//                         <h4 className="text-sm font-medium">{laptop.name}</h4>
//                         <p className="text-sm font-bold text-gray-900">{laptop.price}</p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
