import React from "react";
import Heading1 from "./Heading/1";
import Spinner from "./Spinner";

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
        {count ? (
          <Heading1 title={count?.toString()} />
        ) : (
          <Spinner className="w-5 h-5 border-white mt-3" />
        )}
      </div>
    </div>
  );
};

export default CountCard;
