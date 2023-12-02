import Header from "@/components/Header"
import { Metadata } from "next"
import bg from '@/public/background.png'
import ExploreContent from "@/components/ExploreContent"
import Tournament from "@/components/Tournament"
import HomePage from "@/components/HomePage"
import getPublications from "../actions/getPublications"

export const metadata: Metadata = {
  title: "Explore - Outline",
  description: "Create and read millions of books, papers, fiction, etc.",
}

export default async function ExplorePage() {
  return (
    <div style={{
        backgroundImage: `url(${bg.src})`,
        width: '100%',
        height: '100%' }} className="bg-cover bg-center fixed z-0">
        <div className="w-full h-full z-10 backdrop-blur-[50px]">
            <Header/>
            <div className="fixed top-[50px] h-full w-full border-[0.5px] border-t-white/20">
                <ExploreContent/>
                <Tournament/>
            </div>
        </div>
      </div>
  )
}