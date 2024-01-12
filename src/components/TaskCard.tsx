import React from "react";
import LevelBadge from "./LevelBadge";
import Image from "next/image";

const TaskCard = ({ title, thumbnail }: { title: string; thumbnail: any }) => {
  return (
    <div className="p-5 bg-white rounded grid gap-3.5">
      {/* Badge Level */}
      <div>
        <LevelBadge level="low" />
      </div>
      {/* Title */}
      <div>
        <p className="md:text-xl">{title}</p>
        {/* <p className="text-slate-500 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptatibus, enim fuga? Sequi, laborum repellat.
        </p> */}
      </div>
      <div>
        <Image
          src={thumbnail}
          alt="Card Thumbnail"
          className="w-full object-contain drop"
        />
      </div>
    </div>
  );
};

export default TaskCard;
