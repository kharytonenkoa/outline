"use client"

import {
    LifeBuoy,
    LogOut,
    Info,
    Settings,
    User,
    Moon,
    Sun,
    Palette,
  } from "lucide-react"
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FaUserAlt } from "react-icons/fa"
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSettings } from "@/hooks/useSettings";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useTheme } from "next-themes";
  
  export function DropdownMenuProfile() {
    
    const { isLoading, user, userDetails } = useUser();
    const settings = useSettings();
    const router = useRouter();
    const authModal = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();
    
        if (error) {
            console.error(error.message);
          }
        }

        const { setTheme } = useTheme()
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {userDetails?.avatar_url ? (
            <img src={userDetails?.avatar_url} alt="Avatar" className="w-[35px] h-[35px] flex rounded-full" />
          ) : (
            <div className="bg-white dark:bg-black rounded-full w-[35px] h-[35px] flex items-center justify-center"><User className="w-4 h-4"/></div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>{userDetails?.full_name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light Mode</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
            <DropdownMenuItem onClick={settings.onOpen}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/about"} className="flex flex-row justify-center items-center">
            <Info className="mr-2 h-4 w-4" />
            <span>About</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  