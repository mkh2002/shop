import React from "react";
import { Column } from "@tanstack/react-table";
import { RxArrowDown, RxArrowUp, RxCaretSort, RxEyeNone } from "react-icons/rx";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DatableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

const TableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DatableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            size={"sm"}
            variant={"ghost"}
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <RxArrowDown className={"ml-2 size-4"} />
            ) : column.getIsSorted() === "asc" ? (
              <RxArrowUp className={"ml-2 size-4"} />
            ) : (
              <RxCaretSort className={"ml-2 size-4"} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={"start"}>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <RxArrowUp className={"mr-2 size-3.5 text-muted-foreground/70"} />
            ASC
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <RxArrowDown className={"mr-2 size-3.5 text-muted-foreground/70"} />
            DESC
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <RxEyeNone className={"mr-2 size-3.5 text-muted-foreground/70"} />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableColumnHeader;
