"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import TableColumnHeader from "@/app/(local)/admin/_components/table/table-column-header";
import { formatDate } from "@/lib/utils";
import TableRowActions from "@/app/(local)/admin/_components/categories/table-row-actions";
import { AddCategoryType } from "@/config/definetions";

export const columns: ColumnDef<AddCategoryType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label={"Select all"}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={"Select"}
        checked={row.getIsSelected()}
        className={"translate-y-[2px]"}
        onVolumeChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={"Image"} />
    ),
    cell: ({ row }) => (
      <div className={"relative size-10"}>
        <Image
          fill
          priority
          alt={row.getValue("name")}
          className={"size-10 rounded-md"}
          sizes={"auto"}
          src={row.getValue("image")}
        />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title={"ID"} />,
    cell: ({ row }) => <div className={"max-w-56"}>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={"Name"} />
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={"Created At"} />
    ),
    cell: ({ row }) => (
      <div>{formatDate(row.getValue("createdAt"), "yyyy-MM-dd")}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={"Updated At"} />
    ),
    cell: ({ row }) => (
      <div>{formatDate(row.getValue("updatedAt"), "yyyy-MM-dd")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className={"flex items-center space-x-2"}>
        <TableRowActions row={row} />
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
  },
];
