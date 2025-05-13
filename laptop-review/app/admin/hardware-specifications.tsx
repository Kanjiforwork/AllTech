import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function HardwareSpecifications() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Hardware Specifications</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cpu">CPU / Processor</Label>
            <Input id="cpu" placeholder="e.g. Intel Core i7-12700H" />
          </div>
          <div>
            <Label htmlFor="gpu">GPU</Label>
            <Input id="gpu" placeholder="e.g. NVIDIA GeForce RTX 3060" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ram">RAM</Label>
            <Input id="ram" placeholder="e.g. 16GB DDR4 3200MHz" />
          </div>
          <div>
            <Label htmlFor="storage">Hard Drive / Storage</Label>
            <Input id="storage" placeholder="e.g. 512GB NVMe SSD" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="graphics-card">Graphics Card</Label>
            <Input id="graphics-card" placeholder="e.g. NVIDIA GeForce RTX 3060 6G" />
          </div>
          <div>
            <Label htmlFor="ports">Ports</Label>
            <Input id="ports" placeholder="e.g. 2x USB-C, 2x USB-A, HDMI, SD" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="display">Screen / Display</Label>
            <Input id="display" placeholder="e.g. 15.6-inch FHD (1920 × 1080) 144Hz" />
          </div>
          <div>
            <Label htmlFor="color-gamut">Color Gamut</Label>
            <Input id="color-gamut" placeholder="e.g. 100% sRGB" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="battery">Battery</Label>
            <Input id="battery" placeholder="e.g. 80Wh, 4-cell Li-ion" />
          </div>
          <div>
            <Label htmlFor="charging">Charging</Label>
            <Input id="charging" placeholder="e.g. 95W USB-C PD 3.0" />
          </div>
        </div>
      </div>
    </div>
  )
}
