"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

const status = [
  { id: 1, name: "to do" },
  { id: 2, name: "in progress" },
  { id: 3, name: "done" },
];

const StatusChanger = ({
  currentStatus,
  onSelect,
}: {
  currentStatus: string;
  onSelect: (value: any) => void;
}) => {
  const color =
    currentStatus?.toLowerCase() === "to do"
      ? "text-sky-500"
      : currentStatus?.toLowerCase() === "in progress"
      ? "text-blue-500"
      : "text-green-500";

  const list_status = status?.filter(
    (item) => item?.name !== currentStatus?.toLowerCase()
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
              status?.name?.toLowerCase() === "to do"
                ? "text-sky-500"
                : status?.name?.toLowerCase() === "in progress"
                ? "text-blue-500"
                : "text-green-500";
            return (
              <div
                key={index}
                onClick={() => onSelect(status?.id)}
                className={`${
                  index !== 0 ? "border-t" : ""
                } py-2 px-3 text-sm hover:bg-gray-500 hover:bg-opacity-15 flex items-center gap-2 cursor-pointer hover:opacity-75`}
              >
                <span className={`${color} capitalize`}>{status?.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusChanger;
