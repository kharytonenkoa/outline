"use client"

import Header from "@/components/Header"
import Wallpaper from "@/components/Wallpaper";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { User } from "lucide-react";
import Image from "next/image";

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string }
};

const ReadlistPage = async ({ searchParams }: SearchProps) => {
  const { user, userDetails } = useUser();
  const supabaseClient = useSupabaseClient();

  if (!userDetails) {
    return null;
  }
  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(userDetails?.avatar_url);
  return (
    <>
        <title>My Readlist - Outline</title>
      <Header/>
      <Wallpaper/>
      <div className="fixed top-[50px] h-screen w-full flex flex-row gap-x-4 items-start pt-8 justify-center">
        <div className="flex flex-col w-[20%] h-[350px] bg-black/10 backdrop-blur-[50px] rounded-xl items-center justify-start p-4 gap-y-2 truncate">
            <div className="w-24 h-24 rounded-full bg-red-500">
            {imageData ? (
            <Image
            width={35}
            height={35}
            src={imageData.publicUrl}
            alt="Avatar"
            className="rounded-full"
            style={{ height: 96, width: 96 }}
          />
          ) : (
            <div className="bg-white dark:bg-black rounded-full flex items-center justify-center" style={{ height: 35, width: 35 }}><User className='w-4 h-4'/></div>
          )}
            </div>
            <div className="flex flex-col justify-center items-center">
                <p className="text-lg font-semibold">{userDetails?.full_name}</p>
                <p className="text-sm font-regular text-white/80">{userDetails?.username}</p>
            </div>
            <Separator className="bg-white/80"/>
            <div>Stats</div>
        </div>
        <div className="flex flex-col gap-y-4">
            <div className="w-[500px] h-[100px] flex flex-col gap-y-4 bg-black/10 backdrop-blur-[50px] rounded-xl p-4 text-xl font-semibold">In Process</div>
            <div className="w-[500px] h-[100px] flex flex-col gap-y-4 bg-black/10 backdrop-blur-[50px] rounded-xl p-4 text-xl font-semibold">Wishlist</div>
            <div className="w-[500px] h-[100px] flex flex-col gap-y-4 bg-black/10 backdrop-blur-[50px] rounded-xl p-4 text-xl font-semibold">Waiting</div>
            <div className="w-[500px] h-[100px] flex flex-col gap-y-4 bg-black/10 backdrop-blur-[50px] rounded-xl p-4 text-xl font-semibold">Done</div>
        </div>
      </div>
    </>
  )
}

export default ReadlistPage;