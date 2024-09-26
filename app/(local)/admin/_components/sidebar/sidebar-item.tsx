import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSidebarContext } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  name: string;
  icon: React.ReactElement;
}

const SidebarItem = ({ href, icon, name }: SidebarItemProps) => {
  const { collapsed } = useSidebarContext();
  const path = usePathname();

  return (
    <Link
      className={cn(
        "cursor-pointer rounded-lg flex w-full items-center gap-1 capitalize",
        collapsed ? "p-1.5" : " px-2 py-1.5",
        path === href ? "bg-accent" : "hover:bg-accent",
      )}
      href={href}
    >
      {icon}
      {collapsed || name}
    </Link>
  );
};

export default SidebarItem;
