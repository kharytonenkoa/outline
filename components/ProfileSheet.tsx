import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function ProfileSheet() {
  
  return (
    <Sheet>
        <SheetTrigger><Button>Open</Button></SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
