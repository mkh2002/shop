import React from "react";
import { Category } from "@prisma/client";

import { columns } from "@/app/(local)/admin/_components/categories/columns";
import DataTable from "@/app/(local)/admin/_components/table";
import TableToolbar from "@/app/(local)/admin/_components/categories/table-toolbar";

const Context = ({ data }: { data: Category[] }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} toolbar={TableToolbar} />
    </div>
  );
};

export default Context;
