"use client"

import { WidgetContextMenu } from "./HomePageElements/WidgetContextMenu";
import WidgetGoals from "./WidgetGoals";
import GridLayout from "react-grid-layout";

const Widgets = () => {
    return ( 
        <div className="fixed right-[0px] top-[50px] h-[475px] w-[20%]">
      <GridLayout className="layout" cols={4} rowHeight={50} width={230} compactType={null} onLayoutChange={function(saveToLS) {}}>
      
      <div key="widget-goals" data-grid={{ x: 0, y: 0, w: 2, h: 2, minW: 1 }}>
        <div className="w-full aspect-square select-none bg-black/10 border border-input rounded-xl flex flex-col p-2 backdrop-blur-2xl">
            <WidgetContextMenu/>
            <WidgetGoals />
        </div>
      </div>
    </GridLayout>
    </div>
     );
}
 
export default Widgets;