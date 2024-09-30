import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDotFilled } from "react-icons/rx";

import { cn } from "@/lib/utils";

const NavLink = ({ href, name }: { href: string; name: string }) => {
  const pathname = usePathname();

  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      className={cn(
        "px-3 lg:px-6 flex gap-2 items-center py-2 text-sm rounded-full text-muted-foreground",
        isActive
          ? "bg-background text-foreground hover:opacity-90 pl-4 pr-6"
          : "hover:bg-muted font-extralight",
      )}
      href={href}
    >
      <RxDotFilled className={isActive ? "block" : "hidden"} />
      {name}
    </Link>
  );
};

export default NavLink;
