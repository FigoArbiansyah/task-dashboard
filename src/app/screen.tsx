"use client";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import routes from "@/helpers/route";
import { checkIsLogin, getToken, setToken } from "@/helpers/cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import TriangleLeft from "@/components/TriangleLeft";
import { ApiHeaders } from "@/helpers/utils";

const Screen = ({ children }: { children: React.ReactNode }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const SidebarToggleIcon = sidebarIsOpen ? XMarkIcon : Bars3Icon;
  const router = useRouter();

  const queryClient = new QueryClient();

  const handleLogout = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_API_URL;
    setIsLoading(true);
    setError(null);
    try {
      await fetch(`${url}/auth/logout`, {
        method: "POST",
        headers: ApiHeaders(getToken()),
      }).then((res) => {
        // console.log(res);
        setToken("");
        const token = getToken();
        if (!token) {
          router.push("/login");
        }
      });
    } catch (error: any) {
      // console.log(error);
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!checkIsLogin()) {
      router.push("/login");
    }
  }, []);

  if (!checkIsLogin() && (path == "/login" || path == "/register")) {
    return (
      <QueryClientProvider client={queryClient}>
        <section className="md:col-span-12">{children}</section>
      </QueryClientProvider>
    );
  }

  if (path != "/login" && path != "/register") {
    return (
      <QueryClientProvider client={queryClient}>
        {isMobile ? (
          <aside className="px-5 bg-[#16191C] text-zinc-200 h-auto fixed top-0 w-full">
            <div className="py-3">
              <SidebarToggleIcon
                width={30}
                height={30}
                onClick={() => {
                  setSidebarIsOpen(!sidebarIsOpen);
                }}
                className="cursor-pointer"
              />
            </div>
            {sidebarIsOpen && (
              <ul className="mt-3 pb-3 transition-all ease">
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
                <div className="relative group z-50">
                  <button
                    className={`sidebar-link flex items-center gap-2`}
                    onClick={() => {
                      const confirmation = confirm(
                        "Are you sure to logout from this application?"
                      );
                      if (confirmation) {
                        handleLogout();
                      }
                    }}
                  >
                    <ArrowLeftStartOnRectangleIcon width={25} height={25} />
                    <span>Logout</span>
                  </button>
                </div>
              </ul>
            )}
          </aside>
        ) : (
          <aside className="max-md:hidden md:col-span-1 md:px-3 md:py-8 p-5 bg-[#16191C] text-zinc-200">
            <Sidebar />
          </aside>
        )}
        <section className="max-md:pt-[4rem] md:col-span-11 md:px-3 md:py-8">
          {children}
        </section>
      </QueryClientProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <section className="md:col-span-12">{children}</section>
    </QueryClientProvider>
  );
};

export default Screen;
