import Image from "next/image";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useState } from "react";
import UserCard from "./UserCard";

export const SidebarContext = createContext({ expanded: true });

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="https://img.logoipsum.com/243.svg"
            alt=""
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            width={160}
            height={46}
            priority
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
          <UserCard />
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export default Sidebar;
