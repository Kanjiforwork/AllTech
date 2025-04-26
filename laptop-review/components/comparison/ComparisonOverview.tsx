// laptop-review/components/comparison/ComparisonOverview.tsx
import Image from "next/image";
import Link from "next/link";

type ComparisonOverviewProps = {
  laptops: any[];
};

export default function ComparisonOverview({ laptops }: ComparisonOverviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-2 gap-8">
        {laptops.map((laptop) => (
          <div key={laptop.id} className="text-center">
            <div className="relative w-full h-[200px] mb-4">
              <Image
                src={laptop.image}
                alt={laptop.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{laptop.name}</h3>
            <div className="text-2xl font-bold text-blue-600 mb-4">{laptop.price}</div>
            <Link
              href={`/laptops/${laptop.id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}