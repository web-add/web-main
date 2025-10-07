"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Settings,
  Webhook,
  Database,
  Users,
  Map,
  Download,
  Save,
  FileText,
  FolderOpen,
  X,
  Trash2
} from "lucide-react"
import { MY_API } from "@/lib/config"

interface Webhooks {
  webhook_sb: string
  webhook_ban: string
  webhook_mute: string
  webhook_curse: string
  webhook_createacc: string
  webhook_giveaway: string
  webhook_economyupdate: string
}

interface ServerSettingsProps {
  serverDescription: string
  setServerDescription: (desc: string) => void
  serverLocation: string
  setServerLocation: (loc: string) => void
  onSaveConfig: () => void
  webhooks?: Webhooks
  setWebhooks?: (webhooks: Webhooks) => void
  onSaveWebhooks?: () => void
  serverName?: string
}

interface ServerSettingsTabsProps {
  webhooks: Webhooks
  setWebhooks: (webhooks: Webhooks) => void
  onSaveWebhooks: () => void
  serverName: string
  toast: any
}

function ServerSettings({
  serverDescription,
  setServerDescription,
  serverLocation,
  setServerLocation,
  onSaveConfig,
  webhooks,
  setWebhooks,
  onSaveWebhooks,
  serverName
}: ServerSettingsProps) {
  return (
    <div className="space-y-8">
      {/* Web Configuration */}
      <Card className="bg-gray-800 border-gray-700 rounded-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-100">
            <Settings className="h-5 w-5 text-gray-400" />
            Web Configuration
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage settings that affect both web display and server information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="server-description" className="text-sm font-medium text-slate-300">
              Server Description
            </Label>
            <Textarea
              id="server-description"
              value={serverDescription}
              onChange={(e) => setServerDescription(e.target.value)}
              placeholder="Describe your server..."
              rows={4}
              className="bg-gray-700 border-gray-600 focus:border-gray-500 rounded-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-slate-300">
              Location
            </Label>
            <Input
              id="location"
              value={serverLocation}
              onChange={(e) => setServerLocation(e.target.value)}
              placeholder="Indonesia"
              className="bg-gray-700 border-gray-600 focus:border-gray-500 rounded-none"
            />
          </div>

          <Button
            type="button"
            onClick={onSaveConfig}
            className="bg-gray-600 hover:bg-gray-500 text-gray-100 rounded-none"
          >
            Save Web Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function WebhookSettings({
  webhooks,
  setWebhooks,
  onSaveWebhooks,
  serverName,
  toast
}: ServerSettingsTabsProps) {
  return (
    <div className="space-y-8">
      {/* Warning Banner */}
      <div className="bg-gray-700 border border-gray-600 p-4 rounded-none">
        <p className="text-sm text-gray-300">
          <strong>⚠️ Important:</strong> Webhook changes require a{" "}
          <span className="font-bold text-gray-200">server restart</span> to take effect.
        </p>
      </div>

      {/* Webhook Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Server Broadcast Card */}
        <Card className="h-36 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6l9-4 9 4v13l-9 4-9-4V6z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2v20M3 6l9 4 9-4" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#3B82F6" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  Server Broadcast
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={webhooks.webhook_sb}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_sb: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
              className="bg-slate-800/50 border-slate-600/50 focus:border-blue-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>

        {/* Ban Events Card */}
        <Card className="h-36 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" fill="#EF4444"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  Ban Events
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={webhooks.webhook_ban}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_ban: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
              className="bg-slate-800/50 border-slate-600/50 focus:border-red-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>

        {/* Mute Events Card */}
        <Card className="h-36 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#F59E0B"/>
                  <line x1="23" y1="9" x2="17" y2="15" stroke="#F59E0B" strokeWidth="2"/>
                  <line x1="17" y1="9" x2="23" y2="15" stroke="#F59E0B" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  Mute Events
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={webhooks.webhook_mute}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_mute: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
              className="bg-slate-800/50 border-slate-600/50 focus:border-yellow-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>

        {/* Curse Events Card */}
        <Card className="h-36 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  Curse Events
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={webhooks.webhook_curse}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_curse: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
              className="bg-slate-800/50 border-slate-600/50 focus:border-orange-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>

        {/* Account Creation Card */}
        <Card className="h-36 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#10B981" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  Account Creation
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={webhooks.webhook_createacc}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_createacc: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
              className="bg-slate-800/50 border-slate-600/50 focus:border-green-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>

        {/* Giveaway Events Card */}
        <Card className="h-36 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#8B5CF6"/>
                  <circle cx="12" cy="12" r="8" stroke="#8B5CF6" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  Giveaway Events
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={webhooks.webhook_giveaway}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_giveaway: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
              className="bg-slate-800/50 border-slate-600/50 focus:border-purple-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>

        {/* Economy Updates Card - Full Width */}
        <Card className="h-36 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="1" fill="#F59E0B"/>
                  <path d="M8 12h8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  Economy Updates
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={webhooks.webhook_economyupdate}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_economyupdate: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
              className="bg-slate-800/50 border-slate-600/50 focus:border-yellow-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={onSaveWebhooks}
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 rounded-none"
        >
          Save All Webhook Settings
        </Button>
      </div>
    </div>
  )
}

function DatabaseSettings({
  serverName,
  toast
}: {
  serverName: string
  toast: any
}) {
  const [loading, setLoading] = useState(false)
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('offline')

  // Dialog states
  const [playersDialogOpen, setPlayersDialogOpen] = useState(false)
  const [worldsDialogOpen, setWorldsDialogOpen] = useState(false)
  const [editorDialogOpen, setEditorDialogOpen] = useState(false)

  // File list states
  const [playersFiles, setPlayersFiles] = useState<string[]>([])
  const [worldsFiles, setWorldsFiles] = useState<string[]>([])
  const [playersCount, setPlayersCount] = useState<number>(0)
  const [worldsCount, setWorldsCount] = useState<number>(0)
  const [playersSize, setPlayersSize] = useState<string>('0 B')
  const [worldsSize, setWorldsSize] = useState<string>('0 B')
  const [playersSearch, setPlayersSearch] = useState('')
  const [worldsSearch, setWorldsSearch] = useState('')

  // Selected file and content
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [selectedFileType, setSelectedFileType] = useState<'players' | 'worlds'>('players')
  const [currentJsonContent, setCurrentJsonContent] = useState('')
  const [originalJsonContent, setOriginalJsonContent] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [editingFileName, setEditingFileName] = useState<string>('')
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Economy settings state
  const [economySettings, setEconomySettings] = useState<any>(null)
  const [economyDialogOpen, setEconomyDialogOpen] = useState(false)
  const [economyLoading, setEconomyLoading] = useState(false)

  // Config settings state
  const [configSettings, setConfigSettings] = useState<any>(null)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)

  // Test API connection and data saving
  const testApiAndSave = async () => {
    try {
      console.log('=== API TEST START ===')

      // Test 1: Basic API connection
      console.log('Test 1: Basic API connection')
      const statusResponse = await fetch(`${MY_API}/manage/${serverName}/status`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })

      if (!statusResponse.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `❌ API connection failed: ${statusResponse.status} ${statusResponse.statusText}`,
        })
        return
      }

      console.log('✅ API connection successful')

      // Test 2: Test file creation/modification
      console.log('Test 2: Testing file save operation')
      const testData = { test: 'data', timestamp: Date.now() }
      const testResponse = await fetch(`${MY_API}/manage/${serverName}/database/json/test_file`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(testData, null, 2)
      })

      console.log('Test save response:', testResponse.status, testResponse.statusText)

      if (testResponse.ok) {
        // Test 3: Verify the save
        console.log('Test 3: Verifying save')
        const verifyResponse = await fetch(`${MY_API}/manage/${serverName}/database/json/test_file`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })

        if (verifyResponse.ok) {
          const savedData = await verifyResponse.json()
          console.log('Saved data:', savedData)

          if (JSON.stringify(savedData) === JSON.stringify(testData)) {
            toast({
              title: "Success",
              description: "✅ API test successful! Data saving is working correctly.",
            })
          } else {
            toast({
              variant: "destructive",
              title: "Warning",
              description: "⚠️ Data was saved but verification failed. The data may be getting modified by the server.",
            })
          }
        } else {
          toast({
            variant: "destructive",
            title: "Warning",
            description: "⚠️ Data was saved but could not verify. Please check if the server is running.",
          })
        }
      } else {
        const errorText = await testResponse.text()
        toast({
          variant: "destructive",
          title: "Error",
          description: `❌ Save test failed: ${testResponse.status} ${testResponse.statusText}`,
        })
      }

      console.log('=== API TEST END ===')
    } catch (error) {
      console.error('API test error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ API test failed: ${error.message}`,
      })
    }
  }

  // Check server status
  const checkServerStatus = async () => {
    try {
      const response = await fetch(`${MY_API}/manage/${serverName}/status`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setServerStatus(data.status || 'offline')
      }
    } catch (error) {
      console.error('Failed to check server status:', error)
      setServerStatus('offline')
    }
  }

  // Check server status on component mount and periodically
  useEffect(() => {
    checkServerStatus()
    const interval = setInterval(checkServerStatus, 5000) // Check every 5 seconds
    return () => clearInterval(interval)
  }, [serverName])

  const loadPlayersDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${MY_API}/manage/${serverName}/database/players/files`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (response.status === 404) {
        // Directory doesn't exist yet
        setPlayersFiles([])
        setPlayersCount(0)
        setPlayersSize('0 B')
        setPlayersDialogOpen(true)
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setPlayersFiles(data.files || [])
      setPlayersCount(data.count || 0)
      setPlayersSize(data.totalSizeFormatted || '0 B')
      setPlayersDialogOpen(true)
    } catch (error) {
      console.error('Failed to load players database files:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to load players database: ${error.message || 'Unknown error'}\n\nMake sure the server is running and the database directory exists.`,
      })
    } finally {
      setLoading(false)
    }
  }

  const loadWorldsDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${MY_API}/manage/${serverName}/database/worlds/files`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (response.status === 404) {
        // Directory doesn't exist yet
        setWorldsFiles([])
        setWorldsCount(0)
        setWorldsSize('0 B')
        setWorldsDialogOpen(true)
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setWorldsFiles(data.files || [])
      setWorldsCount(data.count || 0)
      setWorldsSize(data.totalSizeFormatted || '0 B')
      setWorldsDialogOpen(true)
    } catch (error) {
      console.error('Failed to load worlds database files:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to load worlds database: ${error.message || 'Unknown error'}\n\nMake sure the server is running and the database directory exists.`,
      })
    } finally {
      setLoading(false)
    }
  }

  const loadFileContent = async (fileName: string, type: 'players' | 'worlds') => {
    try {
      const response = await fetch(`${MY_API}/manage/${serverName}/database/${type}/${fileName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error('Failed to load file content')
      }
      const content = await response.text()
      setCurrentJsonContent(content)
      setOriginalJsonContent(content)
      setSelectedFile(fileName)
      setEditingFileName(fileName)
      setSelectedFileType(type)
      setHasUnsavedChanges(false)
      setEditorDialogOpen(true)
    } catch (error) {
      console.error('Failed to load file content:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to load file content: ${error.message || 'Unknown error'}`,
      })
    }
  }

  const handleJsonContentChange = (value: string) => {
    setCurrentJsonContent(value)
    setHasUnsavedChanges(value !== originalJsonContent)
  }

  const downloadFile = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadFileFromServer = async (fileName: string, type: 'players' | 'worlds') => {
    try {
      const response = await fetch(`${MY_API}/manage/${serverName}/database/${type}/${fileName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error('Failed to download file')
      }
      const content = await response.text()
      downloadFile(fileName, content)
    } catch (error) {
      console.error('Failed to download file:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to download file: ${error.message || 'Unknown error'}`,
      })
    }
  }

  const deleteFile = async (fileName: string, type: 'players' | 'worlds') => {
    if (!confirm(`Are you sure you want to delete ${fileName}? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`${MY_API}/manage/${serverName}/database/${type}/${fileName}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (response.ok) {
        // Refresh the file list
        if (type === 'players') {
          await loadPlayersDatabase()
        } else {
          await loadWorldsDatabase()
        }
        toast({
          title: "Success",
          description: `✅ File "${fileName}" deleted successfully!`,
        })
      } else {
        const errorData = await response.json().catch(() => ({}))
        toast({
          variant: "destructive",
          title: "Error",
          description: `❌ Failed to delete file: ${errorData.message || response.statusText}`,
        })
      }
    } catch (error) {
      console.error('Failed to delete file:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to delete file: ${error.message || 'Network error'}`,
      })
    }
  }

  const handleCloseEditor = async () => {
    if (hasUnsavedChanges) {
      const confirmSave = window.confirm('You have unsaved changes. Do you want to save before closing?')
      if (confirmSave) {
        await saveFileContent()
        return
      }
    }
    setEditorDialogOpen(false)
  }

  const checkFileExists = async (fileName: string, type: 'players' | 'worlds'): Promise<boolean> => {
    try {
      const response = await fetch(`${MY_API}/manage/${serverName}/database/${type}/${fileName}`, {
        method: 'HEAD',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      return response.status === 200
    } catch (error) {
      console.error('Failed to check file existence:', error)
      return false
    }
  }

  const saveFileContent = async () => {
    try {
      // Validate that we have content to save
      if (!currentJsonContent || currentJsonContent.trim() === '') {
        toast({
          variant: "destructive",
          title: "Error",
          description: "❌ Cannot save empty file content",
        })
        return
      }

      // Validate JSON format
      try {
        JSON.parse(currentJsonContent)
      } catch (jsonError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `❌ Invalid JSON format: ${jsonError.message}`,
        })
        return
      }

      const isRenaming = editingFileName !== selectedFile

      if (isRenaming) {
        const fileExists = await checkFileExists(editingFileName, selectedFileType)
        if (fileExists) {
          const confirmReplace = window.confirm(
            `A file named "${editingFileName}" already exists. Do you want to replace it?`
          )
          if (!confirmReplace) {
            return
          }
        }
      }

      console.log('Saving file content:', {
        fileName: editingFileName,
        type: selectedFileType,
        contentLength: currentJsonContent.length
      })

      const response = await fetch(`${MY_API}/manage/${serverName}/database/${selectedFileType}/${editingFileName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-original-filename': selectedFile,
          'Accept': 'application/json'
        },
        credentials: "include",
        body: currentJsonContent
      })

      console.log('Save response status:', response.status)

      if (response.ok) {
        const responseText = await response.text()
        console.log('Save response:', responseText)

        // Verify the save by fetching the file back
        try {
          const verifyResponse = await fetch(`${MY_API}/manage/${serverName}/database/${selectedFileType}/${editingFileName}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          })

          if (verifyResponse.ok) {
            const savedContent = await verifyResponse.text()
            const isContentMatch = savedContent.trim() === currentJsonContent.trim()

            if (isContentMatch) {
              setSelectedFile(editingFileName)
              setOriginalJsonContent(currentJsonContent)
              setHasUnsavedChanges(false)
              setSaveSuccess(true)
              setTimeout(() => setSaveSuccess(false), 3000)
              toast({
                title: "Success",
                description: "✅ File saved and verified successfully!",
              })
            } else {
              console.warn('Content mismatch:', {
                sent: currentJsonContent.length,
                received: savedContent.length
              })
              toast({
                variant: "destructive",
                title: "Warning",
                description: "⚠️ File may have been saved but content verification failed. Please check the server.",
              })
            }
          } else {
            toast({
              title: "Success",
              description: "✅ File saved but could not verify content. Please check the server.",
            })
          }
        } catch (verifyError) {
          console.error('Verification failed:', verifyError)
          alert('✅ File saved but verification failed. Please check the server.')
        }
      } else {
        const errorData = await response.text()
        console.error('Save failed:', errorData)
        toast({
          variant: "destructive",
          title: "Error",
          description: `❌ Failed to save file: ${response.status} ${response.statusText}`,
        })
      }
    } catch (error) {
      console.error('Failed to save file:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to save file: ${error.message || 'Unknown error'}`,
      })
    }
  }

  const loadEconomySettings = async () => {
    setEconomyLoading(true)
    try {
      const response = await fetch(`${MY_API}/manage/${serverName}/database/json/xovan_json`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (response.status === 404) {
        // File doesn't exist yet, create default structure with all data
        const defaultSettings = {
          BUY_SETTINGS: {
            Buy_Block_Enabled: true,
            Buy_Block_Price: 500,
            Buy_Clothing_Enabled: true,
            Buy_Clothing_Price: 30001,
            Buy_Door_Enabled: true,
            Buy_Door_Price: 1000,
            Buy_Portal_Enabled: true,
            Buy_Portal_Price: 1000,
            Buy_Wallpaper_Enabled: true,
            Buy_Wallpaper_Price: 300,
            Buy_Weather_Enabled: true,
            Buy_Weather_Price: 100000
          },
          LOCKE_SALESMAN: [
            {
              ItemID: 204,
              LockID: 202,
              Price: 5
            },
            {
              ItemID: 206,
              LockID: 204,
              Price: 3
            },
            {
              ItemID: 5262,
              LockID: 206,
              Price: 2
            },
            {
              ItemID: 242,
              LockID: 206,
              Price: 5
            },
            {
              ItemID: 2478,
              LockID: 242,
              Price: 1
            },
            {
              ItemID: 2724,
              LockID: 242,
              Price: 1
            },
            {
              ItemID: 5954,
              LockID: 242,
              Price: 1
            },
            {
              ItemID: 3156,
              LockID: 242,
              Price: 3
            },
            {
              ItemID: 3676,
              LockID: 242,
              Price: 5
            },
            {
              ItemID: 14042,
              LockID: 242,
              Price: 5
            },
            {
              ItemID: 8878,
              LockID: 242,
              Price: 6
            },
            {
              ItemID: 2724,
              LockID: 242,
              Price: 1
            },
            {
              ItemID: 5258,
              LockID: 242,
              Price: 10
            },
            {
              ItemID: 3684,
              LockID: 242,
              Price: 10
            },
            {
              ItemID: 1280,
              LockID: 242,
              Price: 15
            },
            {
              ItemID: 6140,
              LockID: 242,
              Price: 15
            },
            {
              ItemID: 2992,
              LockID: 242,
              Price: 15
            },
            {
              ItemID: 3560,
              LockID: 242,
              Price: 20
            },
            {
              ItemID: 14038,
              LockID: 242,
              Price: 25
            },
            {
              ItemID: 3798,
              LockID: 242,
              Price: 25
            },
            {
              ItemID: 3314,
              LockID: 242,
              Price: 30
            },
            {
              ItemID: 5202,
              LockID: 242,
              Price: 30
            },
            {
              ItemID: 3188,
              LockID: 242,
              Price: 40
            },
            {
              ItemID: 2476,
              LockID: 242,
              Price: 50
            },
            {
              ItemID: 7190,
              LockID: 242,
              Price: 65
            },
            {
              ItemID: 8892,
              LockID: 242,
              Price: 80
            },
            {
              ItemID: 2720,
              LockID: 1796,
              Price: 1
            },
            {
              ItemID: 2452,
              LockID: 1796,
              Price: 1
            },
            {
              ItemID: 1486,
              LockID: 1796,
              Price: 1
            },
            {
              ItemID: 11156,
              LockID: 242,
              Price: 150
            },
            {
              ItemID: 2702,
              LockID: 1796,
              Price: 3
            },
            {
              ItemID: 2722,
              LockID: 1796,
              Price: 5
            },
            {
              ItemID: 4972,
              LockID: 1796,
              Price: 5
            },
            {
              ItemID: 4970,
              LockID: 1796,
              Price: 5
            },
            {
              ItemID: 5264,
              LockID: 1796,
              Price: 5
            },
            {
              ItemID: 4948,
              LockID: 1796,
              Price: 10
            },
            {
              ItemID: 3040,
              LockID: 1796,
              Price: 10
            },
            {
              ItemID: 5260,
              LockID: 1796,
              Price: 10
            },
            {
              ItemID: 11134,
              LockID: 1796,
              Price: 10
            },
            {
              ItemID: 3686,
              LockID: 1796,
              Price: 15
            },
            {
              ItemID: 2450,
              LockID: 7188,
              Price: 1
            },
            {
              ItemID: 12480,
              LockID: 242,
              Price: 10
            },
            {
              ItemID: 12482,
              LockID: 242,
              Price: 10
            },
            {
              ItemID: 12484,
              LockID: 242,
              Price: 10
            },
            {
              ItemID: 12358,
              LockID: 242,
              Price: 50
            },
            {
              ItemID: 13730,
              LockID: 1796,
              Price: 1
            },
            {
              ItemID: 13790,
              LockID: 242,
              Price: 25
            },
            {
              ItemID: 13680,
              LockID: 7188,
              Price: 5
            },
            {
              ItemID: 2,
              LockID: 202,
              Price: 1
            }
          ],
          SERVER_CONFIG: {
            NEW_ACC: {
              createacccooldown: 5,
              maxperip: 3
            }
          },
          dropallgacha: {
            "0": 0,
            "10716": 50,
            "14596": 50,
            "5136": 50,
            "5140": 2
          },
          maxgems: 1000,
          sellcrystal: {
            "2242": 150,
            "2244": 150,
            "2246": 150,
            "2248": 400,
            "2250": 750
          },
          sellfish: 50,
          sellghost: {
            "3720": 5,
            "3721": 15,
            "3722": 14
          },
          sellmining: {
            miningcoin: 1,
            miningcrystal: 50
          }
        }
        setEconomySettings(defaultSettings)
        setEconomyDialogOpen(true)
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setEconomySettings(data)
      setEconomyDialogOpen(true)
    } catch (error) {
      console.error('Failed to load economy settings:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to load economy settings: ${error.message || 'Unknown error'}\n\nMake sure the server is running and the JSON file exists.`,
      })
    } finally {
      setEconomyLoading(false)
    }
  }

  const saveEconomySettings = async () => {
    try {
      // Validate that we have economy settings to save
      if (!economySettings) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "❌ No economy settings to save",
        })
        return
      }

      console.log('Saving economy settings:', economySettings)

      const response = await fetch(`${MY_API}/manage/${serverName}/database/json/xovan_json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(economySettings, null, 2)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (response.ok) {
        const responseText = await response.text()
        console.log('Response body:', responseText)

        // Try to verify the save by fetching the data back
        try {
          const verifyResponse = await fetch(`${MY_API}/manage/${serverName}/database/json/xovan_json`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          })

          if (verifyResponse.ok) {
            const savedData = await verifyResponse.json()
            console.log('Verification - saved data:', savedData)

            // Compare key values to verify save
            const keyChecks = [
              'maxgems',
              'sellfish',
              'LOCKE_SALESMAN',
              'BUY_SETTINGS'
            ]

            let verificationPassed = true
            for (const key of keyChecks) {
              if (JSON.stringify(economySettings[key]) !== JSON.stringify(savedData[key])) {
                console.warn(`Verification failed for ${key}:`, {
                  sent: economySettings[key],
                  received: savedData[key]
                })
                verificationPassed = false
              }
            }

            if (verificationPassed) {
              toast({
                title: "Success",
                description: "✅ Economy settings saved and verified successfully!",
              })
            } else {
              toast({
                variant: "destructive",
                title: "Warning",
                description: "⚠️ Settings may have been saved but verification failed. Please check the server.",
              })
            }
          } else {
            toast({
              title: "Success",
              description: "✅ Settings saved but could not verify. Please check if the server is running.",
            })
          }
        } catch (verifyError) {
          console.error('Verification failed:', verifyError)
          alert('✅ Settings saved but verification failed. Please check the server.')
        }
      } else {
        const errorData = await response.text()
        console.error('Save failed - response:', errorData)
        toast({
          variant: "destructive",
          title: "Error",
          description: `❌ Failed to save economy settings: ${response.status} ${response.statusText}`,
        })
      }
    } catch (error) {
      console.error('Failed to save economy settings:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to save economy settings: ${error.message || 'Network error'}`,
      })
    }
  }

  const updateEconomySetting = (path: string, value: any) => {
    const keys = path.split('.')
    const newSettings = { ...economySettings }

    let current = newSettings
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {}
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value

    setEconomySettings(newSettings)
  }

  const loadConfigSettings = async () => {
    setConfigLoading(true)
    try {
      const response = await fetch(`${MY_API}/manage/${serverName}/database/json/config`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (response.status === 404) {
        // File doesn't exist yet, create default structure
        const defaultSettings = {
          "GAME": {
            "ANTI_GROWLAUNCHER": false,
            "ANTI_PROXY": false,
            "AUTOFARM_DELAY": 500,
            "CREATOR_LIST": [],
            "JOYSTICK": false,
            "STORE_STOCK_ERAY": 4,
            "STORE_STOCK_GRAY": 2,
            "STORE_STOCK_MAG": 1,
            "WORLD_BG": 14,
            "WORLD_FG": 2,
            "WORLD_LAVA": 4,
            "WORLD_ROCK": 10,
            "WORLD_WEATHER": 51
          },
          "NEWBIE_GET": {
            "ITEMS": []
          },
          "SERVER": {
            "APIKEY_AI": "{belum work}",
            "CLIENT_VERSION": "5.11",
            "DEPOSIT_WORLD": "{belum work}",
            "DISCORD_URL": "https://www.discord.com/",
            "NAME": "Xovan Test",
            "OSM_LINK": "hostosm.apip.site",
            "OSM_PATH": "cache/",
            "PORT": 17092,
            "PROTOCOL": "216",
            "SERVER_VERSION": "5.11",
            "WEBSITE_URL": "https://www.google.com/",
            "WHATSAPP_URL": "https://www.whatsapp.com/",
            "YOUTUBE_URL": "https://www.youtube.com/"
          }
        }
        setConfigSettings(defaultSettings)
        setConfigDialogOpen(true)
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setConfigSettings(data)
      setConfigDialogOpen(true)
    } catch (error) {
      console.error('Failed to load config settings:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to load config settings: ${error.message || 'Unknown error'}\n\nMake sure the server is running and the config file exists.`,
      })
    } finally {
      setConfigLoading(false)
    }
  }

  const saveConfigSettings = async () => {
    try {
      // Validate that we have config settings to save
      if (!configSettings) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "❌ No config settings to save",
        })
        return
      }

      console.log('Saving config settings:', configSettings)

      const response = await fetch(`${MY_API}/manage/${serverName}/database/json/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(configSettings, null, 2)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (response.ok) {
        const responseText = await response.text()
        console.log('Response body:', responseText)

        // Try to verify the save by fetching the data back
        try {
          const verifyResponse = await fetch(`${MY_API}/manage/${serverName}/database/json/config`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          })

          if (verifyResponse.ok) {
            const savedData = await verifyResponse.json()
            console.log('Verification - saved data:', savedData)

            // Compare key values to verify save
            const keyChecks = [
              'GAME',
              'NEWBIE_GET',
              'SERVER'
            ]

            let verificationPassed = true
            for (const key of keyChecks) {
              if (JSON.stringify(configSettings[key]) !== JSON.stringify(savedData[key])) {
                console.warn(`Verification failed for ${key}:`, {
                  sent: configSettings[key],
                  received: savedData[key]
                })
                verificationPassed = false
              }
            }

            if (verificationPassed) {
              toast({
                title: "Success",
                description: "✅ Config settings saved and verified successfully!",
              })
            } else {
              toast({
                variant: "destructive",
                title: "Warning",
                description: "⚠️ Settings may have been saved but verification failed. Please check the server.",
              })
            }
          } else {
            toast({
              title: "Success",
              description: "✅ Settings saved but could not verify. Please check if the server is running.",
            })
          }
        } catch (verifyError) {
          console.error('Verification failed:', verifyError)
          alert('✅ Settings saved but verification failed. Please check the server.')
        }
      } else {
        const errorData = await response.text()
        console.error('Save failed - response:', errorData)
        toast({
          variant: "destructive",
          title: "Error",
          description: `❌ Failed to save config settings: ${response.status} ${response.statusText}`,
        })
      }
    } catch (error) {
      console.error('Failed to save config settings:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `❌ Failed to save config settings: ${error.message || 'Network error'}`,
      })
    }
  }

  const updateCreatorList = (index: number, value: string) => {
    const newSettings = { ...configSettings }
    if (!newSettings.GAME) newSettings.GAME = {}
    if (!newSettings.GAME.CREATOR_LIST) newSettings.GAME.CREATOR_LIST = []
    newSettings.GAME.CREATOR_LIST[index] = value
    setConfigSettings(newSettings)
  }

  const addCreator = () => {
    const newSettings = { ...configSettings }
    if (!newSettings.GAME) newSettings.GAME = {}
    if (!newSettings.GAME.CREATOR_LIST) newSettings.GAME.CREATOR_LIST = []
    newSettings.GAME.CREATOR_LIST.push('')
    setConfigSettings(newSettings)
  }

  const removeCreator = (index: number) => {
    if (!confirm('Are you sure you want to remove this creator?')) {
      return
    }

    try {
      const newSettings = { ...configSettings }
      if (newSettings.GAME && newSettings.GAME.CREATOR_LIST && newSettings.GAME.CREATOR_LIST[index]) {
        const removedCreator = newSettings.GAME.CREATOR_LIST[index]
        newSettings.GAME.CREATOR_LIST.splice(index, 1)
        setConfigSettings(newSettings)
        toast({
          title: "Success",
          description: `✅ Creator "${removedCreator}" removed successfully!`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "❌ Creator not found or invalid index",
        })
      }
    } catch (error) {
      console.error('Failed to remove creator:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "❌ Failed to remove creator",
      })
    }
  }

  const updateLockeSalesmanItem = (index: number, field: string, value: any) => {
    const newSettings = { ...economySettings }
    if (!newSettings.LOCKE_SALESMAN) newSettings.LOCKE_SALESMAN = []
    newSettings.LOCKE_SALESMAN[index] = {
      ...newSettings.LOCKE_SALESMAN[index],
      [field]: value
    }
    setEconomySettings(newSettings)
  }

  const addLockeSalesmanItem = () => {
    const newSettings = { ...economySettings }
    if (!newSettings.LOCKE_SALESMAN) newSettings.LOCKE_SALESMAN = []
    newSettings.LOCKE_SALESMAN.push({
      ItemID: 0,
      LockID: 0,
      Price: 0
    })
    setEconomySettings(newSettings)
  }

  const removeLockeSalesmanItem = (index: number) => {
    if (!confirm('Are you sure you want to remove this salesman item?')) {
      return
    }

    try {
      const newSettings = { ...economySettings }
      if (newSettings.LOCKE_SALESMAN && newSettings.LOCKE_SALESMAN[index]) {
        const removedItem = newSettings.LOCKE_SALESMAN[index]
        newSettings.LOCKE_SALESMAN.splice(index, 1)
        setEconomySettings(newSettings)
        toast({
          title: "Success",
          description: `✅ Salesman item (ID: ${removedItem.ItemID}) removed successfully!`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "❌ Item not found or invalid index",
        })
      }
    } catch (error) {
      console.error('Failed to remove salesman item:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "❌ Failed to remove salesman item",
      })
    }
  }

  return (
    <div className="space-y-8">
          <Card className={`bg-gray-800 border-gray-700 rounded-none ${serverStatus === 'online' ? 'border-red-500 bg-gray-900' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-100">
                <Database className="h-5 w-5 text-gray-400" />
                Database Management
                {serverStatus === 'online' && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-none">
                    SERVER RUNNING
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Edit server databases directly. {serverStatus === 'online' ? (
                  <span className="text-red-400 font-semibold">⚠️ Server must be stopped before editing databases!</span>
                ) : (
                  'Use with caution - invalid JSON may break the server.'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Global Danger Zone Warning */}
              <div className={`bg-gray-700 border border-gray-600 p-4 rounded-none ${serverStatus === 'online' ? 'border-red-500/50 bg-red-500/20' : ''}`}>
                <p className="text-sm text-red-400">
                  <strong>⚠️ Danger Zone:</strong> Editing database files can cause data corruption or server instability. Always backup before making changes.
                  {serverStatus === 'online' && (
                    <span className="block mt-2 text-red-300 font-semibold">
                      🚫 Server is currently running. Stop the server before editing databases to prevent data corruption.
                    </span>
                  )}
                </p>
              </div>

              {/* API Test Button */}
              <div className="bg-gray-700 border border-gray-600 p-4 rounded-none">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-400 font-medium">
                      <strong>🔧 API Connection Test:</strong> Test if data saving is working correctly
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      This will create a test file and verify the save operation
                    </p>
                  </div>
                  <Button
                    onClick={testApiAndSave}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                  >
                    Test API
                  </Button>
                </div>
              </div>

              {/* Database Management Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Creator List Card */}
                <Card
                  className={`h-72 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl cursor-pointer transition-all duration-200 hover:scale-105 flex flex-col rounded-none ${
                    serverStatus === 'online' ? 'border-red-500/30 opacity-75' : 'hover:border-red-500/50'
                  }`}
                  onClick={() => !configLoading && serverStatus !== 'online' && loadConfigSettings()}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-none flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base text-slate-200 flex items-center gap-2">
                          Creator List (Admin)
                          {serverStatus === 'online' && (
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-none">
                              DISABLED
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="text-slate-400 text-xs">
                          Manage server creators and administrators
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className={`bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-none p-3 ${serverStatus === 'online' ? 'border-red-500/50 bg-red-500/20' : ''}`}>
                      <p className="text-xs text-red-400">
                        <strong>👑 Admin Management:</strong> Control server access and permissions through creator list configuration.
                        {serverStatus === 'online' && (
                          <span className="block mt-1 text-red-300 font-semibold text-xs">
                            🚫 Server running - disabled
                          </span>
                        )}
                      </p>
                    </div>
                    <Button
                      disabled={configLoading || serverStatus === 'online'}
                      className={`w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-none ${serverStatus === 'online' ? 'opacity-50 cursor-not-allowed bg-red-500/20 hover:bg-red-500/20' : ''}`}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {configLoading ? 'Loading...' : serverStatus === 'online' ? 'Server Running - Disabled' : 'Load Creator List'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Players Database Card */}
                <Card
                  className={`h-72 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl cursor-pointer transition-all duration-200 hover:scale-105 flex flex-col rounded-none ${
                    serverStatus === 'online' ? 'border-red-500/30 opacity-75' : 'hover:border-blue-500/50'
                  }`}
                  onClick={() => !loading && serverStatus !== 'online' && loadPlayersDatabase()}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-none flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base text-slate-200 flex items-center gap-2">
                          Players Database
                          {serverStatus === 'online' && (
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-none">
                              DISABLED
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="text-slate-400 text-xs">
                          Manage player accounts and data
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-none p-3">
                      <p className="text-xs text-blue-400">
                        <strong>👥 Player Management:</strong> Access and modify player database files, view statistics, and manage user data.
                      </p>
                    </div>
                    <Button
                      disabled={loading || serverStatus === 'online'}
                      className={`w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-none ${serverStatus === 'online' ? 'opacity-50 cursor-not-allowed bg-red-500/20 hover:bg-red-500/20' : ''}`}
                    >
                      <FolderOpen className="h-4 w-4 mr-2" />
                      {loading ? 'Loading...' : serverStatus === 'online' ? 'Server Running - Disabled' : 'Load Database'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Worlds Database Card */}
                <Card
                  className={`h-72 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl cursor-pointer transition-all duration-200 hover:scale-105 flex flex-col rounded-none ${
                    serverStatus === 'online' ? 'border-red-500/30 opacity-75' : 'hover:border-green-500/50'
                  }`}
                  onClick={() => !loading && serverStatus !== 'online' && loadWorldsDatabase()}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-none flex items-center justify-center">
                        <Map className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base text-slate-200 flex items-center gap-2">
                          Worlds Database
                          {serverStatus === 'online' && (
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-none">
                              DISABLED
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="text-slate-400 text-xs">
                          Manage world configurations and data
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-none p-3">
                      <p className="text-xs text-green-400">
                        <strong>🌍 World Management:</strong> Edit world database files, manage world settings, and configure game environments.
                      </p>
                    </div>
                    <Button
                      disabled={loading || serverStatus === 'online'}
                      className={`w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-none ${serverStatus === 'online' ? 'opacity-50 cursor-not-allowed bg-red-500/20 hover:bg-red-500/20' : ''}`}
                    >
                      <FolderOpen className="h-4 w-4 mr-2" />
                      {loading ? 'Loading...' : serverStatus === 'online' ? 'Server Running - Disabled' : 'Load Database'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Economy Settings Card */}
                <Card
                  className={`h-72 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl cursor-pointer transition-all duration-200 hover:scale-105 flex flex-col rounded-none ${
                    serverStatus === 'online' ? 'border-red-500/30 opacity-75' : 'hover:border-yellow-500/50'
                  }`}
                  onClick={() => !economyLoading && serverStatus !== 'online' && loadEconomySettings()}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-none flex items-center justify-center">
                        <Database className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base text-slate-200 flex items-center gap-2">
                          Economy Settings
                          {serverStatus === 'online' && (
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-none">
                              DISABLED
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="text-slate-400 text-xs">
                          Configure economy and pricing systems
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className={`bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-none p-3 ${serverStatus === 'online' ? 'border-red-500/50 bg-red-500/20' : ''}`}>
                      <p className="text-xs text-yellow-400">
                        <strong>💰 Economy Configuration:</strong> Set prices, manage salesman items, and configure economic parameters.
                        {serverStatus === 'online' && (
                          <span className="block mt-1 text-red-300 font-semibold text-xs">
                            🚫 Server running - disabled
                          </span>
                        )}
                      </p>
                    </div>
                    <Button
                      disabled={economyLoading || serverStatus === 'online'}
                      className={`w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-none ${serverStatus === 'online' ? 'opacity-50 cursor-not-allowed bg-red-500/20 hover:bg-red-500/20' : ''}`}
                    >
                      <Database className="h-4 w-4 mr-2" />
                      {economyLoading ? 'Loading...' : serverStatus === 'online' ? 'Server Running - Disabled' : 'Load Economy Settings'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

      {/* Players Database File List Dialog */}
      <Dialog open={playersDialogOpen} onOpenChange={setPlayersDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-200">
              <Users className="h-5 w-5 text-blue-400" />
              Players Database Files
              <span className="text-sm font-normal text-slate-400">
                ({playersCount} files, {playersSize})
              </span>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Manage JSON files in the players database.
            </DialogDescription>
          </DialogHeader>

          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search files..."
                value={playersSearch}
                onChange={(e) => setPlayersSearch(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-md text-slate-200 placeholder-slate-400 focus:border-blue-400/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {playersFiles.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No JSON files found</p>
            ) : (
              playersFiles
                .filter(file => file.toLowerCase().includes(playersSearch.toLowerCase()))
                .map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      <span className="text-slate-200">{file}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          loadFileContent(file, 'players')
                          setPlayersDialogOpen(false)
                        }}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => downloadFileFromServer(file, 'players')}
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteFile(file, 'players')}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Worlds Database File List Dialog */}
      <Dialog open={worldsDialogOpen} onOpenChange={setWorldsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-200">
              <Map className="h-5 w-5 text-green-400" />
              Worlds Database Files
              <span className="text-sm font-normal text-slate-400">
                ({worldsCount} files, {worldsSize})
              </span>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Manage JSON files in the worlds database.
            </DialogDescription>
          </DialogHeader>

          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search files..."
                value={worldsSearch}
                onChange={(e) => setWorldsSearch(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-md text-slate-200 placeholder-slate-400 focus:border-green-400/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {worldsFiles.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No JSON files found</p>
            ) : (
              worldsFiles
                .filter(file => file.toLowerCase().includes(worldsSearch.toLowerCase()))
                .map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-400" />
                      <span className="text-slate-200">{file}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          loadFileContent(file, 'worlds')
                          setWorldsDialogOpen(false)
                        }}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => downloadFileFromServer(file, 'worlds')}
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteFile(file, 'worlds')}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* JSON Editor Fullscreen Modal */}
      {editorDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="w-full h-full max-w-full max-h-full bg-slate-900 border-slate-700 flex flex-col">
            {/* Header */}
            <div className="flex flex-row items-center justify-between p-6 border-b border-slate-700 flex-shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-purple-400" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl text-slate-200">Editing File</h2>
                    {hasUnsavedChanges && (
                      <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                        Unsaved Changes
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-slate-400">Filename:</label>
                    <input
                      type="text"
                      value={editingFileName}
                      onChange={(e) => setEditingFileName(e.target.value)}
                      className="px-2 py-1 bg-slate-800/50 border border-slate-600/50 rounded text-slate-200 text-sm focus:border-purple-400/50 focus:outline-none"
                      placeholder="Enter filename..."
                    />
                    <span className="text-slate-400">.json</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    {selectedFileType === 'players' ? 'Players' : 'Worlds'} Database • {serverName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseEditor}
                  className="bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Textarea Container */}
                <div className="flex-1 p-6 pb-4 min-h-0">
                  <Textarea
                    value={currentJsonContent}
                    onChange={(e) => handleJsonContentChange(e.target.value)}
                    placeholder="JSON content will appear here..."
                    className="w-full h-full bg-slate-800/50 border-slate-600/50 focus:border-purple-400/50 transition-colors font-mono text-sm resize-none overflow-auto"
                  />
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-700 bg-slate-900/50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {saveSuccess ? (
                        <span className="text-green-400 animate-pulse">✅ File saved successfully!</span>
                      ) : hasUnsavedChanges ? (
                        <span className="text-orange-400">⚠️ You have unsaved changes</span>
                      ) : (
                        <span className="text-green-400">✓ All changes saved</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleCloseEditor}
                        className="bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={saveFileContent}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Economy Settings Dialog */}
      <Dialog open={economyDialogOpen} onOpenChange={setEconomyDialogOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-full h-[90vh] lg:h-[95vh] bg-slate-900 border-slate-700 overflow-hidden">
          <DialogHeader className="border-b border-slate-700">
            <DialogTitle className="flex items-center gap-2 text-slate-200">
              <Database className="h-5 w-5 text-yellow-400" />
              Economy Settings
              <span className="text-sm font-normal text-slate-400">
                database/json/xovan_json
              </span>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Configure economy settings, buy prices, salesman items, and server configuration.
            </DialogDescription>
          </DialogHeader>

          {economySettings && (
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
              {/* Header Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-blue-300 mb-1">{(economySettings.LOCKE_SALESMAN || []).length}</div>
                  <div className="text-sm text-slate-300 font-medium">Salesman Items</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-green-300 mb-1">{economySettings.maxgems || 1000}</div>
                  <div className="text-sm text-slate-300 font-medium">Max Gems</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-purple-300 mb-1">{Object.keys(economySettings.sellcrystal || {}).length}</div>
                  <div className="text-sm text-slate-300 font-medium">Crystal Types</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-orange-300 mb-1">{Object.keys(economySettings.sellghost || {}).length}</div>
                  <div className="text-sm text-slate-300 font-medium">Ghost Types</div>
                </div>
              </div>

              {/* Basic Economy Settings */}
              <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">💰</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-200">Basic Economy Settings</CardTitle>
                      <CardDescription className="text-slate-400">
                        Core economy parameters and basic sell prices
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-emerald-400 text-sm">💎</span>
                        </div>
                        <div>
                          <Label className="text-lg font-semibold text-slate-200">Max Gems</Label>
                          <p className="text-sm text-slate-400">Maximum gems a player can hold</p>
                        </div>
                      </div>
                      <Input
                        type="number"
                        value={economySettings.maxgems || 1000}
                        onChange={(e) => updateEconomySetting('maxgems', parseInt(e.target.value) || 1000)}
                        className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-emerald-400/50 text-lg h-12"
                        placeholder="1000"
                      />
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-blue-400 text-sm">🐟</span>
                        </div>
                        <div>
                          <Label className="text-lg font-semibold text-slate-200">Sell Fish Price</Label>
                          <p className="text-sm text-slate-400">Price for selling fish to vendor</p>
                        </div>
                      </div>
                      <Input
                        type="number"
                        value={economySettings.sellfish || 50}
                        onChange={(e) => updateEconomySetting('sellfish', parseInt(e.target.value) || 50)}
                        className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-blue-400/50 text-lg h-12"
                        placeholder="50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* BUY_SETTINGS Section */}
              <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-200">Buy Settings</CardTitle>
                      <CardDescription className="text-slate-400">
                        Configure buy prices and enable/disable options for world features
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    {Object.entries(economySettings.BUY_SETTINGS || {}).map(([key, value]: [string, any]) => {
                      const isEnabled = key.includes('Enabled')
                      const settingKey = key.replace('_Enabled', '').replace('_Price', '')
                      const enabledKey = `${settingKey}_Enabled`
                      const priceKey = `${settingKey}_Price`

                      if (isEnabled) return null // Skip enabled fields, handle in price field

                      // Get appropriate icon and color for each setting
                      const getSettingIcon = (settingName: string) => {
                        const name = settingName.toLowerCase()
                        if (name.includes('block')) return '🧱'
                        if (name.includes('clothing')) return '👕'
                        if (name.includes('door')) return '🚪'
                        if (name.includes('portal')) return '🌀'
                        if (name.includes('wallpaper')) return '🎨'
                        if (name.includes('weather')) return '🌤️'
                        return '⚙️'
                      }

                      const getSettingColor = (settingName: string) => {
                        const name = settingName.toLowerCase()
                        if (name.includes('block')) return 'from-orange-500/20 to-red-500/20 border-orange-500/30'
                        if (name.includes('clothing')) return 'from-pink-500/20 to-purple-500/20 border-pink-500/30'
                        if (name.includes('door')) return 'from-amber-500/20 to-yellow-500/20 border-amber-500/30'
                        if (name.includes('portal')) return 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30'
                        if (name.includes('wallpaper')) return 'from-green-500/20 to-emerald-500/20 border-green-500/30'
                        if (name.includes('weather')) return 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30'
                        return 'from-slate-500/20 to-slate-600/20 border-slate-500/30'
                      }

                      return (
                        <div key={key} className={`bg-gradient-to-br ${getSettingColor(key)} border rounded-xl p-6 space-y-4 hover:scale-105 transition-all duration-200 shadow-lg`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-2xl">
                              {getSettingIcon(key)}
                            </div>
                            <div>
                              <Label className="text-lg font-bold text-slate-200">
                                {key.replace(/_/g, ' ').replace('Price', '')}
                              </Label>
                              <p className="text-sm text-slate-400">Buy price in gems</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-300">Enable Feature</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={economySettings.BUY_SETTINGS?.[enabledKey] || false}
                                  onChange={(e) => updateEconomySetting(`BUY_SETTINGS.${enabledKey}`, e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                              </label>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-slate-300">Price (Gems)</Label>
                              <Input
                                type="number"
                                value={value || 0}
                                onChange={(e) => updateEconomySetting(`BUY_SETTINGS.${key}`, parseInt(e.target.value) || 0)}
                                className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-blue-400/50 text-center text-lg font-semibold h-12"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* LOCKE_SALESMAN Section */}
              <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-200">Locke Salesman Items</CardTitle>
                        <CardDescription className="text-slate-400">
                          Configure item prices and lock requirements for the salesman
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      onClick={addLockeSalesmanItem}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {(economySettings.LOCKE_SALESMAN || []).map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-slate-600/30 rounded-lg hover:border-slate-500/50 transition-colors">
                        <div className="flex items-center gap-2 text-green-400 font-medium">
                          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs font-medium text-slate-400">Item ID</Label>
                          <Input
                            type="number"
                            value={item.ItemID || 0}
                            onChange={(e) => updateLockeSalesmanItem(index, 'ItemID', parseInt(e.target.value) || 0)}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-green-400/50 h-8"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs font-medium text-slate-400">Lock ID</Label>
                          <Input
                            type="number"
                            value={item.LockID || 0}
                            onChange={(e) => updateLockeSalesmanItem(index, 'LockID', parseInt(e.target.value) || 0)}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-green-400/50 h-8"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs font-medium text-slate-400">Price (Gems)</Label>
                          <Input
                            type="number"
                            value={item.Price || 0}
                            onChange={(e) => updateLockeSalesmanItem(index, 'Price', parseInt(e.target.value) || 0)}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-green-400/50 h-8"
                          />
                        </div>
                        <Button
                          onClick={() => removeLockeSalesmanItem(index)}
                          size="sm"
                          variant="destructive"
                          className="h-8 px-3 bg-red-500/20 hover:bg-red-500/30 border-red-500/30"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {(economySettings.LOCKE_SALESMAN || []).length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No salesman items configured</p>
                        <p className="text-sm">Click "Add Item" to get started</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>


              {/* Economy Parameters Section */}
              <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Database className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-200">Economy Parameters</CardTitle>
                      <CardDescription className="text-slate-400">
                        Configure various economy-related settings and sell prices
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">

                  {/* Sell Crystal Settings */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white font-bold">💎</span>
                      </div>
                      Sell Crystal Prices
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
                      {Object.entries(economySettings.sellcrystal || {}).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-4 space-y-3">
                          <Label className="text-sm font-semibold text-slate-200">Crystal {key}</Label>
                          <Input
                            type="number"
                            value={value || 0}
                            onChange={(e) => updateEconomySetting(`sellcrystal.${key}`, parseInt(e.target.value) || 0)}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-cyan-400/50"
                            placeholder="Price in gems"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sell Ghost Settings */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white font-bold">👻</span>
                      </div>
                      Sell Ghost Prices
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(economySettings.sellghost || {}).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-4 space-y-3">
                          <Label className="text-sm font-semibold text-slate-200">Ghost {key}</Label>
                          <Input
                            type="number"
                            value={value || 0}
                            onChange={(e) => updateEconomySetting(`sellghost.${key}`, parseInt(e.target.value) || 0)}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-orange-400/50"
                            placeholder="Price in gems"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sell Mining Settings */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white font-bold">⛏️</span>
                      </div>
                      Sell Mining Prices
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                      {Object.entries(economySettings.sellmining || {}).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-4 space-y-3">
                          <Label className="text-sm font-semibold text-slate-200">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                          <Input
                            type="number"
                            value={value || 0}
                            onChange={(e) => updateEconomySetting(`sellmining.${key}`, parseInt(e.target.value) || 0)}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-yellow-400/50"
                            placeholder="Price in gems"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-slate-600/50">
                <Button
                  variant="outline"
                  onClick={() => setEconomyDialogOpen(false)}
                  className="bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveEconomySettings}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  Save Economy Settings
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Config Settings Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-full h-[90vh] lg:h-[95vh] bg-slate-900 border-slate-700 overflow-hidden">
          <DialogHeader className="border-b border-slate-700">
            <DialogTitle className="flex items-center gap-2 text-slate-200">
              <Users className="h-5 w-5 text-red-400" />
              Creator List (Admin)
              <span className="text-sm font-normal text-slate-400">
                database/json/config
              </span>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Manage the list of creators/admins for the server. Only the CREATOR_LIST data is modified.
            </DialogDescription>
          </DialogHeader>

          {configSettings && (
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 max-w-4xl mx-auto">
              {/* Header Stats - Only Creator Count */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-red-300 mb-1">{(configSettings.GAME?.CREATOR_LIST || []).length}</div>
                  <div className="text-sm text-slate-300 font-medium">Total Creators</div>
                </div>
              </div>

              {/* Creator List Management */}
              <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-200">Creator List Management</CardTitle>
                        <CardDescription className="text-slate-400">
                          Add, edit, or remove creators/admins from the server
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      onClick={addCreator}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Add Creator
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {(configSettings.GAME?.CREATOR_LIST || []).map((creator: string, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-slate-600/30 rounded-lg hover:border-slate-500/50 transition-colors">
                        <div className="flex items-center gap-2 text-red-400 font-medium">
                          <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs font-medium text-slate-400">Creator Name</Label>
                          <Input
                            type="text"
                            value={creator || ''}
                            onChange={(e) => updateCreatorList(index, e.target.value)}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-red-400/50 h-8"
                            placeholder="Enter creator name..."
                          />
                        </div>
                        <Button
                          onClick={() => removeCreator(index)}
                          size="sm"
                          variant="destructive"
                          className="h-8 px-3 bg-red-500/20 hover:bg-red-500/30 border-red-500/30"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {(configSettings.GAME?.CREATOR_LIST || []).length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No creators configured</p>
                        <p className="text-sm">Click "Add Creator" to get started</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>


              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-slate-600/50">
                <Button
                  variant="outline"
                  onClick={() => setConfigDialogOpen(false)}
                  className="bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveConfigSettings}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  Save Creator List
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { ServerSettings, WebhookSettings, DatabaseSettings }