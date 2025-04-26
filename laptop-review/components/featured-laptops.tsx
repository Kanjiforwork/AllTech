
// change featured laptops to news section

"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock } from "lucide-react"

export default function FeaturedLaptops() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [isAnimated, setIsAnimated] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const newsItems = [
    {
      id: 1,
      title: "Latest Laptop Trends in 2025",
      image: "/placeholder.svg",
      excerpt: "Discover breakthrough laptop technologies and the newest trends in the current market.",
      author: "Nam Binh",
      date: "04/20/2025",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Performance Comparison: M3 Chip vs Intel Gen 13",
      image: "/placeholder.svg",
      excerpt: "Detailed analysis of performance, temperature, and battery life between the two most popular chip architectures.",
      author: "Binh Nam",
      date: "04/18/2025",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Top 10 Best Laptops for Students in 2025",
      image: "/placeholder.svg",
      excerpt: "A list of the best value laptops for studying, research, and entertainment.",
      author: "A Guy Named Binh",
      date: "04/15/2025",
      readTime: "6 min read"
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1))
  }

  // Handle drag events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - startX
    const containerWidth = sliderRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.2 
    
    const maxTranslate = containerWidth * 0.25
    const clampedDelta = Math.max(Math.min(deltaX, maxTranslate), -maxTranslate)
    
    setTranslateX(clampedDelta)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - startX
    const containerWidth = sliderRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.2 
    
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

  // Auto-rotating slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

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

  // Add entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className={`relative transition-opacity duration-700 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className="overflow-hidden rounded-xl"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
            transitionProperty: isDragging ? 'none' : 'transform'
          }}
        >
          {newsItems.map((item) => (
            <div key={item.id} className="relative w-full flex-shrink-0">
              <div className="relative h-[400px] w-full bg-gray-200">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                  <p className="mb-4 text-gray-200 line-clamp-2 max-w-3xl">{item.excerpt}</p>
                  
                  <div className="flex items-center mb-4 text-gray-300 text-sm">
                    <div className="flex items-center mr-4">
                      <User className="w-4 h-4 mr-1" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {newsItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-white scale-125" 
                : "bg-white/50 scale-100"
            }`}
          />
        ))}
      </div>
    </div>
  )
}




//maybe use these later for different page

// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// export default function FeaturedLaptops() {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   const featuredLaptops = [
//     {
//       id: 1,
//       name: "MacBook Pro 16",
//       image: "/placeholder.svg",
//       description: "M3 Max, 32GB RAM, 1TB SSD",
//       price: "$2,999",
//       rating: 4.9,
//       reviews: 245,
//     },
//     {
//       id: 2,
//       name: "Dell XPS 15",
//       image: "/placeholder.svg",
//       description: "Intel Core i9, 32GB RAM, 1TB SSD",
//       price: "$2,199",
//       rating: 4.7,
//       reviews: 189,
//     },
//     {
//       id: 3,
//       name: "ASUS ROG Zephyrus",
//       image: "/placeholder.svg",
//       description: "AMD Ryzen 9, RTX 4080, 32GB RAM",
//       price: "$2,499",
//       rating: 4.8,
//       reviews: 156,
//     },
//   ]

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === featuredLaptops.length - 1 ? 0 : prev + 1))
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? featuredLaptops.length - 1 : prev - 1))
//   }

//   return (
//     <div className="relative">
//       <div className="overflow-hidden rounded-xl">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         >
//           {featuredLaptops.map((laptop) => (
//             <div key={laptop.id} className="relative w-full flex-shrink-0">
//               <div className="relative h-[400px] w-full bg-gray-200">
//                 <Image src={laptop.image || "/placeholder.svg"} alt={laptop.name} fill className="object-cover" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                 <div className="absolute bottom-0 left-0 p-6 text-white">
//                   <h3 className="mb-2 text-2xl font-bold">{laptop.name}</h3>
//                   <p className="mb-2 text-gray-200">{laptop.description}</p>
//                   <div className="flex items-center mb-4">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <svg
//                           key={i}
//                           className={`w-5 h-5 ${i < Math.floor(laptop.rating) ? "text-yellow-400" : "text-gray-400"}`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-2 text-sm">
//                       {laptop.rating} ({laptop.reviews} reviews)
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xl font-bold">{laptop.price}</span>
//                     <Link
//                       href={`/laptops/${laptop.id}`}
//                       className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>

//       <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
//         {featuredLaptops.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
