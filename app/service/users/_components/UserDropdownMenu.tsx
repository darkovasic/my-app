"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import UpdateUserModal from "@/components/crud/modals/UpdateUserModal";
import DeleteUserModal from "@/components/crud/modals/DeleteUserModal";
import UserContext from "@/app/service/users/context";
import type { FullUser } from "@/app/service/users/context";

function UserDropdownMenu({ user }: { user: FullUser }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center text-sm font-medium 
          hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 
          text-center text-gray-500 hover:text-gray-800 rounded-lg 
          focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] bg-white text-sm text-gray-700 dark:text-gray-200 
                    rounded-md py-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] 
                    will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade 
                    data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <UserContext.Provider value={{ user }}>
            <DropdownMenu.Item asChild>
              <UpdateUserModal />
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <button
                type="button"
                className="flex w-full items-center py-2 px-4 hover:bg-gray-100 
                  dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Preview
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <DeleteUserModal />
            </DropdownMenu.Item>
          </UserContext.Provider>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default UserDropdownMenu;
