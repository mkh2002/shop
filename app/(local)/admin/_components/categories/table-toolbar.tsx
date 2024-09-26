"use client";
import { Table } from "@tanstack/react-table";
import React from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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
import AddCategoryForm from "@/app/(local)/admin/_components/categories/add-category-form";
import TableViewOptions from "@/app/(local)/admin/_components/table/table-view-options";
import { AddCategoryType } from "@/config/definetions";
import { createCategory } from "@/app/acitons/category";

interface TableToolbarProps<TData> {
  table: Table<TData>;
}

const TableToolbar = <TData,>({ table }: TableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleSubmit = async (value: AddCategoryType) => {
    try {
      const res = await createCategory(value);

      if (res.status) {
        router.refresh();
        setOpenAdd(false);

        return toast({
          title: "Success",
          description: "Category added",
        });
      }
    } catch (e: any) {
      return toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          className="h-8 w-[150px] lg:w-[250px]"
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />

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
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Add a new category to the system.
              </DialogDescription>
            </DialogHeader>
            <AddCategoryForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
        <TableViewOptions table={table} />
      </div>
    </div>
  );
};

export default TableToolbar;
