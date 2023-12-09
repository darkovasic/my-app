"use client";

import { Menu, Transition } from "@headlessui/react";
import UpdateUserModal from "@/components/crud/modals/UpdateUserModal";
import DeleteUserModal from "@/components/crud/modals/DeleteUserModal";
import UserContext from "@/app/service/users/context";
import type { FullUser } from "@/app/service/users/context";

function UserDropdownMenu({ user }: { user: FullUser }) {
  return (
    <Menu as="div" className={`relative inline-block`}>
      <Menu.Button className="inline-flex items-center text-sm font-medium z-0 hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100">
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="origin-top-right right-0 fixed mt-2 bg-white py-1 text-sm text-gray-700 dark:text-gray-200 z-10 w-40 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
          <Menu.Item>
            <UserContext.Provider value={{ user }}>
              <UpdateUserModal />
            </UserContext.Provider>
          </Menu.Item>
          <Menu.Item>
            <button
              type="button"
              data-modal-target="readProductModal"
              data-modal-toggle="readProductModal"
              className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
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
          </Menu.Item>
          <Menu.Item>
            <UserContext.Provider value={{ user }}>
              <DeleteUserModal />
            </UserContext.Provider>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default UserDropdownMenu;
