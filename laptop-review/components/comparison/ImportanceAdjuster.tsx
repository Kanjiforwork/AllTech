// laptop-review/components/comparison/ImportanceAdjuster.tsx
import { calculateWeightedScore } from "@/utils/compareUtils";

type ImportanceAdjusterProps = {
  laptops: any[];
  weights: any;
  setWeights: (weights: any) => void;
};

export default function ImportanceAdjuster({
  laptops,
  weights,
  setWeights,
}: ImportanceAdjusterProps) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4">Adjust Importance</h3>
      <p className="text-gray-600 mb-6">
        Adjust the importance of each category based on your needs to find the best laptop for you.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Performance</label>
              <span className="text-sm text-gray-500">Weight: {weights.performance}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.performance}
              onChange={(e) => setWeights({ ...weights, performance: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Gaming</label>
              <span className="text-sm text-gray-500">Weight: {weights.gaming}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.gaming}
              onChange={(e) => setWeights({ ...weights, gaming: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Display</label>
              <span className="text-sm text-gray-500">Weight: {weights.display}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.display}
              onChange={(e) => setWeights({ ...weights, display: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Battery Life</label>
              <span className="text-sm text-gray-500">Weight: {weights.battery}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.battery}
              onChange={(e) => setWeights({ ...weights, battery: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Connectivity</label>
              <span className="text-sm text-gray-500">Weight: {weights.connectivity}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.connectivity}
              onChange={(e) => setWeights({ ...weights, connectivity: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Portability</label>
              <span className="text-sm text-gray-500">Weight: {weights.portability}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.portability}
              onChange={(e) => setWeights({ ...weights, portability: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-900 mb-2">Weighted Score Calculation</h4>
        <p className="text-sm text-blue-700">
          The weighted score helps you find the best laptop based on your priorities. Each category's score is multiplied by its importance weight, then normalized to a 10-point scale.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {laptops.map((laptop) => (
          <div key={laptop.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600">{calculateWeightedScore(laptop, weights)}</div>
              <p className="text-gray-600 mt-1">Overall Score</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Performance</span>
                  <span>{laptop.benchmarks.productivity}/10</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${laptop.benchmarks.productivity * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Gaming</span>
                  <span>{laptop.benchmarks.gaming}/10</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${laptop.benchmarks.gaming * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Display</span>
                  <span>{laptop.benchmarks.display}/10</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${laptop.benchmarks.display * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Battery</span>
                  <span>{laptop.benchmarks.battery}/10</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${laptop.benchmarks.battery * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Build Quality</span>
                  <span>{laptop.benchmarks.build}/10</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${laptop.benchmarks.build * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}