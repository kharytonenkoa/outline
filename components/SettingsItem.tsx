import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SettingsItemItemProps {
    icon: any;
    label: string;
    active?: boolean;
    href: string;
}

const SettingsItem: React.FC<SettingsItemItemProps> = ({
    icon: Icon,
    label,
    active,
    href,

}) => {
    return ( 
        <Link
        href={href}
        className={twMerge(`
        flex
        flex-row
        h-[30px]
        items-center
        justify-center
        w-full
        cursor-pointer
        px-2
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
            <p className="truncate ml-6 w-full text-sm font-regular">{label}</p>
        </Link>

     );
}
 
export default SettingsItem;