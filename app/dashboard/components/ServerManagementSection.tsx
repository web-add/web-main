"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Server as ServerIcon, Plus, List, RefreshCw, Loader2, Save, Trash2, Database } from "lucide-react"
import { MY_API } from "@/lib/config"
import Link from "next/link"

interface Server {
  id: number;
  owner: string;
  name: string;
  port: number;
  game: string;
  MaxPlayer: number;
  location: string;
  last_updated?: number;
}

export default function ServerManagementSection() {
  const fetchedAdminRef = useRef(false);

  // --- Add Server ---
  const [server, setServer] = useState({ name: "", port: "", location: "", game: "", MaxPlayer: "", mode: "db" });
  const [serverMsg, setServerMsg] = useState<string>("");

  const addServer = async () => {
    setServerMsg("Submitting...");
    try {
      const res = await fetch(`${MY_API}/Admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: "addserver", ...server }),
      });
      const data = await res.json();
      if ("error" in data) setServerMsg(`Error: ${data.error}`);
      else {
        setServerMsg("Server added successfully!");
        setServer({ name: "", port: "", location: "", game: "", MaxPlayer: "", mode: "db" });
      }
    } catch (err: unknown) {
      if (err instanceof Error) setServerMsg(`Request failed: ${err.message}`);
      else setServerMsg("Unknown error");
    }
  };

  // --- Server Data ---
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [servers, setServers] = useState<Server[]>([]);
  const [loadingServers, setLoadingServers] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleServerChange = (id: number, field: keyof Server, value: string | number) => {
    setServers(prev =>
      prev.map(s => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const fetchServers = async () => {
    setLoadingServers(true);
    try {
      const res = await fetch(`${MY_API}/Admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: "serverdata" }),
      });
      const data = await res.json();
      if (!("error" in data)) {
        setServers(data.servers || []);
        setError("");
      } else {
        setError(data.error || "Failed to fetch servers");
      }
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoadingServers(false);
    }
  };

  useEffect(() => {
    if (fetchedAdminRef.current) return; // jangan fetch lagi
    fetchedAdminRef.current = true;
    fetchServers();
  }, []);

  const updateServer = async (srv: Server) => {
    try {
      const res = await fetch(`${MY_API}/Admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: "updateserver", param1: srv }),
      });
      const data = await res.json();
      if ("error" in data) alert(`Update failed: ${data.error}`);
      else fetchServers();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  // --- Delete Server ---
  const deleteServer = async (id: number, mode : string) => {
    try {
      const res = await fetch(`${MY_API}/Admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: "deleteserver", id, mode })
      });
      const data = await res.json();
      if (data.success) {
        setServers(servers.filter(s => s.id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // --- Search Query ---
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServers = servers
    .filter(
      (srv) =>
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(srv.id).includes(searchQuery)
    )
    .sort((a, b) => a.port - b.port); // Sort by port number

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-br from-card to-muted/20 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            <ServerIcon className="h-6 w-6 text-primary" />
            Server Management
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your GTPS servers and monitor their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* --- Add Server --- */}
          <Card className="border-0 mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <Plus className="h-5 w-5 text-primary" />
                Add New Server
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Server Name *"
                  value={server.name}
                  onChange={(e) => setServer({ ...server, name: e.target.value })}
                  className="h-12 bg-muted text-foreground placeholder-muted-foreground focus:border-primary"
                />
                <Input
                  placeholder="Port *"
                  value={server.port}
                  onChange={(e) => setServer({ ...server, port: e.target.value })}
                  className="h-12 bg-muted text-foreground placeholder-muted-foreground focus:border-primary"
                  type="number"
                />
                <Input
                  placeholder="Game (e.g., Growtopia)"
                  value={server.game}
                  onChange={(e) => setServer({ ...server, game: e.target.value })}
                  className="h-12 bg-muted text-foreground placeholder-muted-foreground focus:border-primary"
                />
                <Input
                  placeholder="Max Players"
                  value={server.MaxPlayer}
                  onChange={(e) => setServer({ ...server, MaxPlayer: e.target.value })}
                  className="h-12 bg-muted text-foreground placeholder-muted-foreground focus:border-primary"
                  type="number"
                />
                <Input
                  placeholder="Location (e.g., US-East)"
                  value={server.location}
                  onChange={(e) => setServer({ ...server, location: e.target.value })}
                  className="md:col-span-2 h-12 bg-muted text-foreground placeholder-muted-foreground focus:border-primary"
                />
              </div>

              {/* Mode Selector */}
              <div className="flex gap-4">
                <Button
                  variant={server.mode === "db" ? "default" : "outline"}
                  onClick={() => setServer({ ...server, mode: "db" })}
                  className="flex-1 h-12"
                >
                  <Database className="mr-2 h-4 w-4" />
                  DB Only
                </Button>
                <Button
                  variant={server.mode === "full" ? "default" : "outline"}
                  onClick={() => setServer({ ...server, mode: "full" })}
                  className="flex-1 h-12"
                >
                  <List className="mr-2 h-4 w-4" />
                  Full Setup
                </Button>
              </div>

              <Button
                onClick={addServer}
                disabled={!server.name || !server.port}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg"
                size="lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Server
              </Button>

              {serverMsg && (
                <Alert className="mt-4" variant={serverMsg.includes("Error") || serverMsg.includes("Failed") ? "destructive" : "default"}>
                  <AlertDescription>{serverMsg}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* --- Server Data --- */}
          <Card className="border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <List className="h-5 w-5 text-primary" />
                Server Management
              </CardTitle>
              <div className="flex gap-2">
                <Input
                  placeholder="Search servers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md h-10"
                />
                <Button
                  onClick={fetchServers}
                  disabled={loadingServers}
                  variant="outline"
                  size="sm"
                >
                  {loadingServers ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table className="min-w-full table-fixed">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-20">Game</TableHead>
                      <TableHead className="w-40">Port</TableHead>
                      <TableHead className="w-20">Max Players</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead className="text-right w-48">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingServers ? (
                      [...Array(5)].map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><div className="h-4 w-6 bg-muted rounded animate-pulse" /></TableCell>
                          <TableCell><div className="h-8 w-20 bg-muted rounded animate-pulse" /></TableCell>
                          <TableCell><div className="h-8 w-16 bg-muted rounded animate-pulse" /></TableCell>
                          <TableCell><div className="h-8 w-12 bg-muted rounded animate-pulse" /></TableCell>
                          <TableCell><div className="h-8 w-12 bg-muted rounded animate-pulse" /></TableCell>
                          <TableCell><div className="h-8 w-24 bg-muted rounded animate-pulse" /></TableCell>
                          <TableCell className="text-right">
                            <div className="space-x-2">
                              <div className="h-8 w-16 bg-muted rounded animate-pulse inline-block" />
                              <div className="h-8 w-20 bg-muted rounded animate-pulse inline-block" />
                              <div className="h-8 w-20 bg-muted rounded animate-pulse inline-block" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : filteredServers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="text-muted-foreground space-y-2">
                            <ServerIcon className="h-12 w-12 mx-auto opacity-50" />
                            <p>No servers found</p>
                            <p className="text-sm">Create your first server using the form above</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredServers.map((srv) => {
                        // Check if server is running (last_updated within 60 seconds)
                        const isRunning = srv.last_updated && (Date.now() / 1000 - srv.last_updated) <= 60;

                        return (
                          <TableRow key={srv.id} className="hover:bg-accent/50 border-b border-border/50">
                            <TableCell className="font-mono text-sm">{srv.id}</TableCell>
                            <TableCell>
                              <Input
                                value={srv.name}
                                onChange={(e) => handleServerChange(srv.id, "name", e.target.value)}
                                className="h-9 text-sm"
                                disabled={isRunning}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={srv.game}
                                onChange={(e) => handleServerChange(srv.id, "game", e.target.value)}
                                className="h-9 text-sm w-16"
                                disabled={isRunning}
                              />
                            </TableCell>
                            <TableCell className="font-mono">
                              <Input
                                value={srv.port}
                                onChange={(e) => handleServerChange(srv.id, "port", Number(e.target.value) || 0)}
                                className="h-9 text-sm w-32 min-w-[8rem]"
                                type="number"
                                disabled={isRunning}
                              />
                            </TableCell>
                            <TableCell className="font-mono">
                              <Input
                                value={srv.MaxPlayer}
                                onChange={(e) => handleServerChange(srv.id, "MaxPlayer", Number(e.target.value) || 0)}
                                className="h-9 text-sm w-16"
                                type="number"
                                disabled={isRunning}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={srv.owner || ""}
                                onChange={(e) => handleServerChange(srv.id, "owner", e.target.value)}
                                className="h-9 text-sm"
                                placeholder="Enter username"
                                disabled={isRunning}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-1 justify-end">
                                <Link href={`/manage/growtopia/${srv.name}`}>
                                  <Button
                                    size="sm"
                                    className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                                  >
                                    <ServerIcon className="h-3 w-3 mr-1" />
                                    Manage
                                  </Button>
                                </Link>
                                <Button
                                  size="sm"
                                  onClick={() => updateServer(srv)}
                                  className={`h-8 px-3 ${isRunning ? 'bg-gray-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
                                  disabled={isRunning}
                                >
                                  <Save className="h-3 w-3 mr-1" />
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteServer(srv.id, "db")}
                                  className={`h-8 px-2 ${isRunning ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                                  disabled={isRunning}
                                >
                                  <Database className="h-3 w-3 mr-1" />
                                  DB
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteServer(srv.id, "full")}
                                  className={`h-8 px-2 ${isRunning ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                                  disabled={isRunning}
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Full
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4">
                {loadingServers ? (
                  [...Array(3)].map((_, i) => (
                    <Card key={i} className="border-0 bg-muted/20">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                          <div className="flex gap-2">
                            <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                            <div className="h-8 w-20 bg-muted rounded animate-pulse" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : filteredServers.length === 0 ? (
                  <Card className="border-0 bg-muted/20">
                    <CardContent className="p-8 text-center">
                      <ServerIcon className="h-12 w-12 mx-auto opacity-50 mb-4" />
                      <p className="text-muted-foreground">No servers found</p>
                      <p className="text-sm text-muted-foreground">Create your first server using the form above</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredServers.map((srv) => {
                    const isRunning = srv.last_updated && (Date.now() / 1000 - srv.last_updated) <= 60;

                    return (
                      <Card key={srv.id} className="border-0 bg-muted/20">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-lg">{srv.name}</h3>
                              <p className="text-sm text-muted-foreground">ID: {srv.id} • Port: {srv.port}</p>
                              <p className="text-sm text-muted-foreground">{srv.game} • Max: {srv.MaxPlayer} players</p>
                              <p className="text-sm text-muted-foreground">Owner: {srv.owner || 'Not set'}</p>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isRunning ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {isRunning ? 'Running' : 'Offline'}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Input
                              placeholder="Server Name"
                              value={srv.name}
                              onChange={(e) => handleServerChange(srv.id, "name", e.target.value)}
                              className="h-10"
                              disabled={isRunning}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Game"
                                value={srv.game}
                                onChange={(e) => handleServerChange(srv.id, "game", e.target.value)}
                                className="h-10"
                                disabled={isRunning}
                              />
                              <Input
                                placeholder="Port"
                                value={srv.port}
                                onChange={(e) => handleServerChange(srv.id, "port", Number(e.target.value) || 0)}
                                className="h-10"
                                type="number"
                                disabled={isRunning}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Max Players"
                                value={srv.MaxPlayer}
                                onChange={(e) => handleServerChange(srv.id, "MaxPlayer", Number(e.target.value) || 0)}
                                className="h-10"
                                type="number"
                                disabled={isRunning}
                              />
                              <Input
                                placeholder="Owner"
                                value={srv.owner || ""}
                                onChange={(e) => handleServerChange(srv.id, "owner", e.target.value)}
                                className="h-10"
                                disabled={isRunning}
                              />
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Link href={`/manage/growtopia/${srv.name}`} className="flex-1 min-w-0">
                              <Button
                                size="sm"
                                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <ServerIcon className="h-4 w-4 mr-2" />
                                Manage
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              onClick={() => updateServer(srv)}
                              className={`flex-1 h-10 ${isRunning ? 'bg-gray-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
                              disabled={isRunning}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteServer(srv.id, "db")}
                              className={`h-10 px-3 ${isRunning ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                              disabled={isRunning}
                            >
                              <Database className="h-4 w-4 mr-1" />
                              DB
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteServer(srv.id, "full")}
                              className={`h-10 px-3 ${isRunning ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                              disabled={isRunning}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Full
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}