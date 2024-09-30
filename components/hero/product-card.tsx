import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { ProductType } from "@/config/definetions";

interface CategoryCardProps {
  product: ProductType;
  className?: string;
}
export default function CategoryCard({
  product,
  className,
}: CategoryCardProps) {
  return (
    <div className={cn("relative min-h-[28rem] min-w-[24rem]", className)}>
      <Image
        fill
        alt={product.name}
        className="object-cover lg:rounded-2xl"
        sizes="auto"
        src={"/category-1.webp"}
      />
      <div className="absolute flex size-full flex-col items-start p-6">
        <div className="ml-auto flex items-center">
          <Link
            className="rounded-full bg-white/50 px-4 py-2 text-sm text-black backdrop-blur"
            href={`/product/${product.id}`}
          >
            Show Product
          </Link>
          <Link
            className="flex size-9 items-center justify-center rounded-full bg-white/50 text-black backdrop-blur"
            href={"/"}
          >
            <LuPlus className="size-5" strokeWidth={1.5} />
          </Link>
        </div>
        <Link
          className="mt-auto rounded-full bg-white/50 px-5 py-2 text-sm text-black backdrop-blur"
          href={`/category/${product.category?.name}`}
        >
          {product.category?.name}
        </Link>
      </div>
    </div>
  );
}
