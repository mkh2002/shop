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
import { Avatar, AvatarImage } from "../ui/avatar";

const cardMotion = {
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
  initial: { opacity: 0, translateY: 100 },
  animate: {
    opacity: 1,
    translateY: 0,
  },
};
const item2 = {
  initial: { opacity: 0, translateX: -100 },
  animate: {
    opacity: 1,
    translateX: 0,
  },
};
const item3 = {
  initial: { opacity: 0, translateX: 100 },
  animate: {
    opacity: 1,
    translateX: 0,
  },
};

export default function Hero() {
  return (
    <motion.section
      animate={{ opacity: 1, translateY: 0 }}
      className="relative grid grid-rows-1 gap-8 overflow-hidden xl:min-h-[calc(100dvh-20rem)] xl:grid-cols-2 xl:gap-4"
      initial={{ opacity: 0, translateY: 100 }}
    >
      <div className="flex size-full flex-col justify-between gap-12 py-5 md:gap-40 xl:gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-[100] capitalize tracking-wider lg:text-5xl lg:leading-tight">
            Discover the perfect product tailored
            <br className="hidden lg:inline-block" /> for every unique need
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
              "px-5 rounded-full",
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
      <motion.div
        className="row-span-2 grid grid-rows-7 gap-4 overflow-hidden text-white md:grid-rows-9 lg:min-h-max lg:grid-cols-2 lg:grid-rows-9 lg:rounded-xl"
        initial="initial"
        variants={cardMotion}
        viewport={{ once: true }}
        whileInView="animate"
      >
        <div className="relative row-span-2 min-h-96 lg:row-span-6 lg:min-h-[25rem] xl:min-h-80">
          <Image
            fill
            priority
            alt="hero"
            className="object-cover "
            sizes="auto"
            src={"/hero.webp"}
          />
          <motion.div className="absolute flex size-full flex-col justify-between gap-4 p-10 dark:bg-gray-500/30 lg:justify-center">
            <div className="my-auto space-y-4">
              <motion.h1 className="select-none text-xl" variants={item}>
                The new collection is here.
                <br />
                Get ready to shop.
              </motion.h1>
              <motion.div
                className="relative flex select-none text-xs"
                variants={item}
              >
                <RxArrowBottomRight className="absolute -left-4 top-0.5" />
                <p>
                  Show now and get <b className="px-1">20%</b>
                  off on your first purchase. <br />
                </p>
              </motion.div>
            </div>
            <motion.div
              className="flex justify-center gap-2 text-gray-600/80 lg:mt-auto"
              variants={item}
            >
              <Link
                className={
                  "flex items-center justify-center rounded-full bg-white/90 px-6 text-xs"
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
            </motion.div>
          </motion.div>
        </div>
        <div className="relative row-span-4 lg:row-span-7">
          <Image
            fill
            priority
            alt="hero"
            className="object-cover"
            sizes="auto"
            src={"/banner.jpg"}
          />
          <div className="absolute flex size-full flex-col justify-end gap-4 p-5 dark:bg-gray-500/30 lg:justify-center">
            <motion.div
              className="w-full bg-white/30 p-5 backdrop-blur lg:mt-auto "
              variants={item}
            >
              <h5>Get customer support</h5>
              <p className="text-xs text-white/70">
                9am - 6pm, Monday to Friday
              </p>
            </motion.div>
          </div>
        </div>
        <div className="relative row-span-1 md:row-span-2 lg:row-span-3">
          <Image
            fill
            priority
            alt="hero"
            className="object-cover "
            sizes="auto"
            src={"/trend.webp"}
          />
          <div className="absolute flex size-full bg-gray-500/30 px-5 py-10">
            <motion.p variants={item2}>
              Fashion and excellent
              <br />
              Workmanship
            </motion.p>
          </div>
        </div>

        <div className="row-span-1 flex items-center space-x-4 bg-secondary p-4 px-5 text-foreground lg:row-span-2">
          <motion.div className="flex -space-x-4" variants={item2}>
            <Avatar className="size-12 border-2">
              <AvatarImage src="avatar.jpg" />
            </Avatar>
            <Avatar className="size-12 border-2">
              <AvatarImage src="avatar.jpg" />
            </Avatar>
            <Avatar className="size-12 border-2">
              <AvatarImage src="avatar.jpg" />
            </Avatar>
          </motion.div>
          <motion.div variants={item3}>
            <p>120.000 +</p>
            <p className="text-xs font-light text-muted-foreground">
              Items sold out
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
