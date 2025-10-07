"use client"

import { LucideIcon, Shield, XCircle } from "lucide-react"
import { useEffect } from "react"

type Highlight = {
  icon: LucideIcon
  text: string
  color: string
}

type FailedProps = {
  title: string
  subtitle: string
  highlights?: Highlight[]
  MainIcon?: LucideIcon
}

export default function AuthFailedPage({ title, subtitle, highlights, MainIcon }: FailedProps) {
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
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-red-300 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-300 rounded-full animate-ping delay-500"></div>
      </div>

      <div className="text-center z-10">
        {/* Failed animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Glowing red ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-red-400 border-r-pink-400 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-b-rose-400 border-l-red-300 rounded-full animate-spin animate-reverse"></div>

            {/* Center X icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {MainIcon ? <MainIcon className="w-10 h-10 text-red-400 animate-bounce" /> : <XCircle className="w-10 h-10 text-red-400 animate-bounce" /> }
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Failed text */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
            {title}
          </h1>

          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <Shield className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm">{subtitle}</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-red-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-1 h-1 bg-rose-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-8 space-y-3 text-xs text-gray-400">
            {highlights?.map((h, i) => {
              const Icon = h.icon
              return (
                <div key={i} className="flex items-center justify-center space-x-2 opacity-60 animate-fade-in" style={{ animationDelay: `${i * 0.3}s` }}>
                  <Icon className={`w-3 h-3 ${h.color}`} />
                  <span>{h.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
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
