import React from "react";
import { Table } from "@tanstack/react-table";
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TablePagination<TData> {
  table: Table<TData>;
}
const TablePagination = <TData,>({ table }: TablePagination<TData>) => {
  return (
    <div className={"flex items-center justify-center px-2"}>
      <div className={"flex-1 text-sm text-muted-foreground"}>
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length}
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium lg:block">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden w-[100px] items-center justify-center text-sm font-medium lg:flex">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className={"space-x-2"}>
          <Button
            disabled={!table.getCanPreviousPage()}
            size={"icon"}
            variant={"outline"}
            onClick={() => table.firstPage()}
          >
            <RxDoubleArrowLeft className={"size-4"} />
          </Button>
          <Button
            disabled={!table.getCanPreviousPage()}
            size={"icon"}
            variant={"outline"}
            onClick={() => table.previousPage()}
          >
            <RxChevronLeft className={"size-4"} />
          </Button>

          <Button
            disabled={!table.getCanNextPage()}
            size={"icon"}
            variant={"outline"}
            onClick={() => table.nextPage()}
          >
            <RxChevronRight className={"size-4"} />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            size={"icon"}
            variant={"outline"}
            onClick={() => table.lastPage()}
          >
            <RxDoubleArrowRight className={"size-4"} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
