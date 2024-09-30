"use client";
import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ProductType } from "@/config/definetions";

import ProductCard from "./product-card";

interface HeroProductProps {
  product: ProductType[];
}

const variants = {
  initial: { opacity: 0, translateY: 100 },
  animate: {
    opacity: 1,
    translateY: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  initial: { opacity: 0, translateY: 100 },
  animate: { opacity: 1, translateY: 0 },
};

const item2 = {
  initial: { opacity: 0, translateX: -100 },
  animate: { opacity: 1, translateX: 0 },
};

export default function HeroProduct({ product }: HeroProductProps) {
  return (
    <motion.section
      className={cn("space-y-8 px-2")}
      initial="initial"
      once={true}
      transition={{ delay: 0.5 }}
      variants={variants}
      whileInView="animate"
    >
      <motion.h3 className="text-xl font-thin tracking-wider" variants={item}>
        Shop By Category
      </motion.h3>
      <div>
        <div className="flex size-full flex-col gap-10 overflow-x-auto scrollbar-none lg:flex-row lg:flex-nowrap lg:rounded-xl">
          <motion.div variants={item2}>
            <ProductCard className="lg:min-w-[48rem] " product={product[0]} />
          </motion.div>
          {product.slice(1, 4).map((item) => (
            <motion.div key={item.id} variants={item2}>
              <ProductCard product={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
