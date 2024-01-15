import React from "react";
import Heading1 from "./Heading/1";

const CountCard = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} p-4 rounded drop-shadow`}>
      <p>Task</p>
      <Heading1 title="4" />
    </div>
  );
};

export default CountCard;
