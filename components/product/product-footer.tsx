"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { RxPlus } from "react-icons/rx";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductFooterProps {
  productId: string;
}

export default function ProductFooter({ productId }: ProductFooterProps) {
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    setIsInCart(true);
    // TODO: Implement actual add to cart functionality
    console.log(`Added product ${productId} to cart`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement actual favorite functionality
    console.log(`Toggled favorite for product ${productId}`);
  };

  return (
    <div className="flex space-x-4">
      <Button
        className="h-14 flex-1 space-x-2 rounded-xl"
        disabled={isInCart}
        onClick={handleAddToCart}
      >
        <RxPlus className="size-4" />
        <p>{isInCart ? "Added to Cart" : "Add to Cart"}</p>
      </Button>
      <Button
        className="size-14 rounded-xl"
        size="icon"
        variant="outline"
        onClick={handleToggleFavorite}
      >
        <Heart
          className={cn("size-6", isFavorite && "fill-primary text-primary")}
          strokeWidth={1}
        />
      </Button>
    </div>
  );
}
