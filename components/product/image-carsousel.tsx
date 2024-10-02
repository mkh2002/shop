"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageType {
  id: number;
  image: string;
  name: string;
}

interface ImageCarouselProps {
  images: ImageType[];
}

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

const Comp = forwardRef<any, ImageCarouselProps>(({ images }, ref) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const localRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getHeight() {
      return localRef.current?.offsetHeight;
    },
  }));

  const swipeToImage = (swipeDirection: number) => {
    setActiveImageIndex((prev) =>
      wrap(0, images.length, prev + swipeDirection),
    );
    setDirection(swipeDirection);
  };

  const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;

    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  return (
    <div ref={localRef} className="space-y-8">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary/30">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={activeImageIndex}
            animate="active"
            className="absolute inset-0"
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            exit="exit"
            initial="incoming"
            transition={sliderTransition}
            variants={variants}
            onDragEnd={(_: any, info: { offset: { x: number } }) =>
              dragEndHandler(info)
            }
          >
            <Image
              alt={images[activeImageIndex].name}
              layout="fill"
              objectFit="cover"
              src={images[activeImageIndex].image}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            className={cn(
              "rounded-full",
              activeImageIndex === 0 && "invisible",
            )}
            size="icon"
            variant="secondary"
            onClick={() => swipeToImage(-1)}
          >
            <ChevronLeft className="size-6" />
          </Button>
          <Button
            className={cn(
              "rounded-full",
              activeImageIndex === images.length - 1 && "invisible",
            )}
            size="icon"
            variant="secondary"
            onClick={() => swipeToImage(1)}
          >
            <ChevronRight className="size-6" />
          </Button>
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full bg-primary/30 transition-all",
              index === activeImageIndex && "w-4 bg-primary",
            )}
            onClick={() => setActiveImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
});

Comp.displayName = "ImageCarousel";

export const ImageCarousel = Comp;
