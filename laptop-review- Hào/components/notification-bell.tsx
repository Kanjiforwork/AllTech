"use client"

import { useState } from "react"
import { Bell } from "lucide-react"

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New review for MacBook Pro 16",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "Price drop on Dell XPS 15",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      message: "New comparison: Gaming vs. Ultrabooks",
      time: "3 days ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-gray-700 rounded-full hover:bg-gray-100">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-80 mt-2 overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-gray-500 hover:text-gray-700">
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-sm text-center text-gray-500">No notifications</div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-gray-50 ${notification.read ? "" : "bg-gray-50"}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start">
                      {!notification.read && <div className="w-2 h-2 mt-1 mr-2 bg-blue-500 rounded-full"></div>}
                      <div className={`flex-1 ${notification.read ? "" : "font-medium"}`}>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-2 text-center border-t">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 text-xs text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
