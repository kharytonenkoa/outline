"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/explore',
      query
    });

    router.push(url);
  }, [debouncedValue, router]);

  return ( 
    <div className="fixed left-[33%] w-[35%] hidden h-[30px] bg-neutral-900 backdrop-blur-2xl rounded-full lg:flex md:flex sm:flex justify-start items-center pl-3 text-sm font-regular">
    <SearchIcon className="w-4 h-4 stroke-white/60"/>
    <Input className="bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/60"
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    </div>
  );
}
 
export default Search;