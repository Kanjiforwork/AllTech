import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BatteryLife() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Battery Life</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="video-playback">Watching Online Videos</Label>
          <Input id="video-playback" placeholder="e.g. Up to 10 hours" />
        </div>

        <div>
          <Label htmlFor="casual-use">Casual Use</Label>
          <Input id="casual-use" placeholder="e.g. Up to 8 hours" />
        </div>

        <div>
          <Label htmlFor="extreme-use">Extreme Use</Label>
          <Input id="extreme-use" placeholder="e.g. Up to 2 hours" />
        </div>
      </div>
    </div>
  )
}
