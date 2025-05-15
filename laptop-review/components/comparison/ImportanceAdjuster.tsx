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
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Adjust Importance</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Adjust the importance of each category based on your needs to find the best laptop for you.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium dark:text-white">Performance</label>
              <span className="text-sm text-gray-500 dark:text-gray-400">Weight: {weights.performance}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.performance}
              onChange={(e) => setWeights({ ...weights, performance: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium dark:text-white">Gaming</label>
              <span className="text-sm text-gray-500 dark:text-gray-400">Weight: {weights.gaming}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.gaming}
              onChange={(e) => setWeights({ ...weights, gaming: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium dark:text-white">Display</label>
              <span className="text-sm text-gray-500 dark:text-gray-400">Weight: {weights.display}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.display}
              onChange={(e) => setWeights({ ...weights, display: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium dark:text-white">Battery Life</label>
              <span className="text-sm text-gray-500 dark:text-gray-400">Weight: {weights.battery}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.battery}
              onChange={(e) => setWeights({ ...weights, battery: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium dark:text-white">Connectivity</label>
              <span className="text-sm text-gray-500 dark:text-gray-400">Weight: {weights.connectivity}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.connectivity}
              onChange={(e) => setWeights({ ...weights, connectivity: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium dark:text-white">Portability</label>
              <span className="text-sm text-gray-500 dark:text-gray-400">Weight: {weights.portability}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={weights.portability}
              onChange={(e) => setWeights({ ...weights, portability: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Weighted Score Calculation</h4>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          The weighted score helps you find the best laptop based on your priorities. Each category's score is multiplied by its importance weight, then normalized to a 10-point scale.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {laptops.map((laptop) => (
          <div key={laptop.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{calculateWeightedScore(laptop, weights)}</div>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Overall Score</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium dark:text-white">Performance</span>
                  <span className="dark:text-gray-300">{laptop.benchmarks.productivity}/10</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    style={{ width: `${laptop.benchmarks.productivity * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium dark:text-white">Gaming</span>
                  <span className="dark:text-gray-300">{laptop.benchmarks.gaming}/10</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    style={{ width: `${laptop.benchmarks.gaming * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium dark:text-white">Display</span>
                  <span className="dark:text-gray-300">{laptop.benchmarks.display}/10</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    style={{ width: `${laptop.benchmarks.display * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium dark:text-white">Battery</span>
                  <span className="dark:text-gray-300">{laptop.benchmarks.battery}/10</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    style={{ width: `${laptop.benchmarks.battery * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium dark:text-white">Build Quality</span>
                  <span className="dark:text-gray-300">{laptop.benchmarks.build}/10</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
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