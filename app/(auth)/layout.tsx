import React from "react";
import Image from "next/image";
import { LuFrame } from "react-icons/lu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"flex h-dvh flex-1 px-4"}>
      <main
        className={
          "relative m-auto h-dvh w-full max-w-6xl overflow-hidden rounded-xl md:h-3/4 md:border"
        }
      >
        <div
          className={
            "absolute z-20 flex h-full select-none flex-col p-10 text-white md:w-1/2"
          }
        >
          <div className={"flex items-center gap-2"}>
            <LuFrame className={"size-6"} />
            <span className={"text-lg font-semibold"}>{"KeyBy's shop"}</span>
          </div>

          <div className={"mt-auto hidden md:block"}>
            <p className={"text-wrap text-justify indent-4"}>
              Welcome to our shop! Here, you can find and buy something you
              love. If you enjoy this client, don’t forget to give a star to our
              GitHub repository. Thank you for your support!
            </p>
          </div>
        </div>

        <div className={"grid size-full grid-rows-1 md:grid-cols-2"}>
          <div className={"relative hidden overflow-hidden border-r md:block"}>
            <div
              className={
                "absolute z-10 flex size-full select-none flex-col bg-gray-800/70 p-10"
              }
            />
            <Image
              fill
              priority
              alt={"hero"}
              className={"object-center"}
              sizes={"auto"}
              src={"/hero.jpeg"}
            />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
