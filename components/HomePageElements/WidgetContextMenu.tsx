import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
import { ArrowRightToLine, Blocks, BookOpenText, Cuboid, Link, PencilRuler, Settings2, Trash2 } from "lucide-react"
  
  export function WidgetContextMenu() {
    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="absolute w-[100px] h-[100px] z-10"></div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem inset>
          <Settings2 className="mr-2 h-4 w-4" />
          Edit Widget
          </ContextMenuItem>
          <ContextMenuItem inset>
          <Blocks className="mr-2 h-4 w-4" />
          Widget Preferences
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
  