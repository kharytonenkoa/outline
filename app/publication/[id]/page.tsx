import supabase from "@/app/utils/supabase"
import Background from "@/components/Background"
import Logo from "@/components/Logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bold, BookDown, BookPlus, CornerDownLeft, Highlighter, Languages, Maximize2, MessageCircle, MoreHorizontal, PencilRuler, ScanSearch, ThumbsDown, ThumbsUp, Type, WrapText } from "lucide-react"
import React from "react"
import { Document, Page } from 'react-pdf';

export default async function PublicationPage({ params: { id } }: {
  params: { id: string }
}) {
  const { data } = await supabase.from('publications')
  .select(`
  title, 
  user_id, 
  author,
  image_path
`)
  .match({ id }).single()
  
  const pdfURL = '../example.pdf';
  const previewURL = 'https://oxnfecolfxzhszxwowjk.supabase.co/storage/v1/object/public/images/'

  return (  
    <>
      {data ? <title>{data.title + ' - Outline'}</title> : <title>Outline</title>}
      <div className="fixed z-10 w-full h-[50px] backdrop-blur-[50px] md:flex hidden flex-row items-center px-4">
        <Logo/>
        <div className="ml-4 flex gap-x-1 text-sm font-medium truncate justify-center items-center">
          
          <div className="fixed left-[42%]"><Progress value={33} className="w-64 h-1"/></div>
          <div className="fixed right-4 flex flex-row justify-between items-center gap-x-4 select-none">
            <div className="flex flex-row justify-between items-center gap-x-[15px]">
              <div className="flex flex-col items-end">
              {data ? <p className="text-xs font-medium">{data.title}</p> : <p></p>}
              {data ? <p className="text-xs font-light text-white/60 select-none cursor-pointer hover:underline decoration-current">{data.author}</p> : <p></p>}
              </div>
              <div className="h-[35px] aspect-[3/2] overflow-hidden flex items-center justify-center rounded-md">
                {data ? <img src='https://oxnfecolfxzhszxwowjk.supabase.co/storage/v1/object/public/images/fd6db3df-b9f5-4856-a797-5251bd1a7f28-0.05230312693677486.png' className="rounded-md"/> : <div/>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Background/>
      <ScrollArea className="w-full h-[93%] fixed z-10 top-[40px] left-0 flex justify-center items-center pt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-8 h-8 rounded-lg backdrop-blur-[50px] flex items-center justify-center fixed top-16 left-8 bg-black/10"><MoreHorizontal className="w-6 h-6"/></div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ScanSearch className="mr-2 h-4 w-4" />
              <span>View</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>Original File</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Text</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
            <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="mr-2 h-4 w-4" />
              <span>Translate</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Spanish</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Ukrainian</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <MessageCircle className="mr-2 h-4 w-4" />
              <span>Comment</span>
              <DropdownMenuShortcut>Ctrl+M</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Highlighter className="mr-2 h-4 w-4" />
              <span>Highlight</span>
              <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <PencilRuler className="mr-2 h-4 w-4" />
                <span>Text style</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Type className="mr-2 h-4 w-4" />
                  <span>Font</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bold className="mr-2 h-4 w-4" />
                  <span>Weight</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  <span>Size</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <WrapText className="mr-2 h-4 w-4" />
              <span>Display</span>
              <DropdownMenuShortcut>Ctrl+Num</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookDown className="mr-2 h-4 w-4" />
              <span>Save to local</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="w-[700px] h-full rounded-xl ml-[25%] p-4">
        <Document file={pdfURL}>
          <Page pageNumber={1} />
        </Document>
        </div>
      </ScrollArea>
    </>
  )
}
