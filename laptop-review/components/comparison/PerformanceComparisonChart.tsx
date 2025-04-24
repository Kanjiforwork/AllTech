import ComparisonBarChart, { type ComparisonItem } from "./ComparisonBarChart"

export interface PerformanceComparisonItem {
  id: string
  name: string
  subtitle?: string
  cpuScore: number
  gpuScore: number
}

interface PerformanceComparisonChartProps {
  title?: string
  items: PerformanceComparisonItem[]
  enableSorting?: boolean
  maxCpuScore?: number
  maxGpuScore?: number
}

export default function PerformanceComparisonChart({
  title = "So sánh hiệu năng",
  items,
  enableSorting = true,
  maxCpuScore = 20000,
  maxGpuScore = 15000,
}: PerformanceComparisonChartProps) {
  // Transform the data for the generic comparison chart
  const transformedItems: ComparisonItem[] = items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      subtitle: item.subtitle,
      metrics: {
        cpuScore: {
          value: item.cpuScore,
          unit: " điểm",
          percentage: Math.min((item.cpuScore / maxCpuScore) * 100, 100),
          color: "#22c55e",
        },
        gpuScore: {
          value: item.gpuScore,
          unit: " điểm",
          percentage: Math.min((item.gpuScore / maxGpuScore) * 100, 100),
          color: "#3b82f6",
        },
      },
    }
  })

  return (
    <ComparisonBarChart
      title={title}
      items={transformedItems}
      metrics={[
        {
          id: "cpuScore",
          label: "Điểm CPU (Geekbench Multi-core)",
          color: "#22c55e",
          unit: " điểm",
          maxValue: maxCpuScore,
        },
        {
          id: "gpuScore",
          label: "Điểm GPU (3DMark)",
          color: "#3b82f6",
          unit: " điểm",
          maxValue: maxGpuScore,
        },
      ]}
      sortOptions={{
        enabled: enableSorting,
        defaultMetric: "cpuScore",
        defaultOrder: "desc",
      }}
    />
  )
}
