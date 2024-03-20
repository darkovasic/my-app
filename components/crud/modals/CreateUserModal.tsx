"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { createUser } from "@/app/pages/service/users/util/actions";
import UserForm from "@/app/pages/service/users/_components/UserForm";
import UserContext from "@/app/pages/service/users/util/context";
import { Plus } from "lucide-react";

function CreateUserModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          id="createProductModalButton"
          className="flex items-center justify-center text-white bg-blue-700 
              hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
              rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 
              focus:outline-none dark:focus:ring-blue-800"
        >
          <Plus strokeWidth={3} className="h-3.5 w-3.5 mr-2" />
          Add User
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] 
                            translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg focus:outline-none"
        >
          {/* <!-- Modal content --> */}
          <div className="relative p-4 shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                Add User
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                      rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </Dialog.Close>
            </div>
            {/* <!-- Modal body --> */}
            <UserContext.Provider value={{ user: { id: "" } }}>
              <UserForm action={createUser} />
            </UserContext.Provider>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CreateUserModal;
