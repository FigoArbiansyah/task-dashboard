"use client";

import { useEffect, useState } from "react";
import Board from "@/components/Board";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import React from "react";
import dataOfTasks from "@/helpers/dummy-card-datas";
import dataOfBoards from "@/helpers/dummy-board-datas";
import TaskDetail from "@/components/TaskDetail";
import { useQuery } from "react-query";
import axios from "axios";
import { ApiHeaders } from "@/helpers/utils";
import { getToken, setToken } from "@/helpers/cookie";
import { useRouter } from "next/navigation";
import NewTaskModalForm from "@/components/NewTaskModalForm";
import Spinner from "@/components/Spinner";

const url = process.env.NEXT_PUBLIC_BASE_API_URL;

const Tasks = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [detailTask, setDetailTask] = useState<any>({});
  const [boards, setBoards] = useState<any>({});
  const [tasks, setTasks] = useState<any>({});

  const [visibleModalForm, setVisibleModalForm] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);

  // const { data: boards } = useQuery("boards", async () => {
  //   const { data } = await axios.get(`${url}/boards`, {
  //     headers: ApiHeaders(getToken()),
  //   });
  //   return data;
  // });

  const fetchBoardsData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/boards`, {
        headers: ApiHeaders(getToken()),
      });
      setBoards(data);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.code == 401) {
        setToken("");
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // const { data: tasks } = useQuery("tasks", async () => {
  //   const { data } = await axios.get(`${url}/tasks`, {
  //     headers: ApiHeaders(getToken()),
  //   });
  //   return data;
  // });

  const fetchTasksData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/tasks`, {
        headers: ApiHeaders(getToken()),
      });
      setTasks(data);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.code == 401) {
        setToken("");
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = async (id: number | string, optionValue: any) => {
    setLoading(true);
    try {
      await axios.post(
        `${url}/tasks/${id}`,
        {
          ...detailTask,
          board_id: optionValue,
        },
        {
          headers: ApiHeaders(getToken()),
        }
      );
      fetchBoardsData();
      fetchTasksData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const handleSubmit = async (value: any) => {
    setLoading(true);
    setVisibleModalForm(false);
    // console.log({ value });
    try {
      await axios.post(`${url}/tasks`, value, {
        headers: ApiHeaders(getToken()),
      });
      fetchBoardsData();
      fetchTasksData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    setLoading(true);
    // console.log({ value });
    try {
      await axios.delete(`${url}/tasks/${id}`, {
        headers: ApiHeaders(getToken()),
      });
      fetchBoardsData();
      fetchTasksData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  useEffect(() => {
    fetchBoardsData();
    fetchTasksData();
  }, [isUpdated]);

  return (
    <div className="">
      <Header
        title="My Tasks"
        subTitle="Manage your task here!"
        className="max-md:p-5"
      />
      {loading ? (
        <div className="grid place-items-center pt-14">
          <Spinner />
        </div>
      ) : (
        <div className="pt-10 overflow-x-auto max-md:w-[95vw]">
          <div>
            <button
              type="button"
              onClick={() => setVisibleModalForm(true)}
              className="mb-3 bg-black text-white py-2 px-3 rounded hover:bg-opacity-50 transition-all active:scale-90"
            >
              New Tasks
            </button>
            <NewTaskModalForm
              boards={boards?.data}
              visible={visibleModalForm}
              onClose={() => setVisibleModalForm(false)}
              onSubmit={(value) => {
                handleSubmit(value);
              }}
            />
          </div>
          <section className="grid grid-cols-3 gap-4 max-md:w-[250vw] overflow-x-auto max-md:p-5">
            {boards?.data?.map((board: any) => {
              return (
                <Board
                  key={board?.id}
                  title={board?.title}
                  count={board?.count}
                >
                  {tasks?.data?.map((task: any) => {
                    if (task?.board?.id == board?.id) {
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
                    onSelect={(value: any) => {
                      handleSelectOption(detailTask?.id, value);
                    }}
                    onDelete={() => {
                      const confirmation = confirm(
                        "Are you sure to delete this task?"
                      );
                      if (confirmation) {
                        handleDelete(detailTask?.id);
                      }
                    }}
                    item={detailTask}
                  />
                </Board>
              );
            })}
          </section>
        </div>
      )}
    </div>
  );
};

export default Tasks;
