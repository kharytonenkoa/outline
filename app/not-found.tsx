import Header from "@/components/Header";
import getPublications from "./actions/getPublications";
import Background from "@/components/Background";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found - Outline",
  description: "Create and read millions of books, papers, fiction, etc.",
}

export default async function Home() {
  const publications = await getPublications();

  return (
    <>
    <Background/>
    <Header/>
    <div className="fixed z-10 top-[50px] left-[15px] h-screen w-full pr-[50px]">
      <div className="fixed top-[40%] left-[45%] flex flex-col gap-y-2 justify-center items-center">
      <p className="font-bold text-6xl">404</p>
      <p className="">Page not found :'(</p>
      <Link href={"/"}><Button variant={"outline"} className="bg-black/40">Back to Home Page</Button></Link>
      </div>
    </div>
    </>
  )
}
