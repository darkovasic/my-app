"use client";

import Sidebar from "@/components/Sidebar";
import SidebarItem from "@/components/SidebarItem";
import { useSelectedLayoutSegment } from "next/navigation";
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

function ServiceSidebar() {
  const activeSegment = useSelectedLayoutSegment();
  console.log("[ServiceSidebar] activeSegment:", activeSegment);
  return (
    <Sidebar>
      <SidebarItem Icon={LayoutDashboard} text={"Dashboard"} alert />
      <SidebarItem Icon={BarChart3} text={"Statistics"} />
      <SidebarItem
        Icon={UserCircle}
        text={"Users"}
        active={activeSegment === "users"}
      />
      <SidebarItem Icon={Boxes} text={"Inventory"} />
      <SidebarItem Icon={Package} text={"Orders"} alert />
      <SidebarItem Icon={Receipt} text={"Billings"} />
      <hr className="my-3" />
      <SidebarItem Icon={Settings} text={"Settings"} />
      <SidebarItem Icon={LifeBuoy} text={"Help"} />
    </Sidebar>
  );
}

export default ServiceSidebar;
