// laptop-review/hooks/useLaptopData.ts
import { useState, useEffect } from "react";
import { laptopService } from "@/services/firebaseServices";
import { Laptop } from "@/types/laptop";

export function useLaptopData(id: string) {
  const [laptop, setLaptop] = useState<Laptop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    async function fetchLaptopData() {
      try {
        setLoading(true);
        const data = await laptopService.getById(id);
        if (!data) {
          setError("Laptop not found");
        } else {
          setLaptop(data);
        }
      } catch (err: any) {
        console.error("Error fetching laptop:", err);
        setError(err.message || "Failed to fetch laptop data");
      } finally {
        setLoading(false);
      }
    }
    
    fetchLaptopData();
  }, [id]);
  
  return { laptop, loading, error };
}