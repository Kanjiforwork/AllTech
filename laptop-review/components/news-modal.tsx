"use client"

import { useRef, useEffect } from "react";
import Image from "next/image";
import { X, Calendar, User, Clock } from "lucide-react";

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

  if (!isOpen || !newsItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-auto animate-scale-in"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-gray-100 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header image */}
        <div className="relative h-72 w-full">
          <Image
            src={newsItem.image}
            alt={newsItem.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{newsItem.title}</h2>
            
            <div className="flex items-center text-gray-300 text-sm">
              <div className="flex items-center mr-4">
                <User className="w-4 h-4 mr-1" />
                <span>{newsItem.author}</span>
              </div>
              <div className="flex items-center mr-4">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{newsItem.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{newsItem.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <p className="text-lg font-semibold text-gray-700 mb-6">
            {newsItem.excerpt}
          </p>
          
          <div className="prose max-w-none">
            {newsItem.content ? (
              <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            ) : (
              <p className="text-gray-600">{newsItem.excerpt}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}