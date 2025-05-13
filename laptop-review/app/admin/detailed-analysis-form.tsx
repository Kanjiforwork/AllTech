"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"


interface BenchmarkData {
  overallRating: number
  cpuBenchmarks: {
    geekbenchSingle: string
    geekbenchMulti: string
    cinebenchR23Single: string
    cinebenchR23Multi: string
  }
  gpuBenchmarks: {
    timeSpyGraphics: string
    wildlifeExtreme: string
    geekbenchCompute: string
  }
  pluggedPerformance: {
    gb6Single: string
    gb6Multi: string
    cinebenchR23Single: string
    cinebenchR23Multi: string
  }
  unplugged: {
    gb6Single: string
    gb6Multi: string
    cinebenchR23Single: string
    cinebenchR23Multi: string
  }
  performanceSummary: string
}

export default function DetailedAnalysisForm() {
  const [formData, setFormData] = useState<BenchmarkData>({
    overallRating: 8.0,
    cpuBenchmarks: {
      geekbenchSingle: "",
      geekbenchMulti: "",
      cinebenchR23Single: "",
      cinebenchR23Multi: "",
    },
    gpuBenchmarks: {
      timeSpyGraphics: "",
      wildlifeExtreme: "",
      geekbenchCompute: "",
    },
    pluggedPerformance: {
      gb6Single: "",
      gb6Multi: "",
      cinebenchR23Single: "",
      cinebenchR23Multi: "",
    },
    unplugged: {
      gb6Single: "",
      gb6Multi: "",
      cinebenchR23Single: "",
      cinebenchR23Multi: "",
    },
    performanceSummary: "",
  })

  const handleRatingChange = (value: number[]) => {
    setFormData({
      ...formData,
      overallRating: value[0],
    })
  }

  const handleCpuBenchmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      cpuBenchmarks: {
        ...formData.cpuBenchmarks,
        [name]: value,
      },
    })
  }

  const handleGpuBenchmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      gpuBenchmarks: {
        ...formData.gpuBenchmarks,
        [name]: value,
      },
    })
  }

  const handlePluggedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      pluggedPerformance: {
        ...formData.pluggedPerformance,
        [name]: value,
      },
    })
  }

  const handleUnpluggedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      unplugged: {
        ...formData.unplugged,
        [name]: value,
      },
    })
  }

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      performanceSummary: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData)
    alert("Performance data saved successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Performance Rating */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="performance-rating">1. Performance</Label>
                <span className="font-medium">{formData.overallRating.toFixed(1)}/10</span>
              </div>
              <Slider
                id="performance-rating"
                min={0}
                max={10}
                step={0.1}
                value={[formData.overallRating]}
                onValueChange={handleRatingChange}
                className="w-full"
              />
            </div>

            {/* CPU Benchmarks */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">CPU Benchmarks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="geekbenchSingle">Geekbench v6 (Single)</Label>
                  <Input
                    id="geekbenchSingle"
                    name="geekbenchSingle"
                    type="text"
                    placeholder="e.g. 3150"
                    value={formData.cpuBenchmarks.geekbenchSingle}
                    onChange={handleCpuBenchmarkChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="geekbenchMulti">Geekbench v6 (Multi)</Label>
                  <Input
                    id="geekbenchMulti"
                    name="geekbenchMulti"
                    type="text"
                    placeholder="e.g. 15200"
                    value={formData.cpuBenchmarks.geekbenchMulti}
                    onChange={handleCpuBenchmarkChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cinebenchR23Single">Cinebench R23 (Single)</Label>
                  <Input
                    id="cinebenchR23Single"
                    name="cinebenchR23Single"
                    type="text"
                    placeholder="e.g. 1950"
                    value={formData.cpuBenchmarks.cinebenchR23Single}
                    onChange={handleCpuBenchmarkChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cinebenchR23Multi">Cinebench R23 (Multi)</Label>
                  <Input
                    id="cinebenchR23Multi"
                    name="cinebenchR23Multi"
                    type="text"
                    placeholder="e.g. 14800"
                    value={formData.cpuBenchmarks.cinebenchR23Multi}
                    onChange={handleCpuBenchmarkChange}
                  />
                </div>
              </div>
            </div>

            {/* GPU Benchmarks */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">GPU Benchmarks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeSpyGraphics">3DMark Time Spy (Graphics)</Label>
                  <Input
                    id="timeSpyGraphics"
                    name="timeSpyGraphics"
                    type="text"
                    placeholder="e.g. 5876"
                    value={formData.gpuBenchmarks.timeSpyGraphics}
                    onChange={handleGpuBenchmarkChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wildlifeExtreme">3DMark Wildlife Extreme</Label>
                  <Input
                    id="wildlifeExtreme"
                    name="wildlifeExtreme"
                    type="text"
                    placeholder="e.g. 9750"
                    value={formData.gpuBenchmarks.wildlifeExtreme}
                    onChange={handleGpuBenchmarkChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="geekbenchCompute">Geekbench Compute</Label>
                  <Input
                    id="geekbenchCompute"
                    name="geekbenchCompute"
                    type="text"
                    placeholder="e.g. 21345"
                    value={formData.gpuBenchmarks.geekbenchCompute}
                    onChange={handleGpuBenchmarkChange}
                  />
                </div>
              </div>
            </div>

            {/* Performance Comparison */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Performance Comparison: Plugged vs. Unplugged</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plugged In */}
                <div className="space-y-4">
                  <h4 className="font-medium">Plugged In (AC Power)</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="plugged-gb6Single">GB6 Single</Label>
                      <Input
                        id="plugged-gb6Single"
                        name="gb6Single"
                        type="text"
                        placeholder="e.g. 3150"
                        value={formData.pluggedPerformance.gb6Single}
                        onChange={handlePluggedChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plugged-gb6Multi">GB6 Multi</Label>
                      <Input
                        id="plugged-gb6Multi"
                        name="gb6Multi"
                        type="text"
                        placeholder="e.g. 15200"
                        value={formData.pluggedPerformance.gb6Multi}
                        onChange={handlePluggedChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plugged-cinebenchR23Single">Cinebench R23 (Single)</Label>
                      <Input
                        id="plugged-cinebenchR23Single"
                        name="cinebenchR23Single"
                        type="text"
                        placeholder="e.g. 1,532"
                        value={formData.pluggedPerformance.cinebenchR23Single}
                        onChange={handlePluggedChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plugged-cinebenchR23Multi">Cinebench R23 (Multi)</Label>
                      <Input
                        id="plugged-cinebenchR23Multi"
                        name="cinebenchR23Multi"
                        type="text"
                        placeholder="e.g. 12,456"
                        value={formData.pluggedPerformance.cinebenchR23Multi}
                        onChange={handlePluggedChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Unplugged */}
                <div className="space-y-4">
                  <h4 className="font-medium">Unplugged (Battery)</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="unplugged-gb6Single">GB6 Single</Label>
                      <Input
                        id="unplugged-gb6Single"
                        name="gb6Single"
                        type="text"
                        placeholder="e.g. 2123"
                        value={formData.unplugged.gb6Single}
                        onChange={handleUnpluggedChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unplugged-gb6Multi">GB6 Multi</Label>
                      <Input
                        id="unplugged-gb6Multi"
                        name="gb6Multi"
                        type="text"
                        placeholder="e.g. 9654"
                        value={formData.unplugged.gb6Multi}
                        onChange={handleUnpluggedChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unplugged-cinebenchR23Single">Cinebench R23 (Single)</Label>
                      <Input
                        id="unplugged-cinebenchR23Single"
                        name="cinebenchR23Single"
                        type="text"
                        placeholder="e.g. 1,387"
                        value={formData.unplugged.cinebenchR23Single}
                        onChange={handleUnpluggedChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unplugged-cinebenchR23Multi">Cinebench R23 (Multi)</Label>
                      <Input
                        id="unplugged-cinebenchR23Multi"
                        name="cinebenchR23Multi"
                        type="text"
                        placeholder="e.g. 10,212"
                        value={formData.unplugged.cinebenchR23Multi}
                        onChange={handleUnpluggedChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="space-y-2">
              <Label htmlFor="performance-summary">Performance Summary</Label>
              <Textarea
                id="performance-summary"
                placeholder="Describe the overall performance characteristics..."
                value={formData.performanceSummary}
                onChange={handleSummaryChange}
                rows={4}
              />
            </div>

            
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
