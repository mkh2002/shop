"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import ProductCard from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { getProductsByCategory } from "@/app/acitons/product";
import { ProductType } from "@/config/definetions";
import CategorySelector from "@/components/product/category-selector";

export default function ProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getProductsByCategory(selectedCategories);

        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        alert("An error occurred while fetching products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories]);

  return (
    <div className="w-full space-y-8 px-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <CategorySelector
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center space-y-4">
          <p className="text-lg text-muted-foreground">No products found.</p>
          <Button onClick={() => setSelectedCategories([])}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
