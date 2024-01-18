import React from "react";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-12 h-12 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent ${className}`}
    ></div>
  );
};

export default Spinner;
