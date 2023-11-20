import { LucideIcon } from "lucide-react";
// import { useContext } from "react";
// import { SidebarContext } from "./Sidebar";

type SidebarItemProps = {
  Icon: LucideIcon;
  text: string;
  active?: boolean;
  alert?: boolean;
};

export const SidebarItem = ({
  Icon,
  text,
  active,
  alert,
}: SidebarItemProps) => {
  // const { expanded } = useContext(SidebarContext);
  // console.log("[SidebarItem] expanded:", expanded);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
        active
          ? "bg-gradient-to-tr, from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      } `}
    >
      <Icon size={20} />
      <span className={true ? "w-52 ml-3" : "w-0"}>{text}</span>
      {alert && (
        <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />
      )}
    </li>
  );
};

export default SidebarItem;
