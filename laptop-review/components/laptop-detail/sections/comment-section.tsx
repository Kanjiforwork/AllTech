"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MoreHorizontal } from "lucide-react"
import { type Comment, commentCollection, addComment } from "@/lib/comment-collection"

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(commentCollection)
  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = addComment({
      userId: "current-user", // Trong thực tế, lấy từ thông tin người dùng đã đăng nhập
      username: "Kanji",
      content: newComment,
    })

    setComments([comment, ...comments])
    setNewComment("")
  }

  const formatTimestamp = (date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Vừa xong"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`
  }

  const handleLikeComment = (id: string) => {
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment)))
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Bình luận ({comments.length})</h2>
      </div>

      {/* Comment input */}
      <div className="p-4">
        <div className="flex-1">
          <Textarea
            placeholder="Viết bình luận..."
            className="w-full resize-none border rounded-lg p-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button onClick={handleAddComment}>Đăng</Button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <CommentItem
              comment={comment}
              onLike={() => handleLikeComment(comment.id)}
              formatTimestamp={formatTimestamp}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface CommentItemProps {
  comment: Comment
  onLike: () => void
  formatTimestamp: (date: Date) => string
}

function CommentItem({ comment, onLike, formatTimestamp }: CommentItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="font-semibold">{comment.username}</div>
          <p className="mt-1">{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
          <span>{formatTimestamp(comment.timestamp)}</span>
          <button className="font-medium hover:underline" onClick={onLike}>
            Thích
          </button>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ThumbsUp className="w-4 h-4" />
            <span>{comment.likes}</span>
          </button>
        </div>
      </div>
      <button className="text-gray-500 hover:text-gray-700">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  )
}
