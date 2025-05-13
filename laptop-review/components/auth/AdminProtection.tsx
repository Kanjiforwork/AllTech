// Tạo file mới: components/auth/AdminProtection.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/firebase";
import { ReactNode } from "react";

export default function AdminProtection({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const userFromStorage = localStorage.getItem('user');
      
      if (!userFromStorage) {
        router.push('/login');
        return;
      }
      
      try {
        const userData = JSON.parse(userFromStorage);
        const userObj = await User.getFromFirestore(userData.uid);
        
        if (!userObj || !userObj.isAdmin()) {
          router.push('/');
          return;
        }
        
        setIsAdmin(true);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi kiểm tra quyền admin:", error);
        router.push('/');
      }
    };
    
    checkAdminStatus();
  }, [router]);

  if (loading) {
    return <div className="container mx-auto py-6">Đang kiểm tra quyền truy cập...</div>;
  }

  return isAdmin ? children : null;
}