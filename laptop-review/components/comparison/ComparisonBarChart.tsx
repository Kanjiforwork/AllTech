"use client"

import { useState } from "react"

export interface ComparisonMetric {
  value: number
  displayValue?: string
  unit?: string
  percentage: number
  color: string
}

export interface ComparisonItem {
  id: string
  name: string
  subtitle?: string
  metrics: {
    [key: string]: ComparisonMetric
  }
}

interface MetricDefinition {
  id: string
  label: string
  color: string
  unit?: string
  maxValue?: number
}

interface SortOptions {
  enabled: boolean
  defaultMetric: string
  defaultOrder: "asc" | "desc"
}

interface ComparisonBarChartProps {
  title: string
  items: ComparisonItem[]
  metrics: MetricDefinition[]
  sortOptions: SortOptions
  theme?: "dark" | "light"
}

export default function ComparisonBarChart({
  title,
  items,
  metrics,
  sortOptions,
  theme = "dark",
}: ComparisonBarChartProps) {
  const [sortMetric, setSortMetric] = useState(sortOptions.defaultMetric)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(sortOptions.defaultOrder)

  // Sort items based on current sort settings
  const sortedItems = [...items].sort((a, b) => {
    const valueA = a.metrics[sortMetric]?.value || 0
    const valueB = b.metrics[sortMetric]?.value || 0
    return sortOrder === "asc" ? valueA - valueB : valueB - valueA
  })

  // Get background color based on theme
  const getBgColor = () => {
    return theme === "dark" ? "bg-gray-800" : "bg-white"
  }

  // Get text color based on theme
  const getTextColor = () => {
    return theme === "dark" ? "text-white" : "text-gray-900"
  }

  // Get secondary text color based on theme
  const getSecondaryTextColor = () => {
    return theme === "dark" ? "text-gray-300" : "text-gray-600"
  }

  // Get border color based on theme
  const getBorderColor = () => {
    return theme === "dark" ? "border-gray-700" : "border-gray-200"
  }

  // Get button background color based on theme
  const getButtonBgColor = () => {
    return theme === "dark" ? "bg-gray-700" : "bg-gray-100"
  }

  // Get button hover background color based on theme
  const getButtonHoverBgColor = () => {
    return theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
  }
  
  // Get progress background color based on theme
  const getProgressBgColor = () => {
    return theme === "dark" ? "bg-gray-600" : "bg-gray-200"
  }

  return (
    <div className={`rounded-lg shadow-sm border ${getBorderColor()} p-6 ${getBgColor()}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className={`text-2xl font-bold ${getTextColor()}`}>{title}</h2>

        {sortOptions.enabled && (
          <div className="flex items-center mt-4 md:mt-0">
            <span className={`mr-2 text-sm ${getSecondaryTextColor()}`}>Sắp xếp theo</span>
            <div className="flex">
              <button
                onClick={() => setSortOrder("asc")}
                className={`px-3 py-1 text-sm rounded-l ${
                  sortOrder === "asc"
                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                    : `${getButtonBgColor()} ${getTextColor()} ${getButtonHoverBgColor()}`
                }`}
              >
                Tăng dần
              </button>
              <button
                onClick={() => setSortOrder("desc")}
                className={`px-3 py-1 text-sm rounded-r ${
                  sortOrder === "desc"
                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                    : `${getButtonBgColor()} ${getTextColor()} ${getButtonHoverBgColor()}`
                }`}
              >
                Giảm dần
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: metric.color }}></div>
            <span className={`text-sm ${getSecondaryTextColor()}`}>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {sortedItems.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className={`font-medium ${getTextColor()}`}>
              {item.name}
              {item.subtitle && (
                <span className={`ml-2 text-sm font-normal ${getSecondaryTextColor()}`}>{item.subtitle}</span>
              )}
            </div>

            {metrics.map((metric) => {
              const metricData = item.metrics[metric.id]
              if (!metricData) return null

              return (
                <div key={metric.id} className="space-y-1">
                  <div className={`relative h-8 ${getProgressBgColor()} rounded-full overflow-hidden`}>
                    <div
                      className="h-full rounded-full flex items-center justify-end px-3"
                      style={{
                        width: `${metricData.percentage}%`,
                        backgroundColor: metricData.color,
                      }}
                    >
                      <span className="text-xs text-white font-medium">
                        {metricData.displayValue || metricData.value}
                        {!metricData.displayValue && metricData.unit}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
