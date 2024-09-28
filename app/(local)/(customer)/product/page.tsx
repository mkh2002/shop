import React from "react";

import { getAllCategory } from "@/app/acitons/category";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default async function product() {
  const category = await getAllCategory();

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="default">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent />
      </Popover>
    </div>
  );
}
