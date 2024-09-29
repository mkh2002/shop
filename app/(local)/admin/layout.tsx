import React from "react";

import { SidebarProvider } from "@/components/providers/sidebar-provider";
import Navbar from "@/app/(local)/admin/_components/navbar/navbar";
import Sidebar from "@/app/(local)/admin/_components/sidebar/sidebar";
import Header from "@/app/(local)/admin/_components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh w-full flex-col">
      <Navbar />
      <div className={"flex size-full pt-16 md:pt-0"}>
        <aside className="shrink-0">
          <SidebarProvider>
            <Sidebar />
          </SidebarProvider>
        </aside>

        <section className="flex w-full max-w-full  flex-1 flex-col overflow-auto px-6 py-10 md:px-10">
          <header>
            <Header />
          </header>
          <main className={"flex w-full flex-1"}>{children}</main>
        </section>
      </div>
    </div>
  );
}
