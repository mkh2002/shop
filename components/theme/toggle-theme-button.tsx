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
    <Button
      className={"text-xl"}
      size={"icon"}
      variant={"ghost"}
      onClick={onClick}
    >
      {theme === "light" ? (
        <LuSunMoon />
      ) : theme === "dark" ? (
        <LuMoon />
      ) : (
        <LuSun />
      )}
    </Button>
  );
};

export default ToggleThemeButton;
