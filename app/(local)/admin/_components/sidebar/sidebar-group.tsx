import React from "react";

import { useSidebarContext } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";

interface SidebarGroupProps {
  children: React.ReactNode;
  name: string;
}
const SidebarGroup = ({ children, name }: SidebarGroupProps) => {
  const { collapsed } = useSidebarContext();

  return (
    <div className={cn("flex flex-col gap-2", collapsed ? "w-auto" : "w-full")}>
      <small className={"capitalize"}>{collapsed || name}</small>
      <div className={cn("space-y-2")}>{children}</div>
    </div>
  );
};

export default SidebarGroup;
