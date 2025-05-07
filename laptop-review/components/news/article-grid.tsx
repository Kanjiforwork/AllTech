"use client"

import Image from "next/image"
import { Calendar, User, Clock } from "lucide-react"
import { getArticlesByCategory } from "@/data/articles"
import { Article } from "@/types/article"

interface ArticleGridProps {
  selectedCategory: string
  onArticleClick: (id: string) => void
}

export default function ArticleGrid({ selectedCategory, onArticleClick }: ArticleGridProps) {
  // Get articles by selected category
  const filteredArticles = getArticlesByCategory(selectedCategory)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        {selectedCategory === "all" ? "All Articles" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div 
              key={article.id}
              onClick={() => onArticleClick(article.id)}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 w-full">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to a default image if the src fails to load
                    const imgElement = e.currentTarget as HTMLImageElement;
                    imgElement.src = "/placeholder.svg";
                  }}
                />
              </div>
              
              <div className="p-4">
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full mb-2">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
                
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                
                <div className="flex items-center text-xs text-gray-500">
                  <div className="flex items-center mr-3">
                    <User className="w-3 h-3 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center mr-3">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-gray-500">
            No articles found in this category.
          </div>
        )}
      </div>
    </div>
  )
} 