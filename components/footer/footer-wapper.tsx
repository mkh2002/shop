"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

export default function Footer() {
  const pathname = usePathname();

  return (
    <motion.div
      animate={{ opacity: 1, translateY: 0 }}
      className="fixed bottom-0 w-full p-5 md:hidden"
      initial={{ opacity: 0, translateY: 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex w-full justify-between rounded-full border px-8 py-2">
        {site.map((item) => (
          <Link
            key={item.label}
            className={cn(
              buttonVariants({ size: "icon", variant: "ghost" }),
              "rounded-full p-2 size-10",
              pathname === item.href && "text-primary bg-muted",
            )}
            href={item.href}
          >
            <item.icon className="size-6" strokeWidth={5} />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
