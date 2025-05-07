"use client"

interface NewsCategoriesProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function NewsCategories({ selectedCategory, onSelectCategory }: NewsCategoriesProps) {
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "tech", name: "Tech News" },
    { id: "reviews", name: "Reviews" },
    { id: "guides", name: "Buying Guides" },
    { id: "trends", name: "Trends" },
    { id: "tutorials", name: "Tutorials" }
  ]

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Categories</h3>
      
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category.id
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
} 