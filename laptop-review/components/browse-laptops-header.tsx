"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Laptop } from "@/data/laptops"



export default function BrowseLaptopsHeader({laptopData, handle}) {
    const [priceDropdownOpen, setPriceDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setPriceDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Add animation on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )

        if (headerRef.current) {
            observer.observe(headerRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])

 
    
    return (
        <div
            ref={headerRef}
            className={`flex flex-col sm:flex-row sm:items-center justify-between mb-8 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
        >
            <h2 className="text-3xl font-bold mb-5 sm:mb-0">Browse Laptops</h2>

            <div className="flex gap-4"> {/* flex-wrap is still removed */}
                <button
                    className="px-6 py-3 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap" // Changed text-base to text-sm and added whitespace-nowrap
                >
                    Huge Sale
                </button>

                <button
                    className="px-6 py-3 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap" // Changed text-base to text-sm and added whitespace-nowrap
                >
                    Most Views
                </button>
                <button
                    className="px-6 py-3 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm transition-all flex items-center whitespace-nowrap" // Changed text-base to text-sm and added whitespace-nowrap
                    onClick={()=> {
                        const cloneLaptopData = laptopData.slice()
                        const newList = cloneLaptopData.sort((a,b)=>  b.salePrice - a.salePrice)
                         handle(newList)
                    }}
                >
                    Price: High to Low
                    <ChevronDown className="w-4 h-4 ml-2" />
                </button>

                <button
                    className="px-6 py-3 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm transition-all flex items-center whitespace-nowrap" // Changed text-base to text-sm and added whitespace-nowrap
                    onClick={()=> {
                        const cloneLaptopData = laptopData.slice()
                        const newList = cloneLaptopData.sort((a,b)=> a.salePrice - b.salePrice)
                         handle(newList)
                    }}
                >
                    Price: Low to High
                    <ChevronUp className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    )
}
