// laptop-review/components/comparison/KeyDifferences.tsx
import { Check } from "lucide-react";

type KeyDifferencesProps = {
  laptops: any[];
  keyDifferences: {
    laptop1: string[];
    laptop2: string[];
  };
};

export default function KeyDifferences({ laptops, keyDifferences }: KeyDifferencesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Key Differences</h2>

      <div className="grid grid-cols-2 gap-8">
        {laptops.map((laptop, index) => (
          <div key={laptop.id}>
            <h3 className="text-xl font-bold mb-4">{laptop.name} Advantages</h3>
            <ul className="space-y-2">
              {(index === 0 ? keyDifferences.laptop1 : keyDifferences.laptop2).map((diff, i) => (
                <li key={i} className="flex items-start">
                  <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{diff}</span>
                </li>
              ))}
              {(index === 0 ? keyDifferences.laptop1 : keyDifferences.laptop2).length === 0 && (
                <li className="text-gray-500">No significant advantages found</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}