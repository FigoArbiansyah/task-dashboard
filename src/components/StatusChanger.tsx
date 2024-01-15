"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

const status = ["to do", "in progress", "done"];

const StatusChanger = ({ currentStatus }: { currentStatus: string }) => {
  const color =
    currentStatus?.toLowerCase() === "to do"
      ? "text-sky-500"
      : currentStatus?.toLowerCase() === "in progress"
      ? "text-blue-500"
      : "text-green-500";

  const list_status = status?.filter(
    (item) => item !== currentStatus?.toLowerCase()
  );

  const [opened, setOpened] = useState(false);

  return (
    <div className="relative border-b">
      <div
        onClick={() => {
          setOpened(!opened);
        }}
        className="p-1 flex items-center gap-2 cursor-pointer hover:opacity-75"
      >
        <span className={`${color}`}>{currentStatus}</span>
        {opened ? (
          <ChevronUpIcon width={15} height={15} />
        ) : (
          <ChevronDownIcon width={15} height={15} />
        )}
      </div>
      {opened && (
        <div className="bordere overflow-hidden absolute top-8 bg-white w-full shadow drop-shadow min-w-[10rem]">
          {list_status?.map((status, index) => {
            const color =
              status?.toLowerCase() === "to do"
                ? "text-sky-500"
                : status?.toLowerCase() === "in progress"
                ? "text-blue-500"
                : "text-green-500";
            return (
              <div
                key={index}
                className={`${
                  index !== 0 ? "border-t" : ""
                } py-2 px-3 text-sm hover:bg-gray-500 hover:bg-opacity-15 flex items-center gap-2 cursor-pointer hover:opacity-75`}
              >
                <span className={`${color} capitalize`}>{status}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusChanger;
