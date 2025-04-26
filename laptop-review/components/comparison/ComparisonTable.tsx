// laptop-review/components/comparison/ComparisonTable.tsx
import { compareSpecs } from "@/utils/compareUtils";

type ComparisonTableProps = {
  laptops: any[];
  title: string;
  specs: {
    label: string;
    path: string;
    isHigherBetter?: boolean;
  }[];
};

export default function ComparisonTable({ laptops, title, specs }: ComparisonTableProps) {
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
              {laptops.map((laptop) => (
                <th
                  key={laptop.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {laptop.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {specs.map((spec, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{spec.label}</td>
                {laptops.map((laptop, idx) => {
                  const value = getNestedValue(laptop, spec.path);
                  const otherValue = getNestedValue(laptops[1 - idx], spec.path);
                  const [isWorse, isBetter] = compareSpecs(
                    value,
                    otherValue,
                    spec.isHigherBetter !== false
                  );
                  
                  return (
                    <td
                      key={laptop.id}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                      }`}
                    >
                      {typeof value === 'boolean' ? (value ? "Yes" : "No") : value || "No"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}