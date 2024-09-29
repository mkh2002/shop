"use client";
import React, { useState } from "react";
import { RxDotFilled, RxFrame } from "react-icons/rx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { adminSite } from "@/config/site";

import LogoutButton from "../sidebar/logout-button";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const session = useSession();

  return (
    <div className={"md:hidden"}>
      <nav
        className={
          "fixed top-0 z-[90] flex w-full border-b bg-background p-4 md:hidden"
        }
      >
        <div className={"flex flex-1 items-center gap-2"}>
          <RxFrame className={"size-4"} />
          {"Management"}
        </div>

        <div>
          <Button
            className={"flex flex-col justify-center gap-1 p-0"}
            size={"icon"}
            variant={"ghost"}
            onClick={() => setCollapsed((prevState) => !prevState)}
          >
            <motion.div
              animate={
                collapsed
                  ? { rotate: 45, translateY: "0.175rem" }
                  : { rotate: 0, translateY: 0 }
              }
              className={"h-[2px] w-5 rounded-full bg-accent-foreground"}
            />
            <motion.div
              className={
                collapsed
                  ? "hidden"
                  : "h-[2px] w-5 rounded-full bg-accent-foreground"
              }
            />
            <motion.div
              animate={
                collapsed
                  ? { rotate: -45, translateY: "-0.175rem" }
                  : { rotate: 0, translateY: 0 }
              }
              className={"h-[2px] w-5 rounded-full bg-accent-foreground"}
            />
          </Button>
        </div>
      </nav>
      <motion.div
        animate={
          collapsed
            ? { translateY: "0%", opacity: 100 }
            : { translateY: "-100%", opacity: 0 }
        }
        className={cn(
          "fixed left-0 top-0 z-50 h-dvh w-full bg-background/50 backdrop-blur-lg",
        )}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={"mt-20 flex flex-col p-4"}>
          {adminSite.map((menu) => (
            <div key={menu.name}>
              <p className={"capitalize"}>{menu.name}</p>
              <div className={"flex w-full flex-col space-y-3 py-2.5"}>
                {menu.items.map((item) => (
                  <motion.div
                    key={item.name}
                    className={cn(
                      "flex w-full capitalize text-muted-foreground",
                      pathname === item.href && "text-primary",
                    )}
                    initial={{ fontSize: "1rem" }}
                    whileHover={{
                      fontSize: "1.125rem",
                      opacity: 0.7,
                    }}
                  >
                    <Link
                      className={"flex flex-1 items-center gap-1.5 px-2"}
                      href={item.href}
                    >
                      <RxDotFilled />
                      <span className={"w-full"}>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <p>Auth</p>
            <div className="flex px-4">
              <div className="text-muted-foreground">
                <p className="text-sm">{session.data?.user.name}</p>
                <p className="text-xs">{session.data?.user.email}</p>
              </div>

              <div className="ml-auto">
                <LogoutButton
                  className="size-10 text-muted-foreground"
                  iconSize={16}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
