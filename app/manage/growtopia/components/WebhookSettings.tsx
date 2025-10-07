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

interface WebhookSettingsProps {
  webhooks: Webhooks
  setWebhooks: (webhooks: Webhooks) => void
  onSaveWebhooks: () => void
  serverName: string
}

function WebhookSettings({ webhooks, setWebhooks, onSaveWebhooks, serverName }: WebhookSettingsProps) {
  const [playersJson, setPlayersJson] = useState('')
  const [worldsJson, setWorldsJson] = useState('')
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
      // Request list of JSON files from backend
      const response = await fetch(`${MY_API}/manage/${serverName}/database/players/files`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error('Failed to fetch players files')
      }
      const data = await response.json()
      setPlayersFiles(data.files || [])
      setPlayersCount(data.count || 0)
      setPlayersSize(data.totalSizeFormatted || '0 B')
      setPlayersDialogOpen(true)
    } catch (error) {
      console.error('Failed to load players database files:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadWorldsDatabase = async () => {
    setLoading(true)
    try {
      // Request list of JSON files from backend
      const response = await fetch(`${MY_API}/manage/${serverName}/database/worlds/files`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error('Failed to fetch worlds files')
      }
      const data = await response.json()
      setWorldsFiles(data.files || [])
      setWorldsCount(data.count || 0)
      setWorldsSize(data.totalSizeFormatted || '0 B')
      setWorldsDialogOpen(true)
    } catch (error) {
      console.error('Failed to load worlds database files:', error)
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
          loadPlayersDatabase()
        } else {
          loadWorldsDatabase()
        }
      } else {
        console.error('Failed to delete file')
      }
    } catch (error) {
      console.error('Failed to delete file:', error)
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
      // Check if the new filename is different from the original
      const isRenaming = editingFileName !== selectedFile

      if (isRenaming) {
        // Check if the new filename already exists
        const fileExists = await checkFileExists(editingFileName, selectedFileType)
        if (fileExists) {
          const confirmReplace = window.confirm(
            `A file named "${editingFileName}" already exists. Do you want to replace it?`
          )
          if (!confirmReplace) {
            return // Cancel the save operation
          }
        }
      }

      const response = await fetch(`${MY_API}/manage/${serverName}/database/${selectedFileType}/${editingFileName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-original-filename': selectedFile // Send original filename for rename detection
        },
        credentials: "include",
        body: currentJsonContent
      })
      if (!response.ok) {
        throw new Error('Failed to save file')
      }

      // Update the selected file to the new name if it was renamed
      setSelectedFile(editingFileName)
      setOriginalJsonContent(currentJsonContent)
      setHasUnsavedChanges(false)
      setSaveSuccess(true)
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to save file:', error)
    }
  }

  const savePlayersDatabase = async () => {
    setLoading(true)
    try {
      const data = JSON.parse(playersJson)
      // This would be replaced with actual API call to save players database
      console.log('Saving players database:', data)
      // Show success message
    } catch (error) {
      console.error('Failed to save players database:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveWorldsDatabase = async () => {
    setLoading(true)
    try {
      const data = JSON.parse(worldsJson)
      // This would be replaced with actual API call to save worlds database
      console.log('Saving worlds database:', data)
      // Show success message
    } catch (error) {
      console.error('Failed to save worlds database:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Webhooks Section */}
      <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Webhook className="h-5 w-5 text-orange-400" />
            Webhooks & Notifications
          </CardTitle>
          <CardDescription className="text-slate-400">
            Configure server-side webhook endpoints for events and notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-yellow-400">
              <strong>⚠️ Important:</strong> Webhook changes require a{" "}
              <span className="font-bold text-yellow-300">server restart</span> to take effect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="webhook-sb" className="text-sm font-medium text-slate-300">
                Server Broadcast
              </Label>
              <Input
                id="webhook-sb"
                value={webhooks.webhook_sb}
                onChange={(e) =>
                  setWebhooks({ ...webhooks, webhook_sb: e.target.value })
                }
                placeholder="https://discord.com/api/webhooks/..."
                className="bg-slate-800/50 border-slate-600/50 focus:border-orange-400/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-ban" className="text-sm font-medium text-slate-300">
                Ban Events
              </Label>
              <Input
                id="webhook-ban"
                value={webhooks.webhook_ban}
                onChange={(e) =>
                  setWebhooks({ ...webhooks, webhook_ban: e.target.value })
                }
                placeholder="https://discord.com/api/webhooks/..."
                className="bg-slate-800/50 border-slate-600/50 focus:border-orange-400/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-mute" className="text-sm font-medium text-slate-300">
                Mute Events
              </Label>
              <Input
                id="webhook-mute"
                value={webhooks.webhook_mute}
                onChange={(e) =>
                  setWebhooks({ ...webhooks, webhook_mute: e.target.value })
                }
                placeholder="https://discord.com/api/webhooks/..."
                className="bg-slate-800/50 border-slate-600/50 focus:border-orange-400/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-curse" className="text-sm font-medium text-slate-300">
                Curse Events
              </Label>
              <Input
                id="webhook-curse"
                value={webhooks.webhook_curse}
                onChange={(e) =>
                  setWebhooks({ ...webhooks, webhook_curse: e.target.value })
                }
                placeholder="https://discord.com/api/webhooks/..."
                className="bg-slate-800/50 border-slate-600/50 focus:border-orange-400/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-createacc" className="text-sm font-medium text-slate-300">
                Account Creation
              </Label>
              <Input
                id="webhook-createacc"
                value={webhooks.webhook_createacc}
                onChange={(e) =>
                  setWebhooks({ ...webhooks, webhook_createacc: e.target.value })
                }
                placeholder="https://discord.com/api/webhooks/..."
                className="bg-slate-800/50 border-slate-600/50 focus:border-orange-400/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-giveaway" className="text-sm font-medium text-slate-300">
                Giveaway Events
              </Label>
              <Input
                id="webhook-giveaway"
                value={webhooks.webhook_giveaway}
                onChange={(e) =>
                  setWebhooks({ ...webhooks, webhook_giveaway: e.target.value })
                }
                placeholder="https://discord.com/api/webhooks/..."
                className="bg-slate-800/50 border-slate-600/50 focus:border-orange-400/50 transition-colors"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="webhook-economyupdate" className="text-sm font-medium text-slate-300">
                Economy Updates
              </Label>
              <Input
                id="webhook-economyupdate"
                value={webhooks.webhook_economyupdate}
                onChange={(e) =>
                  setWebhooks({ ...webhooks, webhook_economyupdate: e.target.value })
                }
                placeholder="https://discord.com/api/webhooks/..."
                className="bg-slate-800/50 border-slate-600/50 focus:border-orange-400/50 transition-colors"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-600/50">
            <Button
              type="button"
              onClick={onSaveWebhooks}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
            >
              Save Webhook Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Database Management Section */}
      <Card className={`bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm ${serverStatus === 'online' ? 'border-red-500/50 bg-gradient-to-r from-red-900/20 to-red-800/20' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Database className="h-5 w-5 text-purple-400" />
            Database Management
            {serverStatus === 'online' && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                SERVER RUNNING
              </span>
            )}
          </CardTitle>
          <CardDescription className="text-slate-400">
            Edit server databases directly. {serverStatus === 'online' ? (
              <span className="text-red-400 font-semibold">⚠️ Server must be stopped before editing databases!</span>
            ) : (
              'Use with caution - invalid JSON may break the server.'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full space-y-4">
            {/* Players Database Section */}
            <AccordionItem value="players-db" className={`border-slate-600/50 ${serverStatus === 'online' ? 'border-red-500/30' : ''}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-slate-300">Players Database</span>
                  {serverStatus === 'online' && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                      DISABLED
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                <div className={`bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4 ${serverStatus === 'online' ? 'border-red-500/50 bg-red-500/20' : ''}`}>
                  <p className="text-sm text-red-400">
                    <strong>⚠️ Danger Zone:</strong> Editing player data can cause data corruption. Always backup before making changes.
                    {serverStatus === 'online' && (
                      <span className="block mt-2 text-red-300 font-semibold">
                        🚫 Server is currently running. Stop the server before editing databases.
                      </span>
                    )}
                  </p>
                </div>

                <Button
                  onClick={loadPlayersDatabase}
                  disabled={loading || serverStatus === 'online'}
                  className={`bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 ${serverStatus === 'online' ? 'opacity-50 cursor-not-allowed bg-red-500/20 hover:bg-red-500/20' : ''}`}
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  {loading ? 'Loading...' : serverStatus === 'online' ? 'Server Running - Disabled' : 'Load Database'}
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Worlds Database Section */}
            <AccordionItem value="worlds-db" className={`border-slate-600/50 ${serverStatus === 'online' ? 'border-red-500/30' : ''}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-green-400" />
                  <span className="text-slate-300">Worlds Database</span>
                  {serverStatus === 'online' && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                      DISABLED
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                <div className={`bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4 ${serverStatus === 'online' ? 'border-red-500/50 bg-red-500/20' : ''}`}>
                  <p className="text-sm text-red-400">
                    <strong>⚠️ Danger Zone:</strong> Editing world data can cause world corruption. Always backup before making changes.
                    {serverStatus === 'online' && (
                      <span className="block mt-2 text-red-300 font-semibold">
                        🚫 Server is currently running. Stop the server before editing databases.
                      </span>
                    )}
                  </p>
                </div>

                <Button
                  onClick={loadWorldsDatabase}
                  disabled={loading || serverStatus === 'online'}
                  className={`bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 ${serverStatus === 'online' ? 'opacity-50 cursor-not-allowed bg-red-500/20 hover:bg-red-500/20' : ''}`}
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  {loading ? 'Loading...' : serverStatus === 'online' ? 'Server Running - Disabled' : 'Load Database'}
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
    </div>
  )
}

export { WebhookSettings }