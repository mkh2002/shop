import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NavLink = ({ href, name }: { href: string; name: string }) => {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        "px-6 py-2 text-sm rounded-full",
        pathname === href
          ? "bg-foreground text-background hover:opacity-90"
          : "hover:bg-muted",
      )}
      href={"/"}
    >
      {name}
    </Link>
  );
};

export default NavLink;
