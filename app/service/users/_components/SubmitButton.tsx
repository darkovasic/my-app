import { useContext } from "react";
import { UserFormContext } from "@/components/crud/modals/CreateUserModal";

function SubmitButton() {
  const { pending } = useContext(UserFormContext);
  console.log("[SubmitButton] pending:", pending);
  return (
    <button
      type="submit"
      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      aria-disabled={pending}
      disabled={pending}
    >
      <svg
        className="mr-1 -ml-1 w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      Submit
    </button>
  );
}

export default SubmitButton;
