import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import Plan from "./icons/Plan"
import Security from "./icons/Security"
import Language from "./icons/Language"
import Personalization from "./icons/Personalization"
import Profile from "./icons/Profile"
import Widgets from "./icons/Widgets"
import { useSettings } from "@/hooks/useSettings"
import { Separator } from "./ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { SecurityForm } from "./Settings/SecurityForm"
import { PersonalizationForm } from "./Settings/PersonalizationForm"
import { TimeandLanguageForm } from "./Settings/TimeandLanguageForm"
import { useUser } from "@/hooks/useUser"
import React from "react"
import AccountForm from "./Settings/AccountForm"
import { User } from "lucide-react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Image from "next/image"

export function SettingsModal() {

  const { user, userDetails } = useUser();

  const supabaseClient = useSupabaseClient();
  if (!userDetails) {
    return null;
  }
  const { data: imageData } = supabaseClient
  .storage
  .from('images')
  .getPublicUrl(userDetails?.avatar_url);

  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent className="sm:max-w-[1000px] h-[500px] bg-neutral-900 border-none rounded-xl">
        <Tabs defaultValue="account" className="w-[1000px] flex flex-row gap-x-2">
        <aside>
          <div className="flex flex-row gap-x-2 h-[40px] w-full px-2 select-none">
            {imageData ? (
            <Image
            width={35}
            height={35}
            src={imageData.publicUrl}
            alt="Avatar"
            className="rounded-full"
            style={{ height: 35, width: 35 }}
          />
            ) : (
              <div className="bg-white dark:bg-black rounded-full flex items-center justify-center" style={{ height: 35, width: 35 }}><User className='w-4 h-4'/></div>
            )}
            <div className="flex flex-col">
              <p className="font-medium text-sm text-white truncate">{userDetails?.full_name}</p>
              <p className="font-regular text-xs text-white/40">{userDetails?.username}</p>
            </div>
          </div>
          <Separator className="my-2 bg-white/40"/>
          <TabsList className="flex flex-col h-full">
            <TabsTrigger value="account" asChild>
              <div className="flex flex-row gap-x-2 px-2 w-[200px] h-[35px] hover:bg-white/10 items-center rounded-lg text-sm select-none">
                <Profile />
                <p>Account</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="security" asChild>
              <div className="flex flex-row gap-x-2 px-2 w-[200px] h-[35px] hover:bg-white/10 items-center rounded-lg text-sm select-none">
                <Security />
                <p>Security</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="personalization" asChild>
              <div className="flex flex-row gap-x-2 px-2 w-[200px] h-[35px] hover:bg-white/10 items-center rounded-lg text-sm select-none">
                <Personalization />
                <p>Personalization</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="timeandlanguage" asChild>
              <div className="flex flex-row gap-x-2 px-2 w-[200px] h-[35px] hover:bg-white/10 items-center rounded-lg text-sm select-none">
                <Language />
                <p>Time and Language</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="widgets" asChild>
              <div className="flex flex-row gap-x-2 px-2 w-[200px] h-[35px] hover:bg-white/10 items-center rounded-lg text-sm select-none">
                <Widgets />
                <p>Widgets</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="plan" asChild>
              <div className="flex flex-row gap-x-2 px-2 w-[200px] h-[35px] hover:bg-white/10 items-center rounded-lg text-sm select-none">
                <Plan />
                <p>Plan</p>
              </div>
            </TabsTrigger>
          </TabsList>
          </aside>
          <div className="ml-4">
          <TabsContent value="account"><AccountForm /></TabsContent>
          <TabsContent value="security"><SecurityForm/></TabsContent>
          <TabsContent value="personalization"><PersonalizationForm/></TabsContent>
          <TabsContent value="timeandlanguage"><TimeandLanguageForm/></TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}