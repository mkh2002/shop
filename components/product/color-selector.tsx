"use client";

import React, { useState } from "react";
import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { Skeleton } from "../ui/skeleton";

interface ColorType {
  name: string;
  value: string;
  image: string;
}

interface ColorSelectorProps {
  colors: ColorType[];
}

export default function ColorSelector({ colors }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Color - {selectedColor}</h3>
      <RadioGroup
        className="flex flex-col space-y-2"
        value={selectedColor}
        onValueChange={setSelectedColor}
      >
        {colors.map((color) => (
          <div key={color.name} className="rounded-xl">
            <RadioGroupItem
              className="peer sr-only"
              id={`color-${color.name}`}
              value={color.name}
            />
            <Label
              className="flex cursor-pointer items-center justify-between rounded-xl border px-4 py-2 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-secondary"
              htmlFor={`color-${color.name}`}
            >
              <div className="space-y-1">
                <p className="text-2xl tracking-wide">{color.name}</p>
                <p className="text-muted-foreground">{color.value}</p>
              </div>

              <div className="relative aspect-square h-20">
                {isLoading && <Skeleton className="size-full" />}
                <Image
                  fill
                  priority
                  alt={color.name}
                  sizes="auto"
                  src={color.image}
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
