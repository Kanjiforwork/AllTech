"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { User } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Interface matching your Firestore laptop data structure
interface Laptop {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    display: string;
    battery: string;
  };
  benchmarks?: {
    gaming: number;
    productivity: number;
    content: number;
    battery: number;
    display: number;
    build: number;
    value: number;
    overall: number;
  };
  detailLink?: string;
}

export default function FavoritesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<Laptop[]>([]);

  // Check authentication status and fetch favorites
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Check if user is logged in
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setIsLoggedIn(true);
          
          // Get user data from Firestore
          if (userData.uid) {
            const userObj = await User.getFromFirestore(userData.uid);
            if (userObj) {
              setCurrentUser(userObj);
              // Get user's favorite items
              const favoriteIds = userObj.getFavorites();
              await fetchFavoriteLaptops(favoriteIds);
            }
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Function to fetch laptop data based on favorite IDs
  const fetchFavoriteLaptops = async (favoriteIds: string[]) => {
    try {
      const laptopPromises = favoriteIds.map(async (id) => {
        // Get laptop doc from Firestore
        const laptopDoc = await getDoc(doc(db, "laptops", id));
        
        if (!laptopDoc.exists()) {
          console.warn(`Laptop with ID ${id} not found`);
          return null;
        }
        
        const data = laptopDoc.data();
        return {
          id,
          name: data.name,
          image: data.image || "/placeholder.svg",
          price: data.price || "",
          originalPrice: data.originalPrice || "",
          specs: data.specs || {
            cpu: "",
            gpu: "",
            ram: "",
            storage: "",
            display: "",
            battery: ""
          },
          benchmarks: data.benchmarks,
          detailLink: `/laptops/${id}`
        };
      });

      const laptops = (await Promise.all(laptopPromises)).filter(laptop => laptop !== null) as Laptop[];
      setFavorites(laptops);
    } catch (error) {
      console.error("Error fetching favorite laptops:", error);
    }
  };

  // Function to remove a laptop from favorites
  const removeFavorite = async (id: string) => {
    try {
      if (!currentUser) return;
      
      // Remove from Firestore
      await currentUser.removeFavoriteItem(id);
      
      // Update local state
      setFavorites(favorites.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Show loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show login prompt if not logged in
  if (!isLoggedIn) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Your Favorites</h1>
        <div className="p-8 text-center bg-white border rounded-lg shadow-sm">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium">Your favorites will appear here</h3>
          <p className="mb-4 text-sm text-gray-500">
            Sign in to save your favorite laptops and access them from any device.
          </p>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Show empty state if no favorites
  if (favorites.length === 0) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Your Favorites</h1>
        <div className="p-8 text-center bg-white border rounded-lg shadow-sm">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium">No favorites yet</h3>
          <p className="mb-4 text-sm text-gray-500">
            Browse laptops and click the heart icon to add them to your favorites.
          </p>
          <Link href="/" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
            Browse Laptops
          </Link>
        </div>
      </div>
    );
  }

  // Show favorites grid
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Your Favorites</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((laptop) => (
          <div key={laptop.id} className="relative overflow-hidden bg-white border rounded-lg shadow-sm group">
            <button
              onClick={() => removeFavorite(laptop.id)}
              className="absolute z-10 p-1.5 text-red-500 bg-white rounded-full shadow-sm top-2 right-2 hover:bg-red-50"
              title="Remove from favorites"
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
            <Link href={laptop.detailLink || `/laptops/${laptop.id}`}>
              <div className="relative h-40 bg-gray-100">
                <Image
                  src={laptop.image || "/placeholder.svg"}
                  alt={laptop.name}
                  fill
                  style={{objectFit: 'contain'}}
                  className="p-2"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  {laptop.benchmarks && (
                    <>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{laptop.benchmarks.overall.toFixed(1)} rating</span>
                    </>
                  )}
                </div>
                <h3 className="mb-1 text-lg font-medium">{laptop.name}</h3>
                <p className="mb-2 text-xs text-gray-500">
                  {laptop.specs && `${laptop.specs.cpu}, ${laptop.specs.ram}, ${laptop.specs.storage}`}
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-bold">{laptop.price}</span>
                  {laptop.originalPrice && laptop.originalPrice !== laptop.price && (
                    <span className="text-sm text-gray-500 line-through">{laptop.originalPrice}</span>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-2 mt-auto">
                  <Link
                    href={laptop.detailLink || `/laptops/${laptop.id}`}
                    className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
