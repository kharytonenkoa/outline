"use client"

import GridLayout from "react-grid-layout";
import { HomePageContextMenu } from "./HomePageElements/HomePageContextMenu";
import { Publication } from "@/types";
import PublicationItem from "@/components/PublicationItem";
import useOnPlay from "@/hooks/useOnPlay";
import Link from "next/link";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";
import { useCallback, useEffect, useMemo } from "react";
import { Layout } from "react-grid-layout";
import { Map } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";
import { Navigation } from "./Navigation";

interface HomePageProps {
  publications: Publication[];
}

const HomePage: React.FC<HomePageProps> = ({
  publications
}) => {
  const onPlay = useOnPlay(publications);
  if (publications.length === 0) {
    return (
      <div className="z-0 text-sm font-regular bg-white/20 rounded-full px-2 py-1 flex flex-col justify-center items-center fixed top-[48%] left-[40%] select-none">
      </div>
    )
  }

  const navigation = Navigation();
    return ( 
      <div className="flex flex-col">
         <HomePageContextMenu />
        <div className="h-[475px]">
          <GridLayout className="layout" cols={17} rowHeight={60} width={970} compactType={null} onLayoutChange={function(saveToLS) {}}>
            {publications.map((item) => (
              <Link href={`/publication/${item.id}`} key={item.id}>
              <div key={item.id}>
                <PublicationItem
                  onClick={(id: string) => onPlay(id)} 
                  key={item.id} 
                  data={item}
                />
              </div>
              </Link>
            ))}
        </GridLayout>
      </div>
      <div className="w-[150px] select-none h-[30px] rounded-full bg-black/10 backdrop-blur-[50px] text-xs flex flex-row items-center justify-between gap-x-2 px-2 fixed bottom-4 right-4">
        <Map className="w-4 h-4"/>
        <p>Navigation</p>
        <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut>
    </div>
    </div>
);
}
 
export default HomePage
