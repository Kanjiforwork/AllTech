"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getArticleById } from "@/data/articles"
import { Article } from "@/types/article"
import ScrollToTop from "@/components/news/scroll-to-top"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // Here we're simulating a fetch with a timeout
    setTimeout(() => {
      const fetchedArticle = getArticleById(params.id as string)
      setArticle(fetchedArticle || null)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">Loading article...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="mb-4">Article not found</p>
        <Button onClick={() => router.push('/news')}>Back to News</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="text-white" 
            onClick={() => router.push('/news')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image 
              src={article.image} 
              alt={article.title} 
              fill 
              priority
              className="object-cover"
              onError={(e) => {
                // Fallback to a default image if the src fails to load
                const imgElement = e.currentTarget as HTMLImageElement;
                imgElement.src = "/placeholder.svg";
              }}
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-blue-600 px-3 py-1 text-xs text-white rounded-full">
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center mb-6 text-gray-600 text-sm border-b border-gray-200 pb-6">
              <div className="flex items-center mr-6">
                <User className="w-4 h-4 mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p>` }}
            />
            
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              
              <Link
                href="/news"
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
              >
                View more articles
              </Link>
            </div>
          </div>
        </article>
      </main>
      
      <footer className="bg-gray-900 text-white py-5">
        <div className="text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} LapInsight. Made by 4Sheep.
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  )
} 