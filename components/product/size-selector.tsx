"use client";

import React, { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SizeSelectorProps {
  sizes: string[];
}

export default function SizeSelector({ sizes }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Size - {selectedSize}</h3>
      <RadioGroup
        className="flex space-x-2"
        value={selectedSize}
        onValueChange={setSelectedSize}
      >
        {sizes.map((size) => (
          <div key={size}>
            <RadioGroupItem
              className="peer sr-only"
              id={`size-${size}`}
              value={size}
            />
            <Label
              className="flex size-10 cursor-pointer items-center justify-center rounded-md border-2 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-secondary"
              htmlFor={`size-${size}`}
            >
              {size}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
