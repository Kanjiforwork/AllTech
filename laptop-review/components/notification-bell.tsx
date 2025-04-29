"use client"

import { useState } from "react"
import { BellIcon } from "lucide-react"

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Review: Dell XPS 15",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Price Drop Alert: MacBook Air M3",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      title: "New Comment on Your Review",
      time: "3 days ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 text-gray-700 transition-colors hover:text-gray-900"
      >
        <BellIcon className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div 
          className="absolute right-0 z-20 w-80 mt-2 overflow-hidden bg-white rounded-lg shadow-lg animate-fade-in"
          style={{animationDuration: '0.2s'}}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-medium text-gray-500 hover:text-gray-900"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-sm text-center text-gray-500">No notifications</div>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b transition-colors hover:bg-gray-50 ${
                    !notification.read ? "bg-gray-50" : ""
                  } animate-fade-up`}
                  style={{animationDelay: `${index * 0.05}s`}}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    {!notification.read && (
                      <div className="w-2 h-2 mt-1.5 mr-2 bg-blue-500 rounded-full"></div>
                    )}
                    <div className={!notification.read ? "ml-0" : "ml-4"}>
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-3 text-center border-t">
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}