import React from "react";
import { Frown } from "lucide-react";
import Image from "next/image";

import { getProductById } from "@/app/acitons/product";
import SelectItem from "@/components/product/select";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await getProductById(id);

  if (res.data) {
    return (
      <section className="grid grid-rows-1 gap-20 lg:grid-cols-2">
        <div className="flex flex-col space-y-4">
          <div className="relative flex-1 bg-muted">
            <Image
              fill
              priority
              alt={res.data.name}
              sizes="auto"
              src={res.data.image}
            />
          </div>
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="size-14 bg-white">
                123
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <div className="size-8 rounded-full bg-muted-foreground" />
              <p>qwejie</p>
            </div>
          </div>
          <div className="space-y-4 capitalize">
            <h1 className="text-4xl tracking-wider">{res.data.name}</h1>
            <p className="ml-0.5">
              {/* 
              TODO
              - Rating
            */}
              rating
            </p>

            <h1 className="text-5xl leading-loose">$ {res.data.price}</h1>
          </div>

          <div>
            <SelectItem />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 space-x-4">
      <Frown />
      <h1>Product not found</h1>
    </div>
  );
}
