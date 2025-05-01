export default function Rating({formData, handleRatingChange, renderRatingStars}){
    return(
        <div className="mt-8">
          <div className="pb-4 mb-6 border-b">
            <h3 className="text-lg font-medium">Ratings & Reviews</h3>
            <p className="text-sm text-gray-500">Rate each category from 1 to 10 and provide a brief description</p>
          </div>
``
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Object.entries(formData.ratings).map(([key, value]) => (
              <div key={key} className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{value.name}</h4>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      step="0.5"
                      value={value.rating}
                      onChange={(e) =>
                        handleRatingChange(key as keyof typeof formData.ratings, "rating", e.target.value)
                      }
                      className="w-16 px-2 py-1 mr-2 text-center border rounded-md"
                    />
                    <div className="flex">{renderRatingStars(value.rating)}</div>
                  </div>
                </div>
                <textarea
                  value={value.description}
                  onChange={(e) =>
                    handleRatingChange(key as keyof typeof formData.ratings, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder={`Describe the ${value.name.toLowerCase()}...`}
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
    )
}