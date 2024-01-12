"use client";

import Image from "next/image";
import React from "react";
import Icon from "@/assets/icons.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import routes from "@/helpers/route";
import Tooltip from "./Tooltip";
import TriangleLeft from "./TriangleLeft";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="grid gap-5 place-items-center">
      <div className="z-50">
        <Image src={Icon} alt="App Icon" width={75} height={75} />
      </div>
      <div className="grid gap-8">
        {routes?.map((route) => {
          const Icon = route?.icon;
          return (
            <div key={route?.path} className="relative group">
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
      </div>
    </div>
  );
};

export default Sidebar;
