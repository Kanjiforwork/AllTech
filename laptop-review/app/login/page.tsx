"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider, User, createUserAccount, signInUser, signInWithGoogle } from "@/lib/firebase";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use the OOP function from firebase.js
      const user = await signInUser(email, password);
      
      // Check if user is null before storing in localStorage
      if (!user) {
        throw new Error("Authentication failed");
      }
  
      // Store user info consistently with the register page
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email.split("@")[0]
      }));
  
      console.log("User logged in:", user);
      alert("Login successful!");
      router.push("/");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      alert("Invalid email or password!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Use the OOP function from firebase.js
      const user = await signInWithGoogle();
      if (!user) {
        throw new Error("Authentication failed");
      }
      // Store user info consistently with the register page
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }));

      console.log("User signed in with Google:", user);
      alert("Google Login successful!");
      router.push("/");
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      alert("Google Login failed!");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error: any) {
      console.error("Error sending password reset email:", error.message);
      alert("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-16 h-16"
            />
          </div>
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Login</h1>
          <form onSubmit={handleLogin}>
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
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
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
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Login
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100 transition duration-300"
          >
            <img
              src="/google-icon.svg"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
          <p className="text-sm text-center">
            <button
              onClick={handleForgotPassword}
              className="text-black hover:underline"
            >
              Forgot your password?
            </button>
          </p>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-black hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}