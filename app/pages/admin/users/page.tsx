import CrudHeader from "@/components/crud/CrudHeader";
import Pagination from "@/components/crud/Pagination";
import UserTable from "./_components/UserTable";
import UserTableSkeleton from "./_components/UserTableSkeleton";
import { getFirstUsers, getNextUsers } from "./util/actions";
import type { Metadata } from "next";
import { Suspense } from "react";

type ParamsProps = {
  searchParams: { page?: string; query?: string };
};

export const metadata: Metadata = {
  title: "Users",
};

const UsersPage = async ({ searchParams }: ParamsProps) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { users, totalPages, lastVisible } = await getFirstUsers();


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
            <Suspense
              key={query + currentPage}
              fallback={<UserTableSkeleton />}
            >
              <UserTable
                query={query}
                currentPage={currentPage}
                // users={users}
              />
            </Suspense>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersPage;
