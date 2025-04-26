
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
      name: "For Students",
      description: "Lightweight, long battery life, affordable",
      image: "/placeholder.svg",
      laptops: [
        {
          id: 101,
          name: "MacBook Air M3",
          image: "/placeholder.svg",
          price: "$999",
        },
        {
          id: 102,
          name: "Dell XPS 13",
          image: "/placeholder.svg",
          price: "$899",
        },
        {
          id: 103,
          name: "Lenovo ThinkPad X1 Carbon",
          image: "/placeholder.svg",
          price: "$1,199",
        },
      ],
    },
    {
      id: 2,
      name: "For Gaming",
      description: "Powerful GPUs, high refresh rate displays, advanced cooling",
      image: "/placeholder.svg",
      laptops: [
        {
          id: 201,
          name: "ASUS ROG Strix G15",
          image: "/placeholder.svg",
          price: "$1,499",
        },
        {
          id: 202,
          name: "Razer Blade 15",
          image: "/placeholder.svg",
          price: "$1,999",
        },
        {
          id: 203,
          name: "MSI GE76 Raider",
          image: "/placeholder.svg",
          price: "$2,299",
        },
      ],
    },
    {
      id: 3,
      name: "For Professionals",
      description: "Color-accurate displays, powerful CPUs, reliable performance",
      image: "/placeholder.svg",
      laptops: [
        {
          id: 301,
          name: "MacBook Pro 14",
          image: "/placeholder.svg",
          price: "$1,999",
        },
        {
          id: 302,
          name: "Dell Precision 5570",
          image: "/placeholder.svg",
          price: "$2,399",
        },
        {
          id: 303,
          name: "HP ZBook Studio G9",
          image: "/placeholder.svg",
          price: "$2,499",
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
      className="bg-white border rounded-lg shadow-sm p-6"
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
              <div className="bg-white rounded-lg">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="relative w-full h-48 overflow-hidden rounded-lg md:w-1/3">
                    <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <p className="mb-4 text-gray-600">{category.description}</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {category.laptops.map((laptop) => (
                        <Link key={laptop.id} href={`/laptops/${laptop.id}`} className="group">
                          <div className="overflow-hidden transition-all duration-200 bg-gray-50 border rounded-lg group-hover:shadow-md">
                            <div className="relative h-32">
                              <Image
                                src={laptop.image || "/placeholder.svg"}
                                alt={laptop.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="text-sm font-medium">{laptop.name}</h4>
                              <p className="text-sm font-bold text-gray-900">{laptop.price}</p>
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
            className={`h-3 w-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-gray-800" : "bg-gray-300"}`}
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
