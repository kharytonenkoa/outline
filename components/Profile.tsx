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
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useTheme } from "next-themes";
import { Database } from "@/types_db";
import { useEffect, useState } from "react";
import supabase from "@/app/utils/supabase";
type Profiles = Database['public']['Tables']['users']['Row']
  
  export function DropdownMenuProfile({
    url
  }: {
    url: Profiles['avatar_url']
  }) {
    const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
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

        useEffect(() => {
          async function downloadImage(path: string) {
            try {
              const { data, error } = await supabase.storage.from('images').download(path)
              if (error) {
                throw error
              }
      
              const url = URL.createObjectURL(data)
              setAvatarUrl(url)
            } catch (error) {
              console.log('Error downloading image: ', error)
            }
          }
      
          if (url) downloadImage(url)
        }, [url, supabase])
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {avatarUrl ? (
          <Image
            width={35}
            height={35}
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full"
            style={{ height: 35, width: 35 }}
          />
          ) : (
            <div className="bg-white dark:bg-black rounded-full flex items-center justify-center" style={{ height: 35, width: 35 }}><User className='w-4 h-4'/></div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>{userDetails?.full_name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className="mr-2 h-4 w-4" />
              <span>Mode</span>
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
  