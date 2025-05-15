"use client";

import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db, googleProvider, User, createUserAccount, signInUser, signInWithGoogle } from "@/lib/firebase";
import Link from "next/link";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use the OOP approach from your firebase.js
      const user = await createUserAccount(email, password);
      
      // Update the user's displayName
      user.displayName = name;
      await user.saveToFirestore();
      
      // Store minimal user info in localStorage if needed for UI
      localStorage.setItem("user", JSON.stringify({ 
        uid: user.uid,
        email: user.email, 
        displayName: user.displayName 
      }));
      
      console.log("User registered:", user);
      toast({
        title: "Đăng ký thành công",
        description: "Chào mừng bạn đến với hệ thống!",
        variant: "default",
      });
      
      router.push("/");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      toast({
        title: "Đăng ký thất bại",
        description: error.message || "Có lỗi xảy ra trong quá trình đăng ký",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Use the OOP approach from your firebase.js
      const user = await signInWithGoogle();
      
      // Add null check before storing user info
      if (!user) {
        throw new Error("Authentication failed");
      }
      
      // Store minimal user info in localStorage if needed for UI
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }));
  
      console.log("User signed in with Google:", user);
      toast({
        title: "Đăng ký thành công",
        description: "Đã đăng ký bằng tài khoản Google",
        variant: "default",
      });
  
      router.push("/");
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      toast({
        title: "Đăng ký thất bại",
        description: error.message || "Không thể đăng ký bằng Google",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          {/* Logo Section */}
          <div className="flex justify-center mb-6">
            <img
              src="/LapInsight_Logo.png"
              alt="Logo"
              className="w-16 h-16"
            />
          </div>
          <h1 className="mb-6 text-2xl font-bold text-center">Register</h1>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
            >
              Register
            </button>
          </form>
          <button
            onClick={handleGoogleSignUp}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100"
          >
            <img
              src="/google-icon.svg"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}