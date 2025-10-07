"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Users, Star, Shield, Clock, Zap, Server, Globe, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MY_API } from "@/lib/config";
export default function ServerList() {
  const [servers, setServers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) return; // cegah eksekusi kedua
      fetched.current = true;
    const fetchServers = async () => {
      try {
        const res = await fetch(`${MY_API}/server`, {
          method: "POST", // or "GET" if you just want to fetch
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        setServers(data.servers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServers();
  }, []);

  const currentEpoch = Math.floor(Date.now() / 1000);
  const checkServerOnline = (server : any) => {
    return server.last_updated && currentEpoch - server.last_updated <= 60;
  };
  
  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFilteredServers = [...filteredServers].sort((a, b) => {
    // Primary: Online count descending
    let cmp = (b.online || 0) - (a.online || 0);
    if (cmp !== 0) return cmp;

    // Secondary: Online status (online first)
    const aOnline = checkServerOnline(a) ? 1 : 0;
    const bOnline = checkServerOnline(b) ? 1 : 0;
    cmp = bOnline - aOnline;
    if (cmp !== 0) return cmp;

    // Tertiary: MaxPlayer descending
    return (b.MaxPlayer || 0) - (a.MaxPlayer || 0);
  });

  const totalPlayers = servers.reduce((sum, server) => sum + server.online, 0);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-secondary text-secondary"
            : i < rating
            ? "fill-secondary/50 text-secondary"
            : "text-muted-foreground"
        }`}
      />
    ));

  const getPingColor = (ping: number) => {
    if (ping < 50) return "text-green-400";
    if (ping < 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
{/* Background gradient */}
<div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/20 to-slate-950"></div>

{/* Subtle grid (pixel/game feel) */}
<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>


{/* Content */}
<div className="relative">
      {/* Enhanced Header with Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 overflow-hidden backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Growtopia Servers</h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground">Discover premium gaming servers with lightning-fast performance and unbeatable uptime</p>
            </div>
            <div className="relative w-full max-w-md mx-auto md:mx-0 md:max-w-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, game, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full h-11 md:h-12 border-border/50 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-12">
          {/* Feature Highlights with Icons */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-6 mb-8">
            <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <Shield className="w-4 h-4 md:w-6 md:h-6 text-red-400" />
              <span className="text-xs md:text-base font-semibold text-foreground">DDoS Protected</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-secondary/10 border border-secondary/20">
              <Clock className="w-4 h-4 md:w-6 md:h-6 text-secondary" />
              <span className="text-xs md:text-base font-semibold text-foreground">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <Zap className="w-4 h-4 md:w-6 md:h-6 text-green-400" />
              <span className="text-xs md:text-base font-semibold text-foreground">Under 50ms Ping</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Globe className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
              <span className="text-xs md:text-base font-semibold text-foreground">Global Locations</span>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/20">
              <CardContent className="p-3 md:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 rounded-full bg-primary/15 group-hover:bg-primary/25 transition-colors">
                      <Server className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground">Total Servers</p>
                      <p className="text-lg md:text-xl font-bold text-primary">{servers.length}</p>
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/20">
              <CardContent className="p-3 md:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 rounded-full bg-secondary/15 group-hover:bg-secondary/25 transition-colors">
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground">Players Online</p>
                      <p className="text-lg md:text-xl font-bold text-secondary">{totalPlayers}</p>
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-secondary rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-green-500/20 bg-gradient-to-br from-green-500/10 to-green-500/20">
              <CardContent className="p-3 md:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 rounded-full bg-green-500/15 group-hover:bg-green-500/25 transition-colors">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground">Avg Ping</p>
                      <p className="text-lg md:text-xl font-bold text-green-400">{Math.round(servers.reduce((sum, s) => sum + (s.ping || 0), 0) / servers.length || 0)}ms</p>
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-yellow-500/20">
              <CardContent className="p-3 md:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 rounded-full bg-yellow-500/15 group-hover:bg-yellow-500/25 transition-colors">
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground">Avg Rating</p>
                      <p className="text-lg md:text-xl font-bold text-yellow-400">{Math.round((servers.reduce((sum, s) => sum + (s.avgRating || 0), 0) / servers.length) * 10) / 10 || 0}</p>
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Available Servers</h2>
          <p className="text-muted-foreground">
            Found {sortedFilteredServers.length} server{filteredServers.length !== 1 ? "s" : ""} matching your search
          </p>
        </div>

        {/* Enhanced Server Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sortedFilteredServers.map((server, index) => (
            <div
              key={server.id}
              className="group animate-in slide-in-from-bottom-2 duration-500 ease-out"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card className="h-full overflow-hidden bg-gradient-to-br from-card to-muted hover:shadow-2xl transition-all duration-300 border-0 hover:border-primary/50 relative">
                {/* Server Header - No Image */}
                <div className="h-16 md:h-20 bg-gradient-to-r from-primary/20 to-secondary/20 relative flex items-center px-4 md:px-6">
                  <div className="absolute top-2 right-2">
                    <Badge variant={checkServerOnline(server) ? "default" : "destructive"} className="text-xs">
                      {checkServerOnline(server) ? "LIVE" : "OFFLINE"}
                    </Badge>
                  </div>
                  <Server className="w-6 h-6 md:w-8 md:h-8 text-primary/60" />
                </div>

                <CardHeader className="pb-3 md:pb-4 pt-0 px-4 md:px-6">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-base md:text-lg font-bold text-foreground line-clamp-1 pr-6 md:pr-8">
                      {server.name}
                    </CardTitle>
                    <div className="flex items-center gap-1 md:gap-2 ml-1 md:ml-2">
                      <div className={`p-0.5 md:p-1 rounded-full ${checkServerOnline(server) ? 'bg-green-500' : 'bg-red-500'}`}>
                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${checkServerOnline(server) ? 'bg-green-400 animate-ping' : 'bg-red-400'}`}></div>
                      </div>
                      {checkServerOnline(server) && (
                        <span className={`text-xs font-medium ${getPingColor(server.ping)}`}>{server.ping}ms</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 md:gap-1.5 mb-2 md:mb-3">
                    <Badge variant="outline" className="text-xs bg-background/50">
                      <Globe className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" /> {server.location}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {server.game}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Port: {server.port}
                    </Badge>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {server.desc}
                  </p>
                </CardHeader>

                <CardContent className="px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4">
                  {/* Players Progress */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                        <span className="font-semibold">{server.online}/{server.MaxPlayer}</span>
                      </span>
                      <span className="text-muted-foreground">{Math.round((server.online / server.MaxPlayer) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 md:h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          checkServerOnline(server)
                            ? 'bg-gradient-to-r from-primary to-secondary'
                            : 'bg-gradient-to-r from-destructive to-destructive/50'
                        }`}
                        style={{
                          width: `${(server.online / server.MaxPlayer) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center gap-0.5 group-hover:scale-110 transition-transform duration-200">
                      {renderStars(server.avgRating)}
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-secondary">({server.avgRating}/5)</span>
                  </div>

                  {/* Action Button */}
                  <Link href={`/server/${server.name}`} className="block">
                    <Button
                      className={`w-full group relative overflow-hidden transition-all duration-300 text-xs md:text-sm h-8 md:h-10 ${
                        checkServerOnline(server)
                          ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                      size="sm"
                      disabled={!checkServerOnline(server)}
                    >
                      {checkServerOnline(server) ? (
                        <>
                          <Zap className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          Open Server
                          <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform origin-left duration-300"></div>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-destructive" />
                          Server Offline
                        </>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {sortedFilteredServers.length === 0 && (
          <div className="text-center py-16">
            <Server className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-muted-foreground">No Servers Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Try adjusting your search terms. We have plenty of amazing Growtopia servers waiting for you!
            </p>
          </div>
        )}
      </div>
    </div>
</div>
  )
}
