import type React from "react"
import Image from "next/image"
import Link from "next/link"

// Define proper types for the data
interface Laptop {
  id: number
  name: string
  image: string
  price: string
}

interface Category {
  id: number
  name: string
  description: string
  image: string
  laptops: Laptop[]
}

export default function RecommendedSection(): React.ReactNode {
  const categories: Category[] = [
    {
      id: 1,
      name: "For Students",
      description: "Lightweight, long battery life, affordable",
      image: "/placeholder.svg",
      laptops: [
        {
          id: 101,
          name: "MacBook Air M3",
          image: "/placeholder.svg",
          price: "$999",
        },
        {
          id: 102,
          name: "Dell XPS 13",
          image: "/placeholder.svg",
          price: "$899",
        },
        {
          id: 103,
          name: "Lenovo ThinkPad X1 Carbon",
          image: "/placeholder.svg",
          price: "$1,199",
        },
      ],
    },
    {
      id: 2,
      name: "For Gaming",
      description: "Powerful GPUs, high refresh rate displays, advanced cooling",
      image: "/placeholder.svg",
      laptops: [
        {
          id: 201,
          name: "ASUS ROG Strix G15",
          image: "/placeholder.svg",
          price: "$1,499",
        },
        {
          id: 202,
          name: "Razer Blade 15",
          image: "/placeholder.svg",
          price: "$1,999",
        },
        {
          id: 203,
          name: "MSI GE76 Raider",
          image: "/placeholder.svg",
          price: "$2,299",
        },
      ],
    },
    {
      id: 3,
      name: "For Professionals",
      description: "Color-accurate displays, powerful CPUs, reliable performance",
      image: "/placeholder.svg",
      laptops: [
        {
          id: 301,
          name: "MacBook Pro 14",
          image: "/placeholder.svg",
          price: "$1,999",
        },
        {
          id: 302,
          name: "Dell Precision 5570",
          image: "/placeholder.svg",
          price: "$2,399",
        },
        {
          id: 303,
          name: "HP ZBook Studio G9",
          image: "/placeholder.svg",
          price: "$2,499",
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.id} className="p-6 bg-white border rounded-lg shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative w-full h-48 overflow-hidden rounded-lg md:w-1/3">
              <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>
            </div>

            <div className="md:w-2/3">
              <p className="mb-4 text-gray-600">{category.description}</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {category.laptops.map((laptop) => (
                  <Link key={laptop.id} href={`/laptops/${laptop.id}`} className="group">
                    <div className="overflow-hidden transition-all duration-200 bg-gray-50 border rounded-lg group-hover:shadow-md">
                      <div className="relative h-32">
                        <Image
                          src={laptop.image || "/placeholder.svg"}
                          alt={laptop.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-medium">{laptop.name}</h4>
                        <p className="text-sm font-bold text-gray-900">{laptop.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
