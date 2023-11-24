import { LucideIcon } from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import Link from "next/link";
import NavLink from "@/components/NavLink";

type SidebarItemProps = {
  Icon: LucideIcon;
  text: string;
  active?: boolean;
  alert?: boolean;
};

const SidebarItem = ({ Icon, text, active, alert }: SidebarItemProps) => {
  const { expanded } = useContext(SidebarContext);
  // console.log("[SidebarItem] expanded:", expanded);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr, from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      } `}
    >
      <Link href={`/service/${text.toLowerCase()}`} className={`flex`}>
        <Icon size={20} />
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm invisible
          opacity-20 -translate-x-3 transition-all group-hover:visible
          group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
