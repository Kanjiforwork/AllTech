import { useMemo } from "react"
import ComparisonBarChart, { type ComparisonItem } from "./ComparisonBarChart"

export interface BatteryComparisonItem {
  id: string
  name: string
  subtitle?: string
  batteryCapacity: number // Wh
  batteryLife: {
    hours: number
    minutes: number
  }
}

interface BatteryComparisonChartProps {
  title?: string
  items: BatteryComparisonItem[]
  enableSorting?: boolean
}

// Constants to avoid magic numbers
const MAX_BATTERY_LIFE_MINUTES = 720 // 12 hours
const MAX_BATTERY_CAPACITY = 100 // Wh

// Map single item to ComparisonItem
function mapToComparisonItem(item: BatteryComparisonItem): ComparisonItem {
  const totalMinutes = item.batteryLife.hours * 60 + item.batteryLife.minutes

  return {
    id: item.id,
    name: item.name,
    subtitle: item.subtitle,
    metrics: {
      batteryLife: {
        value: totalMinutes,
        unit: " phút",
        displayValue: `${totalMinutes} phút`,
        percentage: Math.min((totalMinutes / MAX_BATTERY_LIFE_MINUTES) * 100, 100),
        color: "#ff4d94",
      },
      batteryCapacity: {
        value: item.batteryCapacity,
        unit: " Wh",
        displayValue: `${item.batteryCapacity} Wh`,
        percentage: Math.min((item.batteryCapacity / MAX_BATTERY_CAPACITY) * 100, 100),
        color: "#8b5cf6",
      },
    },
  }
}

export default function BatteryComparisonChart({
  title = "So sánh thời gian dùng pin",
  items,
  enableSorting = true,
}: BatteryComparisonChartProps) {
  const transformedItems = useMemo(() => items.map(mapToComparisonItem), [items])

  return (
    <ComparisonBarChart
      title={title}
      items={transformedItems}
      metrics={[
        {
          id: "batteryLife",
          label: "Thời gian sử dụng thực tế",
          color: "#ff4d94",
          unit: " phút",
          maxValue: MAX_BATTERY_LIFE_MINUTES,
        },
        {
          id: "batteryCapacity",
          label: "Dung lượng pin (Wh)",
          color: "#8b5cf6",
          unit: " Wh",
          maxValue: MAX_BATTERY_CAPACITY,
        },
      ]}
      sortOptions={{
        enabled: enableSorting,
        defaultMetric: "batteryLife",
        defaultOrder: "desc",
      }}
    />
  )
}
