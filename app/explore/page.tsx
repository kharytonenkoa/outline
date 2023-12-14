import { Metadata } from "next"
import { ScrollArea } from "@/components/ui/scroll-area"
import Background from "@/components/Background"
import getPublications from "../actions/getPublications"
import Proposals from "@/components/Proposals"
import ContentMap from "@/components/ContentMap"
import Header from "@/components/ExploreHeader"
import getPublicationsByTitle from "@/actions/getPublicationsByTitle"

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string }
};

export const metadata: Metadata = {
  title: "Outline - Create and read millions of books, papers, fiction, etc.",
  description: "Create and read millions of books, papers, fiction, etc.",
}

const ExplorePage = async ({ searchParams }: SearchProps) => {
  const publications = await getPublicationsByTitle(searchParams.title);
  return (
    <>
      <Background/>
      <Header/>
      <ScrollArea className="fixed h-full w-full flex justify-center px-[150px]">
        <Proposals/>
        <ContentMap publications={publications}/>
      </ScrollArea>
    </>
  )
}

export default ExplorePage;