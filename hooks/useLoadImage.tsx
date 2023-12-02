import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Publication } from "@/types";

const useLoadImage = (publication: Publication) => {
  const supabaseClient = useSupabaseClient();
  
  if (!publication) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(publication.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;