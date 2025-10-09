"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Home,
  Settings,
  Webhook,
  Menu,
  X,
  Server,
  Activity,
  UserCheck,
  Terminal,
  Globe,
  Users,
  Shield,
  Database
} from "lucide-react"
import { useParams } from "next/navigation"
import { MY_API } from "@/lib/config"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
export const runtime = "edge";

import { ServerOverview } from "../components/ServerOverview"
import { ServerSettings, WebhookSettings, DatabaseSettings } from "../components/ServerSettings"
import { CommunitySettings } from "../components/CommunitySettings"
import { RolesManager } from "../components/RolesManager"

interface ServerData {
  last_updated?: number
  desc?: string
  location?: string
  whatsapp?: string
  discord?: string
  youtube?: string
  tiktok?: string
  online?: number
  MaxPlayer?: number
  ping?: string
  webhook_sb?: string
  webhook_ban?: string
  webhook_mute?: string
  webhook_curse?: string
  webhook_createacc?: string
  webhook_giveaway?: string
  webhook_economyupdate?: string
}

interface ServerStats {
  playersOnline: number
  maxPlayers: number
  uptime: string
  ping: string
}

interface SocialMedia {
  whatsapp: string
  discord: string
  youtube: string
  tiktok: string
}

interface Webhooks {
  webhook_sb: string
  webhook_ban: string
  webhook_mute: string
  webhook_curse: string
  webhook_createacc: string
  webhook_giveaway: string
  webhook_economyupdate: string
}



export default function GrowtopiaManagePage() {
  const { toast } = useToast()
  const params = useParams()
  const name = (params.name as string)?.toLowerCase()

  const [activeSection, setActiveSection] = useState<string>("console")

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [serverData, setServerData] = useState<ServerData | null>(null)
  const [serverStats, setServerStats] = useState<ServerStats>({
    playersOnline: 0,
    maxPlayers: 0,
    uptime: "0%",
    ping: "0ms",
  })
  const [serverStatus, setServerStatus] = useState<string>("offline")
  const [serverDescription, setServerDescription] = useState<string>("")
  const [serverLocation, setServerLocation] = useState<string>("")
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({
    whatsapp: "",
    discord: "",
    youtube: "",
    tiktok: "",
  })
  const [webhooks, setWebhooks] = useState<Webhooks>({
    webhook_sb: "",
    webhook_ban: "",
    webhook_mute: "",
    webhook_curse: "",
    webhook_createacc: "",
    webhook_giveaway: "",
    webhook_economyupdate: "",
  })


  const [actionLoading, setActionLoading] = useState<boolean>(false)

  const [loadedSettings, setLoadedSettings] = useState<boolean>(false)
  const [loadedWebhooks, setLoadedWebhooks] = useState<boolean>(false)
  const [serverTier, setServerTier] = useState<number>(1)

  useEffect(() => {
    async function fetchBasic() {
      try {
        setLoading(true)
        const res = await fetch(`${MY_API}/manage/${name}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
        if (!res.ok) throw new Error("Failed to fetch server")
        const data = await res.json()
        if (!data.success) throw new Error(data.error || "Unknown error")

        setServerData(data.server)
        setServerDescription(data.server.desc || "")
        setServerLocation(data.server.location || "")
        setServerStats({
          playersOnline: data.server.online ?? 0,
          maxPlayers: data.server.MaxPlayer ?? 0,
          uptime: "99.6%",
          ping: data.server.ping ?? "0ms",
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    async function fetchStatus() {
      try {
        const res = await fetch(`${MY_API}/manage/${name}/status`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
        if (!res.ok) throw new Error("Failed to fetch status")
        const data = await res.json()
        if (data.success) {
          setServerStatus(data.status)
        }
      } catch (err: any) {
        console.error("Error fetching server status:", err)
        // Fallback to offline if status check fails
        setServerStatus("offline")
      }
    }

    async function fetchTier() {
      try {
        const res = await fetch(`${MY_API}/manage/${name}/tier`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
        if (!res.ok) throw new Error("Failed to fetch tier")
        const data = await res.json()
        if (data.success) {
          setServerTier(data.tier)
        }
      } catch (err: any) {
        console.error("Error fetching server tier:", err)
        // Default to tier 1 if fetch fails
        setServerTier(1)
      }
    }

    fetchBasic()
    fetchStatus()
    fetchTier()

    // Set up periodic status checking every 5 seconds
    const statusInterval = setInterval(fetchStatus, 5000)

    return () => {
      clearInterval(statusInterval)
    }
  }, [name])

  useEffect(() => {
    if (!loadedSettings) {
      async function fetchSettings() {
        try {
          const res = await fetch(`${MY_API}/manage/${name}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
          if (!res.ok) throw new Error("Failed to fetch settings")
          const data = await res.json()
          if (!data.success) throw new Error(data.error || "Unknown error")

          setSocialMedia({
            whatsapp: data.server.whatsapp || "",
            discord: data.server.discord || "",
            youtube: data.server.youtube || "",
            tiktok: data.server.tiktok || "",
          })
          setLoadedSettings(true)
        } catch (err: any) {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to load settings: ${err.message}`,
          })
        }
      }

      fetchSettings()
    }
  }, [loadedSettings, name, toast])

  useEffect(() => {
    if (!loadedWebhooks) {
      async function fetchWebhooks() {
        try {
          const res = await fetch(`${MY_API}/manage/${name}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
          if (!res.ok) throw new Error("Failed to fetch webhooks")
          const data = await res.json()
          if (!data.success) throw new Error(data.error || "Unknown error")

          setWebhooks({
            webhook_sb: data.server.webhook_sb || "",
            webhook_ban: data.server.webhook_ban || "",
            webhook_mute: data.server.webhook_mute || "",
            webhook_curse: data.server.webhook_curse || "",
            webhook_createacc: data.server.webhook_createacc || "",
            webhook_giveaway: data.server.webhook_giveaway || "",
            webhook_economyupdate: data.server.webhook_economyupdate || "",
          })
          setLoadedWebhooks(true)
        } catch (err: any) {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to load webhooks: ${err.message}`,
          })
        }
      }

      fetchWebhooks()
    }
  }, [loadedWebhooks, name, toast])

  async function saveServerConfig() {
    try {
      const res = await fetch(`${MY_API}/manage/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          description: serverDescription,
          location: serverLocation,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to save")

      setServerDescription(data.server.desc)
      setServerLocation(data.server.location)
      setServerData(data.server)
      toast({
        title: "Success",
        description: "✅ Server configuration saved",
      })
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ ${err.message}`,
      })
    }
  }

  async function saveSocialLinks() {
    try {
      const res = await fetch(`${MY_API}/manage/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(socialMedia),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to save")

      setSocialMedia({
        whatsapp: data.server.whatsapp || "",
        discord: data.server.discord || "",
        youtube: data.server.youtube || "",
        tiktok: data.server.tiktok || "",
      })
      setServerData(data.server)
      toast({
        title: "Success",
        description: "✅ Social media links saved",
      })
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ ${err.message}`,
      })
    }
  }

  async function saveWebhooks() {
    try {
      const res = await fetch(`${MY_API}/manage/${name}/webhooks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(webhooks),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to save")
      setWebhooks(data.server)
      toast({
        title: "Success",
        description: "✅ Webhooks saved (restart required)",
      })
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ ${err.message}`,
      })
    }
  }

  async function handleServerAction(action: "start" | "stop" | "restart") {
    try {
      setActionLoading(true)
      const res = await fetch(`${MY_API}/manage/${name}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to " + action)

      toast({
        title: "Success",
        description: `✅ ${data.message}`,
      })

      // Immediately update status based on action
      if (action === "start") setServerStatus("online")
      if (action === "stop") setServerStatus("offline")
      if (action === "restart") {
        // For restart, briefly show offline then online
        setServerStatus("offline")
        setTimeout(() => setServerStatus("online"), 2000)
      }
    } catch (err: any) {
      alert("❌ " + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  async function handleUpdateServer() {
    try {
      setActionLoading(true)
      const res = await fetch(`${MY_API}/manage/${name}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to update")

      toast({
        title: "Success",
        description: `✅ ${data.message}`,
      })
    } catch (err: any) {
      alert("❌ " + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading server...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SidebarProvider className="bg-transparent">
        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <SidebarTrigger className="bg-gray-700 hover:bg-gray-600 border border-gray-600 p-4 text-gray-100 shadow-2xl rounded-none" />
        </div>

        <Sidebar variant="sidebar" collapsible="icon" className="border-r border-gray-700 bg-gray-800 w-80 rounded-none">
           <SidebarHeader className="p-6 border-b border-gray-700">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-gray-700 rounded-none">
                 <Server className="h-7 w-7 text-gray-100" />
               </div>
               <div className="min-w-0 flex-1">
                 <p className="text-sm font-medium truncate text-gray-100">{name}</p>
                 <p className="text-xs text-gray-400">Server Management</p>
               </div>
             </div>
           </SidebarHeader>
           <SidebarContent>
             {/* Console Section */}
             <SidebarGroup className="p-0">
               <SidebarGroupContent>
                 <SidebarMenu className="p-2 space-y-1">
                   <SidebarMenuItem>
                     <SidebarMenuButton
                       asChild
                       isActive={activeSection === "console"}
                       onClick={() => setActiveSection("console")}
                     >
                       <button className="w-full justify-start hover:bg-gray-700 text-gray-300 hover:text-gray-100 p-4 rounded-none border-l-4 border-transparent data-[active=true]:border-blue-500 data-[active=true]:bg-gray-700/50">
                         <Terminal className="mr-4 h-5 w-5" />
                         <span className="truncate font-medium">Console</span>
                       </button>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                 </SidebarMenu>
               </SidebarGroupContent>
             </SidebarGroup>

             {/* Web Settings Section */}
             <SidebarGroup className="p-0">
               <SidebarGroupContent>
                 <SidebarMenu className="p-2 space-y-1">
                   <SidebarMenuItem>
                     <SidebarMenuButton
                       asChild
                       isActive={activeSection === "web-settings"}
                       onClick={() => setActiveSection("web-settings")}
                     >
                       <button className="w-full justify-start hover:bg-gray-700 text-gray-300 hover:text-gray-100 p-4 rounded-none border-l-4 border-transparent data-[active=true]:border-green-500 data-[active=true]:bg-gray-700/50">
                         <Globe className="mr-4 h-5 w-5" />
                         <span className="truncate font-medium">Web Settings</span>
                       </button>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                 </SidebarMenu>
               </SidebarGroupContent>
             </SidebarGroup>

             {/* Server Settings Section */}
             <SidebarGroup className="p-0">
               <SidebarGroupLabel className="px-6 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                 Server Settings
               </SidebarGroupLabel>
               <SidebarGroupContent>
                 <SidebarMenu className="p-2 space-y-1">
                   <SidebarMenuItem>
                     <SidebarMenuButton
                       asChild
                       isActive={activeSection === "webhook"}
                       onClick={() => setActiveSection("webhook")}
                     >
                       <button className="w-full justify-start hover:bg-gray-700 text-gray-300 hover:text-gray-100 p-4 rounded-none border-l-4 border-transparent data-[active=true]:border-purple-500 data-[active=true]:bg-gray-700/50 pl-8">
                         <Webhook className="mr-4 h-5 w-5" />
                         <span className="truncate font-medium">Webhook</span>
                       </button>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                   <SidebarMenuItem>
                     <SidebarMenuButton
                       asChild
                       isActive={activeSection === "database"}
                       onClick={() => setActiveSection("database")}
                     >
                       <button className="w-full justify-start hover:bg-gray-700 text-gray-300 hover:text-gray-100 p-4 rounded-none border-l-4 border-transparent data-[active=true]:border-purple-500 data-[active=true]:bg-gray-700/50 pl-8">
                         <Database className="mr-4 h-5 w-5" />
                         <span className="truncate font-medium">Database</span>
                       </button>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                   <SidebarMenuItem>
                     <SidebarMenuButton
                       asChild
                       isActive={activeSection === "role-manager"}
                       onClick={() => serverTier >= 2 ? setActiveSection("role-manager") : null}
                     >
                       <button className={`w-full justify-start hover:bg-gray-700 text-gray-300 hover:text-gray-100 p-4 rounded-none border-l-4 border-transparent data-[active=true]:border-yellow-500 data-[active=true]:bg-gray-700/50 pl-8 ${serverTier < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                         <Shield className="mr-4 h-5 w-5" />
                         <span className="truncate font-medium">Role Manager</span>
                         {serverTier < 2 && <span className="ml-2 text-xs text-gray-500">(Locked)</span>}
                       </button>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                 </SidebarMenu>
               </SidebarGroupContent>
             </SidebarGroup>

             {/* Community Section */}
             <SidebarGroup className="p-0">
               <SidebarGroupContent>
                 <SidebarMenu className="p-2 space-y-1">
                   <SidebarMenuItem>
                     <SidebarMenuButton
                       asChild
                       isActive={activeSection === "community"}
                       onClick={() => setActiveSection("community")}
                     >
                       <button className="w-full justify-start hover:bg-gray-700 text-gray-300 hover:text-gray-100 p-4 rounded-none border-l-4 border-transparent data-[active=true]:border-pink-500 data-[active=true]:bg-gray-700/50">
                         <Users className="mr-4 h-5 w-5" />
                         <span className="truncate font-medium">Community</span>
                       </button>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                 </SidebarMenu>
               </SidebarGroupContent>
             </SidebarGroup>
           </SidebarContent>
         </Sidebar>

        <SidebarInset className="flex-1 space-y-8 p-8 bg-gray-900 md:ml-[8rem]">
          {/* Header */}
          <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm p-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-700">
                  <Server className="h-7 w-7 text-gray-100" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-100">
                    Server Management
                  </h1>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                    <Activity className="h-4 w-4" />
                    {name} • {serverStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 px-4">
            {activeSection === "console" && (
              <div className="animate-in fade-in-50 duration-300">
                <ServerOverview
                  serverName={name}
                  serverStatus={serverStatus}
                  serverStats={serverStats}
                  handleServerAction={handleServerAction}
                  actionLoading={actionLoading}
                  handleUpdateServer={handleUpdateServer}
                />
              </div>
            )}

            {activeSection === "web-settings" && (
              <div className="animate-in fade-in-50 duration-300">
                <ServerSettings
                  serverDescription={serverDescription}
                  setServerDescription={setServerDescription}
                  serverLocation={serverLocation}
                  setServerLocation={setServerLocation}
                  onSaveConfig={saveServerConfig}
                  webhooks={webhooks}
                  setWebhooks={setWebhooks}
                  onSaveWebhooks={saveWebhooks}
                  serverName={name}
                />
              </div>
            )}

            {activeSection === "webhook" && (
              <div className="animate-in fade-in-50 duration-300">
                <WebhookSettings
                  webhooks={webhooks}
                  setWebhooks={setWebhooks}
                  onSaveWebhooks={saveWebhooks}
                  serverName={name}
                  toast={toast}
                />
              </div>
            )}

            {activeSection === "database" && (
              <div className="animate-in fade-in-50 duration-300">
                <DatabaseSettings
                  serverName={name}
                  toast={toast}
                />
              </div>
            )}

            {activeSection === "community" && (
              <div className="animate-in fade-in-50 duration-300">
                <CommunitySettings
                  socialMedia={socialMedia}
                  setSocialMedia={setSocialMedia}
                  onSaveSocial={saveSocialLinks}
                />
              </div>
            )}

            {activeSection === "role-manager" && (
              <div className="animate-in fade-in-50 duration-300">
                {serverTier >= 2 ? (
                  <RolesManager serverName={name} toast={toast} />
                ) : (
                  <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gray-700 rounded-lg">
                        <Shield className="h-8 w-8 text-yellow-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-100">Role Manager</h2>
                        <p className="text-gray-400">Manage player roles and permissions</p>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="h-5 w-5 text-yellow-500" />
                        <h4 className="font-medium text-yellow-500">Feature Locked</h4>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
                        Role Manager is available for servers with 301-600 players (Tier 2).
                      </p>
                      <p className="text-gray-400 text-xs">
                        Your server currently has {serverStats.maxPlayers} max players (Tier {serverTier}).
                        Upgrade your server capacity to unlock this feature.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}