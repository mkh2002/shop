"use client";
import React, { useState } from "react";
import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export default function SelectItem() {
  const [selectedValue, setSelectedValue] = useState("default");

  return (
    <RadioGroup
      className="flex"
      value={selectedValue}
      onValueChange={setSelectedValue}
    >
      <div>
        <RadioGroupItem className="peer sr-only" id="r1" value="default" />
        <Label
          className=":border-muted flex cursor-pointer overflow-hidden rounded-xl border  border-primary-foreground peer-data-[state=checked]:border-border"
          htmlFor="r1"
        >
          <Image
            alt="avatar"
            height={100}
            sizes="auto"
            src="/category.png"
            width={100}
          />
        </Label>
      </div>
      <div>
        <RadioGroupItem className="peer sr-only" id="r2" value="default2" />
        <Label
          className=":border-muted flex cursor-pointer overflow-hidden rounded-xl border border-primary-foreground peer-data-[state=checked]:border-border"
          htmlFor="r2"
        >
          <Image
            alt="avatar"
            height={100}
            sizes="auto"
            src="/category.png"
            width={100}
          />
        </Label>
      </div>
    </RadioGroup>
  );
}
