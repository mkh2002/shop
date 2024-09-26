import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OAuthButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }), "w-full")}
        {...props}
      />
    );
  },
);

OAuthButton.displayName = "OAuthButton";

export { OAuthButton, buttonVariants };
