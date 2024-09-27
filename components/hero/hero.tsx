"use client";
import React from "react";
import Image from "next/image";
import { RxArrowBottomRight, RxArrowTopRight } from "react-icons/rx";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      animate={{ opacity: 1, translateY: 0 }}
      className="relative flex-1 overflow-hidden rounded-xl bg-red-300 md:aspect-[16/8.5]"
      initial={{ opacity: 0, translateY: 100 }}
    >
      <Image
        fill
        priority
        alt="hero"
        className="rounded-xl object-cover"
        sizes="auto"
        src={"/hero.webp"}
      />
      <div className="absolute flex size-full flex-col justify-center gap-4 bg-gray-500/30 px-10 py-20 md:p-10">
        <div className="space-y-4 md:my-auto">
          <h1 className="select-none text-center text-2xl font-light uppercase text-white/90 md:text-start lg:text-5xl lg:tracking-wider">
            The new collection is here.
            <br />
            Get ready to shop.
          </h1>
          <div className="flex select-none text-gray-200/90 md:items-center md:space-x-2 lg:text-lg lg:tracking-wide">
            <RxArrowBottomRight className="mt-0.5 md:mt-0 lg:size-6" />
            <p className="text-center">
              Show now and get <b className="px-1">20%</b>
              off on your first purchase. <br />
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-2 text-gray-600/80 md:mt-auto">
          <Link
            className={
              "flex items-center space-x-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extralight lg:px-5 lg:py-3 lg:text-sm lg:tracking-widest"
            }
            href="/"
          >
            SHOW NOW
          </Link>
          <Link
            className="flex aspect-square size-8 items-center justify-center rounded-full bg-white/90 lg:size-12"
            href={"/"}
          >
            <RxArrowTopRight className="size-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
