"use client";

import { useState } from "react";
import Board from "@/components/Board";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import React from "react";
import dataOfTasks from "@/helpers/dummy-card-datas";
import dataOfBoards from "@/helpers/dummy-board-datas";
import TaskDetail from "@/components/TaskDetail";

const Tasks = () => {
  const [visible, setVisible] = useState(false);
  const [detailTask, setDetailTask] = useState({});
  return (
    <div className="">
      <Header
        title="My Tasks"
        subTitle="Manage your task here!"
        className="max-md:p-5"
      />
      <div className="overflow-x-auto max-md:w-[95vw]">
        <section className="pt-10 grid grid-cols-3 gap-4 max-md:w-[250vw] overflow-x-auto max-md:p-5">
          {dataOfBoards?.map((board) => {
            return (
              <Board key={board?.id} title={board?.title} count={board?.count}>
                {dataOfTasks?.map((task) => {
                  if (task?.board_id == board?.id) {
                    return (
                      <TaskCard
                        key={task?.id}
                        title={task?.title}
                        thumbnail={task?.thumbnail}
                        level={task?.level}
                        onClick={() => {
                          setVisible(true);
                          setDetailTask(task);
                          document.body.style.overflowY = "hidden";
                        }}
                      />
                    );
                  }
                })}
                <TaskDetail
                  visible={visible}
                  onClose={() => {
                    setVisible(false);
                    document.body.style.overflowY = "auto";
                  }}
                  item={detailTask}
                />
              </Board>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Tasks;
