"use client";

import Image from "next/image";
import React from "react";
import Icon from "@/assets/icons.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import routes from "@/helpers/route";

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
            <Link
              key={route?.path}
              href={route?.path}
              className={`sidebar-link ${
                route?.path === pathname ? "sidebar-link-active" : " "
              }`}
            >
              <Icon width={25} height={25} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
