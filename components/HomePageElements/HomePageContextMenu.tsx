import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
import { Book, Folder, Plus, RefreshCw } from "lucide-react"
import Personalization from "../icons/Personalization"
  
  export function HomePageContextMenu() {
    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="absolute w-full h-full z-0"></div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem inset>
          <RefreshCw className="mr-2 h-4 w-4" />
            Reload
            <ContextMenuShortcut>Ctrl+R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>
            <Plus className="mr-2 h-4 w-4" />
            Create
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
              <Book className="mr-2 h-4 w-4" />
                New Publication
                </ContextMenuItem>
              <ContextMenuItem disabled>
              <Folder className="mr-2 h-4 w-4" />
                Folder
                <ContextMenuShortcut>Soon</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem inset>
          
          Personalize
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  }
  