import Feature from "./Feature";

export default function BatertyLife({formData, handleChange}){
    return (
        <div className="space-y-6">
            <div className="pb-4 mb-6 border-b">
              <h3 className="text-lg font-medium">Battery Life</h3>
            </div>
            <Feature
             identity={"watchingTime"} 
             classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
             clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
             type="text"
                value={formData.watchingTime}
                onChange={handleChange}  
                placeholder="e.g. Up to 10 hours"
             >
              Watching Online Videos
            </Feature>
            <Feature
             identity={"casualUseTime"} 
             classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
             clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
             type="text"
                value={formData.watchingTime}
                onChange={handleChange}  
                placeholder="e.g. Up to 8 hours"
             >
              Casual Use
            </Feature>


            <Feature
             identity={"extremeUseTime"} 
             classNameForLabel={"block mb-1 text-sm font-medium text-gray-700"}
             clasNameForInput={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"}
             type="text"
                value={formData.watchingTime}
                onChange={handleChange}  
                placeholder="e.g. Up to 2 hours"
             >
              Extreme Use
            </Feature>
            
          </div>
        
        
    )
}