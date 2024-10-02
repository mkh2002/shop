"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/config/definetions";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality
  };

  return (
    <Card
      className="group relative cursor-pointer overflow-hidden transition-all hover:shadow-lg"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          {isLoading && <Skeleton className="size-full" />}
          <Image
            fill
            priority
            alt={product.name}
            className={cn(
              "transition-opacity object-cover duration-300 group-hover:opacity-75",
              isLoading ? "opacity-0" : "opacity-100",
            )}
            src={product.image as string}
            onLoad={() => setIsLoading(false)}
          />
          <Button
            className={cn(
              "absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100",
              isFavorite && "opacity-100",
            )}
            size="icon"
            variant="secondary"
            onClick={handleFavorite}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isFavorite && "fill-red-500 text-red-500",
              )}
            />
          </Button>
          {/* {product.isNew && (
            <Badge className="absolute left-2 top-2" variant="secondary">
              New
            </Badge>
          )} */}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          {product.category?.name}
        </p>
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          <Button
            className="rounded-full"
            size="sm"
            variant={"secondary"}
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Implement add to cart functionality
            }}
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
