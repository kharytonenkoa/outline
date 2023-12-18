"use client"

import { useUser } from '@/hooks/useUser';
import { Database } from '@/types_db';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Profiles = Database['public']['Tables']['users']['Row'];

export default function Wallpaper() {
  const { user, userDetails } = useUser();

  const getMediaType = (url: string): 'image' | 'video' => {
    const fileExtension = url.split('.').pop()?.toLowerCase();
    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
      return 'image';
    } else if (fileExtension === 'mp4' || fileExtension === 'webm') {
      return 'video';
    } else {
      return 'image';
    }
  };

  const renderMedia = (url: string) => {
    const mediaType = getMediaType(url);

    if (mediaType === 'image') {
      return <Image src={url} width={1920} height={1080} className='fixed z-0 w-full h-full top-0 left-0' alt='' />;
    } else if (mediaType === 'video') {
      return <video src={url} className='fixed z-0 w-full top-0 left-0' autoPlay loop muted />;
    }

    return null;
  };

  return userDetails ? renderMedia(userDetails.wallpaper_path) : null;
}