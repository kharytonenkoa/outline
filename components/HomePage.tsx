"use client"

import GridLayout from "react-grid-layout";
import { HomePageContextMenu } from "./HomePageElements/HomePageContextMenu";
import { useUpload } from "@/hooks/useUpload";
import { Publication } from "@/types";
import PublicationItem from "@/components/PublicationItem";
import Link from "next/link";
import useOnPlay from "@/hooks/useOnPlay";

interface HomePageProps {
  publications: Publication[];
}

const HomePage: React.FC<HomePageProps> = ({
  publications
}) => {
  const onPlay = useOnPlay(publications);
  
  const upload = useUpload();
  if (publications.length === 0) {
    return (
      <></>
    )
  }

    return ( 
      <div className="flex flex-col">
        <HomePageContextMenu />
        <div className="h-[475px]">
        <GridLayout className="layout" cols={17} rowHeight={60} maxRows={7} width={970} compactType={null} onLayoutChange={function(saveToLS) {}}>
            {publications.map((item) => (
              <div key={item.id}>
                <PublicationItem
                  onClick={(id: string) => onPlay(id)} 
                  key={item.id} 
                  data={item}
                />
              </div>
            ))}
        </GridLayout>
      </div>
    </div>
);
}
 
export default HomePage;