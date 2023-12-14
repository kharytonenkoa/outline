import { ArrowUpCircle } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const Proposals = () => {
    return ( 
        <div className="w-full h-[300px] flex flex-row mt-16 mb-4">
            <div className="w-[50%] flex flex-col justify-center">
                <p className="text-3xl drop-shadow-lg font-semibold select-none">Get your next level adventure with <span className="font-bold">Outline<sup className="">2</sup></span></p>
                <p className="text-white/80 drop-shadow-lg select-none">Improve the flexibility of your Workspace, access your publications anywhere and much more functions.</p>
                <Button className="w-44 gap-x-2 mt-4">
                    <ArrowUpCircle className="stroke-[1.5px] w-5 h-5"/>
                    Upgrade Outline
                </Button>
            </div>
            <div className="w-[50%] h-full flex justify-center overflow-visible select-none">
                <Image src={"/images/proposals-image.png"} width={600} height={300} alt="img" className="overflow-auto"/>
            </div>
        </div>
     );
}
 
export default Proposals;