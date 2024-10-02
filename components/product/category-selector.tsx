"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCategoryContext } from "@/components/providers/category-provider";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SelectCategoryProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategorySelector({
  selectedCategories,
  onCategoryChange,
}: SelectCategoryProps) {
  const categories = useCategoryContext();
  const [open, setOpen] = useState(false);

  const toggleCategory = (categoryName: string) => {
    const newSelectedCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((cat) => cat !== categoryName)
      : [...selectedCategories, categoryName];

    onCategoryChange(newSelectedCategories);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="flex items-center space-x-2 rounded-full"
          variant="outline"
        >
          <span>Category</span>
          {selectedCategories.length > 0 && (
            <>
              <Separator className="h-4" orientation="vertical" />
              <Badge
                className="rounded-sm px-1 font-normal"
                variant="secondary"
              >
                {selectedCategories.length}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  onSelect={() => toggleCategory(category.name)}
                >
                  <Check
                    className={`mr-2 size-4 ${
                      selectedCategories.includes(category.name)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {selectedCategories.length > 0 && (
          <div className="border-t p-2">
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  className="rounded-full"
                  variant="secondary"
                >
                  {category}
                  <Button
                    className="ml-1 size-4 p-0"
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleCategory(category)}
                  >
                    <X className="size-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Button
              className="mt-2 w-full"
              size="sm"
              variant="ghost"
              onClick={() => onCategoryChange([])}
            >
              Clear all
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
