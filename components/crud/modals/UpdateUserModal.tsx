// "use client";

import UserForm from "@/app/pages/admin/users/_components/UserForm";
import { updateUser } from "@/app/pages/admin/users/util/actions";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";

const UpdateUserModal = forwardRef(function UpdateUserModal(
  _props: any,
  ref: ForwardedRef<any>
) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
        >
          <PencilSquareIcon
            className="dark:invert mr-2"
            width={16}
            height={16}
          />
          Edit
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg focus:outline-none">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit User
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-target="createProductModal"
                  data-modal-toggle="createProductModal"
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
            <UserForm action={updateUser} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default UpdateUserModal;
