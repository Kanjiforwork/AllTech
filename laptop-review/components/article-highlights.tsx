"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { articleService } from "../services/firebaseServices"

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
  const articlesRef = useRef<HTMLDivElement>(null);

  // Fetch articles from Firestore
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await articleService.getLatest(3);
        setArticles(fetchedArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3" ref={articlesRef}>
      {articles.map((article) => (
        <Link 
          key={article.id} 
          href={`/articles/${article.id}`} 
          className="group article-card opacity-0"
        >
          <div className="overflow-hidden transition-all duration-200 bg-white border rounded-lg shadow-sm group-hover:shadow-md hover-lift">
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
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}