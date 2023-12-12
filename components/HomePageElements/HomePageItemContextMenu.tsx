import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
import { ArrowRightToLine, BookOpenText, Link, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
  
  export function HomePageItemContextMenu() {
    const router = useRouter()
    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="absolute w-[50px] h-[50px] z-10"></div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem inset>
          <BookOpenText className="mr-2 h-4 w-4" />
          Open
          </ContextMenuItem>
          <ContextMenuItem inset>
          <ArrowRightToLine className="mr-2 h-4 w-4" />
            Open in New Tab
          </ContextMenuItem>
          <ContextMenuItem inset>
          <Link className="mr-2 h-4 w-4" />
            Copy Link
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem inset>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  }
  