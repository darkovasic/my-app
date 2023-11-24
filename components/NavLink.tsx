"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type NavLinkProps = {
  label: string;
  path: string;
};

function NavLink({ label, path }: NavLinkProps) {
  const activeSegment = useSelectedLayoutSegment();
  return (
    <Link
      href={`/${path}`}
      className={`${activeSegment === path ? "text-red-400" : ""}`}
    >
      {label}
    </Link>
  );
}

export default NavLink;
