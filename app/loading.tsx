"use client";
import { motion } from "framer-motion";
import React from "react";

export default function Loading() {
  const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(0, 0, 0, 0)",
    },
    visible: {
      pathLength: 1,
      fill: "rgba(0, 0, 0, 1)",
    },
  };

  return (
    <div>
      <svg
        className="absolute left-1/2 top-1/2 size-64 overflow-visible stroke-foreground stroke-1"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          animate="visible"
          clipRule="evenodd"
          d="M11 1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V4H5V1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5V4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H4V10H1.5C1.22386 10 1 10.2239 1 10.5C1 10.7761 1.22386 11 1.5 11H4V13.5C4 13.7761 4.22386 14 4.5 14C4.77614 14 5 13.7761 5 13.5V11H10V13.5C10 13.7761 10.2239 14 10.5 14C10.7761 14 11 13.7761 11 13.5V11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H11V5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H11V1.5ZM10 10V5H5V10H10Z"
          fill="currentColor"
          fillRule="evenodd"
          initial="hidden"
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          variants={icon}
        />
      </svg>
    </div>
  );
}
