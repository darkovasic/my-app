"use client";

import { Menu, Transition } from "@headlessui/react";

function ActionsDropdownButton() {
  return (
    <Menu as="div" className={`relative inline-block`}>
      <Menu.Button className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        <svg
          className="-ml-1 mr-1.5 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
        Actions
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="origin-top left-1/2 transform -translate-x-1/2 absolute mt-2 bg-white py-1 text-sm text-gray-700 dark:text-gray-200 z-10 w-40 rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block">
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active && "bg-blue-500"
                } block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                href="/#"
              >
                Mass Edit
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active && "bg-blue-500"
                } block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                href="/#"
              >
                Delete All
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ActionsDropdownButton;
