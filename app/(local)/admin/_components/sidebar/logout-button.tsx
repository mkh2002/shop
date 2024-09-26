import React from "react";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LogoutButton = ({
  className,
  iconSize,
}: {
  className?: string;
  iconSize?: number;
}) => {
  return (
    <Button
      className={cn("size-6", className)}
      size={"icon"}
      variant={"ghost"}
      onClick={() => signOut()}
    >
      <LuLogOut size={iconSize} />
    </Button>
  );
};

export default LogoutButton;
