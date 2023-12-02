import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import Widgets from "@/components/Widgets";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import getPublications from "./actions/getPublications";
import bg from '@/public/background.png'

export default async function Home() {
  const publications = await getPublications();

  return (
    <div style={{
      backgroundImage: `url(${bg.src})`,
      width: '100%',
      height: '100%' }} className="bg-cover bg-center flex z-0">
    <Header/>
    <div className="fixed z-10 top-[50px] left-[15px] h-screen w-full pr-[50px]">
      <HomePage publications={publications}/>
      <div className="z-0 text-sm font-regular flex flex-col justify-center items-center text-white/80 fixed top-[48%] left-[45%] select-none">
        <p className="">Select publication</p>
        <p>or press <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut> to navigate</p>
      </div>
      <Widgets />
    </div>
    </div>
  )
}
