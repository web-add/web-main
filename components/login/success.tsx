"use client"

import { Gamepad2, ShieldCheck, Zap, CheckCircle2 } from "lucide-react"
import { useEffect } from "react"

export default function AuthLoadingPage() {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
      <div className="flex items-center justify-center relative overflow-hidden fixed inset-0 z-50 bg-black h-screen w-screen">
  {/* Animated background elements */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
    <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-green-300 rounded-full animate-bounce"></div>
    <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-lime-300 rounded-full animate-pulse delay-300"></div>
    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-300 rounded-full animate-ping delay-500"></div>
  </div>

  <div className="text-center z-10">
    {/* Success animation */}
    <div className="relative mb-8">
      <div className="w-24 h-24 mx-auto relative">
        {/* Glowing green ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-green-400 border-r-lime-400 rounded-full animate-spin"></div>

        {/* Inner glowing ring */}
        <div className="absolute inset-2 border-4 border-transparent border-b-emerald-400 border-l-green-300 rounded-full animate-spin animate-reverse"></div>

        {/* Center check icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <CheckCircle2 className="w-10 h-10 text-green-400 animate-bounce" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-lime-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Success text */}
    <div className="space-y-4">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
        Login Successful
      </h1>

      <div className="flex items-center justify-center space-x-2 text-gray-300">
        <ShieldCheck className="w-4 h-4 text-green-400 animate-pulse" />
        <span className="text-sm">Redirecting to dashboard...</span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-1 h-1 bg-lime-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Highlights */}
      <div className="mt-8 space-y-3 text-xs text-gray-400">
        <div className="flex items-center justify-center space-x-2 opacity-60 animate-fade-in">
          <Zap className="w-3 h-3 text-green-400" />
          <span>Fast & Secure Login</span>
        </div>
        <div className="flex items-center justify-center space-x-2 opacity-60 animate-fade-in delay-300">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Protected Session</span>
        </div>
        <div className="flex items-center justify-center space-x-2 opacity-60 animate-fade-in delay-500">
          <Gamepad2 className="w-3 h-3 text-lime-400" />
          <span>Enjoy Your Gaming</span>
        </div>
      </div>
    </div>
  </div>

  {/* Animated grid overlay */}
  <div className="absolute inset-0 opacity-5">
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `
        linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
      `,
        backgroundSize: "50px 50px",
        animation: "grid-move 20s linear infinite",
      }}
    ></div>
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
