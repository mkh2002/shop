"use client";
import React from "react";

import DataTable from "@/app/(local)/admin/_components/table";
import { columns } from "@/app/(local)/admin/_components/products/columns";
import TableToolbar from "@/app/(local)/admin/_components/products/table-toolbar";
import { ProductType } from "@/config/definetions";

interface ContextProps {
  data: ProductType[];
}

const Context = ({ data }: ContextProps) => {
  return (
    <div className={"space-y-5"}>
      <DataTable columns={columns} data={data} toolbar={TableToolbar} />
    </div>
  );
};

export default Context;
