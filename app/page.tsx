"use client";

import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import Widgets from "@/components/Widgets";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import bg from '@/public/background.png'

export default function Home() {

  return (
    <div style={{
      backgroundImage: `url(${bg.src})`,
      width: '100%',
      height: '100%' }} className="bg-cover bg-center flex">
    <Header/>
    <div className="fixed top-[50px] left-[15px] h-[500px] w-full pr-[50px]">
      <HomePage />
      <div className="text-sm font-regular flex flex-col justify-center items-center text-white/80 fixed top-[48%] left-[45%] select-none">
        <p className="">Select publication</p>
        <p>or press <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut> to navigate</p>
      </div>
      <Widgets />
    </div>
    </div>
  )
}
