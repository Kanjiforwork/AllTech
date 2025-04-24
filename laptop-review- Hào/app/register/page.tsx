"use client";

import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,googleProvider } from "../../firebase"; // Đường dẫn tương đối
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter(); // Khởi tạo useRouter

  useEffect(() => {
    // Đánh dấu rằng component đã được hydrate
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Tránh render trước khi hydration hoàn tất
    return null;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify({ email: user.email, username: name }));
      console.log("User registered:", user);
      alert("Registration successful!");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Đăng nhập bằng Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify({ email: user.email, username: user.displayName }));
  
      console.log("User signed in with Google:", user);
      alert("Google Sign-Up successful!");
  
      // Điều hướng đến trang chính (page.tsx)
      router.push("/");
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      alert("Google Sign-Up failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
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
  );
}