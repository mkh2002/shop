"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/config/definetions";
import { cn } from "@/lib/utils";

import { ImageCarousel } from "./image-carsousel";
import ColorSelector from "./color-selector";
import SizeSelector from "./size-selector";
import ProductFooter from "./product-footer";

interface ProductDetailsProps {
  product: ProductType;
}

const detail = {
  id: 1,
  title: "Product Information",
  content: "Detailed product information goes here...",
  colors: [
    {
      name: "Red",
      value: "#FF0000",
      image: "/category.png",
    },
    {
      name: "Green",
      value: "#00FF00",
      image: "/category.png",
    },
    {
      name: "Blue",
      value: "#0000FF",
      image: "/category.png",
    },
    {
      name: "Black",
      value: "#0000FF",
      image: "/category.png",
    },
  ],
  sizes: ["S", "M", "L", "XL"],
  brand: {
    name: "Brand Name",
    logo: "/avatar.jpg",
  },
  images: [
    {
      id: 1,
      image: "/category.png",
      name: "Product 1",
    },
    {
      id: 2,
      image: "/category.png",

      name: "Product 2",
    },
    {
      id: 3,
      image: "/category.png",
      name: "Product 3",
    },
  ],
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const carousel = useRef<{ getHeight: () => number }>(null);
  const [carouselHeight, setCarouselHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setCarouselHeight(carousel.current.getHeight());
    }

    const handleResize = () => {
      if (carousel.current) {
        setCarouselHeight(carousel.current.getHeight());
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full px-4">
      <div className={`grid gap-8  lg:grid-cols-2`}>
        <ImageCarousel ref={carousel} images={detail.images} />

        <div
          ref={ref}
          className={cn(
            `flex-1 space-y-6 overflow-auto scrollbar-none`,
            carouselHeight && `h-[${carouselHeight}px]`,
          )}
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center space-x-2">
              <Image
                alt={detail.brand.name}
                className="rounded-full"
                height={32}
                src={detail.brand.logo}
                width={32}
              />
              <span className="text-sm font-medium">{detail.brand.name}</span>
              <Badge className="ml-auto" variant="secondary">
                {product.category?.name}
              </Badge>
            </div>
          </div>

          <p className="text-2xl font-bold">$ {product.price.toFixed(2)}</p>

          <p className="text-muted-foreground">{product.description}</p>

          <ColorSelector colors={detail.colors} />
          <SizeSelector sizes={detail.sizes} />
          <ProductFooter productId={product.id as string} />
        </div>
      </div>

      <section className="mt-12 rounded-xl border border-dashed p-10" id="info">
        <h2 className="mb-4 text-2xl font-semibold">Product Information</h2>
        {/* TODO: Add actual MDX content here */}
        <p className="text-muted-foreground">
          Detailed product information goes here...
        </p>
      </section>
    </div>
  );
}
