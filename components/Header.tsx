"use client"

import Logo from "./Logo";
import Search from "./Search";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import LogInButton from "./LogInButton";
import { DropdownMenuProfile } from "./Profile";
import { SettingsModal } from "./SettingsModal";
import Link from "next/link";
import { SearchIcon } from "lucide-react";

const Header = () => {

    const router = useRouter();
    const authModal = useAuthModal();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    return ( 
    <div className="fixed top-0 w-full h-[50px] flex flex-row items-center px-4 z-10">
        <Logo />
        <SettingsModal />
        <div className="fixed flex flex-row items-center gap-x-4 right-4">
            <Link href={'/explore'}><SearchIcon className="w-4 h-4"/></Link>
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