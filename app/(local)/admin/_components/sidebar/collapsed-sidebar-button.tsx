import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";

const CollapsedSidebarButton = () => {
  const { collapsed, toggleSidebar } = useSidebarContext();

  return (
    <Button
      className={cn(
        "absolute right-0 size-6 bottom-20",
        collapsed
          ? "left-1/2 -translate-x-1/2  "
          : "translate-x-1/2 bg-accent text-accent-foreground hover:text-accent ",
      )}
      size={"icon"}
      variant={"ghost"}
      onClick={toggleSidebar}
    >
      {collapsed ? <LuChevronRight /> : <LuChevronLeft />}
    </Button>
  );
};

export default CollapsedSidebarButton;
