"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shield, Save, Edit3, UserCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MY_API } from "@/lib/config"

interface Role {
  name: string
  short_name: string
  prefix: string
}

interface RolesData {
  [key: string]: Role
}

interface RolesManagerProps {
  serverName: string
  toast: any
}

function RolesManager({ serverName, toast }: RolesManagerProps) {
  const [roles, setRoles] = useState<RolesData>({
    "1": { "name": "Cheater", "short_name": "Cheater", "prefix": "" },
    "2": { "name": "VIP", "short_name": "VIP", "prefix": "`1@" },
    "3": { "name": "Moderator", "short_name": "MOD", "prefix": "`#@" },
    "4": { "name": "Super Moderator", "short_name": "SMOD", "prefix": "`5@" },
    "5": { "name": "Developer", "short_name": "DEV", "prefix": "`6@" },
    "6": { "name": "Super Developer", "short_name": "SDEV", "prefix": "`9@" },
    "7": { "name": "Brand Ambassador", "short_name": "BA", "prefix": "`4@" },
    "8": { "name": "Owner", "short_name": "Owner", "prefix": "`e@" }
  })

  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [editingRole, setEditingRole] = useState<string | null>(null)

  useEffect(() => {
    fetchRoles()
  }, [serverName])

  async function fetchRoles() {
    try {
      setLoading(true)
      const res = await fetch(`${MY_API}/manage/${serverName}/roles`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (!res.ok) throw new Error("Failed to fetch roles")

      const data = await res.json()
      if (data.success) {
        setRoles(data.roles)
        if (data.created) {
          toast({
            title: "Roles Created",
            description: "Default roles configuration has been created for your server.",
          })
        }
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to load roles: ${err.message}`,
      })
    } finally {
      setLoading(false)
    }
  }

  async function saveRoles() {
    try {
      setSaving(true)
      const res = await fetch(`${MY_API}/manage/${serverName}/roles`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(roles),
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to save roles")

      toast({
        title: "Success",
        description: "✅ Roles configuration saved successfully",
      })
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ ${err.message}`,
      })
    } finally {
      setSaving(false)
    }
  }

  function updateRole(id: string, field: keyof Role, value: string) {
    setRoles(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }))
  }

  function startEditing(id: string) {
    setEditingRole(id)
  }

  function stopEditing() {
    setEditingRole(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading roles...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-yellow-500" />
          <div>
            <h3 className="text-xl font-semibold text-gray-100">Role Configuration</h3>
            <p className="text-sm text-gray-400">Manage player roles and their display properties</p>
          </div>
        </div>
        <Button
          onClick={saveRoles}
          disabled={saving}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-none text-white shadow-lg"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Roles"}
        </Button>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(roles).map(([id, role]) => (
          <Card key={id} className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                    {id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm text-slate-200 truncate">
                      {editingRole === id ? (
                        <Input
                          value={role.name}
                          onChange={(e) => updateRole(id, 'name', e.target.value)}
                          className="bg-slate-700/50 border-slate-600/50 focus:border-yellow-400/50 rounded-none text-xs h-7"
                          onBlur={stopEditing}
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                          autoFocus
                        />
                      ) : (
                        <span onClick={() => startEditing(id)} className="cursor-pointer hover:text-yellow-400">
                          {role.name}
                        </span>
                      )}
                    </CardTitle>
                  </div>
                </div>
                <Edit3 className="h-4 w-4 text-slate-400 hover:text-yellow-400 cursor-pointer" onClick={() => startEditing(id)} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Short Name */}
              <div>
                <Label className="text-xs text-slate-400 mb-1 block">Short Name</Label>
                <Input
                  value={role.short_name}
                  onChange={(e) => updateRole(id, 'short_name', e.target.value)}
                  className="bg-slate-700/50 border-slate-600/50 focus:border-blue-400/50 rounded-none text-xs"
                  placeholder="Short name"
                />
              </div>

              {/* Prefix */}
              <div>
                <Label className="text-xs text-slate-400 mb-1 block">Prefix</Label>
                <Input
                  value={role.prefix}
                  onChange={(e) => updateRole(id, 'prefix', e.target.value)}
                  className="bg-slate-700/50 border-slate-600/50 focus:border-purple-400/50 rounded-none text-xs font-mono"
                  placeholder="e.g. `1@"
                />
              </div>

              {/* Preview */}
              <div className="pt-2 border-t border-slate-600/30">
                <Label className="text-xs text-slate-400 mb-1 block">Preview</Label>
                <div className="text-xs text-slate-300 bg-slate-700/30 p-2 rounded border font-mono">
                  {role.prefix && <span style={{color: '#9CA3AF'}}>{role.prefix}</span>}
                  <span style={{color: '#F3F4F6'}}>{role.short_name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20 rounded-none">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <UserCheck className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-300 mb-1">Role Management Tips</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• <strong>Short Name:</strong> Displayed in-game for this role level</li>
                <li>• <strong>Prefix:</strong> Text prefix shown before the player's name (use Growtopia color codes)</li>
                <li>• <strong>Preview:</strong> Shows how the role will appear in-game</li>
                <li>• Click on role names to edit them directly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { RolesManager }