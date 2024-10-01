"use client";
import { AnimatePresence, motion, wrap } from "framer-motion";
import React, { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface DragInfo {
  offset: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
}
const data = [
  {
    id: 1,
    image: "/banner.jpg",
    name: "Product 1",
  },
  {
    id: 2,
    image: "/avatar.jpg",
    name: "Product 2",
  },
  {
    id: 3,
    image: "/category.png",
    name: "Product 3",
  },
];

const variants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};
const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

export default function Carousel() {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);

  const activeImageIndex = wrap(0, data.length, imageCount);

  const swipeToImage = (swipeDirection: number) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: DragInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;

    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const skipToImage = (imageId: number) => {
    let changeDirection;

    if (imageId > activeImageIndex) {
      changeDirection = 1;
    } else if (imageId < activeImageIndex) {
      changeDirection = -1;
    }
    setImageCount([imageId, changeDirection as number]);
  };

  return (
    <>
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={imageCount}
          animate="active"
          className="absolute  overflow-hidden"
          custom={direction}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          exit="exit"
          initial="incoming"
          transition={sliderTransition}
          variants={variants}
          onDragEnd={(_: string, dragInfo: DragInfo) =>
            dragEndHandler(dragInfo)
          }
        >
          <Image
            alt={data[activeImageIndex].name}
            className="size-full lg:min-h-[30rem] lg:min-w-[30rem]"
            height={500}
            src={data[activeImageIndex].image}
            width={500}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 z-10 flex w-full px-5">
        <Button
          className={cn(
            "size-12 rounded-full",
            activeImageIndex === 0 && "hidden",
          )}
          size={"icon"}
          variant={"secondary"}
          onClick={() => swipeToImage(-1)}
        >
          <LuChevronLeft className="size-6" strokeWidth={1} />
        </Button>
        <Button
          className={cn(
            "ml-auto size-12 rounded-full",
            activeImageIndex === data.length - 1 && "hidden",
          )}
          size={"icon"}
          variant={"secondary"}
          onClick={() => swipeToImage(1)}
        >
          <LuChevronRight className="size-6" strokeWidth={1} />
        </Button>
      </div>

      <div className="absolute bottom-5 space-x-4">
        {Array.from({ length: data.length }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "size-3 rounded-full border-2 border-muted",
              index === activeImageIndex && "bg-muted",
            )}
            onClick={() => skipToImage(index)}
          />
        ))}
      </div>
    </>
  );
}
