"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import StarRating from "@/components/ui/star-rating"

export default function RatingsReviews() {
  const [ratings, setRatings] = useState({
    designWeight: 5,
    monitor: 5,
    keyboard: 5,
    touchPad: 5,
    speaker: 5,
    webcam: 5,
    ports: 5,
  })

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Ratings & Reviews</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Rate each category from 1 to 10 and provide a brief description
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="design-weight">Design and Weight</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="design-weight"
                    type="number"
                    className="w-16 text-center"
                    min={1}
                    max={10}
                    value={ratings.designWeight}
                    onChange={(e) => handleRatingChange("designWeight", Number.parseInt(e.target.value))}
                  />
                  <StarRating
                    rating={ratings.designWeight}
                    maxRating={10}
                    onRatingChange={(value) => handleRatingChange("designWeight", value)}
                  />
                </div>
              </div>
              <Textarea placeholder="Describe the design and weight..." className="min-h-[100px]" />
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="keyboard-rating">Keyboard</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="keyboard-rating"
                    type="number"
                    className="w-16 text-center"
                    min={1}
                    max={10}
                    value={ratings.keyboard}
                    onChange={(e) => handleRatingChange("keyboard", Number.parseInt(e.target.value))}
                  />
                  <StarRating
                    rating={ratings.keyboard}
                    maxRating={10}
                    onRatingChange={(value) => handleRatingChange("keyboard", value)}
                  />
                </div>
              </div>
              <Textarea placeholder="Describe the keyboard..." className="min-h-[100px]" />
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="speaker-rating">Speaker</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="speaker-rating"
                    type="number"
                    className="w-16 text-center"
                    min={1}
                    max={10}
                    value={ratings.speaker}
                    onChange={(e) => handleRatingChange("speaker", Number.parseInt(e.target.value))}
                  />
                  <StarRating
                    rating={ratings.speaker}
                    maxRating={10}
                    onRatingChange={(value) => handleRatingChange("speaker", value)}
                  />
                </div>
              </div>
              <Textarea placeholder="Describe the speaker..." className="min-h-[100px]" />
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="ports-rating">Ports</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="ports-rating"
                    type="number"
                    className="w-16 text-center"
                    min={1}
                    max={10}
                    value={ratings.ports}
                    onChange={(e) => handleRatingChange("ports", Number.parseInt(e.target.value))}
                  />
                  <StarRating
                    rating={ratings.ports}
                    maxRating={10}
                    onRatingChange={(value) => handleRatingChange("ports", value)}
                  />
                </div>
              </div>
              <Textarea placeholder="Describe the ports..." className="min-h-[100px]" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="monitor-rating">Monitor</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="monitor-rating"
                    type="number"
                    className="w-16 text-center"
                    min={1}
                    max={10}
                    value={ratings.monitor}
                    onChange={(e) => handleRatingChange("monitor", Number.parseInt(e.target.value))}
                  />
                  <StarRating
                    rating={ratings.monitor}
                    maxRating={10}
                    onRatingChange={(value) => handleRatingChange("monitor", value)}
                  />
                </div>
              </div>
              <Textarea placeholder="Describe the monitor..." className="min-h-[100px]" />
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="touchpad-rating">Touch Pad</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="touchpad-rating"
                    type="number"
                    className="w-16 text-center"
                    min={1}
                    max={10}
                    value={ratings.touchPad}
                    onChange={(e) => handleRatingChange("touchPad", Number.parseInt(e.target.value))}
                  />
                  <StarRating
                    rating={ratings.touchPad}
                    maxRating={10}
                    onRatingChange={(value) => handleRatingChange("touchPad", value)}
                  />
                </div>
              </div>
              <Textarea placeholder="Describe the touch pad..." className="min-h-[100px]" />
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="webcam-rating">Webcam</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="webcam-rating"
                    type="number"
                    className="w-16 text-center"
                    min={1}
                    max={10}
                    value={ratings.webcam}
                    onChange={(e) => handleRatingChange("webcam", Number.parseInt(e.target.value))}
                  />
                  <StarRating
                    rating={ratings.webcam}
                    maxRating={10}
                    onRatingChange={(value) => handleRatingChange("webcam", value)}
                  />
                </div>
              </div>
              <Textarea placeholder="Describe the webcam..." className="min-h-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
