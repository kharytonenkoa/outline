import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { UserDetails } from "@/types";

const useLoadAvatar = (user: UserDetails) => {
  const supabaseClient = useSupabaseClient();
  
  if (!user) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(user.avatar_url);

  return imageData.publicUrl;
};

export default useLoadAvatar;