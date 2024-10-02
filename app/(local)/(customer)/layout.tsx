import React from "react";

import Footer from "@/components/footer/footer-wapper";
import NavbarWrapper from "@/components/navbar/navbar-wrapper";
import { CategoryProvider } from "@/components/providers/category-provider";
import { getAllCategory } from "@/app/acitons/category";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const category = await getAllCategory();

  return (
    <CategoryProvider category={category}>
      <div className="container mx-auto flex min-h-dvh flex-col">
        <NavbarWrapper />
        <main className="mx-auto flex w-full flex-1 px-4 pb-20 pt-5 lg:px-6">
          {children}
        </main>
        <Footer />
      </div>
    </CategoryProvider>
  );
};

export default Layout;
