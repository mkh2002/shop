"use client";
import React from "react";
import { RxExit, RxFrame } from "react-icons/rx";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LuShoppingBag } from "react-icons/lu";
import { motion } from "framer-motion";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import NAvLinkGroup from "./nav-link-group";

const NavbarWrapper = () => {
  const session = useSession();

  return (
    <motion.div
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      className={
        "relative flex w-full  items-center justify-between bg-background p-6 lg:px-8 lg:py-10"
      }
      initial={{
        opacity: 0,
        translateY: -100,
      }}
    >
      <Link className={"flex space-x-2 "} href={"/"}>
        <RxFrame className={"size-5"} strokeWidth={0.7} />
        <span className={"hidden font-semibold uppercase md:block"}>
          {"KeyB's Shop"}
        </span>
      </Link>

      <NAvLinkGroup />

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
