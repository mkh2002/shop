import React from "react";
import { notFound } from "next/navigation";
import { Frown } from "lucide-react";

import { getProductById } from "@/app/acitons/product";
import ProductDetails from "@/components/product/product-details";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product.data) {
    notFound();
  }

  return <ProductDetails product={product.data} />;
}

export function ProductNotFound() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <Frown className="mr-2 size-6" />
      <h1 className="text-xl font-semibold">Product not found</h1>
    </div>
  );
}
