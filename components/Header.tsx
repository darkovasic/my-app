"use client";

import { BeakerIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import NavLink from "@/components/NavLink";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

function Header() {
  const activePath = usePathname();
  const auth = useAuth();

  const isAdminPage = activePath?.includes("/admin");
  const isProPage = activePath?.includes("/pro");
  const isUserPage = activePath?.includes("/user");

  const logout = () => {
    auth
      ?.logout()
      .then(() => console.log("Logged out!"))
      .catch(() => console.error("Something went wrong"));
  };

  console.log("[Header] auth: ", auth);

  return (
    <nav
      className={`bg-gray-800 flex justify-between items-center h-18 px-8 py-4`}
    >
      {/* <div className="flex items-center"> */}
      <Link href="/" className="flex items-center">
        <BeakerIcon className="h-6 w-6 text-gray-100" />
        <p
          className={`text-gray-100 ml-4 font-semibold text-2xl mr-auto font-mono`}
        >
          MyApp
        </p>
      </Link>
      {/* </div> */}
      <ul className="flex gap-6 list-none text-gray-100 font-semibold">
        {!isAdminPage && (
          <li key="pages/service" className={`hover:text-blue-300`}>
            <NavLink path="pages/admin" label="Admin" />
          </li>
        )}
        {!isProPage && (
          <li key="pages/blog" className={`hover:text-blue-300`}>
            <NavLink path="pages/pro" label="Pro" />
          </li>
        )}
        {!isUserPage && (
          <li key="pages/user" className={`hover:text-blue-300`}>
            <NavLink path="pages/user" label="User" />
          </li>
        )}
      </ul>
      {/* Logout button */}
      {auth?.currentUser && (
        <div className="flex gap-6 items-center">
          <button
            className="text-gray-100 hover:text-blue-300"
            onClick={logout}
          >
            Logout
          </button>
          <div className="flex flex-col">
            <p className="text-white text-sm font-semibold">
              {auth.currentUser.displayName}
            </p>
            <p className="text-gray-400 text-xs font-semibold">
              {auth.currentUser.email}
            </p>
          </div>
          {auth?.currentUser && !auth.isPro && !auth.isAdmin && (
            <div className="bg-pink-600 text-white text-sm font-semibold px-2 py-1 rounded-full h-6">
              User
            </div>
          )}
          {auth?.currentUser && auth.isPro && !auth.isAdmin && (
            <div className="bg-emerald-600 text-white text-sm font-semibold px-2 py-1 rounded-full h-6">
              Pro
            </div>
          )}
          {auth?.currentUser && auth.isAdmin && (
            <div className="bg-orange-600 text-white text-sm font-semibold px-2 py-1 rounded-full h-6">
              Admin
            </div>
          )}
        </div>
      )}
      {/* {auth?.currentUser && (
        <button className="text-gray-100 hover:text-blue-300" onClick={logout}>
          Logout
        </button>
      )} */}
    </nav>
  );
}

export default Header;
