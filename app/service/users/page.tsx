import CrudHeader from "@/components/crud/CrudHeader";
import Pagination from "@/components/crud/Pagination";
import UserTable from "./_components/UserTable";
import { getFirstUsers, getNextUsers } from "./actions";
import type { Metadata } from "next";

type UsersPageProps = {
  searchParams: { page?: string; query?: string };
};

export const metadata: Metadata = {
  title: "Users",
};

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const { users, totalPages, lastVisible } = await getFirstUsers();

  console.log("[UsersPage], currentPage", currentPage);

  // async function nextPageHandler() {
  //   "use server";
  //   await getNextUsers(lastVisible);
  // }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased w-full">
      <div className="mx-auto max-w-screen-xl h-full px-4 lg:px-12">
        <div className="bg-white h-full dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="overflow-x-auto h-full">
            <CrudHeader />
            <UserTable users={users} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersPage;
