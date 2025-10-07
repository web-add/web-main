"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { showToast } from "@/components/toast"
import { MY_API } from "@/lib/config"
import { User, Shield, Lock, Trash2 } from "lucide-react"

interface UserSectionProps {
  username: string
  profileColor: string
  setProfileColor: (color: string) => void
  onLogout: () => void
  onDelete: () => void
}

export default function UserSection({ username, profileColor, setProfileColor, onLogout, onDelete }: UserSectionProps) {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newConfirmPassword, setNewConfirmPassword] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value)
  }

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleNewPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewConfirmPassword(e.target.value)
  }

  const ChangePassword = async () => {
    if (oldPassword.length < 8) {
      showToast("Your OLD password must be at least 8 characters", "error")
    } else if (newPassword === "" || newConfirmPassword === "") {
      showToast("New Password cannot be empty", "warning")
    } else if (newPassword.length < 8 || newConfirmPassword.length < 8) {
      showToast("Your NEW password must be at least 8 characters", "warning")
    } else if (newPassword === oldPassword) {
      showToast("The new password is the same as the old one", "warning")
    } else if (newPassword !== newConfirmPassword) {
      showToast("Passwords do not match!", "warning")
    } else {
      const res = await fetch(`${MY_API}/account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "changepass",
          param1: oldPassword,
          param2: newPassword,
        }),
        credentials: "include",
      })
      if (res.ok) {
        showToast("Password changed successfully!", "success")
      } else {
        showToast("Failed to change password!", "error")
      }
    }
  }

  const setProfileColor2 = async (e: string) => {
    const res = await fetch(`${MY_API}/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "profilecolor",
        param1: "set",
        param2: e,
      }),
      credentials: "include",
    })
    if (res.ok) {
      setProfileColor(e)
    }
  }

  const profileColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
  ]

  const deleteAccount = async () => {
    const res = await fetch(`${MY_API}/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "type": "delete"
      }),
      credentials: "include"
    })
    if (res.ok) {
      showToast("Account deleted successfully!", "success")
      setTimeout(() => {
        window.location.href = "/"
      }, 4000)
    } else {
      showToast("Failed to delete account!", "error")
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card className="shadow-lg rounded-2xl border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Manage your account details and appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Avatar and Color Picker */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <div
                className="h-24 w-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                style={{ backgroundColor: profileColor }}
              >
                {username.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Profile Picture</p>
                <p className="text-xs text-muted-foreground">Auto-generated from username</p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <Label className="text-sm font-medium">Username</Label>
                <p className="text-lg font-semibold mt-1">{username}</p>
                <p className="text-xs text-muted-foreground">Your display name</p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Profile Color</Label>
                <div className="grid grid-cols-5 gap-3">
                  {profileColors.map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-xl border-2 transition-all duration-200 ${
                        profileColor === color
                          ? "border-primary scale-110 shadow-md"
                          : "border-muted hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setProfileColor2(color)}
                      title={`Select ${color}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Choose your preferred theme color</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="shadow-lg rounded-2xl border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Update your password and manage account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change Form */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-medium">Change Password</h4>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="current-password" className="text-sm font-medium">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter your current password"
                  onChange={handlePasswordChange}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-password" className="text-sm font-medium">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    onChange={handleNewPasswordChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    onChange={handleNewPasswordConfirmChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <Button onClick={ChangePassword} className="w-full">
              <Lock className="mr-2 h-4 w-4" />
              Update Password
            </Button>
          </div>

          {/* Account Actions */}
          <div className="border-t pt-6 space-y-3">
            <Button
              variant="outline"
              onClick={onLogout}
              className="w-full"
            >
              Log Out
            </Button>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-destructive/20 pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-destructive" />
              <h4 className="font-medium text-destructive">Danger Zone</h4>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <h5 className="font-medium text-destructive mb-2">Delete Account</h5>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button
                variant="destructive"
                onClick={() => setShowConfirm(true)}
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <Card className="w-full max-w-md shadow-2xl border-destructive/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-destructive">Delete Account</CardTitle>
              <CardDescription>
                This action cannot be undone. All your data will be permanently removed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  • All your servers will be deleted<br/>
                  • Your account data will be removed<br/>
                  • This action is irreversible
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteAccount()
                    setShowConfirm(false)
                  }}
                  className="flex-1"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}