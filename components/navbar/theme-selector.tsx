"use client";
import { useTheme } from "next-themes";
import React from "react";
import { SunIcon, MoonIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function ThemeSeletor() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="space-x-2 rounded-full py-1.5"
          size={"sm"}
          variant="outline"
        >
          <SunIcon className="size-[1.2rem] rotate-0 transition-all dark:hidden" />
          <MoonIcon className="hidden size-[1.2rem] transition-all dark:block" />
          <Separator orientation="vertical" />
          <p className="text-xs capitalize text-muted-foreground">{theme}</p>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
