"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Terminal, RefreshCw, Play, Pause, Filter, Wifi, WifiOff } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MY_API } from "@/lib/config"

interface LogEntry {
  type: 'stdout' | 'stderr'
  content: string
  timestamp: string
}

interface LogsData {
  stdout: string[]
  stderr: string[]
  combined: LogEntry[]
}

interface LiveLogsProps {
  serverName: string
}

function LiveLogs({ serverName }: LiveLogsProps) {
  const [logs, setLogs] = useState<LogsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting')
  const [filterHours, setFilterHours] = useState(24) // Show logs from last 24 hours
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5
  const recentLogMessages = useRef<Set<string>>(new Set()) // Track recent messages to prevent duplicates

  // WebSocket connection management
  const connectWebSocket = () => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return; // Already connected or connecting
    }

    setConnectionStatus('connecting');

    // Create WebSocket URL based on API configuration
    const isLocalhost = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const wsProtocol = isLocalhost ? 'ws' : 'wss';
    const apiUrl = isLocalhost ? 'localhost:3001' : 'api.xovan.fun';
    const wsUrl = `${wsProtocol}://${apiUrl}/ws/logs?server=${serverName}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      setConnectionStatus('connected');
      setError(null);
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case 'connected':
            break;

          case 'log':
            // Check for duplicate messages
            const messageKey = `${message.logType}:${message.content}`;
            if (recentLogMessages.current.has(messageKey)) {
              break; // Skip duplicate
            }

            // Add to recent messages (keep last 100)
            recentLogMessages.current.add(messageKey);
            if (recentLogMessages.current.size > 100) {
              const firstKey = recentLogMessages.current.values().next().value;
              recentLogMessages.current.delete(firstKey);
            }

            // Add new log entry to the logs
            setLogs(prevLogs => {
              if (!prevLogs) return prevLogs;

              const newEntry = {
                type: message.logType,
                content: message.content,
                timestamp: message.timestamp
              };

              return {
                ...prevLogs,
                combined: [...prevLogs.combined, newEntry].slice(-200), // Keep last 200 entries
                [message.logType]: [...(prevLogs[message.logType] || []), message.content].slice(-100)
              };
            });
            break;

          case 'server_status':
            // Handle server status updates (start/stop notifications)
            // You could add a toast notification here or update server status
            break;

          case 'clear_logs':
            // Clear all logs when server is restarted
            setLogs({
              stdout: [],
              stderr: [],
              combined: []
            });
            // Clear frontend deduplication cache
            recentLogMessages.current.clear();
            break;

          default:
            // Unknown message type - ignore
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.onclose = (event) => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
      wsRef.current = null;

      // Attempt to reconnect if not a normal closure
      if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 2000 * reconnectAttempts.current); // Exponential backoff
      }
    };

    ws.onerror = (event: Event) => {
      setConnectionStatus('error');
      setError('WebSocket connection failed');
    };

    wsRef.current = ws;
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close(1000, 'Component unmounting');
      wsRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  // Fetch initial logs via HTTP
  const fetchInitialLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${MY_API}/manage/${serverName}/logs?hours=${filterHours}&limit=200`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }

      const data = await response.json();
      if (data.success) {
        setLogs(data.logs);
        setError(null);
      } else {
        throw new Error(data.error || "Failed to load logs");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialize on mount and when serverName changes
  useEffect(() => {
    // Clean up any existing connection first
    disconnectWebSocket();

    fetchInitialLogs();
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [serverName]);

  // Reconnect when filterHours changes (though WebSocket handles live updates)
  useEffect(() => {
    if (isConnected) {
      fetchInitialLogs();
    }
  }, [filterHours]);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [logs])

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  if (loading && !logs) {
    return (
      <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Terminal className="h-5 w-5 text-blue-400" />
            Live Server Logs
          </CardTitle>
          <CardDescription className="text-slate-400">
            Loading server execution logs...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Terminal className="h-5 w-5 text-blue-400" />
              Live Server Logs
            </CardTitle>
            <CardDescription className="text-slate-400">
              Real-time PM2 execution logs for {serverName}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={connectionStatus === 'connected' ? "default" : connectionStatus === 'connecting' ? "secondary" : "destructive"}
              className="flex items-center gap-1"
            >
              {connectionStatus === 'connected' ? <Wifi className="h-3 w-3" /> :
               connectionStatus === 'connecting' ? <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" /> :
               <WifiOff className="h-3 w-3" />}
              {connectionStatus === 'connected' ? "Live" :
               connectionStatus === 'connecting' ? "Connecting" :
               connectionStatus === 'error' ? "Error" : "Disconnected"}
            </Badge>

            <div className="flex items-center gap-1">
              <Filter className="h-4 w-4 text-slate-400" />
              <Select value={filterHours.toString()} onValueChange={(value) => setFilterHours(parseInt(value))}>
                <SelectTrigger className="w-24 h-8 bg-slate-700/50 border-slate-600/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1h</SelectItem>
                  <SelectItem value="6">6h</SelectItem>
                  <SelectItem value="12">12h</SelectItem>
                  <SelectItem value="24">24h</SelectItem>
                  <SelectItem value="72">3d</SelectItem>
                  <SelectItem value="168">7d</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchInitialLogs}
              disabled={loading}
              className="bg-slate-700/50 border-slate-600/50 hover:bg-slate-600/50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center py-8 text-red-400">
            <Terminal className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Failed to load logs</p>
            <p className="text-sm text-slate-400">{error}</p>
            <Button
              onClick={fetchInitialLogs}
              className="mt-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-96 w-full rounded-md border border-slate-600/50 bg-slate-900/50 p-4" ref={scrollAreaRef}>
            {logs && logs.combined.length > 0 ? (
              <div className="space-y-1 font-mono text-sm">
                {logs.combined.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 p-1 rounded ${
                      entry.type === 'stderr'
                        ? 'bg-red-500/10 border-l-2 border-red-500/50'
                        : 'bg-slate-800/30'
                    }`}
                  >
                    <span className="text-slate-500 text-xs flex-shrink-0">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                    <Badge
                      variant={entry.type === 'stderr' ? 'destructive' : 'secondary'}
                      className="text-xs px-1 py-0 flex-shrink-0"
                    >
                      {entry.type}
                    </Badge>
                    <span className={`flex-1 break-all ${
                      entry.type === 'stderr' ? 'text-red-300' : 'text-slate-300'
                    }`}>
                      {(() => {
                        const match = entry.content.match(/^\[\d+:\d+\] \[\w+\]: (.+)$/);
                        return match ? match[1] : entry.content;
                      })()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Terminal className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No logs available</p>
                <p className="text-sm">Server logs will appear here when the server is running.</p>
              </div>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

export { LiveLogs }