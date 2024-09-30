import React from "react";

import Footer from "@/components/footer/footer-wapper";
import NavbarWrapper from "@/components/navbar/navbar-wrapper";
import { CategoryProvider } from "@/components/providers/category-provider";
import { getAllCategory } from "@/app/acitons/category";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const category = await getAllCategory();

  return (
    <div className="mx-auto flex min-h-dvh flex-col">
      <NavbarWrapper />
      <CategoryProvider category={category}>
        <main className="mx-auto w-full max-w-[120rem] px-4 pb-20 pt-10 md:px-12 lg:px-14">
          {children}
        </main>
      </CategoryProvider>
      <Footer />
    </div>
  );
};

export default Layout;
