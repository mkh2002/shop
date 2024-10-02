"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { RxExit, RxFrame, RxDotFilled } from "react-icons/rx";
import { LuShoppingBag } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ThemeSeletor from "./theme-selector";

const NavLink = ({ href, name }: { href: string; name: string }) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      className={cn(
        "flex items-center transition-all gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground lg:px-6",
        isActive
          ? "bg-background pl-4 pr-6 text-foreground hover:opacity-90"
          : "font-extralight hover:bg-muted",
      )}
      href={href}
    >
      {isActive && <RxDotFilled />}
      {name}
    </Link>
  );
};

const NavLinkGroup = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      setIsVisible(direction < 0 || direction === 1);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -100,
          x: "-50%",
          left: "50%",
        }}
        className="fixed z-[250] flex items-center justify-center space-x-4 rounded-full bg-muted/50 px-2 py-1 backdrop-blur-lg"
        initial={{
          opacity: 1,
          y: 0,
          x: "-50%",
          left: "50%",
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
};

export default function Navbar() {
  const session = useSession();

  return (
    <motion.div
      animate={{ opacity: 1, translateY: 0 }}
      className="container mx-auto flex w-full items-center justify-between bg-background px-4 py-10"
      initial={{ opacity: 0, translateY: -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }} // 添加平滑过渡
    >
      <Link className="z-[110] flex space-x-2" href="/">
        <RxFrame className="size-5" strokeWidth={0.7} />
        <span className="hidden font-semibold uppercase md:block">
          {"KeyB's Shop"}
        </span>
      </Link>

      <NavLinkGroup />

      <div className="z-[110] flex items-center space-x-4">
        <Button className="space-x-1 rounded-full" size="sm" variant="outline">
          <LuShoppingBag className="size-3.5" />
          <span>Bag</span>
        </Button>
        <ThemeSeletor />
        {session.data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-8 cursor-pointer">
                <AvatarImage src={session.data.user.image as string} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "w-full",
                )}
                href="/profile"
              >
                {session.data.user.name}
              </Link>
              <DropdownMenuSeparator />
              <Button
                className="w-full space-x-1.5"
                size="sm"
                variant="ghost"
                onClick={() => signOut()}
              >
                <span>Sign Out</span>
                <RxExit className="size-4" />
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link className={cn(buttonVariants())} href="/login">
            Login
          </Link>
        )}
      </div>
    </motion.div>
  );
}
