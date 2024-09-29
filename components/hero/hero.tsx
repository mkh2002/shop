"use client";
import React from "react";
import { RxArrowBottomRight, RxArrowTopRight } from "react-icons/rx";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <motion.section
      animate={{ opacity: 1, translateY: 0 }}
      className="relative grid min-h-[calc(100dvh-6rem)] grid-cols-2 overflow-hidden rounded-xl md:min-h-[calc(100dvh-10rem)]"
      initial={{ opacity: 0, translateY: 100 }}
    >
      <div>
        <h1 className=" font-[100] capitalize">
          Find the best product for everyone
        </h1>
      </div>
      <div className="grid grid-cols-2 grid-rows-9">
        <div className="relative row-span-5">
          <Image
            fill
            priority
            alt="hero"
            className="rounded-xl object-cover"
            sizes="100vw"
            src={"/hero.webp"}
          />
          <div className="absolute flex size-full flex-col justify-center gap-4 bg-gray-500/30 px-10 py-20 md:p-10">
            <div className="space-y-4 md:my-auto">
              <h1 className="select-none text-lg">
                The new collection is here.
                <br />
                Get ready to shop.
              </h1>
              <div className="relative flex select-none text-xs">
                <RxArrowBottomRight className="absolute -left-4 top-0.5" />
                <p>
                  Show now and get <b className="px-1">20%</b>
                  off on your first purchase. <br />
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-2 text-gray-600/80 md:mt-auto">
              <Link
                className={
                  "flex items-center justify-center rounded-full bg-slate-50 px-2 text-xs font-light"
                }
                href="/"
              >
                SHOW NOW
              </Link>

              <Link
                className="flex aspect-square size-8 items-center justify-center rounded-full bg-white/90"
                href={"/"}
              >
                <RxArrowTopRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
