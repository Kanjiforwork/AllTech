"use client"

import Image from "next/image"
import Link from "next/link"
import { getTrendingArticles } from "@/data/articles"
import { Article } from "@/types/article"

export default function TrendingArticles() {
  // Get trending articles from our data
  const trendingArticles = getTrendingArticles()

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Trending Articles</h3>
      
      <div className="space-y-4">
        {trendingArticles.map((article) => (
          <Link 
            key={article.id} 
            href={`/news/${article.id}`}
            className="flex items-center group"
          >
            <div className="relative h-14 w-14 flex-shrink-0 rounded-md overflow-hidden">
              <Image 
                src={article.image} 
                alt={article.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to a default image if the src fails to load
                  const imgElement = e.currentTarget as HTMLImageElement;
                  imgElement.src = "/placeholder.svg";
                }}
              />
            </div>
            
            <div className="ml-3 flex-1">
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{article.views} views</p>
            </div>
          </Link>
        ))}
      </div>
      
      <Link 
        href="/news/trending" 
        className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
      >
        View all trending
      </Link>
    </div>
  )
} 