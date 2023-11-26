"use client"
 
import * as z from "zod"
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useUpload } from "@/hooks/useUpload"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
  
  export function UploadPublicationModal() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
      },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }
    const upload = useUpload();
    return (
      <Dialog open={upload.isOpen} onOpenChange={upload.onClose}>
        <DialogContent className="sm:max-w-[800px] h-[500px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8 ">
              <div className="flex flex-row gap-x-2">
              <aside className="w-[430px] flex flex-col gap-y-4 pr-2">
              <FormItem>
                  <FormControl>
                    <Input type="file" placeholder="Publication title" accept=".pdf" className="bg-white text-black file:text-black mb-4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormControl>
                    <input placeholder="Publication title" className="bg-transparent w-full ring-transparent text-2xl font-semibold border-none rounded-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Write a description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </aside>
              <div className="w-1/2 fixed left-[50%] pr-8 pl-2">
              <FormItem>
                <div className="w-[300px] fixed right-8 aspect-[3/2] rounded-lg gap-x-1 text-sm select-none
                        text-white bg-black/10 border border-white/40 flex cursor-pointer
                        justify-center items-center">
                  <input id="image" type="file" placeholder="Preview" accept="image/*" className="text-transparent file:hidden" />
                  <span id='val'></span>
                  <span id='image' className="absolute select-none text-center text-sm">Upload the preview* <br/> (.png or .jpg file)</span>
                </div>
                <FormMessage />
              </FormItem>
              <Button type="submit" className="fixed bottom-8 right-8">Submit</Button>
              </div>
              </div>
        </form>
      </Form>
        </DialogContent>
      </Dialog>
    )
  }