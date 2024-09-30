import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default async function product() {
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
