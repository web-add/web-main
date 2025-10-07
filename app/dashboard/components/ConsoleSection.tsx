"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Terminal, Play, Loader2 } from "lucide-react"
import { MY_API } from "@/lib/config"

export default function ConsoleSection() {
  const fetchedAdminRef = useRef(false);

  // --- Run Command ---
  const [command, setCommand] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const runCommand = async () => {
    if (!command.trim()) return;
    setLoading(true);
    setOutput("Running...");

    try {
      const res = await fetch(`${MY_API}/Admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: "exec", param1: command }),
      });
      const data = await res.json();
      if ("error" in data) setOutput(`Error: ${data.error}`);
      else setOutput(data.output || "No output");
    } catch (err: unknown) {
      if (err instanceof Error) setOutput(`Request failed: ${err.message}`);
      else setOutput("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-br from-card to-muted/20 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            <Terminal className="h-6 w-6 text-primary" />
            Admin Console
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Execute system commands and manage server operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Command Input */}
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Enter command... (e.g., ls, ps, or custom scripts)"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              disabled={loading}
              className="flex-1 bg-muted text-foreground placeholder-muted-foreground border-border focus:border-primary focus:ring-primary rounded-lg h-12"
            />
            <Button
              onClick={runCommand}
              disabled={loading || !command.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Execute
                </span>
              )}
            </Button>
          </div>

          {/* Enhanced Terminal Output */}
          <Card className="border-0 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-muted-foreground ml-2">Server Terminal</span>
            </div>
            <div className="p-4 h-80 overflow-y-auto bg-black text-green-400 font-mono text-sm leading-relaxed">
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  <Terminal className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a command above to see output here</p>
                  <p className="text-xs mt-1">Try 'ls' or 'ps aux' to get started</p>
                </div>
              )}
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}