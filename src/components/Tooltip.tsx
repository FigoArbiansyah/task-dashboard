import React from "react";

const Tooltip = ({ title }: { title: string }) => {
  return (
    <div className="py-2 px-8 rounded bg-[#16191C] text-zinc-200">
      <span>{title}</span>
    </div>
  );
};

export default Tooltip;
