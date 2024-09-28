import React from "react";

import Footer from "@/components/footer/footer-wapper";
import NavbarWrapper from "@/components/navbar/navbar-wrapper";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-dvh flex-col">
      <NavbarWrapper />
      <main className="mx-auto w-full max-w-[120rem] px-4 pb-20 pt-10 md:px-12 lg:px-14">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
