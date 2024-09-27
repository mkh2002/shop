import React from "react";

import Footer from "@/components/footer/footer-wapper";
import NavbarWrapper from "@/components/navbar/navbar-wrapper";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <NavbarWrapper />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
