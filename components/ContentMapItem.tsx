"use client"

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Publication, UserDetails } from "@/types";
import { useEffect, useState } from "react";
import supabase from "@/app/utils/supabase";

interface ContentMapItemProps {
  data: Publication;
  onClick: (id: string) => void;
}

const ContentMapItem: React.FC<ContentMapItemProps> = ({
  data
}) => {

  const imagePath = useLoadImage(data);
  const [username, setUsername] = useState<any>(null);
  const id = data.user_id;

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { data } = await supabase
        .from('users')
        .select(`
            user_id,
            username
          `)
          .match({ id })
          .single();

        setUsername(data);
      } catch (error) {
        console.error('Error fetching username:', error);
    }
  };
  getUsername();
}, [id]); 

  return ( 
    <div
      className="
        relative
        flex 
        flex-col
        items-center 
        justify-center
        overflow-hidden 
        cursor-pointer
        w-full
        h-full
        select-none
      "
    >
      <div 
        className="
          relative 
          overflow-hidden
          w-full h-full
          aspect-[3/2]
          rounded-md
        "
      >
        <Image
          className="object-cover"
          src={imagePath || '/images/placeholder.png'}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-row w-full items-start pt-2 gap-x-2">
      <div className="w-8 aspect-square flex items-center justify-center rounded-lg bg-white overflow-hidden">
        <Image
          className="object-cover h-full" width={32} height={32}
          src={imagePath || '/images/homepageitemplaceholder.png'}
          alt="Image"
        />
      </div>
      <div className="flex flex-col w-[80%]">
            <p className="font-semibold text-sm truncate w-full">{data.title}</p>
            {username? <p className="text-xs text-white/80 truncate w-full">{username.user_id}</p> : <p className="text-xs text-white/80 truncate w-full">user</p>}
      </div>
      </div>
    </div>
   );
}
 
export default ContentMapItem;