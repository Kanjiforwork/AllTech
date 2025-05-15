"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock } from "lucide-react"
import { getFeaturedArticle } from "@/data/articles"
import { Article } from "@/types/article"

export default function FeaturedArticle() {
  // Get the featured article from our data
  const featuredArticle = getFeaturedArticle()

  if (!featuredArticle) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative h-[400px] w-full">
        <Image 
          src={featuredArticle.image} 
          alt={featuredArticle.title} 
          fill 
          className="object-cover" 
          priority
          onError={(e) => {
            // Fallback to a default image if the src fails to load
            const imgElement = e.currentTarget as HTMLImageElement;
            imgElement.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {featuredArticle.categories?.map(category => (
              <span key={category} className="bg-blue-600 px-2 py-1 text-xs rounded-full">
                {category}
              </span>
            ))}
          </div>
          
          <h2 className="text-3xl font-bold mb-3">{featuredArticle.title}</h2>
          <p className="text-gray-200 mb-4 max-w-3xl">{featuredArticle.excerpt}</p>
          
          <div className="flex items-center mb-4 text-gray-300 text-sm">
            <div className="flex items-center mr-4">
              <User className="w-4 h-4 mr-1" />
              <span>{featuredArticle.author}</span>
            </div>
            <div className="flex items-center mr-4">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{featuredArticle.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{featuredArticle.readTime}</span>
            </div>
          </div>
          
          <Link
            href={`/news/${featuredArticle.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            Read Full Article
          </Link>
        </div>
      </div>
    </div>
  )
} 