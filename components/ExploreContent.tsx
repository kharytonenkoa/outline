import Proposals from "./Proposals";
import { ScrollArea } from "./ui/scroll-area";

const ExploreContent = () => {
    return ( 
    <ScrollArea className="h-[5000px] w-[65%] fixed left-[15%] border-[0.5px] border-x-white/20">
            <Proposals/>
    </ScrollArea>
    );
}
 
export default ExploreContent;