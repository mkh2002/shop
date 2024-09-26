import React from "react";

import { getAllProducts } from "@/app/acitons/product";

import Context from "../_components/products/context";

const ProductsPage = async () => {
  const data = await getAllProducts();

  return (
    <div className={"w-full py-5 pt-10"}>
      <Context data={data} />
    </div>
  );
};

export default ProductsPage;
