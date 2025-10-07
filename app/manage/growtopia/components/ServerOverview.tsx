"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Server, Play, Square, Users, Clock, Zap, Activity } from "lucide-react"
import { LiveLogs } from "./LiveLogs"

interface ServerStats {
  playersOnline: number
  maxPlayers: number
  uptime: string
  ping: string
}

interface ServerOverviewProps {
  serverName: string
  serverStatus: string
  serverStats: ServerStats
  handleServerAction: (action: "start" | "stop" | "restart") => void
  actionLoading: boolean
  handleUpdateServer: () => void
}

function ServerOverview({
  serverName,
  serverStatus,
  serverStats,
  handleServerAction,
  actionLoading,
  handleUpdateServer
}: ServerOverviewProps) {
  const isOnline = serverStatus === "online"

  return (
    <div className="space-y-8">
      {/* Server Console */}
      <Card className="bg-gray-800 border-gray-700 rounded-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-100">
            <Activity className="h-5 w-5 text-gray-400" />
            Server Console
          </CardTitle>
          <CardDescription className="text-gray-400">
            Control and monitor your server's operational status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Start */}
            <Button
              type="button"
              disabled={actionLoading || isOnline}
              className={`h-12 flex flex-col items-center gap-2 transition-all duration-200 rounded-none ${
                isOnline
                  ? "opacity-50 cursor-not-allowed bg-gray-700"
                  : "bg-green-600 hover:bg-green-500 text-white"
              }`}
              onClick={() => handleServerAction("start")}
            >
              <Play className="h-5 w-5" />
              <span className="text-sm font-medium">
                {actionLoading && !isOnline ? "Starting..." : "Start"}
              </span>
            </Button>

            {/* Stop */}
            <Button
              type="button"
              disabled={actionLoading || !isOnline}
              variant="destructive"
              className={`h-12 flex flex-col items-center gap-2 transition-all duration-200 ${
                !isOnline
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={() => handleServerAction("stop")}
            >
              <Square className="h-5 w-5" />
              <span className="text-sm font-medium">
                {actionLoading && isOnline ? "Stopping..." : "Stop"}
              </span>
            </Button>

            {/* Restart */}
            <Button
              type="button"
              disabled={actionLoading || !isOnline}
              className={`h-12 flex flex-col items-center gap-2 transition-all duration-200 ${
                !isOnline
                  ? "opacity-50 cursor-not-allowed bg-gray-700"
                  : "bg-yellow-600 hover:bg-yellow-700 text-gray-900"
              }`}
              onClick={() => handleServerAction("restart")}
            >
              <Zap className="h-5 w-5" />
              <span className="text-sm font-medium">
                {actionLoading ? "Restarting..." : "Restart"}
              </span>
            </Button>

            {/* Update */}
            <Button
              type="button"
              disabled={actionLoading || isOnline}
              className={`h-12 flex flex-col items-center gap-2 transition-all duration-200 ${
                isOnline
                  ? "opacity-50 cursor-not-allowed bg-gray-700"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={handleUpdateServer}
            >
              <Server className="h-5 w-5" />
              <span className="text-sm font-medium">
                {actionLoading ? "Updating..." : "Update"}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Server Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 rounded-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  Players Online
                </p>
                <p className="text-3xl font-bold text-gray-100">
                  {serverStats.playersOnline}
                </p>
                <p className="text-xs text-gray-500">
                  of {serverStats.maxPlayers} max
                </p>
              </div>
              <div className="p-3 bg-gray-700">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 rounded-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  Server Uptime
                </p>
                <p className="text-3xl font-bold text-gray-100">
                  {serverStats.uptime}
                </p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
              <div className="p-3 bg-gray-700">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 rounded-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  Server Ping
                </p>
                <p className="text-3xl font-bold text-gray-100">
                  {serverStats.ping}
                </p>
                <p className="text-xs text-gray-500">Average response</p>
              </div>
              <div className="p-3 bg-gray-700">
                <Zap className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 rounded-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  Server Status
                </p>
                <p className="text-2xl font-bold text-gray-100 capitalize">
                  {serverStatus}
                </p>
                <p className="text-xs text-gray-500">Current state</p>
              </div>
              <div className="p-3 bg-gray-700">
                <Server className={`h-6 w-6 ${
                  serverStatus === 'online' ? 'text-green-400' : 'text-red-400'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Server Logs */}
      <LiveLogs serverName={serverName} />
    </div>
  )
}

export { ServerOverview }