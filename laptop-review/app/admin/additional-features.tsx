"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AdditionalFeaturesProps {
  formData: {
    webcam: string
    wifiBluetooth: string
    keyboard: string
    speakersMicrophone: string
  }
  onChange: (field: string, value: string) => void
  onFocus: (field: string) => void
  fieldErrors: Record<string, boolean>
  showValidation: boolean
}

export default function AdditionalFeatures({
  formData,
  onChange,
  onFocus,
  fieldErrors,
  showValidation,
}: AdditionalFeaturesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Additional Features</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="webcam">Webcam</Label>
          <Input
            id="webcam"
            placeholder="e.g. 720p HD webcam with privacy shutter"
            value={formData.webcam}
            onChange={(e) => onChange("webcam", e.target.value)}
            onFocus={() => onFocus("webcam")}
          />
        </div>

        <div>
          <Label htmlFor="wifi-bluetooth">WiFi / Bluetooth</Label>
          <Input
            id="wifi-bluetooth"
            placeholder="e.g. WiFi 6E (802.11ax), Bluetooth 5.2"
            value={formData.wifiBluetooth}
            onChange={(e) => onChange("wifiBluetooth", e.target.value)}
            onFocus={() => onFocus("wifiBluetooth")}
          />
        </div>

        <div>
          <Label htmlFor="keyboard">Keyboard</Label>
          <Input
            id="keyboard"
            placeholder="e.g. Backlit keyboard with numpad"
            value={formData.keyboard}
            onChange={(e) => onChange("keyboard", e.target.value)}
            onFocus={() => onFocus("keyboard")}
          />
        </div>

        <div>
          <Label htmlFor="speakers-microphone">Speakers / Microphone</Label>
          <Input
            id="speakers-microphone"
            placeholder="e.g. Stereo speakers, dual-array microphones"
            value={formData.speakersMicrophone}
            onChange={(e) => onChange("speakersMicrophone", e.target.value)}
            onFocus={() => onFocus("speakersMicrophone")}
          />
        </div>
      </div>
    </div>
  )
}
