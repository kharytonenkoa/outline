'use client'

import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import React from "react"
import { BookCopy, Compass, Home, HomeIcon, Search, Settings, User } from "lucide-react"
import { useSettings } from "@/hooks/useSettings"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
  
  export function Navigation() {
    const settings = useSettings();
    const [open, setOpen] = React.useState(false)
 
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey) || e.key === "и" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
 
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[350px] h-[100px] border-none rounded-xl bg-neutral-900">
          <div className="flex flex-row gap-x-4 items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/"} className="flex w-[50px] h-[50px] items-center justify-center rounded-xl bg-black/10 hover:bg-black/20 transition-all duration-200"><Home className="w-8 h-8"/></Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/explore"} className="flex w-[50px] h-[50px] items-center justify-center rounded-xl bg-black/10 hover:bg-black/20 transition-all duration-200"><Search className="w-8 h-8"/></Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Explore</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/readlist"} className="flex w-[50px] h-[50px] items-center justify-center rounded-xl bg-black/10 hover:bg-black/20 transition-all duration-200"><BookCopy className="w-8 h-8"/></Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Readlist</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={settings.onOpen} className="flex w-[50px] h-[50px] items-center justify-center rounded-xl bg-black/10 hover:bg-black/20 transition-all duration-200"><Settings className="w-8 h-8"/></button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </div>
        </DialogContent>
      </Dialog>
    )
  }