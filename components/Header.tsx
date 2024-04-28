// "use client";

import { BeakerIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import NavLink from "@/components/NavLink";
// import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { toast } from "sonner";
import HeaderUserMenu from "./HeaderUserMenu";

// import { useAuth } from "./AuthProvider";

async function Header() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log("[Header] error:", error);
    // toast.error(error?.message);
    redirect("/auth/login");
  }
  // const activePath = usePathname();
  // const auth = useAuth();

  // const isAdminPage = activePath?.includes("/admin");
  // const isProPage = activePath?.includes("/pro");
  // const isUserPage = activePath?.includes("/user");

  // const logout = () => {
  //   auth
  //     ?.logout()
  //     .then(() => console.log("Logged out!"))
  //     .catch(() => console.error("Something went wrong"));
  // };

  console.log("[Header] auth: ", data);

  return (
    <nav
      className={`bg-gray-800 flex justify-between items-center h-18 px-8 py-4`}
    >
      <Link href="/" className="flex items-center">
        <BeakerIcon className="h-6 w-6 text-gray-100" />
        <p
          className={`text-gray-100 ml-4 font-semibold text-2xl mr-auto font-mono`}
        >
          MyApp
        </p>
      </Link>
      <ul className="flex gap-6 list-none text-gray-100 font-semibold">
        <li key="pages/service" className={`hover:text-blue-300`}>
          <NavLink path="pages/admin" label="Admin" />
        </li>

        <li key="pages/blog" className={`hover:text-blue-300`}>
          <NavLink path="pages/pro" label="Pro" />
        </li>

        <li key="pages/user" className={`hover:text-blue-300`}>
          <NavLink path="pages/user" label="User" />
        </li>
      </ul>
      {data?.user?.email && <HeaderUserMenu email={data?.user?.email} />}
    </nav>
  );
}

export default Header;
