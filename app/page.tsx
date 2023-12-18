import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import Widgets from "@/components/Widgets";
import getPublications from "./actions/getPublications";
import { Metadata } from "next";
import Wallpaper from "@/components/Wallpaper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignLeft, Layers3 } from "lucide-react";

export const metadata: Metadata = {
  title: "My Workspace - Bouq",
  description: "Create and read millions of books, papers, fiction, etc.",
}

export default async function Home() {
  const publications = await getPublications();

  return (
    <>
    <Header/>
    <Wallpaper/>
    <>
      <Tabs defaultValue="workspace">
        <TabsList className="grid w-[250px] z-20 fixed top-[10px] left-[40%] grid-cols-2 rounded-full bg-black/10 backdrop-blur-[50px]">
          <TabsTrigger value="workspace" className="rounded-full flex h-full gap-x-2 items-center justify-center">
            <Layers3 className="w-4 h-4"/>
            Workspace
          </TabsTrigger>
          <TabsTrigger value="list" className="rounded-full flex h-full gap-x-2 items-center justify-center">
            <AlignLeft className="w-4 h-4"/>
            List
          </TabsTrigger>
        </TabsList>
        <TabsContent value="workspace">
          <div className="fixed z-10 top-[50px] left-[15px] h-screen w-full pr-[50px]">
            <HomePage publications={publications}/>
            <Widgets />
          </div>
        </TabsContent>
        <TabsContent value="list">
          <div className="fixed z-10 top-[50px] left-[15px] h-screen w-full pr-[50px]">
            <p>List</p>
          </div>
        </TabsContent>
      </Tabs>
    </>
    
    </>
  )
}
