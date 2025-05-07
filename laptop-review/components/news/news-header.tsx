"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NewsHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (event: React.FormEvent) => void
}

export default function NewsHeader({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch 
}: NewsHeaderProps) {
  return (
    <div className="bg-gray-900 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">
            <Link href="/news">
              LapInsight News
            </Link>
          </h1>
          
          <div className="flex w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button type="submit" variant="secondary">
                Search
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-6 text-sm text-gray-300">
          <Link href="/news/tech" className="hover:text-white transition-colors">
            Tech News
          </Link>
          <Link href="/news/reviews" className="hover:text-white transition-colors">
            Reviews
          </Link>
          <Link href="/news/guides" className="hover:text-white transition-colors">
            Buying Guides
          </Link>
          <Link href="/news/trends" className="hover:text-white transition-colors">
            Trends
          </Link>
        </div>
      </div>
    </div>
  )
} 