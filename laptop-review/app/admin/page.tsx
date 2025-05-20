"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertCircle, Plus, List, Settings, PieChart, Pencil, BarChart } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSVL94k5zXkrAy5oQKbO7rT6W5fPAk4M",
  authDomain: "laptop-review-all.firebaseapp.com",
  projectId: "laptop-review-all",
  storageBucket: "laptop-review-all.firebasestorage.app",
  messagingSenderId: "1044782876129",
  appId: "1:1044782876129:web:6e0891bf2753c5a3f63ea0",
}

// Kiểu dữ liệu cho laptop mới nhất
interface RecentLaptop {
  id: string
  name: string
  createdAt: {
    seconds: number
    nanoseconds: number
  } | null
}

// Kiểu dữ liệu cho thống kê
interface StatsData {
  totalLaptops: number
  recentlyAdded: RecentLaptop[]
}

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<StatsData>({
    totalLaptops: 0,
    recentlyAdded: []
  })
  const [loading, setLoading] = useState(true)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        // Lấy tổng số laptop
        const laptopsCollection = collection(db, "laptops")
        const laptopSnapshot = await getDocs(laptopsCollection)
        
        // Lấy 5 laptop mới nhất được thêm vào
        const laptopList: RecentLaptop[] = laptopSnapshot.docs
          .map(doc => ({
            id: doc.id,
            name: doc.data().name || "Không có tên",
            createdAt: doc.data().createdAt || null
          }))
          .sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return b.createdAt.seconds - a.createdAt.seconds
            }
            return 0
          })
          .slice(0, 5)
        
        setStats({
          totalLaptops: laptopSnapshot.size,
          recentlyAdded: laptopList
        })
        
        setLoading(false)
      } catch (error) {
        console.error("Lỗi khi tải thống kê:", error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [db])

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Trang Quản Trị</h1>
          <p className="text-muted-foreground">Quản lý và cập nhật thông tin laptop</p>
        </div>
        <Button 
          onClick={() => router.push("/admin/laptop-form")} 
          className="md:w-auto w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm Laptop Mới
        </Button>
      </div>
      
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Chú ý</AlertTitle>
        <AlertDescription>
          Form cũ hiện đang gặp lỗi. Vui lòng sử dụng form mới để thêm laptop.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Số Laptop</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalLaptops}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tổng số laptop trong cơ sở dữ liệu
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="management" className="mb-8">
        <TabsList>
          <TabsTrigger value="management">Quản Lý Dữ Liệu</TabsTrigger>
          <TabsTrigger value="recent">Laptop Mới Nhất</TabsTrigger>
        </TabsList>
        <TabsContent value="management" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Mới</CardTitle>
                <CardDescription>
                  Sử dụng form được thiết kế lại để thêm laptop mới.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Form mới được tổ chức tốt hơn, dễ sử dụng hơn và đảm bảo dữ liệu được lưu trữ chính xác.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => router.push("/admin/laptop-form")} 
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm Laptop Mới
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phân quyền</CardTitle>
                <CardDescription>
                  Phần quyền admin cho user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                 Nhập id của user từ firestore và nhập Key để phân quyền
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => router.push("/admin-tools")} 
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Set Admin
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quản Lý Laptop</CardTitle>
                <CardDescription>
                  Xem, chỉnh sửa và xóa các laptop hiện có.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Quản lý thông tin các laptop đã lưu trong hệ thống. Bạn có thể chỉnh sửa thông tin hoặc xóa laptop.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => router.push("/admin/manage-laptops")} 
                  className="w-full"
                  variant="secondary"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Quản Lý Laptop
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Cũ</CardTitle>
                <CardDescription>
                  Sử dụng form cũ để thêm laptop (không khuyến khích).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Form cũ hiện đang gặp một số vấn đề về lưu trữ dữ liệu. Chúng tôi khuyến khích sử dụng form mới.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => router.push("/admin/old-form")} 
                  variant="outline" 
                  className="w-full"
                >
                  Sử dụng Form Cũ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Đang tải dữ liệu...
            </div>
          ) : stats.recentlyAdded.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">5 Laptop Mới Nhất</h3>
              <div className="border rounded-md">
                <div className="grid grid-cols-1 divide-y">
                  {stats.recentlyAdded.map((laptop) => (
                    <div key={laptop.id} className="flex items-center justify-between p-4">
                      <div>
                        <h4 className="font-medium">{laptop.name}</h4>
                        <p className="text-sm text-muted-foreground">ID: {laptop.id}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => router.push(`/admin/edit-laptop/${laptop.id}`)}
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Sửa
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => router.push(`/laptops/${laptop.id}`)}
                        >
                          Xem
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  className="flex items-center text-muted-foreground"
                  onClick={() => router.push("/admin/manage-laptops")}
                >
                  Xem tất cả laptop
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Chưa có laptop nào trong hệ thống.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
