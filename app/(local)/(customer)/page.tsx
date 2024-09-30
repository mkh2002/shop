import React from "react";

import HeroProduct from "@/components/hero/hero-product";
import Hero from "@/components/hero/hero";
import { getTopProducts } from "@/app/acitons/product";

const Home = async () => {
  const product = await getTopProducts();

  return (
    <div className="relative space-y-14">
      <Hero />
      <HeroProduct product={product} />
    </div>
  );
};

export default Home;
