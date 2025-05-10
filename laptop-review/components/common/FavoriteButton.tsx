"use client"

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { User } from '@/lib/firebase'

interface FavoriteButtonProps {
  laptopId: string | number
  className?: string
  size?: number
  initialFavorite?: boolean
  onToggleFavorite?: (isFavorite: boolean) => void
}

export default function FavoriteButton({
  laptopId,
  className = '',
  size = 16,
  initialFavorite = false,
  onToggleFavorite
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [user, setUser] = useState<any>(null)

  // Lấy thông tin người dùng từ localStorage khi component được render
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user')
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage))
    }

    // Kiểm tra xem laptop đã được yêu thích chưa
    const checkFavoriteStatus = async () => {
      if (!userFromStorage) return
      
      const userData = JSON.parse(userFromStorage)
      try {
        const userObj = await User.getFromFirestore(userData.uid)
        if (userObj) {
          const isFav = userObj.isFavorite(String(laptopId))
          setIsFavorite(isFav)
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái yêu thích:", error)
      }
    }

    checkFavoriteStatus()
  }, [laptopId])

  const toggleFavorite = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để sử dụng tính năng yêu thích!')
      return
    }

    try {
      const userObj = await User.getFromFirestore(user.uid)
      if (!userObj) return

      const newFavoriteState = !isFavorite

      if (newFavoriteState) {
        await userObj.addFavoriteItem(String(laptopId))
      } else {
        await userObj.removeFavoriteItem(String(laptopId))
      }

      // Cập nhật trạng thái hiển thị
      setIsFavorite(newFavoriteState)
      
      // Gọi callback nếu được cung cấp
      if (onToggleFavorite) {
        onToggleFavorite(newFavoriteState)
      }
      
      // Cập nhật trang favorite (nếu người dùng đang ở trang favorite)
      // và thông báo cho người dùng biết
      if (window.location.pathname.includes('/favorite') && !newFavoriteState) {
        window.location.reload()
      } else if (newFavoriteState) {
        alert('Đã thêm vào danh sách yêu thích')
      } else {
        alert('Đã xóa khỏi danh sách yêu thích')
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái yêu thích:", error)
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault() // Ngăn chặn sự kiện click lan sang parent component
        e.stopPropagation()
        toggleFavorite()
      }}
      className={`transition-colors duration-300 ${className}`}
      aria-label={isFavorite ? "Xóa khỏi mục yêu thích" : "Thêm vào yêu thích"}
    >
      <Heart 
        size={size} 
        className={`transition-colors duration-300 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`}
      />
    </button>
  )
} 