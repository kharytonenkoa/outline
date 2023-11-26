import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import React from "react"
import { BookCopy, Compass, Settings, User } from "lucide-react"
import { useSettings } from "@/hooks/useSettings"
import Link from "next/link"
  
  export function Navigation() {
    const settings = useSettings();
    const [open, setOpen] = React.useState(false)
 
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
 
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[350px] h-[100px] border-none">
          <div className="flex flex-row gap-x-4 items-center justify-center">
            <button onClick={settings.onOpen} className="flex w-[50px] h-[50px] items-center justify-center rounded-lg bg-black/10 hover:bg-black/20 transition-all duration-200"><Settings className="w-8 h-8"/></button>
            <Link href={"/profile"} className="flex w-[50px] h-[50px] items-center justify-center rounded-lg bg-black/10 hover:bg-black/20 transition-all duration-200"><User className="w-8 h-8"/></Link>
            <Link href={"/explore"} className="flex w-[50px] h-[50px] items-center justify-center rounded-lg bg-black/10 hover:bg-black/20 transition-all duration-200"><Compass className="w-8 h-8"/></Link>
            <Link href={"/readlist"} className="flex w-[50px] h-[50px] items-center justify-center rounded-lg bg-black/10 hover:bg-black/20 transition-all duration-200"><BookCopy className="w-8 h-8"/></Link>
          </div>
        </DialogContent>
      </Dialog>
    )
  }