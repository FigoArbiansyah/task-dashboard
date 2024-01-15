import React from "react";
import DashboardImage from "@/assets/dashboard-card-image.png";
import Image from "next/image";

const DashboardCard = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} border relative p-4`}>
      <p className="text-slate-100 text-sm mb-3">Welcome 👋</p>
      <h5 className="text-xl text-slate-100">Let{"'"}s manage your tasks</h5>
      {/* Image Absolute position */}
      <Image
        src={DashboardImage}
        alt="Dashboard Image"
        className="w-1/3 object-contain absolute bottom-0 right-0"
      />
    </div>
  );
};

export default DashboardCard;
