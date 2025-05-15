"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <footer className="py-8 text-white bg-gray-900 dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">LapInsight</h3>
              <p className="text-sm text-gray-400">
                Your trusted source for laptop reviews and comparisons since 2025.
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
                  className="w-full px-3 py-2 text-sm text-black bg-white rounded-l-md focus:outline-none dark:bg-gray-800 dark:text-white"
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-r-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 text-sm text-center text-gray-400 border-t border-gray-800">
            &copy; {new Date().getFullYear()} LapInsight. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Nút quay lại đầu trang */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed p-3 text-white bg-gray-800 rounded-full shadow-lg bottom-6 right-6 hover:bg-gray-700 transition-all duration-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Quay lại đầu trang"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  )
} 