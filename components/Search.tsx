"use client";

import Input from "@/components/Input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Search({ placeholder }: { placeholder: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    searchTerm ? params.set("query", searchTerm) : params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  //   const debounced = useDebouncedCallback((term: string) => {
  //   }, 300);

  //   useEffect(() => {
  //     if (debounced.length > 1) {
  //       const controller = new AbortController();
  //       (async () => {
  //         const url = "/api/search?query=" + encodeURIComponent(debounced);
  //         const response = await fetch(url, { signal: controller.signal });
  //         const users = await response.json();
  //         setUsers(users);
  //       })();
  //       return () => controller.abort();
  //     } else {
  //       setUsers([]);
  //     }
  //   }, [debounced]);

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <label htmlFor="query" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <Input
          type="text"
          id="query"
          name="query"
          className="pl-10"
          placeholder={placeholder}
          onChange={handleInputChange}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
    </form>
  );
}

export default Search;
