"use client"

import { Publication } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import ContentMapItem from "./ContentMapItem";
import Link from "next/link";

interface ContentMapPageProps {
    publications: Publication[];
  }

const ContentMap: React.FC<ContentMapPageProps> = ({
    publications
  }) => {
    const onPlay = useOnPlay(publications);

    if (publications.length === 0) {
        return (
          <div 
            className="
              flex
              w-full
              h-screen
              items-center
              justify-center
              text-xl
              font-semibold
              text-white
            "
          >
            Nothing found.
          </div>
        )
      }

    return (
        <div 
            className="
            grid 
            grid-cols-1 
            sm:grid-cols-1 
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-4
            2xl:grid-cols-6
            gap-x-4
            gap-y-2
            py-4
        ">
            {publications.map((publication:Publication) => (
                <Link href={`/publication/${publication.id}`} key={publication.id}>
                <div key={publication.id}>
                <ContentMapItem
                    onClick={(id: string) => onPlay(id)} 
                    key={publication.id} 
                    data={publication}
                />
                </div>
                </Link>
            ))}
        </div>
     );
}
 
export default ContentMap;