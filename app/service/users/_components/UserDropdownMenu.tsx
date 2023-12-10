"use client";

import type { FullUser } from "@/app/service/users/context";
import UserContext from "@/app/service/users/context";
import DeleteUserModal from "@/components/crud/modals/DeleteUserModal";
import UpdateUserModal from "@/components/crud/modals/UpdateUserModal";
import { EyeIcon } from "@heroicons/react/24/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

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
          <MoreHorizontal className="dark:invert" width={20} height={20} />
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
                <EyeIcon className="dark:invert mr-2" width={16} height={16} />
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
