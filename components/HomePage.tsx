"use client"

import GridLayout from "react-grid-layout";
import { HomePageContextMenu } from "./HomePageElements/HomePageContextMenu";
import { Publication } from "@/types";
import PublicationItem from "@/components/PublicationItem";
import useOnPlay from "@/hooks/useOnPlay";
import Link from "next/link";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";

interface HomePageProps {
  publications: Publication[];
}

const HomePage: React.FC<HomePageProps> = ({
  publications
}) => {
  const onPlay = useOnPlay(publications);
  if (publications.length === 0) {
    return (
      <div className="z-0 text-sm font-regular flex flex-col justify-center items-center text-white/80 fixed top-[48%] left-[45%] select-none">
        <p className="">Select publication</p>
        <p>or press <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut> to navigate</p>
      </div>
    )
  }

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
    </div>
);
}
 
export default HomePage
