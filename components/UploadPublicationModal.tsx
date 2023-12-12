"use client"

import uniqid from "uniqid";
import React, { ChangeEvent, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
    Dialog,
    DialogContent,
    DialogDescription,
  } from "@/components/ui/dialog"
import { useUpload } from "@/hooks/useUpload"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast";
import { Checkbox } from "./ui/checkbox";
import useUploadModal from "@/hooks/useUploadModal";
  
  export function UploadPublicationModal() {
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const uploadModal = useUploadModal();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
        link: '',
        title: '',
        description: '',
        publication: null,
        image: null,
        visibility: false,
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
        setIsLoading(true);

        const imageFile = values.image?.[0];
        let publicationFile = values.publication?.[0];

        if (!imageFile || !publicationFile || !user) {
            toast({
            title: "Missing fields"
          })
            return;
        }

        const uniqueID = uniqid();

        //Upload publication
        const {
            data: publicationData,
            error: publicationError
        } = await supabaseClient
        .storage
        .from(`publications`)
        .upload(`publication-${values.title}-${uniqueID}`, publicationFile, {
            cacheControl: '3600',
            upsert: false
        });

        if (publicationError) {
            setIsLoading(false);
            return toast({
              title: "Failed text upload."
            })
        }

    // Upload image
    const {
        data: imageData,
        error: imageError
    } = await supabaseClient
    .storage
    .from(`images`)
    .upload(`image-${values.title}-${uniqueID}`, imageFile, {
        cacheControl: '3600',
        upsert: false
    });

    if (imageError) {
        setIsLoading(false);
        return toast({
          title: "Failed preview upload."
        });
    }

    // Create a record
    const {
        error: supabaseError
    } = await supabaseClient
    .from('publications')
    .insert({
        user_id: user.id,
        title: values.title,
        description: values.description,
        image_path: imageData.path,
        publication_path: publicationData.path,
        visibility: values.visibility
    });

    if (supabaseError) {
        setIsLoading(false)
        return toast({
          title: supabaseError.message
        })
    }

    router.refresh();
    setIsLoading(false);
    toast({
      title: "Publication created!"
    });
    reset();
    uploadModal.onClose();

    } catch (error) {
      toast({
        title: "Something went wrong :("
      });
    } finally {
        setIsLoading(false);
    }
  }
    
    const upload = useUpload();
    const [file, setFile] = useState<string | undefined>();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            console.log(e.target.files);
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }
    return (
      <Dialog open={upload.isOpen} onOpenChange={upload.onClose}>
        <DialogContent className="sm:max-w-[800px] h-[500px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8 ">
              <div className="flex flex-row gap-x-2">
              <aside className="w-[430px] flex flex-col gap-y-2 pr-2">
                    <Input {...register('publication', { required: true })} type="file" placeholder="Publication title" accept=".pdf" className="bg-white text-black file:text-black mb-2" />
                    <input {...register('title', { required: true })} placeholder="Publication title" className="bg-transparent w-full ring-transparent text-2xl font-semibold border-none rounded-none" />
                    <Textarea {...register('description', { required: false })} placeholder="Write a description" className="bg-transparent border-none p-0 resize-none max-h-[120px]"/>
              </aside>
              <div className="w-1/2 fixed left-[50%] pr-8 pl-2">
                <div className="w-[300px] fixed right-8 aspect-[3/2] rounded-lg gap-x-1 text-sm select-none
                        text-white bg-black/10 border border-white/40 flex cursor-pointer
                        justify-center items-center">
                  <input {...register('image', { required: true })} id="image" type="file" placeholder="Preview" accept="image/*" className="text-transparent file:hidden z-20 cursor-pointer" onChange={handleChange}/>
                  {file && <img className="absolute select-none w-full h-full rounded-lg z-10 cursor-pointer" src={file}/>}
                  <span id='val'></span>
                  <span id='image' className="absolute select-none text-center text-sm cursor-pointer">Upload the preview <br/> (.png or .jpg file)</span>
                </div>
              <div className="fixed right-[110px] top-[270px] flex p-2 items-center justify-center space-x-2 bg-black/10 rounded-lg w-[220px] h-[80px] border border-white/40">
                <Checkbox id="visibility" {...register('visibility', { value: true })} />
                <div className="flex flex-col">
                <label htmlFor="visibility" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Public file
                </label>
                <p className="text-sm text-muted-foreground">
                This publication will be visible for all users.
                </p>
                </div>
              </div>
              <Button type="submit" className="fixed bottom-8 right-8">Submit</Button>
              </div>
              </div>
        </form>
      <DialogDescription className="fixed left-8 bottom-8">
      By publication Your work on Outline, you agree to our Terms of Use. <br />Make sure you don't violate the copyrights or privacy of other users.
      </DialogDescription>
        </DialogContent>
      </Dialog>
    )
  }