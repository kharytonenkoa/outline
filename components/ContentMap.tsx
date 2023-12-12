"use client"

import { Publication } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import ContentMapItem from "./ContentMapItem";

interface ContentMapPageProps {
    publications: Publication[];
  }

const ContentMap: React.FC<ContentMapPageProps> = ({
    publications
  }) => {
    const onPlay = useOnPlay(publications);

    return (
        <div 
            className="
            flex 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            2xl:grid-cols-4 
            gap-4
            p-4
        ">
            {publications.map((item) => (
                <div key={item.id}>
                <ContentMapItem
                    onClick={(id: string) => onPlay(id)} 
                    key={item.id} 
                    data={item}
                />
                </div>
            ))}
        </div>
     );
}
 
export default ContentMap;