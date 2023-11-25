"use client"

import uniqid from "uniqid";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputButton from "@/components/InputButton";
import Input from "@/components/Input";
import InputDesc from "@/components/InputDesc";
import InputImage from "@/components/InputImage";
import toast from "react-hot-toast";
import Link from "next/link";

const Upload = () => {

    const [uploadedFileName, setUploadedFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const router = useRouter();

    const [isExpanded, setIsExpanded] = useState(false);

    const handlePublicationFileChange = async (event: any) => {
        const fileName = event.target.files[0].name;
        setUploadedFileName(fileName);
      };

    const toggle = () => {
        setIsExpanded(!isExpanded);
      };

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
            local: false,
            nsfw: false,
            textonly: false,
        }
      });

      const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            let publicationFile = values.publication?.[0];

            if (!imageFile || !publicationFile || !user) {
                toast.error('Missing fields');
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
                return toast.error('Failed text upload.');
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
            return toast.error('Failed preview upload.');
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
            local: values.local,
            nsfw: values.nsfw,
            textonly: values.textonly
        });

        if (supabaseError) {
            setIsLoading(false)
            return toast.error(supabaseError.message)
        }

        router.push('/');
        setIsLoading(false);
        toast.success('Publication created!');
        reset();

        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
      }

    return ( 
    <div className="fixed top-[50px] left-[50px] w-[76%] h-full p-2">
        <title>Upload publication - Outline</title>
        <div className="w-full h-[520px] bg-black/10 backdrop-blur-2xl flex flex-col rounded-lg shadow-xl">
            <div className="flex flex-row w-full h-[40px] rounded-t-lg justify-between items-center p-4">
                <p className="select-none text-xs font-medium">Upload publication</p>
                <button onClick={() => router.back()}><AiOutlineClose className="h-[20px] cursor-pointer hover:fill-neutral-200"/></button>
            </div>
            <div className="w-full h-full p-4 rounded-b-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-2 auto-cols-max mt-2">
                <div className="flex flex-col p-1 gap-y-6">
                    <div className="flex flex-col gap-y-1">
                        <div className="
                            flex
                            w-full h-[30px] 
                            rounded-lg 
                            items-center justify-center
                            gap-x-1 
                            text-black 
                            bg-neutral-200 hover:text-black/80
                            text-sm select-none cursor-pointer
                            ">
                                <InputButton
                                    id="publication"
                                    type="file"
                                    disabled={isLoading}
                                    accept=".pdf, .md, .epub"
                                    {...register('publication', { required: true })}
                                    onChange={handlePublicationFileChange}
                                    placeholder="Upload"
                                />
                                <span id='val'></span>
                                <span className="truncate w-[400px] absolute select-none text-center text-sm" id='publication'>{uploadedFileName || 'Upload your file*'}</span>
                            </div>
                        <p className="text-xs text-white/50">Up to 50MB file upload for Free Plan. <Link href='/' className="hover:underline">Upgrade for unlimited upload.</Link></p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                    <Input
                        id="title"
                        disabled={isLoading}
                        {...register('title', { required: true })}
                        placeholder="Title"
                    />
                    <InputDesc
                        id="description"
                        disabled={isLoading}
                        {...register('description', { required: false })}
                        placeholder="Description"
                    />
                    </div>
                    <div className="flex flex-col gap-y-2">
                    <div className="flex flex-row gap-x-1 items-center" onClick={toggle}>
                    <BsChevronDown 
                        className={`
                        w-[12px]
                        h-auto
                        fill-white/80
                        cursor-pointer
                        ${isExpanded ? 'rotate-180' : ''}
                        transition-all duration-300
                        `}
                    />
                    <p className="text-xs cursor-pointer select-none">Show Details</p>
                    </div>
                    <div className={`flex flex-row gap-x-2 items-center ${isExpanded ? '' : 'opacity-0'} transition-all duration-200`}>
                        <input type="radio" id="notfotchildren" value="notfotchildren" {...register('nsfw', { required: true })} className="bg-transparent" placeholder="It is safe for children"/>
                        <label id="notfotchildren" className="text-xs cursor-pointer select-none">It is safe for children</label>
                    </div>
                    <div className={`flex flex-row gap-x-2 items-center ${isExpanded ? '' : 'opacity-0'} transition-all duration-200`}>
                        <input type="radio" id="notfotchildren" value="notfotchildren" {...register('nsfw', { required: false })} className="bg-transparent"/>
                        <label id="notfotchildren" className="text-xs cursor-pointer select-none">This publication is not for children</label>
                    </div>
                    </div>
                </div>
                <div className="absolute right-5 flex flex-col p-1 gap-y-4">
                        <div className="
                        w-[300px] aspect-[3/2] 
                        rounded-lg gap-x-1 
                        text-sm select-none
                        text-white 
                        bg-black/10 hover:text-white/70
                        border border-neutral-600
                        flex cursor-pointer
                        justify-center items-center">
                        <InputImage
                            id="image"
                            type="file"
                            disabled={isLoading}
                            accept="image/*"
                            {...register('image', { required: true })}
                            placeholder="Upload"
                            />
                        <span id='val'></span>
                        <span id='image' className="
                        absolute
                        select-none
                        text-center
                        text-sm
                        ">Upload the preview* <br/> (.png or .jpg file)</span>
                    </div>
                    <div className="flex flex-row gap-x-4">
                        <div className="">
                        <select className="flex w-[90px] h-[30px] border border-neutral-600 rounded-full items-center justify-center gap-x-1 hover:bg-white/30 hover:text-black transition-all duration-200 text-xs select-none cursor-pointer bg-transparent text-white appearance-none pl-7">
                            <option value="0">Public
                            </option>
                            <option value="1">Local
                            </option>
                        </select>
                        </div>
                        <div className="">
                        <select className="flex w-[90px] h-[30px] border border-neutral-600 rounded-full items-center justify-center gap-x-1 hover:bg-white/30 hover:text-black transition-all duration-200 text-xs select-none cursor-pointer bg-transparent text-white appearance-none pl-8">
                            <option value="0">Tag</option>
                            <option value="1">ddd</option>
                        </select>
                        </div>
                        <div className="">
                        <select className="flex w-[90px] h-[30px] border border-neutral-600 rounded-full items-center justify-center gap-x-1 hover:bg-white/30 hover:text-black transition-all duration-200 text-xs select-none cursor-pointer bg-transparent text-white appearance-none pl-5">
                            <option value="0">Text-only
                            </option>
                            <option value="1">Original File
                            </option>
                        </select>
                        </div>
                        </div>
                </div>
            </div>
                <div className="fixed bottom-4 flex flex-row w-[96%] justify-between">
                    <p className="text-xs text-white/50">By publication Your work on Outline, you agree to our Terms of Use. <br />Make sure you don't violate the copyrights or privacy of other users. </p>
                    <button disabled={isLoading}  type="submit" className="flex w-[200px] h-[30px] bg-neutral-200 rounded-lg text-black hover:text-black/70 active:bg-neutral-100 items-center justify-center gap-x-1 text-sm select-none cursor-pointer">Submit</button>
                </div>
            </form>
            </div>
        </div>
    </div> 
);
}
export default Upload;