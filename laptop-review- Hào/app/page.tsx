"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import FeaturedLaptops from "@/components/featured-laptops"
import ArticleHighlights from "@/components/article-highlights"
import FilterPanel from "@/components/filter-panel"
import ComparisonTool from "@/components/comparison-tool"
import RecommendedSection from "@/components/recommended-section"
import FavoritesSection from "@/components/favorites-section"
import ReviewsSection from "@/components/reviews-section"
import NotificationBell from "@/components/notification-bell"
type User = {
  username: string;
  email: string;
};
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin người dùng và chuyển về trang đăng nhập
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg" alt="TechReview Logo" width={40} height={40} className="rounded" />
            <span className="text-xl font-bold">TechReview</span>
          </Link>

          <div className="relative hidden md:block w-1/3">
            <input
              type="text"
              placeholder="Search laptops..."
              className="w-full h-10 pl-10 pr-4 text-sm bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <SearchIcon className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          </div>

          <div className="flex items-center space-x-4">
          <NotificationBell />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                >
                  <img
                    src="/google-icon.svg" // Thay bằng avatar của người dùng nếu có
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 w-48 p-2 mt-2 bg-white border rounded-lg shadow-lg">
                    <p className="mb-2 text-sm font-medium text-gray-700">{user?.username}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Featured Laptops</h2>
          <FeaturedLaptops />
        </section>

        {/* Article Highlights */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Latest Articles</h2>
          <ArticleHighlights />
        </section>

        {/* Filter and Results */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <FilterPanel />
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold">Browse Laptops</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Placeholder for filtered laptops */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden bg-white border rounded-lg shadow-sm">
                  <div className="p-4">
                    <div className="w-full h-40 mb-4 overflow-hidden bg-gray-200 rounded-md"></div>
                    <h3 className="mb-2 text-lg font-medium">Laptop Model {i + 1}</h3>
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">4.5 (120 reviews)</span>
                    </div>
                    <p className="mb-4 text-sm text-gray-600">Intel Core i7, 16GB RAM, 512GB SSD</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">$1,299</span>
                      <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Tool */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Compare Laptops</h2>
          <ComparisonTool />
        </section>

        {/* Recommended Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Recommended For You</h2>
          <RecommendedSection />
        </section>

        {/* Favorites Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Your Favorites</h2>
          <FavoritesSection />
        </section>

        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Latest Reviews</h2>
          <ReviewsSection />
        </section>
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
