import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdditionalFeatures() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Additional Features</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="webcam">Webcam</Label>
          <Input id="webcam" placeholder="e.g. 720p HD webcam with privacy shutter" />
        </div>

        <div>
          <Label htmlFor="wifi-bluetooth">WiFi / Bluetooth</Label>
          <Input id="wifi-bluetooth" placeholder="e.g. WiFi 6E (802.11ax), Bluetooth 5.2" />
        </div>

        <div>
          <Label htmlFor="keyboard">Keyboard</Label>
          <Input id="keyboard" placeholder="e.g. Backlit keyboard with numpad" />
        </div>

        <div>
          <Label htmlFor="speakers-microphone">Speakers / Microphone</Label>
          <Input id="speakers-microphone" placeholder="e.g. Stereo speakers, dual-array microphones" />
        </div>
      </div>
    </div>
  )
}
