"use client";
import React, { useState } from "react";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface SelectSizeProps {
  className?: string;
  title?: string;
}

export default function SelectSize({ title }: SelectSizeProps) {
  const [selectedValue, setSelectedValue] = useState("sm");

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-xl font-semibold tracking-wider">
          {title} -{" "}
          <span className="capitalize text-muted-foreground">
            {selectedValue}
          </span>
        </h3>
      )}

      <RadioGroup
        className="flex"
        value={selectedValue}
        onValueChange={setSelectedValue}
      >
        <div>
          <RadioGroupItem className="peer sr-only" id="sm" value="sm" />
          <Label
            className="flex aspect-square size-12 cursor-pointer items-center justify-center rounded-xl border border-muted font-light capitalize tracking-widest peer-data-[state=checked]:border-border peer-data-[state=checked]:bg-muted"
            htmlFor="sm"
          >
            <p>sm</p>
          </Label>
        </div>

        <div>
          <RadioGroupItem className="peer sr-only" id="md" value="md" />
          <Label
            className="flex aspect-square size-12 items-center justify-center rounded-xl border border-muted font-light capitalize tracking-widest peer-data-[state=checked]:border peer-data-[state=checked]:bg-muted"
            htmlFor="md"
          >
            <p>md</p>
          </Label>
        </div>

        <div>
          <RadioGroupItem className="peer sr-only" id="lg" value="lg" />
          <Label
            className="flex aspect-square size-12 items-center justify-center rounded-xl border border-muted font-light capitalize tracking-widest peer-data-[state=checked]:border peer-data-[state=checked]:bg-muted"
            htmlFor="lg"
          >
            <p>lg</p>
          </Label>
        </div>

        <div>
          <RadioGroupItem className="peer sr-only" id="xl" value="xl" />
          <Label
            className="flex aspect-square size-12 items-center justify-center rounded-xl border border-muted font-light capitalize tracking-widest peer-data-[state=checked]:border peer-data-[state=checked]:bg-muted"
            htmlFor="xl"
          >
            <p>XL</p>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
