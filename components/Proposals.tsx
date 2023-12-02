import { BookPlus } from "lucide-react";
import { Button } from "./ui/button";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Proposals = () => {
    return ( 
        <div className="w-full h-[250px] flex items-center justify-center p-4">
            <div className="flex flex-row rounded-xl w-full h-[200px] select-none">
                <div className="flex flex-col gap-y-4 h-full w-[40%] px-6 items-start justify-center">
                <div>
                <p className="text-white text-2xl font-semibold">As many as touched Him</p>
                <p className="text-white/40 text-sm font-regular">Eglanton Thorne</p>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                <Button>Open</Button>
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                    <BookPlus className="w-6 h-6 stroke-2 stroke-white/40 hover:stroke-white transition-all duration-200"/>
                    </TooltipTrigger>
                <TooltipContent><p>Add to readlist</p></TooltipContent>
                </Tooltip>
                </TooltipProvider>
                </div>
                </div>
            </div>
        </div>
     );
}
 
export default Proposals;