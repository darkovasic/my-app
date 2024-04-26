"use client";

import { signout } from "@/app/auth/util/actions";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

function HeaderUserMenu({ email }: { email: string }) {
  async function handleClick() {
    await signout();
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {email && (
          <div className="flex gap-6 items-center">
            <div className="flex flex-col cursor-pointer">
              {/* <p className="text-white text-sm font-semibold">
              {user.displayName}
            </p> */}
              <p className="text-gray-400 text-xs font-semibold">{email}</p>
            </div>
          </div>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-full bg-white text-sm text-gray-700 dark:text-gray-200 
                    rounded-md py-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] 
                    will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade 
                    data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
          align={"end"}
        >
          {/* <UserContext.Provider value={{ user }}> */}
          <DropdownMenu.Item>
            <button
              type="button"
              onClick={handleClick}
              className="flex w-full items-center py-2 px-4 hover:bg-gray-100"
            >
              Logout
            </button>
          </DropdownMenu.Item>
          {/* </UserContext.Provider> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default HeaderUserMenu;
