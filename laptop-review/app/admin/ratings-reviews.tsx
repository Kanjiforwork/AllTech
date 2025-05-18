"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import StarRating from "@/components/ui/star-rating"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

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

  const [images, setImages] = useState({
    designWeight: null as File | null,
    monitor: null as File | null,
    keyboard: null as File | null,
    touchPad: null as File | null,
    speaker: null as File | null,
    webcam: null as File | null,
    ports: null as File | null,
  })

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  const handleImageUpload = (category: keyof typeof images, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImages((prev) => ({
        ...prev,
        [category]: e.target.files![0],
      }))
    }
  }

  const handleRemoveImage = (category: keyof typeof images) => {
    setImages((prev) => ({
      ...prev,
      [category]: null,
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
              <div className="mt-2">
                {images.designWeight ? (
                  <div className="relative w-full h-32 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(images.designWeight) || "/placeholder.svg"}
                      alt="Design and Weight"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => handleRemoveImage("designWeight")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file-designWeight"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Upload image</p>
                      </div>
                      <input
                        id="dropzone-file-designWeight"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload("designWeight", e)}
                      />
                    </label>
                  </div>
                )}
              </div>
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
              <div className="mt-2">
                {images.keyboard ? (
                  <div className="relative w-full h-32 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(images.keyboard) || "/placeholder.svg"}
                      alt="Keyboard"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => handleRemoveImage("keyboard")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file-keyboard"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Upload image</p>
                      </div>
                      <input
                        id="dropzone-file-keyboard"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload("keyboard", e)}
                      />
                    </label>
                  </div>
                )}
              </div>
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
              <div className="mt-2">
                {images.speaker ? (
                  <div className="relative w-full h-32 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(images.speaker) || "/placeholder.svg"}
                      alt="Speaker"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => handleRemoveImage("speaker")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file-speaker"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Upload image</p>
                      </div>
                      <input
                        id="dropzone-file-speaker"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload("speaker", e)}
                      />
                    </label>
                  </div>
                )}
              </div>
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
              <div className="mt-2">
                {images.ports ? (
                  <div className="relative w-full h-32 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(images.ports) || "/placeholder.svg"}
                      alt="Ports"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => handleRemoveImage("ports")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file-ports"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Upload image</p>
                      </div>
                      <input
                        id="dropzone-file-ports"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload("ports", e)}
                      />
                    </label>
                  </div>
                )}
              </div>
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
              <div className="mt-2">
                {images.monitor ? (
                  <div className="relative w-full h-32 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(images.monitor) || "/placeholder.svg"}
                      alt="Monitor"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => handleRemoveImage("monitor")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file-monitor"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Upload image</p>
                      </div>
                      <input
                        id="dropzone-file-monitor"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload("monitor", e)}
                      />
                    </label>
                  </div>
                )}
              </div>
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
              <div className="mt-2">
                {images.touchPad ? (
                  <div className="relative w-full h-32 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(images.touchPad) || "/placeholder.svg"}
                      alt="Touch Pad"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => handleRemoveImage("touchPad")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file-touchPad"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Upload image</p>
                      </div>
                      <input
                        id="dropzone-file-touchPad"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload("touchPad", e)}
                      />
                    </label>
                  </div>
                )}
              </div>

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
              <div className="mt-2">
                {images.webcam ? (
                  <div className="relative w-full h-32 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(images.webcam) || "/placeholder.svg"}
                      alt="Webcam"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => handleRemoveImage("webcam")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file-webcam"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Upload image</p>
                      </div>
                      <input
                        id="dropzone-file-webcam"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload("webcam", e)}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
