import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import AnalysisSection from "./AnalysisSection";

type DetailedAnalysisProps = {
  laptop: any;
};

export default function DetailedAnalysis({ laptop }: DetailedAnalysisProps) {
  const getScoreBadge = (score: number) => {
    return (
      <div className={`text-white text-xs px-2.5 py-1 rounded-full font-bold bg-blue-600`}>
        {score.toFixed(1)}/10
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Detailed Analysis</h2>

      {/* 1. Performance */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">1. Performance</h3>
          {laptop.benchmarks?.gaming && getScoreBadge(laptop.benchmarks.gaming)}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* CPU Benchmarks */}
          <div>
            <h4 className="font-medium mb-3">CPU Benchmarks</h4>
            {laptop.detailedSpecs?.cpu?.benchmarks?.geekbench6Single && (
              <div className="flex items-center justify-between mb-2">
                <span>Geekbench v6 (Single)</span>
                <span className="font-bold">{laptop.detailedSpecs.cpu.benchmarks.geekbench6Single}</span>
              </div>
            )}
            {laptop.detailedSpecs?.cpu?.benchmarks?.geekbench6Single && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(laptop.detailedSpecs.cpu.benchmarks.geekbench6Single / 30)}%` }}></div>
              </div>
            )}

            {laptop.detailedSpecs?.cpu?.benchmarks?.geekbench6Multi && (
              <div className="flex items-center justify-between mb-2">
                <span>Geekbench v6 (Multi)</span>
                <span className="font-bold">{laptop.detailedSpecs.cpu.benchmarks.geekbench6Multi}</span>
              </div>
            )}
            {laptop.detailedSpecs?.cpu?.benchmarks?.geekbench6Multi && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(laptop.detailedSpecs.cpu.benchmarks.geekbench6Multi / 150)}%` }}></div>
              </div>
            )}

            {laptop.detailedSpecs?.cpu?.benchmarks?.cinebenchR23Single && (
              <div className="flex items-center justify-between mb-2">
                <span>Cinebench R23 (Single)</span>
                <span className="font-bold">{laptop.detailedSpecs.cpu.benchmarks.cinebenchR23Single}</span>
              </div>
            )}
            {laptop.detailedSpecs?.cpu?.benchmarks?.cinebenchR23Single && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(laptop.detailedSpecs.cpu.benchmarks.cinebenchR23Single / 18)}%` }}></div>
              </div>
            )}

            {laptop.detailedSpecs?.cpu?.benchmarks?.cinebenchR23Multi && (
              <div className="flex items-center justify-between mb-2">
                <span>Cinebench R23 (Multi)</span>
                <span className="font-bold">{laptop.detailedSpecs.cpu.benchmarks.cinebenchR23Multi}</span>
              </div>
            )}
            {laptop.detailedSpecs?.cpu?.benchmarks?.cinebenchR23Multi && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(laptop.detailedSpecs.cpu.benchmarks.cinebenchR23Multi / 150)}%` }}></div>
              </div>
            )}
          </div>

          {/* GPU Benchmarks */}
          <div>
            <h4 className="font-medium mb-3">GPU Benchmarks</h4>
            <div className="flex items-center justify-between mb-2">
              <span>3DMark Time Spy (Graphics)</span>
              <span className="font-bold">5876</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "58%" }}></div>
            </div>

            {laptop.detailedSpecs?.gpu?.benchmarks?.wildlifeExtreme && (
              <div className="flex items-center justify-between mb-2">
                <span>3DMark Wildlife Extreme</span>
                <span className="font-bold">{laptop.detailedSpecs.gpu.benchmarks.wildlifeExtreme}</span>
              </div>
            )}
            {laptop.detailedSpecs?.gpu?.benchmarks?.wildlifeExtreme && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(laptop.detailedSpecs.gpu.benchmarks.wildlifeExtreme / 100)}%` }}></div>
              </div>
            )}

            <div className="flex items-center justify-between mb-2">
              <span>Geekbench Compute</span>
              <span className="font-bold">21345</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "71%" }}></div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Performance Comparison: Plugged vs. Unplugged</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-sm font-medium mb-2">Plugged In (AC Power)</h5>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span>GB6 Single</span>
                <span className="font-bold">{laptop.detailedSpecs?.cpu?.benchmarks?.geekbench6Single || 2345}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>

              <div className="flex items-center justify-between mb-2 text-sm">
                <span>GB6 Multi</span>
                <span className="font-bold">{laptop.detailedSpecs?.cpu?.benchmarks?.geekbench6Multi || 11876}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>

                              {/* Added Cinebench scores */}
                              <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Cinebench R23 (Single-Core)</span>
                      <span className="text-sm">1,532</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-green-500" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Cinebench R23 (Multi-Core)</span>
                      <span className="text-sm">12,456</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-green-500" style={{ width: "100%" }}></div>
                    </div>
                  </div>

            <div>
              <h5 className="text-sm font-medium mb-2">Unplugged (Battery)</h5>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span>GB6 Single</span>
                <span className="font-bold">2123</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "72%" }}></div>
              </div>

              <div className="flex items-center justify-between mb-2 text-sm">
                <span>GB6 Multi</span>
                <span className="font-bold">9654</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "61%" }}></div>
              </div>
            </div>
          </div>
        </div>

                          {/* Added Cinebench scores */}
                          <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Cinebench R23 (Single-Core)</span>
                      <span className="text-sm">1,387</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Cinebench R23 (Multi-Core)</span>
                      <span className="text-sm">10,212</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: "82%" }}></div>
                    </div>
                  </div>

        <p className="text-gray-700">
          The {laptop.detailedSpecs?.cpu?.name} handles multitasking and demanding tasks well. 
          The {laptop.detailedSpecs?.gpu?.name} allows for enjoyable 1080p gaming and boosts creative apps. 
          Performance on battery sees a noticeable drop in multi-core tasks (~19%) but remains adequate for lighter workloads.
        </p>
      </div>

      {/* 2. Battery */}
          {/* Battery Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">2. Battery</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">8.7/10</div>
            </div>

            {/* <div className="mb-4">
              <p className="mb-2">
                <span className="font-medium">Battery Capacity:</span> 75Wh
              </p>
            </div> */}

            {/* <h4 className="font-semibold mb-4">Battery Life</h4> */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Casual Use</span>
                  <span className="font-medium">12.5 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full bg-green-500 flex items-center justify-end px-2"
                    style={{ width: "83%" }}
                  >
                    <span className="text-xs text-white font-medium">12.5h</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Watching Online Video</span>
                  <span className="font-medium">10.2 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full bg-blue-500 flex items-center justify-end px-2"
                    style={{ width: "68%" }}
                  >
                    <span className="text-xs text-white font-medium">10.2h</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Extreme Use (Gaming/Rendering)</span>
                  <span className="font-medium">3.8 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full bg-yellow-500 flex items-center justify-end px-2"
                    style={{ width: "25%" }}
                  >
                    <span className="text-xs text-white font-medium">3.8h</span>
                  </div>
                </div>
              </div>
            </div>

        <p className="text-gray-700">
          The {laptop.detailedSpecs?.battery?.capacity}Wh battery delivers impressive runtime for a laptop with these specs. 
          In our testing, it lasted about 8 hours of general productivity work and web browsing at 150 nits brightness. 
          Video playback extends to around 10 hours, while gaming will drain it in under 2 hours. 
          The {laptop.detailedSpecs?.battery?.chargerWattage} {laptop.detailedSpecs?.battery?.fastCharging ? "fast charger" : "charger"} can replenish to 60% in just 45 minutes, which is convenient for quick top-ups.
        </p>
      </div>

      {/* 3. Design & Build */}
      <AnalysisSection 
        title="3. Design & Build" 
        score={laptop.benchmarks?.build}
        image="/images/laptop-design.jpg"
      >
        <div className="mb-4">
          <p className="mb-2">Dimensions: {laptop.detailedSpecs?.case?.dimensions}</p>
          <p>Weight: {laptop.detailedSpecs?.case?.weight}</p>
        </div>
        
        <p className="text-gray-700">
          The {laptop.detailedSpecs?.case?.material || "aluminum"} chassis gives a premium feel and solid build. 
          It's reasonably portable for a {laptop.detailedSpecs?.display?.size || "16"}-inch device. 
          The minimalist {laptop.detailedSpecs?.case?.color || "Storm Grey"} finish resists fingerprints well.
        </p>
      </AnalysisSection>

      {/* 4. Display */}
      <AnalysisSection 
        title="4. Display" 
        score={laptop.benchmarks?.display}
        image="/images/laptop-display.jpg"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="mb-1">Size: {laptop.detailedSpecs?.display?.size}</p>
            <p className="mb-1">Panel Type: {laptop.detailedSpecs?.display?.type}</p>
            <p className="mb-1">Brightness: {laptop.detailedSpecs?.display?.brightness}</p>
          </div>
          <div>
            <p className="mb-1">Resolution: {laptop.detailedSpecs?.display?.resolution}</p>
            <p className="mb-1">Refresh Rate: {laptop.detailedSpecs?.display?.refreshRate}</p>
            <p className="mb-1">Color Gamut: {laptop.detailedSpecs?.display?.colorGamut?.sRGB}% sRGB</p>
          </div>
        </div>
        
        <p className="text-gray-700">
          The high-resolution {laptop.detailedSpecs?.display?.aspectRatio || "16:10"} display with a {laptop.detailedSpecs?.display?.refreshRate} refresh rate is a standout feature, 
          offering sharp text and smooth motion. Brightness is sufficient for indoors, and sRGB coverage is excellent for general use, 
          though professionals might need wider gamuts.
        </p>
      </AnalysisSection>

      {/* 5. Keyboard */}
      <AnalysisSection 
        title="5. Keyboard"
        image="/images/laptop-keyboard.jpg"
      >
        <p className="text-gray-700">
          Features a comfortable keyboard with good travel and tactile feedback, plus a numpad. 
          Backlighting is functional with {laptop.detailedSpecs?.input?.keyboard?.includes("RGB") ? "RGB lighting" : "two levels"}.
        </p>
      </AnalysisSection>

      {/* 6. Trackpad */}
      <AnalysisSection 
        title="6. Trackpad" 
        score={7.8}
        image="/images/laptop-trackpad.jpg"
      >
        <p className="text-gray-700">
          Large and responsive Microsoft Precision trackpad supports gestures well. Clicking is satisfactory. 
          Slightly off-center placement due to numpad.
        </p>
      </AnalysisSection>

      {/* 7. Speakers */}
      <AnalysisSection 
        title="7. Speakers" 
        score={7.5}
        image="/images/laptop-speakers.jpg"
      >
        <p className="text-gray-700">
          Downward-firing speakers with {laptop.detailedSpecs?.sound?.dolbyAtmos ? "Dolby Atmos" : "good audio"} provide clear audio, 
          suitable for calls and casual media consumption. Bass is lacking.
        </p>
      </AnalysisSection>

      {/* 8. Webcam */}
      <AnalysisSection 
        title="8. Webcam" 
        score={7.0}
        image="/images/laptop-webcam.jpg"
      >
        <div>
          <p className="mb-3">Resolution: {laptop.detailedSpecs?.connectivity?.webcam?.includes("1080p") ? "1080p FHD + IR with Privacy Shutter" : laptop.detailedSpecs?.connectivity?.webcam}</p>
          <p className="text-gray-700">
            The {laptop.detailedSpecs?.connectivity?.webcam?.includes("1080p") ? "1080p" : "720p"} webcam offers better detail than 720p cameras in good light. 
            Includes a privacy shutter and IR for Windows Hello.
          </p>
        </div>
      </AnalysisSection>

      {/* 9. Ports */}
      <AnalysisSection 
        title="9. Ports" 
        score={8.3}
        image="/images/laptop-ports.jpg"
      >
        <div>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <h4 className="font-medium mb-2">Left Side:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>1x USB-C 3.2 Gen 2 (DP 1.4, PD 3.0)</li>
                <li>1x USB-A 3.2 Gen 1</li>
                <li>HDMI 2.0</li>
                <li>SD Card Reader</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Right Side:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>1x USB-A 3.2 Gen 1</li>
                <li>1x USB-C 3.2 Gen 2 (PD 3.0, Data)</li>
                <li>3.5mm Combo Audio Jack</li>
              </ul>
            </div>
          </div>
          
          <p className="text-gray-700">
            A comprehensive port selection covers most needs, including versatile USB-C ports and an SD reader. Well-distributed on both sides.
          </p>
        </div>
      </AnalysisSection>

      {/* Best Prices & Deals */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Best Prices & Deals</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <Image src="/placeholder.svg" alt="Amazon" width={120} height={40} />
              </div>
              <div className="text-2xl font-bold">{laptop.price}</div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" /> View Deal
            </button>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <Image src="/placeholder.svg" alt="Best Buy" width={120} height={40} />
              </div>
              <div className="text-2xl font-bold">$949.99</div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" /> View Deal
            </button>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <Image src="/placeholder.svg" alt="Lenovo" width={120} height={40} />
              </div>
              <div className="text-2xl font-bold">$919.00</div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" /> View Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}