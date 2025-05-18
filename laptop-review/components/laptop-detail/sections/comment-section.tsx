"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp } from "lucide-react"
import { type Comment, getCommentsByLaptopId, addComment as addCommentToCollection } from "@/mock_data/comment-collection"

// Định nghĩa kiểu dữ liệu cho laptop
interface Laptop {
  id: string
  name: string
}

interface CommentSectionProps {
  laptop?: Laptop
  laptopId?: string
  laptopName?: string
}

export function CommentSection({ laptop, laptopId: propLaptopId, laptopName: propLaptopName }: CommentSectionProps) {
  // Xác định laptopId từ prop laptop hoặc prop laptopId
  const laptopId = laptop?.id || propLaptopId || "default-laptop"

  // Xác định laptopName từ prop laptop hoặc prop laptopName
  const displayName = propLaptopName || laptop?.name || "Sản phẩm"

  // State để lưu trữ comments
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")

  // Lấy comments từ collection khi component mount hoặc laptopId thay đổi
  useEffect(() => {
    const laptopComments = getCommentsByLaptopId(laptopId)
    setComments(laptopComments)
  }, [laptopId])

  // Hàm thêm comment mới
  const handleAddComment = () => {
    if (!newComment.trim()) return

    const commentData = {
      laptopId: laptopId,
      userId: "current-user", // Trong thực tế, lấy từ thông tin người dùng đã đăng nhập
      username: "Kanji", // Tên người dùng hiện tại
      content: newComment,
    }

    // Thêm comment vào collection
    const newCommentObj = addCommentToCollection(commentData)

    // Cập nhật state
    setComments([newCommentObj, ...comments])
    setNewComment("")
  }

  // Hàm định dạng thời gian
  const formatTimestamp = (date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Vừa xong"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`
  }

  // Hàm thích comment
  const handleLikeComment = (id: string) => {
    // Cập nhật state
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment)))

    // Trong thực tế, bạn sẽ gọi API để cập nhật likes trong cơ sở dữ liệu
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700 p-6 mb-6">
      {/* Tiêu đề */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">
          Bình luận về {displayName} ({comments.length})
        </h2>
      </div>

      {/* Ô nhập comment */}
      <div className="p-4">
        <Textarea
          placeholder={`Viết bình luận về ${displayName}...`}
          className="w-full resize-none border rounded-lg p-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Button onClick={handleAddComment}>Đăng</Button>
        </div>
      </div>

      {/* Danh sách comment */}
      <div className="p-4 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-3 last:border-0">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="font-semibold">{comment.username}</div>
                <p className="mt-1">{comment.content}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{formatTimestamp(comment.timestamp)}</span>
                <button className="font-medium hover:underline" onClick={() => handleLikeComment(comment.id)}>
                  Thích
                </button>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            Chưa có bình luận nào về sản phẩm này. Hãy là người đầu tiên bình luận!
          </div>
        )}
      </div>
    </div>
  )
}
