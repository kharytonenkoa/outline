'use client'

import supabase from "@/app/utils/supabase"
import Logo from "@/components/Logo"
import Wallpaper from "@/components/Wallpaper"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import useLoadImage from "@/hooks/useLoadImage"
import { Publication } from "@/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Bold, BookDown, BookPlusIcon, ChevronDown, Highlighter, Languages, Maximize2, MessageCircle, MoreHorizontal, PencilRuler, ScanSearch, Star, ThumbsDown, ThumbsUp, Type, WrapText } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

export default function PublicationPage({ params: { 
  data,
  id
} }: { 
  params: { 
    data: Publication;
    id: string;
  } }) {
  const [publicationData, setPublicationData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const imagePath = useLoadImage(data);
  const supabaseClient = useSupabaseClient();
  const [location, setLocation] = useState<string | number>(0)
  

  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(publicationData?.image_path);

    const togglePinned = () => {
        setIsExpanded(!isExpanded);
      };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('publications')
          .select(`
            title,
            user_id,
            image_path,
            description
          `)
          .match({ id })
          .single();

        setPublicationData(data);
      } catch (error) {
        console.error('Error fetching publication data:', error);
      }
    };

    fetchData();
  }, [id]); 

  const markdown = `
      ## _The Last Markdown Editor, Ever_
      `;

  return (  
    <>
      <Wallpaper/>
      {publicationData ? <title>{publicationData.title + ' - Bouq'}</title> : <title>Bouq</title>}
      <div className={`fixed z-10 w-full ${isExpanded ? 'h-[300px] backdrop-blur-[50px]' : 'h-[50px]'} border-b border-b-neutral-300/20 md:flex hidden`}>
        <div className="w-full h-[50px] flex flex-row items-center px-4">
          <Logo/>
          <div className="ml-4 flex gap-x-1 text-sm font-medium truncate justify-center items-center">
            
            <div className="fixed left-[42%]"><Progress value={(11/12)*100} className="w-64 h-1"/></div>
            <div className="fixed right-4 flex flex-row justify-between items-center gap-x-4 select-none">
              <div className="flex flex-row justify-between items-center gap-x-[15px]">
                <div className="flex flex-col items-end w-[200px]">
                {publicationData ? <p className="text-xs font-medium">{publicationData.title}</p> : <p></p>}
                {publicationData ? <p className="text-xs font-light text-white/60 select-none cursor-pointer hover:underline decoration-current">{publicationData.username}</p> : <p></p>}
                </div>
                <div className="h-[30px] aspect-[3/2] overflow-hidden flex items-center justify-center rounded-md">
                  {imageData ? <Image src={imageData.publicUrl} width={45} height={30} className="rounded-md" alt=""/> : <div/>}
                </div>
                <div className="h-8 cursor-pointer rounded-md flex items-center justify-center">
                  <ChevronDown className={`w-4 h-4 hover:border-white/60 ${isExpanded ? 'rotate-180' : ''} transition-all duration-200`} onClick={togglePinned}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex flex-row gap-x-4 ${isExpanded ? 'h-[250px]' : 'hidden'} fixed top-[50px] w-full justify-center items-center`}>
          <div className="flex flex-col gap-y-2">
            <div className="w-[280px] aspect-[3/2] rounded-xl bg-black/10 overflow-hidden flex items-center justify-center">{imageData ? <Image src={imageData.publicUrl} width={280} height={187} className="object-cover w-full h-full" alt=""/> : <div/>}</div>
            <div className="flex gap-x-2">
              <Button className="rounded-full text-white text-sm bg-black/10 backdrop-blur-[50px] hover:bg-black/20 select-none gap-x-2">
                <Star className="stroke-[1px] w-4 h-6"/>
                <p>Rate</p>
              </Button>
              <Button className="rounded-full text-white text-sm bg-black/10 backdrop-blur-[50px] hover:bg-black/20 select-none gap-x-2">
                <BookPlusIcon className="stroke-[1px] w-4 h-6"/>
                <p>Add to Readlist</p>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 w-[350px] h-full p-2">
            {publicationData ? <p className="text-xl font-semibold">{publicationData.title}</p> : <p></p>}
            {publicationData ? <p className="text-white/80 text-sm select-none hover:underline cursor-pointer">Full Name</p> : <p></p>}
            {publicationData ? <p className="text-white/60 break-words text-sm">{publicationData.description}</p> : <p></p>}
          </div>
        </div>
      </div>
      <ScrollArea className={`w-full fixed z-10 ${isExpanded ? 'top-[300px] h-[48%]' : 'top-[50px] h-[91%]'} left-0 flex items-center justify-center pt-4`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={`w-8 h-8 rounded-full backdrop-blur-[50px] flex items-center justify-center fixed ${isExpanded ? 'top-[320px]' : 'top-16'} left-8 bg-black/10`}>
              <MoreHorizontal className="w-6 h-6"/>
            </div>
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
          <ReactMarkdown className="fixed top-[15%] left-[25%] flex font-medium text-xl w-[600px]">
          </ReactMarkdown>
      </ScrollArea>
    </>
  )
}
