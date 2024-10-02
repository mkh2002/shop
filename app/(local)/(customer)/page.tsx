import React from "react";

import HeroProduct from "@/components/hero/hero-product";
import Hero from "@/components/hero/hero";
import { getTopProducts } from "@/app/acitons/product";
import HeroSales from "@/components/hero/hero-sales";

const Home = async () => {
  const product = await getTopProducts();

  if (!Array.isArray(product)) {
    return (
      <div className="relative space-y-20 overflow-hidden lg:space-y-14">
        <Hero />
        <div>Error loading products</div>
        <HeroSales />
      </div>
    );
  }

  return (
    <div className="relative space-y-20 overflow-hidden lg:space-y-14">
      <Hero />
      <HeroProduct product={product} />
      <HeroSales />
    </div>
  );
};

export default Home;
