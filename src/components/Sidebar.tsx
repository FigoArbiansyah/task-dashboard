"use client";

import Image from "next/image";
import React from "react";
import Icon from "@/assets/icons.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import routes from "@/helpers/route";
import axios from "axios";
import Tooltip from "./Tooltip";
import TriangleLeft from "./TriangleLeft";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { getToken, setToken } from "@/helpers/cookie";
import { ApiHeaders } from "@/helpers/utils";

const { useState } = React;

const Sidebar = () => {
  const pathname = usePathname();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  return (
    <div className="grid gap-5 place-items-center">
      <div className="z-50">
        <Image src={Icon} alt="App Icon" width={75} height={75} />
      </div>
      <div className="grid gap-8">
        {routes?.map((route) => {
          const Icon = route?.icon;
          return (
            <div key={route?.path} className="relative group z-50">
              <Link
                href={route?.path}
                className={`sidebar-link ${
                  route?.path === pathname ? "sidebar-link-active" : " "
                }`}
              >
                <Icon width={25} height={25} />
              </Link>
              <div className="tooltip-wrapper hidden group-hover:flex items-center absolute left-[70px] w-auto top-[50%] -translate-y-[50%]">
                <TriangleLeft />
                <Tooltip title={route?.title} />
              </div>
            </div>
          );
        })}
        <div className="relative group z-50">
          <button
            className={`sidebar-link`}
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
          </button>
          <div className="tooltip-wrapper hidden group-hover:flex items-center absolute left-[70px] w-auto top-[50%] -translate-y-[50%]">
            <TriangleLeft />
            <Tooltip title={"Logout"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
