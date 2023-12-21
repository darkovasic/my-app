"use client";

import Input from "@/components/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function Search() {
  return (
    <form className="flex items-center">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <Input
          type="text"
          id="simple-search"
          className="pl-10"
          placeholder="Search"
          required
        />
      </div>
    </form>
  );
}

export default Search;
