"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { ChevronLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import LaptopForm from "@/components/admin/LaptopForm"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSVL94k5zXkrAy5oQKbO7rT6W5fPAk4M",
  authDomain: "laptop-review-all.firebaseapp.com",
  projectId: "laptop-review-all",
  storageBucket: "laptop-review-all.firebasestorage.app",
  messagingSenderId: "1044782876129",
  appId: "1:1044782876129:web:6e0891bf2753c5a3f63ea0",
}

export default function EditLaptopPage(props: { params: { id: string } }) {
  const router = useRouter()
  const laptopId = props.params.id
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [laptopData, setLaptopData] = useState<any>(null)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  useEffect(() => {
    async function fetchLaptop() {
      try {
        setLoading(true)
        const laptopDoc = doc(db, "laptops", laptopId)
        const laptopSnapshot = await getDoc(laptopDoc)
        
        if (laptopSnapshot.exists()) {
          setLaptopData(laptopSnapshot.data())
        } else {
          setError("Không tìm thấy laptop với ID này.")
        }
        
        setLoading(false)
      } catch (error) {
        console.error("Lỗi khi tải thông tin laptop:", error)
        setError("Không thể tải thông tin laptop. Vui lòng thử lại sau.")
        setLoading(false)
      }
    }

    if (laptopId) {
      fetchLaptop()
    }
  }, [db, laptopId])

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-1 mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-muted-foreground"
          onClick={() => router.push("/admin/manage-laptops")}
        >
          <ChevronLeft className="h-4 w-4" />
          Quay lại danh sách laptop
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Đang tải thông tin laptop...</span>
        </div>
      ) : laptopData ? (
        <div className="min-h-screen bg-background">
          <LaptopForm editMode={true} initialData={laptopData} laptopId={laptopId} />
        </div>
      ) : null}
    </div>
  )
} 