import Image from "next/image"
import Link from "next/link"

export default function ArticleHighlights() {
  const articles = [
    {
      id: 1,
      title: "Top 5 Laptops for 2025",
      excerpt: "Our experts have tested dozens of laptops to bring you the absolute best options for this year.",
      image: "/placeholder.svg",
      category: "Guides",
      date: "April 15, 2025",
    },
    {
      id: 2,
      title: "Gaming vs. Ultrabook: Which One Is Right For You?",
      excerpt: "Confused between power and portability? We break down the key differences to help you decide.",
      image: "/placeholder.svg",
      category: "Comparisons",
      date: "April 10, 2025",
    },
    {
      id: 3,
      title: "The Future of Laptop Technology: What to Expect",
      excerpt: "From foldable screens to AI processors, here's what the next generation of laptops might look like.",
      image: "/placeholder.svg",
      category: "Technology",
      date: "April 5, 2025",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {articles.map((article) => (
        <Link key={article.id} href={`/articles/${article.id}`} className="group">
          <div className="overflow-hidden transition-all duration-200 bg-white border rounded-lg shadow-sm group-hover:shadow-md">
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
