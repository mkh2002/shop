import React from "react";

import HeroCategory from "@/components/hero/hero-category";
import { getAllCategory } from "@/app/acitons/category";
import Hero from "@/components/hero/hero";
import { getTopProducts } from "@/app/acitons/product";
import HeroProduct from "@/components/hero/hero-product";

const Home = async () => {
  const category = await getAllCategory();
  const product = await getTopProducts();

  return (
    <div className="relative space-y-8">
      <Hero />
      <HeroCategory category={category} />
      <HeroProduct product={product} />
    </div>
  );
};

export default Home;
