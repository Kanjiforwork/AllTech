import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from "react"
import { SearchIcon, Heart } from "lucide-react"
import NotificationBell from "@/components/notification-bell"

export default function Header() {
  const [user, setUser] = useState<{ email: string; username: string; avatar: string | null } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully!");
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container flex items-center h-16 px-4 mx-auto">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/LapInsight_Logo.png" alt="LapInsight Logo" width={40} height={40} className="rounded" />
              <span className="text-xl font-bold">LapInsight</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search laptops..."
              className="w-full h-10 pl-10 pr-4 text-sm bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <SearchIcon className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          </div>

          {/* Right-side buttons */}
          <div className="flex items-center space-x-8">
            <Link href="/news" className="flex items-center text-sm font-bold hover:text-gray-700">News</Link>
            <Link href="/compare-select" className="flex items-center text-sm font-bold hover:text-gray-700">
              So sánh
            </Link>
            <Link href="/favorite" className="flex items-center text-sm font-bold hover:text-gray-700">
              <Heart className="w-5 h-5 mr-1" />
              <span>Yêu thích</span>
            </Link>
            
            <NotificationBell />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={user?.avatar || "/user-circle.svg"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p>{user?.username}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <hr />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
