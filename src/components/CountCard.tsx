import React from "react";
import Heading1 from "./Heading/1";

const CountCard = ({
  className,
  title,
  count,
}: {
  className?: string;
  title: string;
  count: number;
}) => {
  return (
    <div
      className={`${className} p-4 rounded drop-shadow flex gap-4 justify-between`}
    >
      <div>
        <p>{title}</p>
        <Heading1 title={count?.toString()} />
      </div>
    </div>
  );
};

export default CountCard;
