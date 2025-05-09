"use client"

import { useRef, useEffect } from "react";
import Image from "next/image";
import { X, Calendar, User, Clock, Share2, Bookmark, ThumbsUp } from "lucide-react";

interface NewsItem {
  id?: string;
  title: string;
  image: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsItem: NewsItem | null;
}

export default function NewsModal({ isOpen, onClose, newsItem }: NewsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // Handle scroll locking when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Format HTML content with proper styling
  useEffect(() => {
    if (isOpen && contentRef.current && newsItem?.content) {
      // Format paragraphs for better readability
      const paragraphs = contentRef.current.querySelectorAll('p');
      paragraphs.forEach(p => {
        p.classList.add('mb-5', 'text-gray-700', 'leading-relaxed');
      });
      
      // Style headings
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4');
      headings.forEach(heading => {
        heading.classList.add('font-bold', 'mb-4', 'mt-6', 'text-gray-900');
      });
      
      // Style lists
      const lists = contentRef.current.querySelectorAll('ul, ol');
      lists.forEach(list => {
        list.classList.add('ml-5', 'mb-5');
        const items = list.querySelectorAll('li');
        items.forEach(item => {
          item.classList.add('mb-2');
        });
      });
    }
  }, [isOpen, newsItem]);

  if (!isOpen || !newsItem) return null;

  const formatContent = (content: string) => {
    // Add formatting for numbered lists (1. Item)
    let formattedContent = content.replace(/(\d+\.\s)([^\n]+)/g, '<li>$2</li>');
    
    // Add formatting for bullet points (- Item or * Item)
    formattedContent = formattedContent.replace(/[-*]\s([^\n]+)/g, '<li>$1</li>');
    
    // Wrap groups of <li> elements in <ul> or <ol>
    formattedContent = formattedContent.replace(/(<li>.*?<\/li>)+/g, (match) => {
      if (match.includes('1.')) {
        return `<ol class="list-decimal ml-5 mb-5">${match}</ol>`;
      }
      return `<ul class="list-disc ml-5 mb-5">${match}</ul>`;
    });
    
    // Add formatting for bold text
    formattedContent = formattedContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Add formatting for headings
    formattedContent = formattedContent.replace(/^(#{1,6})\s+(.+)$/gm, (_, hashes, text) => {
      const level = hashes.length;
      return `<h${level} class="text-${level === 1 ? '2xl' : level === 2 ? 'xl' : 'lg'} font-bold my-4">${text}</h${level}>`;
    });
    
    // Wrap paragraphs
    formattedContent = formattedContent.replace(/(?<!(^|>))(^|<\/[^>]+>)([^<]+)(?!(<|$))/g, '$2<p class="mb-5">$3</p>');
    
    return formattedContent;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-auto animate-scale-in"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-gray-100 z-10 transition-all duration-200 shadow-md"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header image */}
        <div className="relative h-80 w-full bg-gray-100">
          <Image
            src={newsItem.image}
            alt={newsItem.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
              LATEST NEWS
            </div>
            <h2 className="text-3xl font-bold mb-2 leading-tight">{newsItem.title}</h2>
            
            <div className="flex items-center text-gray-300 text-sm mt-4">
              <div className="flex items-center mr-6">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">{newsItem.author}</span>
              </div>
              <div className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{newsItem.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{newsItem.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social sharing and actions */}
        <div className="flex items-center justify-between border-b border-gray-200 px-8 py-4">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <Share2 className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Share</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <Bookmark className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Save</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <ThumbsUp className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">42</span>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-8 py-6">
          <p className="text-xl font-medium text-gray-700 mb-6 leading-relaxed">
            {newsItem.excerpt}
          </p>
          
          <div 
            ref={contentRef}
            className="prose prose-lg max-w-none news-content"
            dangerouslySetInnerHTML={{ 
              __html: newsItem.content ? formatContent(newsItem.content) : `<p>${newsItem.excerpt}</p>` 
            }}
          />
          
          {/* Related content */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden border border-gray-200 flex">
                <div className="relative w-24 h-20">
                  <Image
                    src="/news/news2.jpg"
                    alt="Related news"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm line-clamp-2">Framework Laptop 16 Redefines Modular Computing</h4>
                  <p className="text-xs text-gray-500 mt-1">7 min read</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200 flex">
                <div className="relative w-24 h-20">
                  <Image
                    src="/news/news3.jpg"
                    alt="Related news"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm line-clamp-2">Windows 12 Launch Sparks New Era of AI-Powered Laptops</h4>
                  <p className="text-xs text-gray-500 mt-1">8 min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 rounded-b-lg">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/authors/author-placeholder.jpg"
                alt={newsItem.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold">{newsItem.author}</h4>
              <p className="text-sm text-gray-600">Technology Reporter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}