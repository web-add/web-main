"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageSquare, Zap, ExternalLink } from "lucide-react"

export default function DiscordPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-slate-950" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 space-y-16">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Join Our Discord Community
          </h1>
          <p className="text-gray-300 text-lg">
            Chat with members, get updates, and be part of something awesome.
          </p>
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-8 py-4 mt-4 shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            onClick={() =>
              window.open("https://discord.gg/YOUR_INVITE_LINK", "_blank")
            }
          >
            <ExternalLink className="w-5 h-5" />
            Join Discord Now
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Card className="bg-black/40 border-purple-800/30 backdrop-blur-xl">
            <CardContent className="p-6 space-y-2">
              <Users className="w-10 h-10 text-purple-400 mx-auto" />
              <h3 className="text-xl font-bold">2,300+ Members</h3>
              <p className="text-gray-400 text-sm">Active and growing daily</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-purple-800/30 backdrop-blur-xl">
            <CardContent className="p-6 space-y-2">
              <MessageSquare className="w-10 h-10 text-indigo-400 mx-auto" />
              <h3 className="text-xl font-bold">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Get help anytime</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-purple-800/30 backdrop-blur-xl">
            <CardContent className="p-6 space-y-2">
              <Zap className="w-10 h-10 text-yellow-400 mx-auto" />
              <h3 className="text-xl font-bold">Fast Updates</h3>
              <p className="text-gray-400 text-sm">Stay up-to-date</p>
            </CardContent>
          </Card>
        </div>

        {/* Discord Preview */}
        <div className="max-w-3xl mx-auto bg-black/50 border border-gray-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-sm text-gray-400">discord-preview</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-purple-400 font-semibold">Admin</p>
              <p>Welcome to our Discord! 🎉</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-indigo-400 font-semibold">Member</p>
              <p>Just joined, excited to be here!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
