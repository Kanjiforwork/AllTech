"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertCircle, Plus, List, Settings } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Quản lý Laptop</h1>
      
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Chú ý</AlertTitle>
        <AlertDescription>
          Form cũ hiện đang gặp lỗi. Vui lòng sử dụng form mới để thêm laptop.
        </AlertDescription>
      </Alert>

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
    </div>
  )
}
