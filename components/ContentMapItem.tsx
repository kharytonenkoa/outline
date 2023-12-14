"use client"

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Publication } from "@/types";

interface ContentMapItemProps {
  data: Publication;
  onClick: (id: string) => void;
}

const ContentMapItem: React.FC<ContentMapItemProps> = ({
  data,
}) => {

  const imagePath = useLoadImage(data);

  return ( 
    <div
      className="
        relative
        flex 
        items-center 
        justify-center
        overflow-hidden 
        cursor-pointer
        w-full
        h-full
        select-none
        rounded-md
      "
    >
      <div 
        className="
          relative 
          overflow-hidden
          aspect-[3/2]
          w-[100%]
        "
      >
        <div className="flex w-full h-full absolute bottom-0 p-3 z-30 items-end">
          <p className="truncate-all">
            <span className="text-lg font-semibold">{data.title}</span> 
            <span className="text-lg font-regural text-white/60">    {data.description}</span>
            <br/>
            <span className="text-sm">{data.user_id}</span>
            </p>
          </div>
        <Image
          className="object-cover z-0"
          src={imagePath || '/images/placeholder.png'}
          fill
          alt="Image"
        />
        <div className="w-full h-full absolute z-20 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent"></div>
      </div>
    </div>
   );
}
 
export default ContentMapItem;