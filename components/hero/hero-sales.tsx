"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

const variants = {
  initial: { opacity: 0, translateY: 100 },
  animate: {
    opacity: 1,
    translateY: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  initial: { opacity: 0, translateX: -100 },
  animate: { opacity: 1, translateX: 0 },
};

const item2 = {
  initial: { opacity: 0, translateX: 100 },
  animate: { opacity: 1, translateX: 0 },
};

export default function HeroSales() {
  return (
    <motion.section
      className="flex flex-col place-items-center gap-8 bg-muted/30 p-5 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:py-10 xl:gap-16 xl:p-20"
      initial="initial"
      variants={variants}
      viewport={{ once: true }}
      whileInView="animate"
    >
      <motion.div
        className="relative aspect-square size-full lg:size-80 xl:size-[32rem]"
        variants={item}
      >
        <Image fill priority alt="Sales" sizes="auto" src="/sales.jpeg" />
      </motion.div>

      <motion.div
        className="flex h-full flex-col items-start justify-center gap-8 xl:max-w-2xl"
        variants={item2}
      >
        <div className="md:space-y-3">
          <h2 className="font-extralight xl:text-xl">Sales</h2>
          <h3 className="text-xl font-light md:text-2xl lg:text-2xl xl:text-5xl">
            Fall session sales are here! Get up to 50% off on selected items.
          </h3>
        </div>
        <p className="text-xs font-light leading-normal tracking-wide text-muted-foreground xl:text-base">
          As the leaves change, so do the prices! Celebrate the season with our
          exclusive Fall Sale. Enjoy up to 50% off on a wide range of products –
          from cozy sweaters and boots to home decor that brings autumn warmth
          to every corner of your space. Whether you’re refreshing your wardrobe
          or prepping your home for cooler days, we’ve got you covered. Hurry,
          these deals are as fleeting as the fall breeze! Shop now and embrace
          the season in style. Feel free to customize it to fit your product
          range or promotional style!
        </p>
        <Link
          className={cn(buttonVariants(), "h-10 rounded-none")}
          href="/shop"
        >
          Leran More
        </Link>
      </motion.div>
    </motion.section>
  );
}
