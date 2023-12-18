"use client"

import Logo from "./Logo";
import Search from "./Search";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import LogInButton from "./LogInButton";
import DropdownMenuProfile from "./Profile";
import { SettingsModal } from "./SettingsModal";
import Link from "next/link";
import { Plus, SearchIcon } from "lucide-react";

const Header = () => {
    const { user } = useUser();



    return ( 
    <div className="fixed top-0 w-full bg-neutral-950 border-b border-b-neutral-300/20 h-[50px] flex flex-row items-center px-4 z-50">
        <Logo />
        <Search />
        <SettingsModal />
        <div className="fixed flex flex-row items-center gap-x-4 right-4">
        <Link href={"/"} >
            <div className="h-[30px] w-[150px] rounded-full bg-black/10 backdrop-blur-xl flex flex-row gap-x-2 items-center justify-center px-2 select-none cursor-pointer">
                <Plus className="w-4 h-4"/>
                <p className="text-xs">New Publication</p>
            </div>
        </Link>
        <Link href={'/explore'}>
            <div className="w-[100px] h-[30px] rounded-full bg-black/10 backdrop-flur-xl flex flex-row gap-x-2 items-center justify-center">
                <SearchIcon className="w-4 h-4"/>
                <p className="text-xs">Explore</p>
            </div>
        </Link>
            {user ? (
            <>
            <DropdownMenuProfile />
            </>
            ) : (
            <Link href={"/login"}><LogInButton/></Link>
            )}
        </div>
    </div>

    );
}
 
export default Header;