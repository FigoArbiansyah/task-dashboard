import React from "react";
import LevelBadge from "./LevelBadge";
import Image from "next/image";

const TaskCard = ({
  title,
  thumbnail,
  onClick,
  level = "low",
}: {
  title: string;
  thumbnail: any;
  level: string;
  onClick: () => any;
}) => {
  return (
    <div
      onClick={onClick}
      className="p-5 cursor-pointer bg-white rounded grid gap-3.5"
    >
      {/* Badge Level */}
      <div>
        <LevelBadge level={level} />
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
          width={300}
          height={300}
          className="w-full object-contain drop"
        />
      </div>
    </div>
  );
};

export default TaskCard;
