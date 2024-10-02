import React from "react";
import { notFound } from "next/navigation";

import { getProductById } from "@/app/acitons/product";
import ProductDetails from "@/components/product/product-details";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product.data) {
    return notFound();
  }

  return <ProductDetails product={product.data} />;
}
