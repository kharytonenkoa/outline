import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Publication } from "@/types";

const getPublications = async (): Promise<Publication[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getPublications;