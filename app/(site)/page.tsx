"use client";

import HomePage from "@/components/HomePage";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <div className="fixed top-[50px] left-[15px] h-full w-full pr-[50px]">
      <HomePage />
      <div className="text-sm font-regular text-white/80 fixed top-[50%] left-[45%] select-none">Select a publication</div>
      <Widgets />
    </div>
  )
}
