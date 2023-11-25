"use client"

import GridLayout from "react-grid-layout";
import { AiOutlinePlus } from "react-icons/ai";
import Item from "./HomeElement";
import { HomePageContextMenu } from "./HomePageElements/HomePageContextMenu";
import { HomePageItemContextMenu } from "./HomePageElements/HomePageItemContextMenu";

const HomePage = () => {

    return ( 
      <div className="flex flex-col">
        <HomePageContextMenu />
        <div className="h-[475px]">
          <GridLayout className="layout" cols={17} rowHeight={50} width={970} compactType={null} onLayoutChange={function(saveToLS) {}}>
          <div key="adder" data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }}>
            <div className="w-full aspect-square border border-input bg-black/10 rounded-xl flex flex-col p-1 justify-center items-center backdrop-blur-2xl">
              <AiOutlinePlus className="h-[20px] cursor-pointer hover:fill-neutral-300 transition-all duration-200"/>
            </div>
                <p className="text-xs justify-center w-full truncate mt-1">Add new</p>
            </div>
          <div key="item" data-grid={{ x: 1, y: 0, w: 1, h: 1, minW: 1, maxW: 3, minH: 1, maxH: 2 }}>
              <HomePageItemContextMenu />
              <div className="w-full aspect-square border border-input select-none bg-black/10 rounded-xl flex flex-col p-1 justify-center items-center backdrop-blur-2xl">
                  <Item />
              </div>
              <div className="flex justify-center w-full">
                <p className="text-xs justify-center w-full truncate mt-1">Title</p>
              </div>
          </div>
        </GridLayout>
      </div>
    </div>
);
}
 
export default HomePage;