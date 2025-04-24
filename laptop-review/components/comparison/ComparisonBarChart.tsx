"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

export interface ComparisonItem {
  id: string
  name: string
  subtitle?: string
  metrics: {
    [key: string]: {
      value: number | string
      unit?: string
      displayValue?: string
      percentage?: number
      color?: string
    }
  }
}

export interface ComparisonBarChartProps {
  title: string
  items: ComparisonItem[]
  metrics: {
    id: string
    label: string
    color: string
    unit?: string
    maxValue?: number
  }[]
  sortOptions?: {
    enabled: boolean
    defaultMetric?: string
    defaultOrder?: "asc" | "desc"
  }
}

export default function ComparisonBarChart({
  title,
  items,
  metrics,
  sortOptions = { enabled: false },
}: ComparisonBarChartProps) {
  const [sortMetric, setSortMetric] = useState<string>(sortOptions.defaultMetric || metrics[0].id)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(sortOptions.defaultOrder || "desc")

  // Sort items based on current sort settings
  const sortedItems = [...items].sort((a, b) => {
    const aValue = a.metrics[sortMetric]?.value || 0
    const bValue = b.metrics[sortMetric]?.value || 0

    // Handle string values
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    // Handle numeric values
    const aNum = typeof aValue === "number" ? aValue : Number.parseFloat(aValue.toString())
    const bNum = typeof bValue === "number" ? bValue : Number.parseFloat(bValue.toString())

    return sortOrder === "asc" ? aNum - bNum : bNum - aNum
  })

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{title}</h3>

        {sortOptions.enabled && (
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Sắp xếp theo</span>
            <select
              value={sortMetric}
              onChange={(e) => setSortMetric(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1"
            >
              {metrics.map((metric) => (
                <option key={metric.id} value={metric.id}>
                  {metric.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setSortOrder("asc")}
              className={`px-3 py-1 rounded ${sortOrder === "asc" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"}`}
            >
              <div className="flex items-center">
                <span>Tăng dần</span>
                <ChevronUp className="w-4 h-4 ml-1" />
              </div>
            </button>

            <button
              onClick={() => setSortOrder("desc")}
              className={`px-3 py-1 rounded ${sortOrder === "desc" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"}`}
            >
              <div className="flex items-center">
                <span>Giảm dần</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {sortedItems.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-baseline">
              <h4 className="text-lg font-bold">{item.name}</h4>
              {item.subtitle && <span className="ml-2 text-sm text-gray-400">{item.subtitle}</span>}
            </div>

            {metrics.map((metric) => {
              const itemMetric = item.metrics[metric.id]
              if (!itemMetric) return null

              const displayValue =
                itemMetric.displayValue || `${itemMetric.value}${itemMetric.unit || metric.unit || ""}`

              // Calculate width percentage
              const percentage =
                itemMetric.percentage !== undefined
                  ? itemMetric.percentage
                  : metric.maxValue
                    ? (Number(itemMetric.value) / metric.maxValue) * 100
                    : 100

              return (
                <div key={metric.id} className="relative h-10">
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: itemMetric.color || metric.color,
                    }}
                  >
                    <div className="flex items-center h-full px-3 text-white font-medium">{displayValue}</div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: metric.color }}></div>
            <span className="text-sm">{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
