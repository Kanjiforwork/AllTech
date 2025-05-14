import Feature from "./Feature"

export default function AdditionalFeautures({formData, handleChange}) {
    return (
        
            <div className="space-y-6">
                <div className="pb-4 mb-6 border-b">
                    <h3 className="text-lg font-medium">Additional Features</h3>
                </div>
                

                <Feature
                    identity={"webcam"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    type="text"
                    value={formData.webcam}
                    onChange={handleChange}
                    placeholder="e.g. 720p HD webcam with privacy shutter"
                >Webcam</Feature>

                

                <Feature
                    identity={"wifiBluetooth"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    type="text"
                    value={formData.webcam}
                    onChange={handleChange}
                    placeholder="e.g. WiFi 6E (802.11ax), Bluetooth 5.2"
                >WiFi / Bluetooth</Feature>

                

                <Feature
                    identity={"keyboard"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    type="text"
                    value={formData.webcam}
                    onChange={handleChange}
                    placeholder="e.g. Backlit keyboard with numpad"
                >Keyboard</Feature>

                
                <Feature
                    identity={"speakersMicrophone"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    type="text"
                    value={formData.webcam}
                    onChange={handleChange}
                    placeholder="e.g. Stereo speakers, dual-array microphones"
                >Speakers / Microphone</Feature>
            </div>
       
    )
}