"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { articleService } from "../services/firebaseServices"
import NewsModal from "./news-modal"  // We'll reuse the same modal component

// Define the Article interface
interface Article {
  id?: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  date: string;
  createdAt?: any; // Firestore timestamp
}

export default function ArticleHighlights() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const articlesRef = useRef<HTMLDivElement>(null);

  // Fetch articles from Firestore
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await articleService.getLatest(3);
        // Adapt the articles to match the NewsItem interface expected by the modal
        const adaptedArticles = fetchedArticles.map(article => ({
          ...article,
          // Add readTime if it doesn't exist
          readTime: article.readTime || `${Math.floor(Math.random() * 5) + 3} min read`,
          // Add author if it doesn't exist
          author: article.author || 'LapInsight Team'
        }));
        setArticles(adaptedArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Functions to handle modal
  const openArticleModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeArticleModal = () => {
    setIsModalOpen(false);
    // Keep a small delay before clearing the selected news
    // to avoid flickering during modal close animation
    setTimeout(() => {
      setSelectedArticle(null);
    }, 300);
  };

  const handleSelectRelatedArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && articlesRef.current) {
            const articleElements = articlesRef.current.querySelectorAll('.article-card')
            articleElements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('animate-fade-up')
              }, index * 150)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (articlesRef.current) {
      observer.observe(articlesRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [articles]); // Re-run when articles are loaded

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-xl">
        <p className="text-gray-500">No articles available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3" ref={articlesRef}>
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="group article-card opacity-0 cursor-pointer"
            onClick={() => openArticleModal(article)}
          >
            <div className="overflow-hidden transition-all duration-200 bg-white border rounded-lg shadow-sm group-hover:shadow-md hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-0 right-0 px-3 py-1 m-2 text-xs font-medium text-white bg-gray-900 rounded-full">
                  {article.category}
                </div>
              </div>
              <div className="p-4">
                <p className="mb-2 text-sm text-gray-500">{article.date}</p>
                <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-gray-700">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.excerpt}</p>
                <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  Read Article →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Article modal - reusing the NewsModal component */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={closeArticleModal}
        newsItem={selectedArticle}
        relatedNews={articles}
        onSelectRelatedNews={handleSelectRelatedArticle}
      />
    </>
  );
}