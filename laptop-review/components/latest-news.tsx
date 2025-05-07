"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock } from "lucide-react"
import { newsService } from "../services/firebaseServices"

export default function LatestNews() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [isAnimated, setIsAnimated] = useState(false)
  const sliderRef = useRef(null)

  // Fetch news items from Firestore
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedNews = await newsService.getLatest(3);
        setNewsItems(fetchedNews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1))
  }

  // Handle drag events
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - startX
    const containerWidth = sliderRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.2 
    
    const maxTranslate = containerWidth * 0.25
    const clampedDelta = Math.max(Math.min(deltaX, maxTranslate), -maxTranslate)
    
    setTranslateX(clampedDelta)
  }

  const handleMouseUp = (e) => {
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
    if (newsItems.length === 0) return; // Don't start the interval if no news items
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide, newsItems.length]);

  useEffect(() => {
    const preventDefault = (e) => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-xl animate-pulse">
        <p className="text-gray-500">Loading news...</p>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-xl">
        <p className="text-gray-500">No news available at the moment.</p>
      </div>
    );
  }

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