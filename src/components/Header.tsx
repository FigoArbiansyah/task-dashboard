import React from "react";
import Heading1 from "./Heading/1";

const Header = ({
  title,
  subTitle,
  className,
}: {
  title: string;
  subTitle?: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <Heading1 title={title} />
      {subTitle && (
        <p className="font-light text-sm text-slate-600 mt-2">{subTitle}</p>
      )}
    </div>
  );
};

export default Header;
