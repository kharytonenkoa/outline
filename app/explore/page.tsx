import Header from "@/components/Header"
import { Metadata } from "next"
import ExploreContent from "@/components/ExploreContent"
import { ScrollArea } from "@/components/ui/scroll-area"
import Sidebar from "@/components/Sidebar"
import Background from "@/components/Background"

export const metadata: Metadata = {
  title: "Explore - Outline",
  description: "Create and read millions of books, papers, fiction, etc.",
}

export default async function ExplorePage() {
  return (
    <>
    
        <>
          <Background/>
          <Header/>
            <div className="fixed top-[50px] h-full w-full border-[0.5px] border-t-white/20">
                <Sidebar/>
                <ScrollArea className="h-screen w-[96%] fixed left-[50px] border-[0.5px] border-white/20"><ExploreContent/></ScrollArea>
            </div>
        </>
      </>
  )
}