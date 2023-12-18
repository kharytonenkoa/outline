import { Metadata } from "next"
import { ScrollArea } from "@/components/ui/scroll-area"
import Background from "@/components/Wallpaper"
import getPublications from "../actions/getPublications"
import Proposals from "@/components/Proposals"
import ContentMap from "@/components/ContentMap"
import Header from "@/components/ExploreHeader"
import getPublicationsByTitle from "@/actions/getPublicationsByTitle"
import { Map } from "lucide-react"
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu"

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string }
};

export const metadata: Metadata = {
  title: "Bouq: Create and read millions of books, papers, fiction, etc.",
  description: "Create and read millions of books, papers, fiction, etc.",
}

const ExplorePage = async ({ searchParams }: SearchProps) => {
  const publications = await getPublicationsByTitle(searchParams.title);
  return (
    <>
      <Header/>
      <ScrollArea className="fixed top-[50px] h-[91%] w-full flex justify-center bg-neutral-950/80 px-8">
        <ContentMap publications={publications}/>
      </ScrollArea>
      <div className="w-[150px] select-none h-[30px] rounded-full bg-black/10 backdrop-blur-[50px] text-xs flex flex-row items-center justify-between gap-x-2 px-2 fixed bottom-4 right-4">
        <Map className="w-4 h-4"/>
        <p>Navigation</p>
        <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut>
    </div>
    </>
  )
}

export default ExplorePage;