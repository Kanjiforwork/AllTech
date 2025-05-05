import Feature from "./Feature"
import { Upload } from "lucide-react"

export default function BasicInformation({ formData, handleChange, handleImageChange, brands }) {
    return (
        <div className="space-y-6">
            <div className="pb-4 mb-6 border-b">
                <h3 className="text-lg font-medium">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                

                <Feature
                    identity={"name"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. MacBook Pro 16"
                    required
                >Laptop Name</Feature>

                <div>
                    <label htmlFor="brand" className="block mb-1 text-sm font-medium text-gray-700">
                        Brand *
                    </label>
                    <select
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                        required
                    >
                        {brands.map((item) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}

                    </select>
                </div>

                
            </div>

            

            <Feature
                    identity={"operatingSystem"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Windows 11 Home"
                    required
                >Operating System</Feature>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                

                <Feature
                    identity={"weight"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. 2.1 kg"
                    required
                >Weight</Feature>

                

                <Feature
                    identity={"Dimensions"}
                    classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
                    clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. 355.7 x 248.1 x 16.8 mm"
                    required
                >Dimensions</Feature>
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Laptop Images</label>
                <div className="p-4 border-2 border-dashed rounded-md border-gray-300">
                    <div className="flex flex-col items-center justify-center py-4">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="mb-1 text-sm font-medium text-gray-700">Drag and drop images here</p>
                        <p className="mb-4 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        <label
                            htmlFor="laptop-image"
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer"
                        >
                            Browse Files
                            <input
                                id="laptop-image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>


                </div>
            </div>
        </div>
    )
}