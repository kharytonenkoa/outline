import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import Widgets from "@/components/Widgets";
import getPublications from "./actions/getPublications";
import Background from "@/components/Background";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Workspace - Outline",
  description: "Create and read millions of books, papers, fiction, etc.",
}

export default async function Home() {
  const publications = await getPublications();

  return (
    <>
    <Background/>
    <Header/>
    <div className="fixed z-10 top-[50px] left-[15px] h-screen w-full pr-[50px]">
      <HomePage publications={publications}/>
      <Widgets />
    </div>
    </>
  )
}
