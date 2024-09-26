"use client";
import React from "react";
import { RxExit, RxFrame } from "react-icons/rx";
import { motion } from "framer-motion";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LuShoppingBag } from "react-icons/lu";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { site } from "@/config/site";
import NavLink from "@/components/navbar/nav-link";

const NavbarWrapper = () => {
  const session = useSession();

  return (
    <motion.div
      animate={{ opacity: 1, translateY: 0 }}
      className={
        "flex w-full items-center justify-between bg-background p-4 lg:px-8"
      }
      initial={{ opacity: 0, translateY: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Link className={"flex space-x-2 "} href={"/"}>
        <RxFrame className={"size-5"} strokeWidth={0.7} />
        <span className={"hidden font-semibold uppercase md:block"}>
          {"KeyB's Shop"}
        </span>
      </Link>

      <div
        className={
          "hidden items-center justify-center space-x-4 rounded-full border bg-muted/30 px-4 py-1 md:flex"
        }
      >
        {site.map((item) => (
          <NavLink key={item.label} href={item.href} name={item.label} />
        ))}
      </div>

      <div className={"flex items-center space-x-4"}>
        <Button
          className={"space-x-1 rounded-full"}
          size={"sm"}
          variant={"outline"}
        >
          <LuShoppingBag className={"size-3.5"} />
          <span>Bag</span>
        </Button>
        {session.data?.user ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className={"size-8"}>
                  <AvatarImage src={session.data.user.image as string} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full",
                  )}
                  href={"/profile"}
                >
                  {session.data.user.name}
                </Link>
                <DropdownMenuSeparator />
                <Button
                  className={"w-full space-x-1.5"}
                  size={"sm"}
                  variant={"ghost"}
                  onClick={() => signOut()}
                >
                  <span>Sign Out</span>
                  <RxExit className={"size-4"} />
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link className={cn(buttonVariants)} href={"/login"}>
            Login
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default NavbarWrapper;
