import React from "react";

const Board = ({
  children,
  title,
  count,
}: {
  children: any;
  title: string;
  count: number;
}) => {
  return (
    <div className="bg-zinc-200 p-5 rounded-lg self-start">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg">{title}</h4>
        <div className="w-10 aspect-square rounded-full text-white bg-black grid place-items-center">
          <span className="font-light font-mono">{count}</span>
        </div>
      </div>
      <div className="max-h-[24rem] overflow-y-auto pr-2">
        <div className="grid gap-3 ">{children}</div>
      </div>
    </div>
  );
};

export default Board;
