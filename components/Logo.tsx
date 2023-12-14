import Link from "next/link";

const Logo = () => {
    return ( 
    <Link href={'/'} className="flex flex-row items-center gap-x-1">
        <div>
            <svg width="15" height="16" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7597 0.00649569L45 26.8312L22.5 45.2987L3.20175e-06 26.8312L8.24027 0.0064932L36.7597 0.00649569Z" fill="currentcolor"/>
            </svg>
        </div>
        <p className="text-black dark:text-white font-bold text-md">Outline</p>
    </Link>
    );
}
 
export default Logo;