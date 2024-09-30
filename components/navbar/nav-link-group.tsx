"use client";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import React from "react";

import { site } from "@/config/site";

import NavLink from "./nav-link";

export default function NAvLinkGroup() {
  const { scrollYProgress } = useScroll();
  const [isVisble, setIsVisible] = React.useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (direction < 0) {
        setIsVisible(true);
      } else if (direction === 1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{
          opacity: isVisble ? 1 : 0,
          y: isVisble ? 0 : -100,
        }}
        className={
          "fixed left-1/2 z-[250] hidden items-center justify-center space-x-4 rounded-full bg-muted/40 px-2 py-1 backdrop-blur-lg md:flex"
        }
        initial={{
          opacity: 1,
          y: 0,
          translateX: "-50%",
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {site.map((item) => (
          <NavLink key={item.label} href={item.href} name={item.label} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
