"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Server, Users, Play, Circle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { MY_API } from "@/lib/config"

export default function ServicesSection() {
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchServers = async () => {
    try {
      const res = await fetch(`${MY_API}/server/imowner`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const data = await res.json()

      if (data.success) {
        const now = Math.floor(Date.now() / 1000)

        const serversWithStatus = data.servers.map((s) => {
          const diff = now - s.last_updated
          return {
            ...s,
            status: diff <= 60 ? "active" : "inactive",
          }
        })

        setServers(serversWithStatus)
      }
    } catch (err) {
      console.error("Failed to fetch servers", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServers()

    const interval = setInterval(fetchServers, 30000)
    return () => clearInterval(interval)
  }, [])


  if (loading) return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-2xl border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Growtopia Services
          </CardTitle>
          <CardDescription>
            Manage and monitor your hosted game servers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="shadow-lg rounded-2xl border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Play className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-muted rounded-full w-16"></div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="h-3 bg-muted rounded w-12"></div>
                    <div className="h-8 bg-muted rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-2xl border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Growtopia Services
          </CardTitle>
          <CardDescription>
            Manage and monitor your hosted game servers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {servers.length === 0 ? (
            <div className="text-center py-12">
              <Server className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Servers Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't added any Growtopia servers yet. Get started by adding your first server through the admin console.
              </p>
              <div className="space-y-2">
                <Link href="/dashboard">
                  <Button>
                    <Server className="mr-2 h-4 w-4" />
                    Add Your First Server
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">Available in Admin Console</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {servers
                  .sort((a, b) => a.port - b.port) // Sort by port number
                  .map((service) => (
                  <Card key={service.id} className="shadow-lg rounded-2xl border border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Play className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{service.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{service.online} players online</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={service.status === "active" ? "default" : "secondary"}
                          className={`flex items-center gap-1 ${
                            service.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {service.status === "active" ? <Circle className="h-3 w-3 fill-current" /> : <AlertCircle className="h-3 w-3" />}
                          {service.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Port: {service.port}
                        </div>
                        <Link href={`/manage/growtopia/${service.name}`}>
                          <Button size="sm">
                            Manage Server
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}