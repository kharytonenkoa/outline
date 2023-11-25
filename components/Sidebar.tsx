"use client"

import { usePathname } from "next/navigation";
import Activity from "./icons/Activity";
import Home from "./icons/Home";
import Readlist from "./icons/Readlist";
import Settings from "./icons/Settings";
import { useMemo } from "react";
import SidebarItem from "./SidebarItem";
import Explore from "./icons/Explore";
import Publish from "./icons/Publish";

const Sidebar = () => {

const pathname = usePathname();

const routes = useMemo(() => [
    {
        icon: Home,
        label: 'Home',
        href: '/',
        active: pathname == '/'
    },
    {
        icon: Explore,
        label: 'Explore',
        href: '/explore',
        active: pathname == '/explore'
    },
    {
        icon: Readlist,
        label: 'Readlist',
        href: '/readlist',
        active: pathname == '/readlist'
    },
    {
        icon: Publish,
        label: 'Publish',
        href: '/upload',
        active: pathname == '/upload'
    },
    {
        icon: Activity,
        label: 'Activity',
        href: '/activity',
        active: pathname == '/activity'
    },
    {
        icon: Settings,
        label: 'Settings',
        href: '/settings',
        active: pathname == '/settings'
    }
], [pathname]);


    return ( 
        <div className="flex bg-black/10 backdrop-blur-2xl h-full w-[50px] items-end px-1">
            <div className="w-full mt-2">
                {routes.map((item) => (
                                <SidebarItem
                                key={item.label}
                                {...item}
                                />

                ))}
            <div className="w-full h-[40px] mb-2 flex items-center justify-center cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75038 0.536813L8.44786 0.934915C8.75038 0.536813 8.75054 0.536938 8.75072 0.537075L8.75116 0.53741L8.75233 0.538302L8.7558 0.540969L8.7672 0.549801C8.77674 0.557231 8.79009 0.567733 8.80692 0.581207C8.84056 0.608146 8.88818 0.647012 8.94702 0.696989C9.06459 0.796843 9.22766 0.941629 9.41415 1.12483C9.78507 1.48919 10.2587 2.01531 10.6493 2.65092C11.0387 3.28461 11.3621 4.05376 11.3939 4.89674C11.3971 4.98093 11.3974 5.06545 11.3946 5.15024C12.0673 4.66128 13.0075 4.72648 13.608 5.32699L15.1991 6.9181L15.5527 7.27165L15.1991 7.62521L10.0697 12.7547L9.71617 13.1082L9.71612 13.1082L9.11183 13.7125C8.30673 14.5176 6.99224 14.5176 6.18714 13.7125L5.77009 13.2954L4.06129 15.0042C3.32879 15.7367 2.09977 15.9088 1.23723 15.2117C0.266212 14.4301 0.208453 13.0095 1.06303 12.1476L1.06453 12.1461L2.83986 10.3708L2.4228 9.9537C1.61682 9.14773 1.61911 7.84554 2.4212 7.03616L2.4228 7.03456L2.4228 7.03456L3.03263 6.42472L3.38619 6.07117L3.50594 6.19092C3.59444 6.15129 3.70128 6.101 3.82272 6.03928C4.1997 5.84769 4.71377 5.54782 5.25552 5.11776C6.3384 4.25813 7.51839 2.89045 7.95892 0.83036L8.12354 0.0604858L8.75038 0.536813ZM14.1385 7.27165L9.36257 12.0476L4.25587 6.94085L4.27579 6.93076C4.69956 6.71539 5.27281 6.38082 5.87726 5.90098C6.94232 5.0555 8.11477 3.74961 8.72238 1.84707C9.05635 2.17614 9.46607 2.63551 9.79733 3.17452C10.1328 3.72031 10.3715 4.3212 10.3947 4.93455C10.4171 5.52826 10.2398 6.17252 9.67741 6.83728L8.08378 8.42542L8.78967 9.13374L10.3959 7.53305C10.3959 7.53305 10.396 7.53305 10.396 7.53305L10.396 7.53304L10.396 7.53302L10.396 7.53299L10.3964 7.53264L10.3981 7.53096L10.399 7.52998L10.4119 7.51712L10.4196 7.50939L10.5135 7.41558L10.8679 7.06111L11.8949 6.03409C12.175 5.75406 12.6234 5.75662 12.9009 6.03409L14.1385 7.27165ZM3.13079 7.74078C2.71393 8.1622 2.71645 8.83314 3.12991 9.2466L3.90052 10.0172L4.25407 10.3708L3.90052 10.7243L1.77314 12.8517L1.77245 12.8524C1.33061 13.2988 1.36162 14.0284 1.86456 14.433L1.86554 14.4338C2.27808 14.7674 2.93368 14.7176 3.35418 14.2971L5.41653 12.2348L5.77009 11.8812L6.12364 12.2348L6.89425 13.0054C7.30882 13.42 7.99015 13.42 8.40472 13.0054L8.65546 12.7547L3.38619 7.48538L3.13079 7.74078Z" fill="currentcolor"/>
                </svg>
            </div>
            </div>
        </div>
     );
}
 
export default Sidebar;