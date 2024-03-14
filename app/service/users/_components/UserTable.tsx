import UserDropdownMenu from "../_components/UserDropdownMenu";
import type { FullUser } from "../util/context";

function UserTable({ users }: { users: FullUser[] }) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-4">
            Name
          </th>
          <th scope="col" className="px-4 py-3">
            Email
          </th>
          <th scope="col" className="px-4 py-3">
            Role
          </th>
          <th scope="col" className="px-4 py-3">
            Created At
          </th>
          <th scope="col" className="px-4 py-3">
            Updated At
          </th>
          <th scope="col" className="px-4 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id} className="border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {`${user?.firstName} ${user?.lastName}`}
              </th>
              <td className="px-4 py-3">{user?.email}</td>
              <td className="px-4 py-3">{user?.role}</td>
              <td className="px-4 py-3">{user?.createdAt?.toString()}</td>
              <td className="px-4 py-3">{user?.updatedAt?.toString()}</td>
              <td className="px-4 py-3 flex items-center justify-end">
                <UserDropdownMenu user={user} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserTable;
