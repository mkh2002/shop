"use client";
import React from "react";
import { RxArrowBottomRight, RxArrowTopRight } from "react-icons/rx";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Ambulance } from "lucide-react";
import { LuClock } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

export default function Hero() {
  return (
    <motion.section
      animate={{ opacity: 1, translateY: 0 }}
      className="relative grid min-h-[calc(100dvh-20rem)] grid-cols-2 gap-0 overflow-hidden rounded-xl"
      initial={{ opacity: 0, translateY: 100 }}
    >
      <div className="flex size-full flex-col justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-[100] capitalize leading-snug tracking-wider">
            Discover the perfect product tailored
            <br /> for every unique need
            <br />
            choice and lifestyle
          </h1>
          <p className="max-w-xl text-xs text-muted-foreground">
            Our mission is to provide exceptional quality and satisfaction,
            ensuring that each individual finds exactly what they’re looking
            for. With a wide range of options and personalized recommendations,
            we aim to create a seamless shopping experience that caters to
            everyone, no matter their preferences or requirements.
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "px-4 rounded-full",
            )}
            href={"/"}
          >
            Shop now
          </Link>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2 text-sm font-thin text-muted-foreground">
              <Ambulance className="size-5" strokeWidth={0.5} />
              <p>Free delivery</p>
            </div>

            <div className="flex items-center space-x-2 text-sm font-thin text-muted-foreground">
              <LuClock className="size-5" strokeWidth={0.5} />
              <p>Always on-time</p>
            </div>
            <div />
          </div>
        </div>
      </div>
      <div className="row-span-2 grid grid-cols-2 grid-rows-9 gap-4">
        <div className="relative row-span-5">
          <Image
            fill
            priority
            alt="hero"
            className="rounded-xl object-cover"
            sizes="auto"
            src={"/hero.webp"}
          />
          <div className="absolute flex size-full flex-col justify-center gap-4 rounded-xl bg-gray-500/30 p-10">
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
                  "flex items-center justify-center rounded-full bg-white/90 px-4 text-xs"
                }
                href="/"
              >
                SHOW
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
        <div className="relative row-span-7">
          <Image
            fill
            priority
            alt="hero"
            className="rounded-xl object-cover grayscale-[0.6]"
            sizes="auto"
            src={"/banner.jpg"}
          />
          <div className="absolute flex size-full flex-col justify-center gap-4 rounded-xl bg-gray-500/30 p-5">
            <div className="w-full space-y-4 rounded-xl bg-white/30 p-5 backdrop-blur md:mt-auto">
              Get contactless delivery
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
