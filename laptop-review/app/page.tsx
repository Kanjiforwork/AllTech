"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { SearchIcon, Heart } from "lucide-react"
import { laptopData } from "@/data/laptops";


import FeaturedLaptops from "@/components/featured-laptops"
import ArticleHighlights from "@/components/article-highlights"
import FilterPanel from "@/components/filter-panel"
//import ComparisonTool from "@/components/comparison-tool"
import RecommendedSection from "@/components/recommended-section"
//import FavoritesSection from "@/components/favorites-section"
//import ReviewsSection from "@/components/reviews-section"
import NotificationBell from "@/components/notification-bell"
import BrowseLaptopsHeader from "@/components/browse-laptops-header"


export default function Home() {
  // State to track which laptop cards are visible
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(laptopData.length).fill(false))
  // Ref for the laptop grid container
  const laptopGridRef = useRef<HTMLDivElement>(null)

  // Animation for laptop cards using Intersection Observer
  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container flex items-center h-16 px-4 mx-auto">
          {/* Logo và Danh mục */}
          <div className="flex items-center space-x-8 mr-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/placeholder.svg" alt="TechReview Logo" width={40} height={40} className="rounded" />
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
            <Link href="/#compare" className="flex items-center text-sm font-bold hover:text-gray-700">
              So sánh
            </Link>
            <Link href="/#favorites" className="flex items-center text-sm font-bold hover:text-gray-700">
              <Heart className="w-5 h-5 mr-1" />
              <span>Yêu thích</span>
            </Link>

            <NotificationBell />
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
            >
              Login / Register
            </Link>
          </div>
        </div>
      </header>

      {/* phần này đã đổi thành News */}
      <main className="container px-4 py-8 mx-auto">
        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold"></h2>
          <FeaturedLaptops />
        </section>

        {/* Recommended Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Recommended For You</h2>
          <RecommendedSection />
        </section>

        {/* Filter and Results */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <FilterPanel />
          </div>
          <div className="lg:col-span-3 relative z-0">
            <BrowseLaptopsHeader />
            {/* Laptop Grid with animation */}
            <div 
              ref={laptopGridRef} 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-0"
            >
              {laptopData.map((laptop, index) => (
                <div 
                  key={laptop.id} 
                  className={`overflow-hidden bg-white border rounded-lg shadow-sm transition-all duration-500 ease-in-out ${
                    visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } hover:shadow-md hover:-translate-y-1`}
                >
                  <div className="p-4">
                    <div className="w-full h-40 mb-4 overflow-hidden bg-gray-200 rounded-md"></div>
                    <h3 className="mb-2 text-lg font-medium">{laptop.name}</h3>
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{laptop.rating} ({laptop.reviews} reviews)</span>
                    </div>
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
                        <button className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          Compare
                        </button>
                        <button className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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