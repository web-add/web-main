"use client"

import { useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import { ToastContainer } from "@/components/toast";
import UserSection from "./components/UserSection"
import APISection from "./components/APISection"
import ServicesSection from "./components/ServicesSection"
import ConsoleSection from "./components/ConsoleSection"
import ServerManagementSection from "./components/ServerManagementSection"
import { User, Code, Server, KeyRound, Hand, Delete, Shield, Eraser, XCircle, DoorOpen, ShieldUser, Terminal, Settings} from "lucide-react"
import LoadData from "@/components/login/load";
import Failed from "@/components/login/failed";
import { MY_API } from "@/lib/config";

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
export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("user")
  const [username, setUsername] = useState('')
  const [isAuth, setIsAuth] = useState(true)
  const [isFailed, setIsFailed] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const [isAccountDeleted, setIsAccountDeleted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [profileColor, setProfileColor] = useState("#3b82f6");
  const checkIsAdmin = async () => {
    const res = await fetch(`${MY_API}/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ type: "isadmin" }),
    });
    const data = await res.json();
    setIsAdmin(data.isAdmin)
  };
  const logout = async() => {
    const res = await fetch(`${MY_API}/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {
        "type": "logout"
      } ),
      credentials: "include" // penting untuk cookie
    });
    if (res.ok) {
      setIsLoggedOut(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 4000)
    }
  }
  const deleteAccount = async() => {
    const res = await fetch(`${MY_API}/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {
        "type": "delete"
      } ),
      credentials: "include"
    });
    if (res.ok) {
      setIsAccountDeleted(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 4000)
    }
  }
  const loadProfileColor = async () => {
      try {
        const res = await fetch(`${MY_API}/account`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "profilecolor", param1: "get" }),
          credentials: "include",
        });
        const data = await res.json();
        setProfileColor(data.msg);
      } catch (e) {}
    };
  const loadUser = async () => {
    try {
      const res = await fetch(`${MY_API}/account`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "username" }),
          credentials: "include"
        })

      const data = await res.json();

      if (res.ok) {
        setUsername(data.msg)
        setTimeout(() => {
          setIsAuth(false);
        }, 2000)
      }
      else {
        setTimeout(() => {
          setIsAuth(false);
          setIsFailed(true);
        }, 2000)
      }
    } catch (err) {
      console.error("Load failed:", err);
      setTimeout(() => {
          setIsAuth(false);
          setIsFailed(true);
        }, 2000)
    }
  };
  useEffect(() => {
    loadUser(); // cek login status pas halaman load
    checkIsAdmin();
    loadProfileColor();
  }, []);

  useEffect(() => {
    console.log('Dashboard state:', { isAuth, isFailed, username, isLoggedOut, isAccountDeleted });
  }, [isAuth, isFailed, username, isLoggedOut, isAccountDeleted]);




  return (
    <>
    {isAuth ?
      <LoadData />
      : isFailed ?
      <Failed
        title="Unauthorized!"
        subtitle="Please login first..."
        highlights={[
          { icon: Shield, text: "User only page", color: "text-yellow-400" },
          { icon: Shield, text: "Abuse prevent", color: "text-blue-400" }
        ]}
        MainIcon={XCircle}
      />
      : isLoggedOut ?
      <Failed
          title="Logged Out"
          subtitle="Redirecting to main page...."
          highlights={[
            { icon: KeyRound, text: "Remember your password", color: "text-yellow-400" },
            { icon: Hand, text: "See you next time!", color: "text-green-400" }
          ]}
          MainIcon={DoorOpen}
        />
      : isAccountDeleted ?
      <Failed
          title="Account Deleted."
          subtitle="Redirecting to main page...."
          highlights={[
            { icon: Hand, text: "Bye bye.", color: "text-yellow-400" },
            { icon: Delete, text: "Action irreversible.", color: "text-red-400" }
          ]}
          MainIcon={Eraser}
        />
      :
      <div className="min-h-screen relative overflow-hidden bg-slate-900">
{/* Background gradient */}
<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900"></div>

{/* Subtle grid (pixel/game feel) */}
<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>


{/* Content */}
<div className="relative container mx-auto px-4 py-8">

<SidebarProvider className="bg-transparent">
   {/* Mobile Sidebar Trigger - Fixed Position */}
   <div className="md:hidden fixed bottom-6 right-6 z-50">
     <SidebarTrigger className="bg-blue-600 hover:bg-blue-700 border-2 border-blue-500 rounded-full p-4 text-white shadow-2xl animate-pulse" />
   </div>

  <Sidebar variant="inset" collapsible="icon" className="border-r bg-card">
    <SidebarHeader className="p-4 border-b">
      <div className="flex items-center gap-3">
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: profileColor }}
        >
          {username.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{username}</p>
          <p className="text-xs text-muted-foreground">User Dashboard</p>
        </div>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup className="p-0">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={activeSection === "user"}
                onClick={() => setActiveSection("user")}
              >
                <Button variant="ghost" className="w-full justify-start hover:bg-accent">
                  <User className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">User Settings</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={activeSection === "services"}
                onClick={() => setActiveSection("services")}
              >
                <Button variant="ghost" className="w-full justify-start hover:bg-accent">
                  <Server className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">My Services</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={activeSection === "api"}
                onClick={() => setActiveSection("api")}
              >
                <Button variant="ghost" className="w-full justify-start hover:bg-accent">
                  <Code className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">API Access</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {isAdmin && (
              <>
                <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Admin Panel
                </SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === "console"}
                    onClick={() => setActiveSection("console")}
                  >
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent">
                      <Terminal className="mr-2 h-4 w-4 shrink-0" />
                      <span className="truncate">Console</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === "server-management"}
                    onClick={() => setActiveSection("server-management")}
                  >
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent">
                      <Settings className="mr-2 h-4 w-4 shrink-0" />
                      <span className="truncate">Server Management</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>

  <SidebarInset className="flex-1 space-y-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 md:ml-[12rem]">
    {activeSection === "user" && <UserSection username={username} profileColor={profileColor} setProfileColor={setProfileColor} onLogout={logout} onDelete={deleteAccount} />}
    {activeSection === "services" && <ServicesSection />}
    {activeSection === "api" && <APISection />}
    {activeSection === "console" && <ConsoleSection />}
    {activeSection === "server-management" && <ServerManagementSection />}
    <ToastContainer />
  </SidebarInset>
</SidebarProvider>
</div>
</div>

    }
    </>
  )
}
