"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Download, BookOpen, BarChart3, Clock } from "lucide-react"
import { showToast } from "@/components/toast"

export default function APISection() {
  const [apiKey, setApiKey] = useState("gtp_api_1234567890abcdef")
  const [copied, setCopied] = useState(false)

  const usageStats = [
    { label: "Total Requests", value: "1,234", icon: BarChart3, color: "bg-blue-100 text-blue-800" },
    { label: "Rate Limit", value: "500/min", icon: Download, color: "bg-green-100 text-green-800" },
    { label: "Last Used", value: "2 hours ago", icon: Clock, color: "bg-purple-100 text-purple-800" },
  ]

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    showToast("API Key copied to clipboard!", "success")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            API Access
          </CardTitle>
          <CardDescription>
            Manage your API key and view usage statistics for your hosting services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">Your API Key</h4>
                <p className="text-sm text-muted-foreground">Keep this secure. Do not share it publicly. Use it to integrate with our API.</p>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Active
              </Badge>
            </div>
            <div className="relative">
              <Input
                value={apiKey}
                readOnly
                className="pr-10 bg-muted/50 rounded-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={copyApiKey}
              >
                <Copy className="h-4 w-4" />
              </Button>
              {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download Docs
              </Button>
              <Button className="flex-1">
                <BookOpen className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">Usage Statistics</h4>
            <div className="grid gap-4 md:grid-cols-3">
              {usageStats.map((stat, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="font-semibold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}