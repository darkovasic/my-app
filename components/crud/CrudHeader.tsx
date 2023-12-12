import ActionsDropdownButton from "@/app/service/users/_components/ActionsDropdownButton";
import CreateUserModal from "@/components/crud/modals/CreateUserModal";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  FunnelIcon,
} from "@heroicons/react/20/solid";
import Input from "../Input";

function CrudHeader() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <Input
                type="text"
                id="simple-search"
                className="pl-10"
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <CreateUserModal />
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <ActionsDropdownButton />
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
            <div
              id="filterDropdown"
              className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Category
              </h6>
              <ul
                className="space-y-2 text-sm"
                aria-labelledby="filterDropdownButton"
              >
                <li className="flex items-center">
                  <input
                    id="apple"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="apple"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Apple (56)
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="fitbit"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="fitbit"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Fitbit (56)
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="dell"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="dell"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Dell (56)
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrudHeader;
