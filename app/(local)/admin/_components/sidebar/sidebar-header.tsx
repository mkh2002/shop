import React from "react";
import { LuFrame } from "react-icons/lu";

import { useSidebarContext } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";

const SidebarHeader = () => {
  const { collapsed } = useSidebarContext();

  return (
    <div className={"flex select-none items-center justify-center gap-3 py-6"}>
      <div className={"rounded-md bg-foreground p-1 text-background"}>
        <LuFrame className={cn(collapsed ? "size-5" : "size-8")} />
      </div>
      <div className={cn(collapsed ? "hidden " : "block ", "delay-200")}>
        <h1 className={"text-xl"}>{"KeyBy's Shop"}</h1>
        <p className={"text-xs"}>Management System</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
