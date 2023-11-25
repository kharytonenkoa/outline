import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon: any;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    active,
    href,

}) => {
    return ( 
        <Link
        href={href}
        className={twMerge(`
        flex
        flex-row
        h-[40px]
        items-center
        justify-center
        w-full
        cursor-pointer
        rounded-lg
        hover:bg-black/10
        active:bg-black/20
        `,
        active && "bg-black/10"
        )}
        >
            <Icon
            className="
            fill-none
            "/>
        </Link>

     );
}
 
export default SidebarItem;