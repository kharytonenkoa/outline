import Link from "next/link";
import { Kanit } from "next/font/google";
import { Badge } from "./ui/badge";

const Logo = () => {
    return ( 
    <Link href={'/'} className="flex flex-row items-center gap-x-1 justify-center">
        <div>
            <svg width="15" height="16" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7597 0.00649569L45 26.8312L22.5 45.2987L3.20175e-06 26.8312L8.24027 0.0064932L36.7597 0.00649569Z" fill="currentcolor"/>
            </svg>
        </div>
        <p className="text-black dark:text-white font-medium text-2xl font-[Kanit]">Bouq</p>
        <Badge variant={"outline"} className="border-white/40">beta</Badge>
    </Link>
    );
}
 
export default Logo;