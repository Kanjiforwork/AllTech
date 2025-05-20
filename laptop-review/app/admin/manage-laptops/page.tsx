"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ChevronLeft, Pencil, Trash, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSVL94k5zXkrAy5oQKbO7rT6W5fPAk4M",
  authDomain: "laptop-review-all.firebaseapp.com",
  projectId: "laptop-review-all",
  storageBucket: "laptop-review-all.firebasestorage.app",
  messagingSenderId: "1044782876129",
  appId: "1:1044782876129:web:6e0891bf2753c5a3f63ea0",
}

type Laptop = {
  id: string
  name: string
  price: string
  specs: {
    cpu: string
    gpu: string
    ram: string
    storage: string
    display: string
    battery: string
  }
  createdAt: any
}

export default function ManageLaptopsPage() {
  const router = useRouter()
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  useEffect(() => {
    async function fetchLaptops() {
      try {
        setLoading(true)
        const laptopsCollection = collection(db, "laptops")
        const laptopSnapshot = await getDocs(laptopsCollection)
        
        const laptopList: Laptop[] = laptopSnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name || "Không có tên",
            price: data.price || "Chưa có giá",
            specs: {
              cpu: data.specs?.cpu || "",
              gpu: data.specs?.gpu || "",
              ram: data.specs?.ram || "",
              storage: data.specs?.storage || "",
              display: data.specs?.display || "",
              battery: data.specs?.battery || "",
            },
            createdAt: data.createdAt,
          }
        })

        // Sort by newest first if createdAt exists
        laptopList.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.seconds - a.createdAt.seconds
          }
          return 0
        })
        
        setLaptops(laptopList)
        setLoading(false)
      } catch (error) {
        console.error("Lỗi khi tải danh sách laptop:", error)
        setError("Không thể tải danh sách laptop. Vui lòng thử lại sau.")
        setLoading(false)
      }
    }

    fetchLaptops()
  }, [db])

  const handleEdit = (laptopId: string) => {
    router.push(`/admin/edit-laptop/${laptopId}`)
  }

  const handleDelete = async (laptopId: string) => {
    try {
      setDeletingId(laptopId)
      await deleteDoc(doc(db, "laptops", laptopId))
      setLaptops(laptops.filter(laptop => laptop.id !== laptopId))
      setDeletingId(null)
    } catch (error) {
      console.error("Lỗi khi xóa laptop:", error)
      setError("Không thể xóa laptop. Vui lòng thử lại sau.")
      setDeletingId(null)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-muted-foreground"
          onClick={() => router.push("/admin")}
        >
          <ChevronLeft className="h-4 w-4" />
          Quay lại trang quản lý
        </Button>
        <h1 className="text-2xl font-bold">Quản Lý Laptop</h1>
        <Button 
          onClick={() => router.push("/admin/laptop-form")}
        >
          Thêm Laptop Mới
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Laptop</CardTitle>
          <CardDescription>
            Tất cả laptop hiện có trong hệ thống. Bạn có thể chỉnh sửa hoặc xóa các mục.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Đang tải dữ liệu...</span>
            </div>
          ) : laptops.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Chưa có laptop nào trong hệ thống.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => router.push("/admin/laptop-form")}
              >
                Thêm Laptop Đầu Tiên
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên Laptop</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>CPU</TableHead>
                    <TableHead>RAM</TableHead>
                    <TableHead>Lưu Trữ</TableHead>
                    <TableHead className="text-right">Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {laptops.map((laptop) => (
                    <TableRow key={laptop.id}>
                      <TableCell className="font-medium">{laptop.name}</TableCell>
                      <TableCell>{laptop.price}</TableCell>
                      <TableCell>{laptop.specs.cpu}</TableCell>
                      <TableCell>{laptop.specs.ram}</TableCell>
                      <TableCell>{laptop.specs.storage}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(laptop.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                              >
                                {deletingId === laptop.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash className="h-4 w-4" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Hành động này không thể hoàn tác. Laptop "{laptop.name}" sẽ bị xóa vĩnh viễn khỏi hệ thống.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() => handleDelete(laptop.id)}
                                >
                                  Xóa
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 