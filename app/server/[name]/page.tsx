"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  Users,
  Star,
  Wifi,
  Download,
  Grid2x2,
  Smartphone,
  Monitor,
  MessageSquare,
  Rocket,
  Send,
  Radio,
  Apple,
  MessageCircle,
  Youtube,
  Music,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ToastContainer, showToast } from "@/components/toast";
import { MY_API } from "@/lib/config";
export const runtime = "edge";

function formatDate(utcString: string) {
  // tambahkan "Z" agar dianggap UTC
  const d = new Date(utcString + "Z");
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}


export default function ServerDetail() {
  const params = useParams()
  const serverName = (params.name as string)?.toLowerCase()
  const [server, setServer] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<any[]>([])
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewError, setReviewError] = useState("")
  const [avgRating, setAvgRating] = useState<string>("0.0");
  const fetched = useRef(false);

  useEffect(() => {
    const fetchServer = async () => {
      if (fetched.current) return; // cegah eksekusi kedua
      fetched.current = true;
      try {
        const res = await fetch(`${MY_API}/server/${serverName}`, {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        })
        const data = await res.json()
        setServer(data.server)
        setComments(data.reviews)
        if (data.reviews && data.reviews.length > 0) {
          const total = data.reviews.reduce((sum: number, r: any) => sum + Number(r.rating), 0);
          setAvgRating((total / data.reviews.length).toFixed(1));
        } else {
          setAvgRating("0.0");
        }
      } catch (err) {
        console.error(err)
        setServer(null)
      } finally {
        setLoading(false)
      }
    }
    if (serverName) fetchServer()
  }, [serverName])

  if (loading) {
    return (
      <section className="flex items-center justify-center text-center px-4 
                            min-h-[calc(100vh-4rem-6rem)]">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
              Loading Data...
            </h1>
          </div>
        </section>
    )
  }
  if (!server) {
    return (
      <section className="flex items-center justify-center text-center px-4 
                          min-h-[calc(100vh-4rem-6rem)]">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
            Server not found
          </h1>
          <p className="text-muted-foreground mb-6">
            The server <span className="font-mono">{params.name}</span> does not exist.
          </p>
          <Button asChild>
            <Link href="/servers">Go back to servers</Link>
          </Button>
        </div>
      </section>
    )
  }

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          i < Math.floor(rating)
            ? "fill-secondary text-secondary"
            : i < rating
              ? "fill-secondary/50 text-secondary"
              : interactive
                ? "text-muted-foreground hover:text-secondary"
                : "text-muted-foreground"
        }`}
        onClick={() => interactive && onRate && onRate(i + 1)}
      />
    ))
  }

  const handleSubmitReview = async () => {
    if (!userRating || !userComment) {
      setReviewError("Please provide a rating and a comment.");
      return
    }
    try {
      setReviewLoading(true);
      setReviewError("");
      const res = await fetch(`${MY_API}/server/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // supaya cookie/token kebawa
        body: JSON.stringify({
          serverId: server.id,
          rating: userRating,
          comment: userComment,
        }),
      })
      const data = await res.json();
      if (!res.ok) throw setReviewError(data.error || "Failed to submit review");
      if (data.success) {
        const newComments = [...comments, data.review];
        setComments(newComments);
        const total = data.reviews.reduce((sum: number, r: any) => sum + Number(r.rating), 0);
        setAvgRating((total / newComments.length).toFixed(1));
        setUserRating(0)
        setUserComment("")
      }
    } catch (err: unknown) {
    } finally {
      setReviewLoading(false);
    }
  }

  const getPingColor = (ping: number) => {
    if (ping < 50) return "text-green-400"
    if (ping < 70) return "text-yellow-400"
    return "text-red-400"
  }
  const downloadHostFile = () => {
    const hostContent = `5.175.246.104 www.growtopia1.com
5.175.246.104 www.growtopia2.com`;

    const blob = new Blob([hostContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "XovanHost.txt"; // nama file
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Host file downloaded", "success");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    showToast(`Copied ${type}`, "success");
  }
  const currentEpoch = Math.floor(Date.now() / 1000);

  const checkServerOnline = (server: any) => {
    return server.last_updated && currentEpoch - server.last_updated <= 60;
  };
  const connectionMethods = [
    {
      name: "Download Host",
      icon: Download,
      action: downloadHostFile
    },
    {
      name: "Copy Powertunnel",
      icon: Rocket,
      action: () => copyToClipboard(`https://xovan.fun/gtps/ptunnel.txt`, "Powertunnel link"),
    },
    {
      name: "Copy Surge5",
      icon: Apple,
      action: () => copyToClipboard(`https://xovan.fun/gtps/iOS.txt`, "Surge5 link"),
    },
    {
      name: "Copy IP (Windows)",
      icon: Grid2x2,
      action: () => copyToClipboard(`5.175.246.104 www.growtopia1.com
5.175.246.104 www.growtopia2.com`, "Server IP"),
    },
  ]

  const socialMediaMethods = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      action: () => window.open(server.whatsapp, "_blank"),
    },
    {
      name: "Discord",
      icon: MessageCircle,
      color: "bg-indigo-600 hover:bg-indigo-700",
      action: () => window.open(server.discord, "_blank"),
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "bg-red-600 hover:bg-red-700",
      action: () => window.open(server.youtube, "_blank"),
    },
    {
      name: "TikTok",
      icon: Music,
      color: "bg-black hover:bg-gray-800",
      action: () => window.open(server.tiktok, "_blank"),
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      <ToastContainer />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900"></div>

      {/* Subtle grid (pixel/game feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Content */}
      <div className="relative">
        {/* Enhanced Header */}
        <header className="border-b border-border/50 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/servers">
                <Button variant="ghost" size="sm" className="cursor-pointer hover:bg-primary/20 px-2 md:px-3 h-8 md:h-9">
                  <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="text-xs md:text-sm">Back</span>
                </Button>
              </Link>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Server Details</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Enhanced Server Header */}
        <div className="mb-8 animate-in slide-in-from-bottom-2 duration-500">
          <Card className="border-0 bg-gradient-to-br from-card to-muted/50 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
            {/* Server Header Background */}
            <div className="h-20 md:h-24 bg-gradient-to-r from-primary/20 to-secondary/20 relative flex items-center justify-between px-4 md:px-6">
              {/* Server Info Section */}
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{server.name}</h1>
                  <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
                    Port: {server.port}
                  </Badge>
                </div>
              </div>

              {/* Status Indicator - Single Dot */}
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${checkServerOnline(server) ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            </div>

            <CardHeader className="pb-3 md:pb-4 pt-4 md:pt-6 px-4 md:px-6">
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex-1 space-y-3 md:space-y-4">
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{server.desc}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs md:text-sm">
                      {server.location}
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30 text-xs md:text-sm">
                      {server.game}
                    </Badge>
                  </div>
                </div>

                {/* Ping Display - Mobile optimized */}
                <div className="flex items-center gap-2 md:gap-3 bg-background/80 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-border/50 self-start md:self-auto">
                  <div className={`p-1.5 md:p-2 rounded-full ${checkServerOnline(server) ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    <Wifi className={`w-4 h-4 md:w-5 md:h-5 ${checkServerOnline(server) ? getPingColor(server.ping) : "text-red-500"}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Ping</p>
                    <span className={`text-base md:text-lg font-bold ${checkServerOnline(server) ? getPingColor(server.ping) : "text-red-500"}`}>
                      {checkServerOnline(server) ? `${server.ping}ms` : "? ms"}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-6">
              {/* Live Broadcast Section */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 md:p-4 border border-primary/20 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Radio className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" />
                  <h3 className="text-sm md:text-base font-semibold text-primary">Live Server Broadcast</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Coming Soon..</p>
              </div>

              {/* Ultra Compact Stats Cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Players Online Card */}
                <Card className="group hover:shadow-md transition-all duration-300 border-primary/20 bg-gradient-to-br from-primary/8 to-primary/15">
                  <CardContent className="p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 rounded-full bg-primary/15 group-hover:bg-primary/25 transition-colors">
                          <Users className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Players</p>
                          <p className="text-base font-bold text-primary">
                            {server.online}/{server.MaxPlayer}
                          </p>
                        </div>
                      </div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                    </div>

                    {/* Ultra Compact Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${(server.online / server.MaxPlayer) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Rating Card */}
                <Card className="group hover:shadow-md transition-all duration-300 border-yellow-500/20 bg-gradient-to-br from-yellow-500/8 to-yellow-500/15">
                  <CardContent className="p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 rounded-full bg-yellow-500/15 group-hover:bg-yellow-500/25 transition-colors">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Rating</p>
                          <p className="text-base font-bold text-yellow-500">{avgRating}</p>
                        </div>
                      </div>
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                    </div>

                    {/* Ultra Compact Star Rating */}
                    <div className="flex items-center gap-0.5 group-hover:scale-105 transition-transform duration-200">
                      {renderStars(Number(avgRating))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Connection Methods */}
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Connection Methods
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {connectionMethods.map((method, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 bg-gradient-to-br from-card to-muted/30 cursor-pointer"
                      onClick={method.action}
                    >
                      <CardContent className="p-3 md:p-4 flex flex-col items-center gap-2 md:gap-3 text-center">
                        <div className="p-2 md:p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-200">
                          <method.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        </div>
                        <span className="text-xs md:text-sm font-semibold group-hover:text-primary transition-colors">
                          {method.name}
                        </span>
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Enhanced Social Media Section */}
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Join Our Community
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {socialMediaMethods.map((social, index) => (
                    <Card
                      key={index}
                      className={`group hover:shadow-xl transition-all duration-300 border-0 cursor-pointer ${social.color} hover:scale-105 transform duration-200`}
                      onClick={social.action}
                    >
                      <CardContent className="p-3 md:p-4 flex flex-col items-center gap-2 md:gap-3 text-center">
                        <div className="p-2 md:p-3 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                          <social.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-white">
                          {social.name}
                        </span>
                        <div className="w-0 group-hover:w-full h-0.5 bg-white/70 transition-all duration-300"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tutorials Section */}
        <Card className="border-0 bg-gradient-to-br from-card to-muted/30 hover:shadow-2xl transition-all duration-300 mb-6 md:mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/50 pb-4 md:pb-6">
            <CardTitle className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
              <Monitor className="w-5 h-5 md:w-6 md:h-6" />
              How to Play
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <Tabs defaultValue="windows" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-lg">
                <TabsTrigger
                  value="windows"
                  className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white transition-all duration-200"
                >
                  <Monitor className="w-4 h-4" />
                  Windows
                </TabsTrigger>
                <TabsTrigger
                  value="android"
                  className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white transition-all duration-200"
                >
                  <Smartphone className="w-4 h-4" />
                  Android
                </TabsTrigger>
                <TabsTrigger
                  value="ios"
                  className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white transition-all duration-200"
                >
                  <Apple className="w-4 h-4" />
                  iOS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="windows" className="mt-6 animate-in fade-in-50 duration-300">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-blue-500/20">
                      <Monitor className="w-5 h-5 text-blue-500" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-400">Windows Tutorial</h4>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <p className="text-sm leading-relaxed">
                        <strong className="text-blue-400">Press ⊞ Win+R (Windows Key + R) to open the "Run" window.</strong><br/>
                        Type <code className="bg-blue-500/20 px-1 rounded">C:\Windows\System32\drivers\etc</code> in the textbox.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-blue-400">Setup Steps:</h5>
                      <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed ml-4">
                        <li>Find the file named <code className="bg-blue-500/20 px-1 rounded">hosts</code></li>
                        <li>Right-click on the "hosts" file and edit it with Notepad/text editor</li>
                        <li>Download the host file, open it, copy and add the IP above</li>
                        <li>Save the hosts file</li>
                      </ol>
                    </div>

                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <p className="text-sm font-semibold text-blue-400">
                        🎉 Done! Now log in to your Growtopia.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="android" className="mt-6 animate-in fade-in-50 duration-300">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-green-500/20">
                      <Smartphone className="w-5 h-5 text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold text-green-400">Android Tutorial</h4>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <p className="text-sm leading-relaxed">
                        <strong className="text-green-400">First, download Powertunnel APP from here.</strong><br/>
                        Then click on the "Powertunnel" button.<br/>
                        It will copy the Powertunnel host link.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-green-400">Setup Steps:</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm leading-relaxed ml-4">
                        <li>Open the Powertunnel app</li>
                        <li>Click the three-line icon (menu)</li>
                        <li>Click the host settings icon</li>
                        <li>Paste the copied Powertunnel host URL</li>
                        <li>Change the host update period from 12 hours to "on start"</li>
                      </ol>
                    </div>

                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <p className="text-sm font-semibold text-green-400">
                        🎉 Now you can log in to your GTPS!
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ios" className="mt-6 animate-in fade-in-50 duration-300">
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-purple-500/20">
                      <Apple className="w-5 h-5 text-purple-500" />
                    </div>
                    <h4 className="text-xl font-bold text-purple-400">iOS Tutorial</h4>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <p className="text-sm leading-relaxed">
                        <strong className="text-purple-400">Download an app called "Surge 5" from the App Store.</strong><br/>
                        Press "OK" to continue with the setup.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-purple-400">Setup Steps:</h5>
                      <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed ml-4">
                        <li>Click on "Default.conf"</li>
                        <li>Click on "IMPORT" → "Download Profile from URL"</li>
                        <li>Paste the URL you copied when clicking the iOS host button above</li>
                        <li>Click "OK" and "Done"</li>
                        <li>Press "SETUP", agree to the policy</li>
                        <li>Click "OK" and "Allow" for VPN Configuration</li>
                      </ol>
                    </div>

                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <p className="text-sm font-semibold text-purple-400">
                        🎉 Done! Now open Growtopia and connect.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Enhanced Reviews Section */}
        <Card className="border-0 bg-gradient-to-br from-card to-muted/30 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/50 pb-4 md:pb-6">
            <CardTitle className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
              Reviews & Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
            {/* Enhanced Write Review Section */}
            <div className="bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl p-4 md:p-6 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="p-1.5 md:p-2 rounded-full bg-primary/20">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <h4 className="text-lg md:text-xl font-bold">Write a Review</h4>
              </div>

              <div className="space-y-4 md:space-y-5">
                <div>
                  <label className="text-sm font-semibold mb-2 md:mb-3 block text-foreground">Your Rating</label>
                  <div className="flex items-center gap-1 hover:scale-105 transition-transform duration-200">
                    {renderStars(userRating, true, setUserRating)}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 md:mb-3 block text-foreground">Your Comment</label>
                  <Textarea
                    placeholder="Share your experience with this server..."
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="min-h-[100px] md:min-h-[120px] border-border/50 focus:border-primary/50 bg-background/50"
                  />
                </div>

                {reviewError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 md:p-3">
                    <p className="text-red-400 text-sm">{reviewError}</p>
                  </div>
                )}

                <Button
                  onClick={handleSubmitReview}
                  disabled={reviewLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105 transform h-9 md:h-10"
                >
                  <Send className="w-3 h-3 md:w-4 md:h-4" />
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </div>

            {/* Enhanced Comments List */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-3">
                <h4 className="text-lg md:text-xl font-bold">Player Reviews</h4>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs md:text-sm">
                  {comments.length} reviews
                </Badge>
              </div>

              {comments.length === 0 ? (
                <div className="text-center py-8 md:py-12 bg-muted/20 rounded-lg border border-dashed border-border/50">
                  <MessageSquare className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto mb-3 md:mb-4" />
                  <h5 className="text-base md:text-lg font-semibold mb-2 text-muted-foreground">No reviews yet</h5>
                  <p className="text-sm md:text-base text-muted-foreground">Be the first to share your experience with this server!</p>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {comments.map((comment, index) => (
                    <div
                      key={comment.id}
                      className="group bg-gradient-to-br from-card to-muted/20 rounded-xl p-4 md:p-5 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg group-hover:scale-110 transition-transform duration-200"
                          style={{ backgroundColor: comment.ProfileColor }}
                        >
                          {comment.username.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 md:gap-2 mb-2 md:mb-3">
                            <span className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
                              {comment.username}
                            </span>
                            <div className="flex items-center gap-1 md:gap-2">
                              <div className="flex items-center gap-0.5 md:gap-1 group-hover:scale-105 transition-transform duration-200">
                                {renderStars(comment.rating)}
                              </div>
                              <span className="text-xs md:text-sm text-muted-foreground">•</span>
                              <span className="text-xs md:text-sm text-muted-foreground">{formatDate(comment.created_at)}</span>
                            </div>
                          </div>

                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        </main>
      </div>
    </div>
  )
}
