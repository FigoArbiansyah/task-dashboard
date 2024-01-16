"use client";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import routes from "@/helpers/route";

const Screen = ({ children }: { children: React.ReactNode }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const path = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const SidebarToggleIcon = sidebarIsOpen ? XMarkIcon : Bars3Icon;

  if (path != "/login" && path != "/register") {
    return (
      <>
        {isMobile ? (
          <aside className="px-5 py-3 bg-[#16191C] text-zinc-200 h-auto">
            <SidebarToggleIcon
              width={30}
              height={30}
              onClick={() => {
                setSidebarIsOpen(!sidebarIsOpen);
              }}
              className="cursor-pointer"
            />
            <ul className="mt-3">
              {routes?.map((route, index) => {
                const Icon = route?.icon;
                if (sidebarIsOpen) {
                  return (
                    <Link
                      href={route?.path}
                      key={index}
                      className={`mb-2 sidebar-link flex items-center gap-2 ${
                        route?.path === path ? "sidebar-link-active" : " "
                      }`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      <Icon width={20} height={20} />
                      <span>{route?.title}</span>
                    </Link>
                  );
                }
              })}
            </ul>
          </aside>
        ) : (
          <aside className="max-md:hidden md:col-span-1 md:px-3 md:py-8 p-5 bg-[#16191C] text-zinc-200">
            <Sidebar />
          </aside>
        )}
        <section className="md:col-span-11 md:px-3 md:py-8">{children}</section>
      </>
    );
  }
  return <section className="md:col-span-12">{children}</section>;
};

export default Screen;
