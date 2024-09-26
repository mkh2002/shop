"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@prisma/client";

import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableColumnHeader from "@/app/(local)/admin/_components/table/table-column-header";
import { AccountRoleOptions } from "@/app/(local)/admin/_components/accounts/table-toolbar";
import TableRowActions from "@/app/(local)/admin/_components/accounts/table-row-actions";

export const columns: ColumnDef<User>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title={"ID"} />,
    cell: ({ row }) => <div className={"max-w-56"}>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={"Avatar"} />
    ),
    cell: ({ row }) => {
      return (
        <div className={"relative"}>
          <Avatar>
            <AvatarFallback />
            <AvatarImage src={row.getValue("image")} />
          </Avatar>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <TableColumnHeader column={column} title={"Name"} />;
    },
    cell: ({ row }) => {
      return (
        <div className={"flex space-x-2 truncate"}>
          <span>{row.getValue("name")}</span>
          <Badge variant={"outline"}>
            {row.original.emailVerified ? "Verified" : "Unverified"}
          </Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={"Email"} />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={"Role"} />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role");
      const roleOptions = AccountRoleOptions.find(
        (option) => option.value === role,
      );

      if (roleOptions)
        return (
          <div className={"flex items-center gap-2"}>
            <roleOptions.icon className="size-4" />
            {roleOptions?.label}
          </div>
        );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={"Created At"} />
    ),
    cell: ({ row }) => formatDate(row.getValue("createdAt"), "yyyy-MM-dd"),
  },

  {
    id: "actions",
    cell: ({ row }) => <TableRowActions row={row} />,
  },
];
