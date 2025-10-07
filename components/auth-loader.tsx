"use client"

import { useEffect, useState } from "react"
import { Gamepad2, Shield } from "lucide-react"

interface AuthLoaderProps {
  onComplete?: () => void
  duration?: number
}

export default function AuthLoader({ onComplete, duration = 3000 }: AuthLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = ["Initializing...", "Checking credentials...", "Loading profile...", "Almost ready..."]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 100)

        // Update step based on progress
        const stepIndex = Math.floor((newProgress / 100) * steps.length)
        setCurrentStep(Math.min(stepIndex, steps.length - 1))

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete?.(), 500)
          return 100
        }

        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [duration, onComplete, steps.length])

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Logo and spinner */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto relative">
            <div className="absolute inset-0 border-3 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Brand */}
        <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          Xovan Store
        </h2>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>{steps[currentStep]}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-400 to-pink-400 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Security indicator */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <Shield className="w-3 h-3" />
          <span>Secure connection established</span>
        </div>
      </div>
    </div>
  )
}
