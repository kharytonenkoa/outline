import Logo from "./Logo";
import Search from "./Search";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import LogInButton from "./LogInButton";
import { ModeToggle } from "./ThemeSwitch";
import { DropdownMenuProfile } from "./Profile";
import { SettingsModal } from "./SettingsModal";
import { HomePageContextMenu } from "./HomePageElements/HomePageContextMenu";
import { Navigation } from "./Navigation";

const Header = () => {

    const router = useRouter();
    const authModal = useAuthModal();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    return ( 
    <div className="fixed top-0 w-full h-[50px] flex flex-row items-center px-4">
        <Logo />
        <Navigation/>
        <Search />
        <SettingsModal />
        <div className="fixed flex flex-row items-center gap-x-4 right-4">
            {user ? (
            <>
            <DropdownMenuProfile />
            </>
            ) : (
            <LogInButton onClick={authModal.onOpen}/>
            )}
        </div>
    </div>

    );
}
 
export default Header;