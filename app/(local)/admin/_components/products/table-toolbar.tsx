"use client";
import { Table } from "@tanstack/react-table";
import React, { useEffect } from "react";
import { RxCross2, RxPlus } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TableFacetedFilter } from "@/app/(local)/admin/_components/table/table-faceted-filter";
import AddProductForm from "@/app/(local)/admin/_components/products/add-product-form";
import TableViewOptions from "@/app/(local)/admin/_components/table/table-view-options";
import { getAllCategory } from "@/app/acitons/category";
import { AddCategoryType } from "@/config/definetions";
import { toast } from "@/hooks/use-toast";

interface TableToolbarProps<TData> {
  table: Table<TData>;
}
type CategoryOptionType = {
  label: string;
  value: string;
};

const TableToolbar = <TData,>({ table }: TableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [categoriesOptions, setCategoriesOptions] = React.useState<
    CategoryOptionType[]
  >([]);
  const [openAdd, setOpenAdd] = React.useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategory();

        const result = data.map((category: AddCategoryType) => ({
          label: category.name as string,
          value: category.id as string,
        }));

        setCategoriesOptions(result);
      } catch (error) {
        return toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, []);

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

        {table.getColumn("categoryId") && (
          <div>
            <TableFacetedFilter
              column={table.getColumn("categoryId")}
              options={categoriesOptions}
              title={"Category"}
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
          <DialogContent className={"z-[100]"}>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new Product to the system.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm setOpen={setOpenAdd} />
          </DialogContent>
        </Dialog>
        <TableViewOptions table={table} />
      </div>
    </div>
  );
};

export default TableToolbar;
