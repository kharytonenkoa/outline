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
        group 
        flex 
        flex-col 
        items-center 
        justify-center
        overflow-hidden 
        cursor-pointer
        rounded-2xl
        w-full
        h-full
        select-none
      "
    >
      <div 
        className="
          relative 
          overflow-hidden
          w-[150px]
          h-[100px]
          hover:w-[250px] transition-all duration-200
        "
      >
        <div className="hover:backdrop-blur-2xl flex w-[150px] h-[100px] absolute hover:w-[250px] transition-all duration-200 z-10 text-white bottom-0">{data.title}</div>
        <Image
          className="object-cover z-0"
          src={imagePath || '/images/placeholder.png'}
          fill
          alt="Image"
        />
      </div>
    </div>
   );
}
 
export default ContentMapItem;