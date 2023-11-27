import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import About from "./icons/About"
import Plan from "./icons/Plan"
import Security from "./icons/Security"
import Language from "./icons/Language"
import Personalization from "./icons/Personalization"
import Profile from "./icons/Profile"
import Widgets from "./icons/Widgets"
import { useSettings } from "@/hooks/useSettings"
import { Separator } from "./ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { AccountForm } from "./Settings/AccountForm"
import { SecurityForm } from "./Settings/SecurityForm"
import { PersonalizationForm } from "./Settings/PersonalizationForm"
import { TimeandLanguageForm } from "./Settings/TimeandLanguageForm"

export function SettingsModal() {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent className="sm:max-w-[1000px] h-[500px]">
        <Tabs defaultValue="account" className="w-[1000px] flex flex-row gap-x-2">
        <aside>
          <div className="flex flex-row gap-x-2 h-[40px] w-full px-2 select-none">
            <div className="flex w-[35px] h-[35px] rounded-full bg-white"></div>
            <div className="flex flex-col">
              <p className="font-semibold text-xs text-white/40">Artem Kharytonenko</p>
              <p className="font-regular text-xs text-white/40">@one</p>
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
            <TabsTrigger value="about" asChild>
              <div className="flex flex-row gap-x-2 px-2 w-[200px] h-[35px] hover:bg-white/10 items-center rounded-lg text-sm select-none">
                <About />
                <p>About</p>
              </div>
            </TabsTrigger>
          </TabsList>
          </aside>
          <div className="ml-4">
          <TabsContent value="account"><AccountForm/></TabsContent>
          <TabsContent value="security"><SecurityForm/></TabsContent>
          <TabsContent value="personalization"><PersonalizationForm/></TabsContent>
          <TabsContent value="timeandlanguage"><TimeandLanguageForm/></TabsContent>
          <TabsContent value="about">From AKh for AG</TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}