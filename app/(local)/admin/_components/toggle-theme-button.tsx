"use client";
import React from "react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";

import { Button } from "@/components/ui/button";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const onClick = () => {
    setTheme(
      theme === "light" ? "system" : theme === "system" ? "dark" : "light",
    );
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={onClick}>
      {theme === "light" ? (
        <LuSunMoon className={"size-5"} />
      ) : theme === "system" ? (
        <LuMoon className={"size-5"} />
      ) : (
        <LuSun className={"size-5"} />
      )}
    </Button>
  );
};

export default ToggleThemeButton;
