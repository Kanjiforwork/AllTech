// laptop-review/app/compare/[...slugs]/page.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getLaptopById } from "@/mock_data/data"
import Header from "@/components/common/header"
import RatingBar from "@/components/common/rating-bar"
import ComparisonOverview from "@/components/comparison/ComparisonOverview"
import ImportanceAdjuster from "@/components/comparison/ImportanceAdjuster"
import KeyDifferences from "@/components/comparison/KeyDifferences"
import ComparisonTable from "@/components/comparison/ComparisonTable"
import { getKeyDifferences } from "@/utils/compareUtils"
import BatteryComparisonChart from "@/components/comparison/BatteryComparisonChart"
import PerformanceComparisonChart from "@/components/comparison/PerformanceComparisonChart"


interface ComparisonWeights {
  performance: number
  gaming: number
  display: number
  battery: number
  connectivity: number
  portability: number
}

export default function ComparisonPage() {
  const params = useParams()
  const [laptops, setLaptops] = useState<any[]>([])
  const [weights, setWeights] = useState<ComparisonWeights>({
    performance: 1,
    gaming: 1,
    display: 1,
    battery: 1,
    connectivity: 1,
    portability: 1,
  })

  useEffect(() => {
    if (params.slugs) {
      // Lấy chuỗi cuối cùng từ mảng slugs và tách nó bằng '-vs-'
      const compareString = params.slugs[params.slugs.length - 1]
      const ids = compareString.split("-vs-")
      
      if (ids.length === 2) {
        const laptopData = ids.map((id) => getLaptopById(id)).filter(Boolean)
        if (laptopData.length === 2) {
          setLaptops(laptopData)
        }
      }
    }
  }, [params])

  const keyDifferences = useMemo(() => {
    if (laptops.length < 2) return { laptop1: [], laptop2: [] };
    return getKeyDifferences(laptops);
  }, [laptops]);

  if (laptops.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Unable to Compare Laptops</h1>
            <p className="mb-4">Please make sure you're using the correct URL format:</p>
            <code className="block bg-gray-100 p-2 rounded mb-4">/compare/laptop-id-1-vs-laptop-id-2</code>
            <p className="mb-4">Available laptops for comparison:</p>
            <ul className="space-y-2 mb-4">
              <li>lenovo-ideapad-5-pro-16</li>
              <li>asus-rog-zephyrus-g14</li>
              <li>dell-xps-15</li>
              <li>hp-spectre-x360</li>
              <li>acer-nitro-5</li>
            </ul>
            <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Return to home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // Specs configuration for comparison tables
  const caseSpecs = [
    { label: "Weight", path: "detailedSpecs.case.weight", isHigherBetter: false },
    { label: "Screen-to-Body Ratio", path: "detailedSpecs.case.screenToBodyRatio" },
  ];

  const displaySpecs = [
    { label: "Resolution", path: "detailedSpecs.display.resolution" },
    { label: "Refresh Rate", path: "detailedSpecs.display.refreshRate" },
    { label: "Brightness", path: "detailedSpecs.display.brightness" },
    { label: "Color Gamut (sRGB)", path: "detailedSpecs.display.colorGamut.sRGB" },
  ];

  const performanceSpecs = [
    { label: "Geekbench 6 (Single)", path: "detailedSpecs.cpu.benchmarks.geekbench6Single" },
    { label: "Geekbench 6 (Multi)", path: "detailedSpecs.cpu.benchmarks.geekbench6Multi" },
    { label: "3D Mark Wildlife Extreme", path: "detailedSpecs.gpu.benchmarks.wildlifeExtreme" },
  ];

  const batterySpecs = [
    { label: "Capacity", path: "detailedSpecs.battery.capacity" },
    { label: "Fast Charging", path: "detailedSpecs.battery.fastCharging" },
  ];

  const connectivitySpecs = [
    { label: "Wi-Fi", path: "detailedSpecs.connectivity.wifi" },
    { label: "Bluetooth", path: "detailedSpecs.connectivity.bluetooth" },
    { label: "USB-A Ports", path: "detailedSpecs.connectivity.ports.usba" },
    { label: "USB-C Ports", path: "detailedSpecs.connectivity.ports.usbc" },
    { label: "Thunderbolt", path: "detailedSpecs.connectivity.ports.thunderbolt" },
    { label: "HDMI", path: "detailedSpecs.connectivity.ports.hdmi" },
    { label: "SD Card Reader", path: "detailedSpecs.connectivity.ports.sdCard" },
    { label: "Webcam", path: "detailedSpecs.connectivity.webcam" },
  ];

  const inputSpecs = [
    { label: "Keyboard", path: "detailedSpecs.input.keyboard" },
    { label: "Numpad", path: "detailedSpecs.input.numpad" },
    { label: "Key Travel", path: "detailedSpecs.input.keyTravel" },
    { label: "Touchpad Size", path: "detailedSpecs.input.touchpad.size" },
    { label: "Touchpad Surface", path: "detailedSpecs.input.touchpad.surface" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center">Laptop Comparison</h1>

        {/* Overview Section */}
        <ComparisonOverview laptops={laptops} />

        {/* Key Differences */}
        <KeyDifferences laptops={laptops} keyDifferences={keyDifferences} />

                {/* Battery Comparison Chart */}
                <div className="mb-8">
          <BatteryComparisonChart 
            items={laptops.map(laptop => ({
              id: laptop.id,
              name: laptop.name,
              subtitle: laptop.detailedSpecs.cpu.name,
              batteryCapacity: Number.parseInt(laptop.detailedSpecs.battery.capacity),
              batteryLife: {
                hours: Math.floor(laptop.benchmarks.battery),
                minutes: Math.round((laptop.benchmarks.battery % 1) * 60)
              }
            }))}
          />
        </div>

        {/* Performance Comparison Chart */}
        <div className="mb-8">
          <PerformanceComparisonChart 
            items={laptops.map(laptop => ({
              id: laptop.id,
              name: laptop.name,
              subtitle: laptop.detailedSpecs.cpu.name,
              cpuScore: laptop.detailedSpecs.cpu.benchmarks.geekbench6Multi,
              gpuScore: laptop.detailedSpecs.gpu.benchmarks.wildlifeExtreme
            }))}
          />
        </div>


        {/* Adjust Importance section */}
        <ImportanceAdjuster laptops={laptops} weights={weights} setWeights={setWeights} />

        

        {/* Value for Money */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Value for Money</h2>

          <div className="grid grid-cols-2 gap-8">
            {laptops.map((laptop, index) => (
              <div key={laptop.id} className="text-center">
                <div className="text-2xl font-bold mb-2">{laptop.price}</div>
                <div className="text-lg mb-4">
                  <span className="font-medium">
                    ${(Number.parseInt(laptop.price.replace("$", "").replace(",", "")) / 10).toFixed(2)}
                  </span>{" "}
                  per point
                </div>
                <RatingBar score={laptop.benchmarks.value} label="Value Rating" />
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Detailed Comparison</h2>

          <ComparisonTable laptops={laptops} title="Case" specs={caseSpecs} />
          <ComparisonTable laptops={laptops} title="Display" specs={displaySpecs} />
          <ComparisonTable laptops={laptops} title="Performance" specs={performanceSpecs} />
          <ComparisonTable laptops={laptops} title="Battery" specs={batterySpecs} />
          <ComparisonTable laptops={laptops} title="Connectivity" specs={connectivitySpecs} />
          <ComparisonTable laptops={laptops} title="Input" specs={inputSpecs} />
        </div>

        {/* User Voting */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Which one would you choose?</h2>

          <div className="grid grid-cols-2 gap-8">
            {laptops.map((laptop) => (
              <div key={laptop.id} className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg w-full">
                  Vote for {laptop.name}
                </button>
                <div className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">1,245</span> users voted for this laptop
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">AllTech</h3>
              <p className="text-gray-400">
                Your trusted source for laptop reviews, comparisons, and the best deals online.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Gaming Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Business Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Student Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Budget Laptops
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-2">Subscribe for the latest deals and reviews</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-gray-900 rounded-l focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 AllTech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}