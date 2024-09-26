import React, { forwardRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  triggerText: string;
  children?: React.ReactNode;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  variant?: "destructive" | "default";
  description: string;
}
const Comps = forwardRef<HTMLDivElement, Props>(
  (
    {
      triggerText,
      open,
      setOpen,
      title,
      description,
      variant = "default",
      children,
    },
    ref,
  ) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "w-full justify-start rounded-sm px-2 text-sm",
              variant === "destructive" && "text-destructive",
            )}
            size={"sm"}
            variant={"ghost"}
          >
            {triggerText}
          </Button>
        </DialogTrigger>
        <DialogContent ref={ref} className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  },
);

Comps.displayName = "TableDialog";

export default Comps;
