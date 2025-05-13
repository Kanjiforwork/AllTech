"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

export default function DetailedAnalysis() {
  const [performanceRating, setPerformanceRating] = useState(8.0)

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Detailed Analysis</h2>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">1. Performance</h3>
              <span className="font-medium">{performanceRating.toFixed(1)}/10</span>
            </div>
            <Slider
              value={[performanceRating]}
              min={1}
              max={10}
              step={0.1}
              onValueChange={(value) => setPerformanceRating(value[0])}
              className="py-4"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">CPU Benchmarks</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="geekbench-single">Geekbench v6 (Single)</Label>
                <Input id="geekbench-single" placeholder="e.g. 3150" />
              </div>
              <div>
                <Label htmlFor="geekbench-multi">Geekbench v6 (Multi)</Label>
                <Input id="geekbench-multi" placeholder="e.g. 15200" />
              </div>
              <div>
                <Label htmlFor="cinebench-single">Cinebench R23 (Single)</Label>
                <Input id="cinebench-single" placeholder="e.g. 1950" />
              </div>
              <div>
                <Label htmlFor="cinebench-multi">Cinebench R23 (Multi)</Label>
                <Input id="cinebench-multi" placeholder="e.g. 14800" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">GPU Benchmarks</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timespy">3DMark Time Spy (Graphics)</Label>
                <Input id="timespy" placeholder="e.g. 5876" />
              </div>
              <div>
                <Label htmlFor="wildlife">3DMark Wildlife Extreme</Label>
                <Input id="wildlife" placeholder="e.g. 9750" />
              </div>
              <div>
                <Label htmlFor="geekbench-compute">Geekbench Compute</Label>
                <Input id="geekbench-compute" placeholder="e.g. 21345" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Performance Comparison: Plugged vs. Unplugged</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Plugged In (AC Power)</h4>
                <div>
                  <Label htmlFor="plugged-gb6-single">GB6 Single</Label>
                  <Input id="plugged-gb6-single" placeholder="e.g. 3150" />
                </div>
                <div>
                  <Label htmlFor="plugged-gb6-multi">GB6 Multi</Label>
                  <Input id="plugged-gb6-multi" placeholder="e.g. 15200" />
                </div>
                <div>
                  <Label htmlFor="plugged-cinebench-single">Cinebench R23 (Single)</Label>
                  <Input id="plugged-cinebench-single" placeholder="e.g. 1,532" />
                </div>
                <div>
                  <Label htmlFor="plugged-cinebench-multi">Cinebench R23 (Multi)</Label>
                  <Input id="plugged-cinebench-multi" placeholder="e.g. 12,456" />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Unplugged (Battery)</h4>
                <div>
                  <Label htmlFor="unplugged-gb6-single">GB6 Single</Label>
                  <Input id="unplugged-gb6-single" placeholder="e.g. 2123" />
                </div>
                <div>
                  <Label htmlFor="unplugged-gb6-multi">GB6 Multi</Label>
                  <Input id="unplugged-gb6-multi" placeholder="e.g. 9654" />
                </div>
                <div>
                  <Label htmlFor="unplugged-cinebench-single">Cinebench R23 (Single)</Label>
                  <Input id="unplugged-cinebench-single" placeholder="e.g. 1,387" />
                </div>
                <div>
                  <Label htmlFor="unplugged-cinebench-multi">Cinebench R23 (Multi)</Label>
                  <Input id="unplugged-cinebench-multi" placeholder="e.g. 10,212" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="performance-summary">Performance Summary</Label>
            <Textarea
              id="performance-summary"
              placeholder="Describe the overall performance characteristics..."
              className="min-h-[150px] mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
