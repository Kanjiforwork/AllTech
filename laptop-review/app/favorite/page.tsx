"use client"

import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { User } from '@/lib/firebase'
import { laptopService } from '@/services/firebaseServices'
import FavoriteButton from '@/components/common/FavoriteButton'

const FavoritePage = () => {
  const [user, setUser] = useState<any>(null)
  const [favoriteItems, setFavoriteItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user')
    if (userFromStorage) {
      const userData = JSON.parse(userFromStorage)
      setUser(userData)
      fetchFavoriteItems(userData.uid)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchFavoriteItems = async (userId: string) => {
    try {
      setLoading(true)
      
      // Lấy thông tin user từ Firestore
      const userObj = await User.getFromFirestore(userId)
      console.log("User Object:", userObj)
      
      if (!userObj || !userObj.favoriteItems || userObj.favoriteItems.length === 0) {
        console.log("Không có dữ liệu yêu thích hoặc danh sách rỗng")
        setFavoriteItems([])
        setLoading(false)
        return
      }
      
      // Lấy thông tin laptop từ danh sách id yêu thích
      const favoriteIds = userObj.favoriteItems
      console.log("Danh sách ID yêu thích:", favoriteIds)
      
      const laptops = await Promise.all(
        favoriteIds.map(async (id: string) => {
          try {
            console.log("Đang tải laptop ID:", id)
            const laptop = await laptopService.getById(id)
            console.log("Kết quả laptop:", laptop)
            return laptop
          } catch (error) {
            console.error(`Lỗi khi lấy thông tin laptop ${id}:`, error)
            return null
          }
        })
      )
      
      // Lọc bỏ các phần tử null (trường hợp một laptop đã bị xóa)
      const validLaptops = laptops.filter(laptop => laptop !== null)
      console.log("Danh sách laptop hợp lệ:", validLaptops)
      setFavoriteItems(validLaptops)
    } catch (error) {
      console.error("Lỗi khi lấy danh sách yêu thích:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = async (laptopId: string) => {
    if (!user) return
    
    try {
      const userObj = await User.getFromFirestore(user.uid)
      if (!userObj) return
      
      await userObj.removeFavoriteItem(laptopId)
      // Cập nhật lại danh sách
      setFavoriteItems(favoriteItems.filter(item => item.id !== laptopId))
    } catch (error) {
      console.error("Lỗi khi xóa mục yêu thích:", error)
    }
  }

  // Hàm làm mới dữ liệu
  const refreshData = () => {
    if (user) {
      fetchFavoriteItems(user.uid)
    }
  }
  
  // Làm mới hoàn toàn trang bằng cách làm mới trình duyệt
  const forceRefresh = () => {
    // Xóa bộ nhớ cache
    if (window.caches) {
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          return caches.delete(key);
        }));
      });
    }
    
    // Làm mới trang
    window.location.reload();
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Laptop Yêu Thích</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Laptop Yêu Thích</h2>
        <div className="p-8 text-center bg-white border rounded-lg shadow-sm">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium">Vui lòng đăng nhập</h3>
          <p className="mb-4 text-sm text-gray-500">
            Đăng nhập để lưu và xem danh sách laptop yêu thích của bạn.
          </p>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    )
  }

  if (favoriteItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Laptop Yêu Thích</h2>
        <div className="p-8 text-center bg-white border rounded-lg shadow-sm">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium">Bạn chưa có laptop yêu thích</h3>
          <p className="mb-4 text-sm text-gray-500">
            Hãy duyệt qua các laptop và nhấn vào biểu tượng trái tim để thêm vào danh sách yêu thích.
          </p>
          <Link href="/all-laptops" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Xem Laptop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Laptop Yêu Thích</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">{favoriteItems.length} laptop yêu thích</p>
        <div className="flex gap-2">
          <button 
            onClick={refreshData}
            className="px-3 py-1 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            Làm mới dữ liệu
          </button>
          <button 
            onClick={forceRefresh}
            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Làm mới trang
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteItems.map((laptop) => (
          <div key={laptop.id} className="relative overflow-hidden bg-white border rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-2 right-2 z-10">
              <FavoriteButton
                laptopId={laptop.id}
                initialFavorite={true}
                onToggleFavorite={(isFavorite) => {
                  if (!isFavorite) {
                    removeFavorite(laptop.id)
                  }
                }}
                size={20}
                className="p-1.5 bg-white rounded-full shadow-sm"
              />
            </div>
            
            <Link href={`/laptops/${laptop.id}`}>
              <div className="p-4">
                <div className="relative w-full h-40 mb-4 overflow-hidden bg-gray-200 rounded-md">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    {laptop.name}
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className={`w-4 h-4 ${j < Math.floor(laptop.benchmarks?.overall || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {laptop.benchmarks?.overall.toFixed(1) || "N/A"}
                  </span>
                </div>

                <h3 className="mb-1 font-semibold">{laptop.name}</h3>
                <p className="mb-2 text-sm text-gray-600">{laptop.specs?.cpu}</p>

                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">{laptop.price}</span>
                  {laptop.originalPrice && laptop.originalPrice !== laptop.price && (
                    <span className="text-sm text-gray-500 line-through">{laptop.originalPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritePage
