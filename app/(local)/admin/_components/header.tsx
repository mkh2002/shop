"use client";

import React from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { adminSite } from "@/config/site";

const ToggleThemeButton = dynamic(() => import("./toggle-theme-button"), {
  ssr: false,
});

const Navbar = () => {
  const path = usePathname();

  return (
    <div className={"flex w-full items-center justify-between"}>
      {adminSite.map((menu) =>
        menu.items.map(
          (item) =>
            item.href === path && (
              <div key={item.name} className={"flex flex-col gap-1"}>
                <h1 className={"text-2xl font-semibold capitalize"}>
                  {item.name}
                </h1>
                <p className={"text-sm text-muted-foreground"}>{item.sign}</p>
              </div>
            ),
        ),
      )}
      <ToggleThemeButton />
    </div>
  );
};

export default Navbar;
