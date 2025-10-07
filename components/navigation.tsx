"use client"
import Link from "next/link"
import { ChevronDown, MessageCircle, DoorOpen, Menu, Terminal, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MY_API } from "@/lib/config";
export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    async function loadUser() {
      const res = await fetch(`${MY_API}/account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {
          "type": "check"
        } ),
        credentials: "include" // penting untuk cookie
      });
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    loadUser(); // cek login status pas halaman load
  }, [pathname]);
  return (
    <nav className="border-b border-border bg-card/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105"
          >
            <Terminal className="w-6 h-6 md:w-7 md:h-7 text-primary transition-transform duration-300 hover:rotate-12" />
            Xovan Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            <Link
              href="/"
              className={`font-medium text-sm md:text-base transition-colors ${
                pathname === "/"
                  ? "text-primary border-b-2 border-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-1 text-sm md:text-base cursor-pointer transition-colors ${
                    pathname.startsWith("/servers") || pathname.startsWith("/manage/growtopia")
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  aria-label="Servers menu"
                >
                  Servers
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/servers?game=growtopia" className="w-full cursor-pointer">
                    Growtopia Servers
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`cursor-pointer flex items-center gap-1 text-sm md:text-base transition-colors ${
                    pathname.startsWith("/services")
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  aria-label="Services menu"
                >
                  Services
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/services/growtopia" className="w-full cursor-pointer">
                    Growtopia
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/minecraft" className="w-full cursor-pointer">
                    Coming Soon
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white border-[#5865F2] hover:border-[#4752C4] text-xs md:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer" aria-label="Join our Discord server">
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden md:inline">Discord</span>
                </a>
              </Button>
              {isLoggedIn ? (

                <Link href="/dashboard" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 text-xs md:text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden xl:inline">Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/login" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 text-xs md:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <DoorOpen className="w-4 h-4" />
                    <span className="hidden xl:inline">Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="Open navigation menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 sm:w-72 p-2 space-y-1 animate-in slide-in-from-top-2 fade-in-0 duration-200"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/"
                    className={`w-full ${pathname === "/" ? "text-primary font-semibold" : ""}`}
                  >
                    Home
                  </Link>
                </DropdownMenuItem>

                <div className="px-2 pt-2 pb-1 text-xs font-semibold text-muted-foreground">
                  Servers
                </div>
                <DropdownMenuItem asChild>
                  <Link
                    href="/servers?game=growtopia"
                    className={`w-full ${
                      pathname.startsWith("/servers") || pathname.startsWith("/manage/growtopia")
                        ? "text-primary font-semibold"
                        : ""
                    }`}
                  >
                    Growtopia
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servers?game=minecraft" className="w-full">
                    Coming Soon
                  </Link>
                </DropdownMenuItem>

                <div className="px-2 pt-2 pb-1 text-xs font-semibold text-muted-foreground">
                  Services
                </div>
                <DropdownMenuItem asChild>
                  <Link
                    href="/services/growtopia"
                    className={`w-full ${
                      pathname.startsWith("/services")
                        ? "text-primary font-semibold"
                        : ""
                    }`}
                  >
                    Growtopia
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/minecraft" className="w-full">
                    Coming Soon
                  </Link>
                </DropdownMenuItem>

                {/* separator */}
                <div className="border-t my-2" />

                {/* Discord button */}
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="w-full justify-center bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all duration-300 hover:scale-105"
                >
                  <a
                    href="https://dsc.gg/xovan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join our Discord server"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Discord
                  </a>
                </Button>

                {/* Login / Dashboard button */}
                {isLoggedIn ? (
                  <Link href="/dashboard" className="w-full">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full justify-center bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transition-all duration-300 hover:scale-105"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login" className="w-full">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full justify-center bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transition-all duration-300 hover:scale-105"
                    >
                      <DoorOpen className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
