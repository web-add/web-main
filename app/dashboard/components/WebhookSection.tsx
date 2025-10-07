"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Plus, Trash2, Webhook, Activity } from "lucide-react"
import { showToast } from "@/components/toast"

export default function WebhookSection() {
  const [webhooks, setWebhooks] = useState([
    { id: 1, url: "https://example.com/webhook", events: ["server.start", "server.stop"], active: true },
    { id: 2, url: "https://myapp.com/notify", events: ["player.join"], active: false },
  ])
  const [newUrl, setNewUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const addWebhook = () => {
    if (newUrl.trim()) {
      const newWebhook = {
        id: Date.now(),
        url: newUrl.trim(),
        events: ["server.start"],
        active: true
      }
      setWebhooks([...webhooks, newWebhook])
      setNewUrl("")
      showToast("Webhook added successfully!", "success")
    }
  }

  const deleteWebhook = (id: number) => {
    setWebhooks(webhooks.filter(w => w.id !== id))
    showToast("Webhook deleted!", "warning")
  }

  const toggleWebhook = (id: number) => {
    setWebhooks(webhooks.map(w =>
      w.id === id ? { ...w, active: !w.active } : w
    ))
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    showToast("URL copied to clipboard!", "success")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Webhook Management
          </CardTitle>
          <CardDescription>
            Configure webhooks to receive real-time notifications about your server events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter webhook URL"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addWebhook}>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Active Webhooks</h4>
            <div className="space-y-3">
              {webhooks.map((webhook) => (
                <Card key={webhook.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-sm">{webhook.url}</p>
                        <Badge variant={webhook.active ? "default" : "secondary"}>
                          {webhook.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Events: {webhook.events.join(", ")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyUrl(webhook.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWebhook(webhook.id)}
                      >
                        <Activity className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteWebhook(webhook.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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