import { Goal } from "lucide-react";

const WidgetGoals = () => {
    return ( 
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full h-full rounded-full border-4 border-white/40 flex flex-col items-center justify-center">
                <Goal className="w-10 h-10 stroke-white/40"/>
            </div>
                <p className="font-semibold text-md text-white">6/20</p>
            
        </div>
);
}
 
export default WidgetGoals;