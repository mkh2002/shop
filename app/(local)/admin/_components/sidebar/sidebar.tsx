"use client";
import React from "react";

import { useSidebarContext } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";
import { adminSite } from "@/config/site";
import CollapsedSidebarButton from "@/app/(local)/admin/_components/sidebar/collapsed-sidebar-button";
import SidebarHeader from "@/app/(local)/admin/_components/sidebar/sidebar-header";
import SidebarGroup from "@/app/(local)/admin/_components/sidebar/sidebar-group";
import SidebarItem from "@/app/(local)/admin/_components/sidebar/sidebar-item";

import SidebarFooter from "./sidebar-footer";

const SidebarWrapper = () => {
  const { collapsed } = useSidebarContext();

  return (
    <div
      className={cn(
        "relative hidden md:flex  border-r flex-col items-center h-full gap-4 p-6 duration-300 transition-all",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <CollapsedSidebarButton />
      <SidebarHeader />
      {adminSite.map((item) => (
        <SidebarGroup key={item.name} name={item.name}>
          {item.items.map((subItem) => (
            <SidebarItem
              key={subItem.name}
              href={subItem.href}
              icon={<subItem.icon className={"size-5"} />}
              name={subItem.name}
            />
          ))}
        </SidebarGroup>
      ))}
      <SidebarFooter />
    </div>
  );
};

export default SidebarWrapper;
