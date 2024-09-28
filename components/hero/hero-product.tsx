import React from "react";
import Image from "next/image";
import Link from "next/link"; // 确保 Link 导入

import { cn } from "@/lib/utils"; // 确保 cn 函数导入
import { buttonVariants } from "@/components/ui/button"; // 确保 buttonVariants 导入
import { ProductType } from "@/config/definetions";

import { Card, CardContent, CardFooter } from "../ui/card";

interface Props {
  product: ProductType[];
}

export default function HeroProduct({ product }: Props) {
  return (
    <section className="space-y-8 px-2">
      <h3>Product for you</h3>
      <div className="grid grid-cols-2 items-center justify-items-center gap-4 md:grid-cols-3 lg:grid-cols-4">
        {product.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <div key={item.id} className="flex flex-col">
                <Image
                  priority
                  alt={item.name}
                  className="size-full rounded-xl"
                  height={200}
                  sizes="auto"
                  src={item.image as string}
                  width={200}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full hover:bg-foreground hover:text-muted rounded-none text-xs truncate",
                )}
                href={`/category/${item.name}`}
              >
                {item.name}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
