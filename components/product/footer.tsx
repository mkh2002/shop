import React from "react";
import { LuHeart } from "react-icons/lu";

import { Button } from "../ui/button";

interface FooterProps {
  isFavorited?: boolean;
  isAlreadyInCart?: boolean;
}

export default function Footer({ isFavorited, isAlreadyInCart }: FooterProps) {
  return (
    <div className="flex gap-4">
      <Button
        className="h-14 flex-1 rounded-xl"
        disabled={isAlreadyInCart}
        variant={"outline"}
      >
        Add to cart
      </Button>
      <Button className="size-14 rounded-xl" size={"icon"} variant={"outline"}>
        <LuHeart className="size-6" strokeWidth={1} />
      </Button>
    </div>
  );
}
