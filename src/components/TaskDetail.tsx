import React from "react";
import DummyImage from "@/assets/dummy-image-card.png";
import Image from "next/image";
import LevelBadge from "./LevelBadge";
import { XMarkIcon } from "@heroicons/react/16/solid";
import StatusChanger from "./StatusChanger";

const TaskDetail = ({
  visible,
  onClose,
  item,
}: {
  visible: boolean;
  onClose: () => any;
  item: any;
}) => {
  const color =
    item?.board_name?.toLowerCase() === "to do"
      ? "text-sky-500"
      : item?.board_name?.toLowerCase() === "in progress"
      ? "text-blue-500"
      : "text-green-500";
  return (
    <div className={`${visible ? "" : "hidden"}`}>
      <div
        onClick={onClose}
        className="w-full h-screen bg-black bg-opacity-15 backdrop-blur fixed top-0 left-0 z-[49]"
      ></div>
      <div className="task-detail md:w-1/3 fixed h-screen top-0 right-0 z-50 bg-white">
        <div className="md:hidden absolute top-2 right-2">
          <button onClick={onClose}>
            <XMarkIcon width={25} height={25} />
          </button>
        </div>
        <aside className="p-5 grid gap-4">
          <div>
            <LevelBadge level={item?.level} />
          </div>
          <div>
            <h3 className="text-xl flex gap-2 items-center">
              <StatusChanger currentStatus={item?.board_name} /> <span>-</span>
              <span> {item?.title}</span>
            </h3>
          </div>
          <hr />
          <div>
            <p className="font-light text-gray-800">
              {item?.description ?? "-"}
            </p>
          </div>
          <div>
            <Image src={item?.thumbnail} alt="Thumbnail of Tasks" />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TaskDetail;
