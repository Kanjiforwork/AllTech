// laptop-review/hooks/useLaptopData.ts
import { useState, useEffect } from "react";
import { getLaptopById } from "@/mock_data/data";

export function useLaptopData(id: string) {
  const [laptop, setLaptop] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    try {
      const data = getLaptopById(id);
      if (!data) {
        setError("Laptop not found");
      } else {
        setLaptop(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);
  
  return { laptop, loading, error };
}