"use client"

import React from "react"
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
import { UserCheck } from "lucide-react"

interface SocialMedia {
  whatsapp: string
  discord: string
  youtube: string
  tiktok: string
}

interface CommunitySettingsProps {
  socialMedia: SocialMedia
  setSocialMedia: (media: SocialMedia) => void
  onSaveSocial: () => void
}

function CommunitySettings({
  socialMedia,
  setSocialMedia,
  onSaveSocial
}: CommunitySettingsProps) {
  return (
    <div className="space-y-8">
      {/* Community Links Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp Card */}
        <Card className="h-48 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="#25D366"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  WhatsApp Group
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={socialMedia.whatsapp}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, whatsapp: e.target.value })
              }
              placeholder="https://wa.me/1234567890"
              className="bg-slate-800/50 border-slate-600/50 focus:border-green-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>

        {/* Discord Card */}
        <Card className="h-48 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" fill="#5865F2"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  Discord Server
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={socialMedia.discord}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, discord: e.target.value })
              }
              placeholder="https://discord.gg/yourserver"
              className="bg-slate-800/50 border-slate-600/50 focus:border-indigo-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>

        {/* YouTube Card */}
        <Card className="h-48 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  YouTube Channel
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={socialMedia.youtube}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, youtube: e.target.value })
              }
              placeholder="https://youtube.com/@yourchannel"
              className="bg-slate-800/50 border-slate-600/50 focus:border-red-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>

        {/* TikTok Card */}
        <Card className="h-48 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 shadow-xl flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#000000"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base text-slate-200">
                  TikTok Profile
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={socialMedia.tiktok}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, tiktok: e.target.value })
              }
              placeholder="https://tiktok.com/@yourprofile"
              className="bg-slate-800/50 border-slate-600/50 focus:border-pink-400/50 rounded-none text-xs"
            />
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={onSaveSocial}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-none text-white shadow-lg px-8 py-3"
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Save All Community Links
        </Button>
      </div>
    </div>
  )
}

export { CommunitySettings }