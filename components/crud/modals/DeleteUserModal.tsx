import { deleteUser } from "@/app/pages/admin/users/util/actions";
import { useUserContext } from "@/app/pages/admin/users/util/context";
import { TrashIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";

const handleDeleteClick = (id: string) => async (): Promise<void> => {
  await deleteUser(id);
  return;
};

const DeleteUserModal = forwardRef(function DeleteUserModal(
  _props: any,
  ref: ForwardedRef<any>
) {
  const { user } = useUserContext();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
        >
          <TrashIcon width={16} height={16} className="dark:invert mr-2" />
          Delete
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] 
                    translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg focus:outline-none"
        >
          <div className="relative p-4 shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Delete modal --> */}
            <div
              id="deleteModal"
              aria-hidden="true"
              className="flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              {/* <!-- Modal content --> */}
              <div className="flex flex-col justify-between items-center rounded-t w-96 dark:border-gray-600">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent 
                              hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 
                              ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this item?
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg 
                                border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none 
                                focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 
                                dark:text-gray-300 dark:border-gray-500 dark:hover:text-white 
                                dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      No, cancel
                    </button>
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={handleDeleteClick(user.id)}
                  >
                    Yes, I&apos;m sure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default DeleteUserModal;
