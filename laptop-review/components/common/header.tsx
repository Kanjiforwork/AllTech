import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from "react"
import { SearchIcon, Heart, X } from "lucide-react"
import NotificationBell from "@/components/notification-bell"
import { laptopService } from "@/services/firebaseServices"
import { useRouter } from 'next/navigation'

// Định nghĩa kiểu dữ liệu cho laptop
interface Laptop {
  id: string;
  name: string;
  image?: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    display: string;
  } | string;
  detailLink?: string;
}

export default function Header() {
  const [user, setUser] = useState<{ email: string; username: string; avatar: string | null } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Laptop[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Xử lý click ngoài khu vực tìm kiếm để đóng kết quả
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Xử lý tìm kiếm khi người dùng nhập
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setIsSearching(true);
        try {
          const results = await laptopService.search(searchTerm);
          setSearchResults(results as Laptop[]);
          setShowResults(true);
        } catch (error) {
          console.error("Lỗi khi tìm kiếm:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/all-laptops?search=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };

  const handleSearchItemClick = (laptopId: string) => {
    router.push(`/laptops/${laptopId}`);
    setShowResults(false);
    setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

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
          <div className="relative flex-1 max-w-lg" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm laptop..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-10 text-sm bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <SearchIcon className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                {searchTerm && (
                  <button 
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
            
            {/* Kết quả tìm kiếm */}
            {showResults && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="inline-block h-6 w-6 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
                    <p className="mt-2">Đang tìm kiếm...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    {searchResults.map((laptop) => (
                      <div 
                        key={laptop.id}
                        className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSearchItemClick(laptop.id)}
                      >
                        {laptop.image && (
                          <div className="w-10 h-10 mr-3 bg-gray-200 rounded-md overflow-hidden relative flex-shrink-0">
                            <Image 
                              src={laptop.image} 
                              alt={laptop.name}
                              fill
                              style={{objectFit: 'contain'}}
                              className="p-1"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{laptop.name}</h4>
                          <p className="text-xs text-gray-500 truncate">
                            {typeof laptop.specs === 'string' 
                              ? laptop.specs 
                              : `${laptop.specs.cpu}, ${laptop.specs.ram}, ${laptop.specs.storage}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <p>Không tìm thấy laptop nào phù hợp!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right-side buttons */}
          <div className="flex items-center space-x-8">
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
