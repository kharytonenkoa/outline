import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Publication } from "@/types";

const getPublicationById = async (id: string): Promise<Publication> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getPublicationById;