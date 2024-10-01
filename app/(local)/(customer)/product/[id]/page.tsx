import React from "react";
import { Frown } from "lucide-react";
import Image from "next/image";

import { getProductById } from "@/app/acitons/product";
import SelectItem from "@/components/product/select";
import SelectSize from "@/components/product/select-size";
import Footer from "@/components/product/footer";
import { Badge } from "@/components/ui/badge";
import Carousel from "@/components/product/carousel";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await getProductById(id);

  if (res.data) {
    return (
      <section className="mx-auto max-h-[48rem] flex-1 gap-20 scrollbar-none lg:grid lg:grid-cols-5 lg:grid-rows-1 lg:gap-20 lg:overflow-auto">
        <div className="flex flex-col space-y-8 lg:sticky lg:top-0 lg:col-span-3">
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold tracking-wider">
              {res.data.name}
            </h1>
            <div className="flex items-center gap-2">
              <Image
                alt="avatar"
                className="size-8 rounded-full"
                height={200}
                src="/avatar.jpg"
                width={200}
              />
              <p>des</p>
              <Badge
                className="ml-auto mt-auto rounded-full text-sm"
                variant={"secondary"}
              >
                {res.data.category.name}
              </Badge>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl bg-secondary/30 lg:aspect-auto lg:h-full lg:min-h-[30rem]">
              <Carousel />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 pb-40 pt-[4.325rem] lg:col-span-2 lg:pb-0">
          <SelectItem title="Color" />
          <SelectSize title="Size" />
          <div className="mt-auto">
            <Footer />
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
