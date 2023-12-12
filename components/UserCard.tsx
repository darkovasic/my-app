import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { useSession } from "next-auth/react";

function UserCard() {
  const { expanded } = useContext(SidebarContext);
  const { data: session } = useSession();
  // console.log("[UserCard] session", session);
  if (!session) {
    return (
      <div className="border-t flex justify-center items-center h-[65px]">
        <span
          className={`overflow-hidden transition-all whitespace-nowrap ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          Loading user data...
        </span>
      </div>
    );
  }
  return (
    <div className="border-t flex p-3">
      <Image
        src={session.user?.image ?? ""}
        alt={session.user?.name ?? "Profile Pic"}
        width={40}
        height={40}
        className="rounded-md"
      />
      <div
        className={`flex justify-between items-center overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        <div className="leading-4">
          <h4 className="font-semibold">{session?.user?.name}</h4>
          <span className="text-xs text-gray-600">{session?.user?.email}</span>
        </div>
        <MoreVertical size={20} />
      </div>
    </div>
  );
}

export default UserCard;
