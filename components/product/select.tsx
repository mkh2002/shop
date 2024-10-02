"use client";
import React, { useState } from "react";
import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface SelectItemProps {
  className?: string;
  title?: string;
}

export default function SelectItem({ title }: SelectItemProps) {
  const [selectedValue, setSelectedValue] = useState("default");

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-xl tracking-wider">
          {title} -{" "}
          <span className="text-muted-foreground">{selectedValue}</span>
        </h3>
      )}
      <RadioGroup
        className="space-y-4"
        value={selectedValue}
        onValueChange={setSelectedValue}
      >
        <div>
          <RadioGroupItem className="peer sr-only" id="r1" value="default" />
          <Label
            className="flex cursor-pointer items-center justify-between overflow-hidden rounded-xl border p-5 peer-data-[state=checked]:bg-muted"
            htmlFor="r1"
          >
            <div className="h-full space-y-1">
              <h1 className="text-lg">{"this is label"}</h1>
              <p className="text-sm font-light text-muted-foreground">
                {"this is description"}
              </p>
              <p className="text-sm text-muted-foreground">$ 199.99</p>
            </div>
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
            className="flex cursor-pointer items-center justify-between overflow-hidden rounded-xl border p-5 peer-data-[state=checked]:bg-muted"
            htmlFor="r2"
          >
            <div className="h-full space-y-1">
              <h1 className="text-lg">{"this is label"}</h1>
              <p className="text-sm font-light text-muted-foreground">
                {"this is description"}
              </p>
              <p className="text-sm text-muted-foreground">$ 199.99</p>
            </div>
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
    </div>
  );
}
