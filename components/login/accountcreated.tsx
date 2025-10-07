"use client"

import { CheckCircle, Gamepad2, Shield, Zap } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AccountCreatedPage() {
  const router = useRouter()
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black h-screen w-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-cyan-300 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-300 rounded-full animate-ping delay-500"></div>
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Rotating success rings */}
            <div className="absolute inset-0 border-4 border-transparent border-t-green-400 border-r-cyan-400 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-b-purple-400 border-l-pink-400 rounded-full animate-spin animate-reverse"></div>

            {/* Center check icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-400 animate-bounce" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Account Created!
          </h1>
          <p className="text-gray-300">Your account has been successfully created.</p>

          {/* Highlights */}
          <div className="mt-6 space-y-3 text-xs text-gray-400">
            <div className="flex items-center justify-center space-x-2 opacity-60 animate-fade-in">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>High Performance Servers</span>
            </div>
            <div className="flex items-center justify-center space-x-2 opacity-60 animate-fade-in delay-300">
              <Shield className="w-3 h-3 text-purple-400" />
              <span>Anti-DDoS Protection</span>
            </div>
            <div className="flex items-center justify-center space-x-2 opacity-60 animate-fade-in delay-500">
              <Gamepad2 className="w-3 h-3 text-pink-400" />
              <span>24/7 Gaming Support</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="mt-6 w-48 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
          >
            Continue to Login
          </button>
        </div>
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0.6; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  )
}
