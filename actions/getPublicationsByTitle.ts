import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import { Publication } from "@/types";

import getPublications from "./getPublications";

const getPublicationsByTitle = async (title: string): Promise<Publication[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  if (!title) {
    const allPublications = await getPublications();
    return allPublications;
  }

  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getPublicationsByTitle;