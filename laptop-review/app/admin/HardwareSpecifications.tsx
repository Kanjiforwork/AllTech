import Feature from "./Feature";

export default function HardwareSpecifications({ formData, handleChange }) {
    return (
        <div className="space-y-6">
            <div className="pb-4 mb-6 border-b">
                <h3 className="text-lg font-medium">Hardware Specifications</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


                <Feature
                    identity={"cpu"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    type="text"
                    value={formData.cpu}
                    onChange={handleChange}
                    placeholder="e.g. Intel Core i7-12700H"
                >

                    CPU / Processor
                </Feature>



                <Feature
                    identity={"gpu"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    type="text"
                    value={formData.cpu}
                    onChange={handleChange}
                    placeholder="e.g. NVIDIA GeForce RTX 3060"
                >

                    GPU
                </Feature>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


                <Feature
                    identity={"ram"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    type="text"
                    value={formData.cpu}
                    onChange={handleChange}
                    placeholder="e.g. 16GB DDR4 3200MHz"
                >

                    RAM
                </Feature>



                <Feature
                    identity={"hardDrive"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    type="text"
                    value={formData.cpu}
                    onChange={handleChange}
                    placeholder="e.g. 512GB NVMe SSD"
                >

                    Hard Drive / Storage
                </Feature>
            </div>


            <Feature
                identity={"graphicsCard"}
                clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                type="text"
                value={formData.cpu}
                onChange={handleChange}
                placeholder="e.g. NVIDIA GeForce RTX 3060 6GB GDDR6"
            >

                Graphics Card
            </Feature>



            <Feature
                identity={"screen"}
                clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                type="text"
                value={formData.cpu}
                onChange={handleChange}
                placeholder="e.g. 15.6-inch FHD (1920 x 1080) 144Hz IPS"
            >

                Screen / Display
            </Feature>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


                <Feature
                    identity={"battery"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    type="text"
                    value={formData.cpu}
                    onChange={handleChange}
                    placeholder="e.g. 80Wh, 4-cell Li-ion"
                >

                    Battery
                </Feature>



                <Feature
                    identity={"ports"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    type="text"
                    value={formData.cpu}
                    onChange={handleChange}
                    placeholder="e.g. 2x USB-C, 2x USB-A, HDMI, SD card"
                >

                    Ports
                </Feature>
            </div>
        </div>
    )
}