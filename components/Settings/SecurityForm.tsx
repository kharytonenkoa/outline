"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/hooks/useUser"
import { useEffect, useState } from "react"
import Avatar from "../avatar"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const securityFormSchema = z.object({
  password: z
    .string()
    .min(2, {
      message: "Password must be at least 6 characters.",
    }),
})

type SecurityFormValues = z.infer<typeof securityFormSchema>


export function SecurityForm() {

  const { isLoading, user, userDetails } = useUser();

  useEffect(() => {
    if(!user) {console.log("Error: No user")}
  }, [isLoading, user]);
  
  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    mode: "onChange",
  })

  function onSubmit(data: SecurityFormValues) {
  }

  return (
    <>
    <div className="flex items-start w-full h-[60px]">
        <p className="font-semibold text-xl">Security</p>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[600px]">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input placeholder={"Current Password"} type="password" {...field} className="border border-white/40 bg-black/20"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
              <Input placeholder={"New Password"} type="password" {...field} className="border border-white/40 bg-black/20"/>
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update password</Button>
      </form>
    </Form>
    </>
  )
}