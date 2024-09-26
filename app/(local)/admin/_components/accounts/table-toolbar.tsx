"use client";
import { Table } from "@tanstack/react-table";
import React from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { LuUserCircle } from "react-icons/lu";
import { LucideSquareChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import AddUserForm, {
  addUserSchemaType,
} from "@/app/(local)/admin/_components/accounts/add-user-form";
import { TableFacetedFilter } from "@/app/(local)/admin/_components/table/table-faceted-filter";
import { Button } from "@/components/ui/button";
import TableViewOptions from "@/app/(local)/admin/_components/table/table-view-options";
import { addUser } from "@/app/acitons/user";

interface TableToolbarProps<TData> {
  table: Table<TData>;
}

export const AccountRoleOptions = [
  {
    label: "USER",
    value: "USER",
    icon: LuUserCircle,
  },
  {
    label: "ADMIN",
    value: "ADMIN",
    icon: LucideSquareChevronRight,
  },
];

const TableToolbar = <TData,>({ table }: TableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleSubmit = async (value: addUserSchemaType) => {
    try {
      const res = await addUser(value);

      if (res.status) {
        router.refresh();
        setOpenAdd(false);

        return toast({
          title: "Success",
          description: "User added",
        });
      }
    } catch (e: any) {
      return toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          className="h-8 w-[150px] lg:w-[250px]"
          id="search-email"
          placeholder="Filter email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
        />

        {table.getColumn("role") && (
          <div>
            <TableFacetedFilter
              column={table.getColumn("role")}
              options={AccountRoleOptions}
              title={"Role"}
            />
          </div>
        )}

        {isFiltered && (
          <Button
            className="h-8 px-2 lg:px-3"
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <RxCross2 className="ml-2 size-4" />
          </Button>
        )}
      </div>

      <div className={"flex space-x-2"}>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button
              className={"h-8 space-x-2 px-2 lg:border lg:px-3"}
              size={"sm"}
              variant={"ghost"}
            >
              <RxPlus className={"size-4"} />
              <span className={"hidden lg:block"}>Add</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>
                Add a new user to the system.
              </DialogDescription>
            </DialogHeader>
            <AddUserForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
        <TableViewOptions table={table} />
      </div>
    </div>
  );
};

export default TableToolbar;
