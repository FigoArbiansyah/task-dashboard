"use client";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import React from "react";

const Screen = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  if (path != "/login" && path != "/register") {
    return (
      <>
        <aside className="max-md:hidden md:col-span-1 md:px-3 md:py-8 p-5 bg-[#16191C] text-zinc-200">
          <Sidebar />
        </aside>
        <section className="md:col-span-11 md:px-3 md:py-8">{children}</section>
      </>
    );
  }
  return <section className="md:col-span-12">{children}</section>;
};

export default Screen;
