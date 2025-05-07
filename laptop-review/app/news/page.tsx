"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import NewsHeader from "../../components/news/news-header"
import FeaturedArticle from "../../components/news/featured-article"
import ArticleGrid from "../../components/news/article-grid"
import NewsCategories from "../../components/news/news-categories"
import NewsletterSignup from "../../components/news/newsletter-signup"
import TrendingArticles from "../../components/news/trending-articles"

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    // Implement search logic here
    console.log(`Searching for: ${searchQuery}`)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    // Could filter articles by category here
  }

  const handleArticleClick = (articleId: string) => {
    router.push(`/news/${articleId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NewsHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="mb-12">
          <h1 className="mb-6 text-3xl font-bold">Latest News & Articles</h1>
          <FeaturedArticle />
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <NewsCategories 
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
              <div className="mt-8">
                <TrendingArticles />
              </div>
              <div className="mt-8">
                <NewsletterSignup />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <ArticleGrid selectedCategory={selectedCategory} onArticleClick={handleArticleClick} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-5">
        <div className="text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} LapInsight. Made by 4Sheep.
        </div>
      </footer>
    </div>
  )
} 