"use client"

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Publication } from "@/types";
import { HomePageItemContextMenu } from "./HomePageElements/HomePageItemContextMenu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface PublicationItemProps {
    data: Publication;
    onClick: (id: string) => void;
  }

const PublicationItem: React.FC<PublicationItemProps> = ({
    data,
    onClick
  }) => {

    const imagePath = useLoadImage(data);
    

    return (
        <div key={data.id} data-grid={{ w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 1 }}>
              <HomePageItemContextMenu />
              <div className="w-full aspect-square select-none bg-black/10 rounded-xl flex flex-col p-1 justify-center items-center backdrop-blur-2xl" onClick={() => onClick(data.id)}>
              {imagePath? <Image
                className="object-cover rounded-xl"
                src={imagePath}
                fill
                alt="Image"
              /> : 
              <Image
                className="object-cover rounded-xl"
                src={'/images/homepageitemplaceholder.png'}
                fill
                alt="Image"
              />}
              
              </div>
              <div className="flex justify-center w-full">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="z-10 text-xs justify-center w-full truncate mt-1 select-none">{data.title}</p>
                  </TooltipTrigger>
                  <TooltipContent className="z-20">
                    <p className="z-20">{data.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              </div>
          </div>
    );
}
 
export default PublicationItem;