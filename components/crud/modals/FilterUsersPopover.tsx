"use client";

import * as Popover from "@radix-ui/react-popover";
import { roleOptions } from "@/app/pages/admin/users/util/context";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";

function FilterUsersPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          id="filterDropdownButton"
          data-dropdown-toggle="filterDropdown"
          className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          type="button"
        >
          <FunnelIcon className="h-4 w-4 mr-2 text-gray-400" />
          Filter
          <ChevronDownIcon className="-mr-1 ml-1.5 w-5 h-5" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div
            id="filterDropdown"
            className="z-10 w-32 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Role
            </h6>
            <ul
              className="space-y-2 text-sm"
              aria-labelledby="filterDropdownButton"
            >
              {roleOptions.map((option) => (
                <li key={option.value} className="flex items-center">
                  <input
                    id={option.value}
                    type="checkbox"
                    name={option.value}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={option.value}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default FilterUsersPopover;
