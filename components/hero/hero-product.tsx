"use client";
import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ProductType } from "@/config/definetions";

import ProductCard from "./product-card";

interface HeroProductProps {
  product: ProductType[];
}

export default function HeroProduct({ product }: HeroProductProps) {
  return (
    <motion.section
      animate={{ opacity: 1, translateY: 0 }}
      className={cn("space-y-8 px-2")}
      initial={{ opacity: 0, translateY: 100 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-xl font-thin tracking-wider">Shop By Category</h3>
      <motion.div>
        <div className="flex size-full gap-10 overflow-x-auto whitespace-nowrap rounded-xl scrollbar-none">
          <ProductCard className="min-w-[48rem] " product={product[0]} />
          {product.slice(1, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
