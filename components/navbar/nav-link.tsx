import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDotFilled } from "react-icons/rx";

import { cn } from "@/lib/utils";

const NavLink = ({ href, name }: { href: string; name: string }) => {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        "px-6 flex gap-2 items-center py-2 text-sm rounded-full text-muted-foreground",
        pathname === href
          ? "bg-background text-foreground hover:opacity-90 pl-4 pr-6"
          : "hover:bg-muted",
      )}
      href={"/"}
    >
      <RxDotFilled className={cn(pathname === href ? "block" : "hidden")} />
      {name}
    </Link>
  );
};

export default NavLink;
