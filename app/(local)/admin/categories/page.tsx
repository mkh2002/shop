import React from "react";

import { getAllCategory } from "@/app/acitons/category";

import Context from "../_components/categories/context";

const CategoriesPage = async () => {
  const data = await getAllCategory();

  return (
    <div className={"w-full pb-5 pt-10"}>
      <Context data={data} />
    </div>
  );
};

export default CategoriesPage;
