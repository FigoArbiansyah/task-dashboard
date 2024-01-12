import { theme } from "@/helpers/utils";
import React from "react";

type levelEnum = "low" | "medium" | "height";

const LevelBadge = ({ level }: { level: levelEnum }) => {
  const color =
    level?.toLowerCase() === "low"
      ? theme.color.low
      : level?.toLowerCase() === "medium"
      ? theme.color.medium
      : theme.color.high;
  return (
    <div
      className="py-1 px-3 capitalize bg-opacity-40 inline-block rounded text-sm"
      style={{ backgroundColor: color }}
    >
      {level}
    </div>
  );
};

export default LevelBadge;
