import CrudHeader from "@/components/crud/CrudHeader";
import UserDropdownMenu from "./_components/UserDropdownMenu";
import { getUsers } from "./actions";

const UsersPage = async () => {
  const users = await getUsers();
  console.log("[UsersPage] users:", users);
  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased w-full">
      <div className="mx-auto max-w-screen-xl h-full px-4 lg:px-12">
        <div className="bg-white h-full dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="overflow-x-auto h-full">
            <CrudHeader />
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
                      <td className="px-4 py-3">
                        {user?.createdAt?.toDate().toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {user?.updatedAt?.toDate().toLocaleString()}
                      </td>
                      {/* <td className="px-4 py-3">{user?.createdAt}</td>
                      <td className="px-4 py-3">{user?.updatedAt}</td> */}
                      <td className="px-4 py-3 flex items-center justify-end">
                        <UserDropdownMenu />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersPage;
