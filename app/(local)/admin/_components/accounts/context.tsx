"use client";
import React from "react";
import { User } from "@prisma/client";

import DataTable from "@/app/(local)/admin/_components/table";
import { columns } from "@/app/(local)/admin/_components/accounts/columns";
import TableToolbar from "@/app/(local)/admin/_components/accounts/table-toolbar";

interface ContextProps {
  data: User[];
}

const Context = ({ data }: ContextProps) => {
  return (
    <div>
      <DataTable columns={columns} data={data} toolbar={TableToolbar} />
    </div>
  );
};

export default Context;
