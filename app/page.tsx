import Sidebar from "@/components/Sidebar";
import SidebarItem from "@/components/SidebarItem";
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-full">
      <Sidebar>
        <SidebarItem Icon={LayoutDashboard} text={"Dashboard"} alert />
        <SidebarItem Icon={BarChart3} text={"Statistics"} active />
        <SidebarItem Icon={UserCircle} text={"Users"} />
        <SidebarItem Icon={Boxes} text={"Inventory"} />
        <SidebarItem Icon={Package} text={"Orders"} alert />
        <SidebarItem Icon={Receipt} text={"Billings"} />
        <hr className="my-3" />
        <SidebarItem Icon={Settings} text={"Settings"} />
        <SidebarItem Icon={LifeBuoy} text={"Help"} />
      </Sidebar>

      <section className="flex items-center justify-center h-screen w-full">
        The main content of your page goes here
      </section>
    </div>
  );
}
