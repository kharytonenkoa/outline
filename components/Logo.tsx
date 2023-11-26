import Link from "next/link";
import LogoIcon from "./icons/LogoIcon";

const Logo = () => {
    return ( 
    <Link href={'/'} className="flex flex-row items-center">
        <div>
        </div>
        <p className="text-white font-bold text-md">outline</p>
    </Link>
    );
}
 
export default Logo;