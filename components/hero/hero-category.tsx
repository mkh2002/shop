import { Category } from "@prisma/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  category: Category[];
}

export default function HeroCategory({ category }: Props) {
  return (
    <section className="space-y-3 px-2">
      <h3 className="tracking-wider">Shop By Category</h3>
      <div className="flex gap-4">
        {category.map((item) => (
          <div key={item.id} className="flex flex-col">
            <Link className="space-y-1" href={`/category/${item.name}`}>
              <Image
                priority
                alt={item.name}
                className="size-16 rounded-full bg-muted p-2"
                height={200}
                sizes="auto"
                src={item.image}
                width={200}
              />
              <p className="text-center text-xs">{item.name}</p>
            </Link>
          </div>
        ))}
        <div className="ml-auto" />
      </div>
    </section>
  );
}
