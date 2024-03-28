import ActionsDropdownButton from "@/app/pages/admin/users/_components/ActionsDropdownButton";
import CreateUserModal from "@/components/crud/modals/CreateUserModal";
import Search from "@/components/Search";
import FilterUsersPopover from "@/components/crud/modals/FilterUsersPopover";

function CrudHeader() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Search placeholder="Search users..." />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <CreateUserModal />
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <ActionsDropdownButton />
            <FilterUsersPopover />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrudHeader;
