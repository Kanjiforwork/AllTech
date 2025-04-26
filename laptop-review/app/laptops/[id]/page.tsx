"use client";

import { useParams } from "next/navigation";
import { useLaptopData } from "@/hooks/useLaptopData";
import LaptopDetailPage from "@/components/laptop-detail/LaptopDetailPageUI";
import { getLaptopById } from "@/mock_data/data";

export default function LaptopDetailPageContainer() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { laptop, loading, error } = useLaptopData(id || '');
  
  // Lấy laptop tương tự (nếu có)
  const similarLaptops = laptop?.similarLaptopIds?.map((id: string) => getLaptopById(id)) || [];
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (error || !laptop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Laptop not found</h1>
          <p className="text-gray-600">The laptop you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  return <LaptopDetailPage laptop={laptop} similarLaptops={similarLaptops} />;
}