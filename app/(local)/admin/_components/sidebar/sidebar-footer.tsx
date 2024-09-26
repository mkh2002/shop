import React from "react";
import { useSession } from "next-auth/react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSidebarContext } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";
import LogoutButton from "@/app/(local)/admin/_components/sidebar/logout-button";

const SidebarFooter = () => {
  const session = useSession();
  const { collapsed } = useSidebarContext();

  return (
    <div className={"mt-auto flex w-full flex-col items-center gap-2"}>
      {session?.data?.user && (
        <div
          className={"relative flex w-full items-center justify-center gap-2"}
        >
          <Avatar className={cn(collapsed ? "size-8" : "size-10")}>
            <AvatarImage src={session.data.user.image || "/avatar.jpg"} />
            <LogoutButton
              className={
                "absolute size-full rounded-full opacity-0 hover:bg-accent/50 hover:opacity-100"
              }
            />
          </Avatar>

          <div className={cn(collapsed && "hidden", "truncate w-full")}>
            <div className={"flex justify-between"}>
              <p className={"text-sm"}>{session.data.user.name}</p>
              <LogoutButton />
            </div>
            <small className={"text-xs"}>{session.data.user.email}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
