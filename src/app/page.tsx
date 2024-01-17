"use client";

import React, { useState, useEffect } from "react";
import CountCard from "@/components/CountCard";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";
import Image from "next/image";
import axios from "axios";
import { ApiHeaders } from "@/helpers/utils";
import { getToken } from "@/helpers/cookie";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_API_URL;
    try {
      const response = await axios.get(`${url}/dashboard`, {
        headers: ApiHeaders(getToken()),
      });
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  const taskChartData = {
    labels: data?.data?.boards?.map((board: { title: any }) => {
      return board?.title;
    }),
    datasets: [
      {
        label: "My Tasks",
        data: data?.data?.boards?.map((board: { count: any }) => {
          return board?.count;
        }),
        backgroundColor: ["rgb(255, 205, 86)", "rgb(54, 162, 235)", "#34D399"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Header
          title="Dashboard"
          subTitle="on development!"
          className="max-md:p-5"
        />
      </div>
      <div className="grid md:grid-cols-12 gap-4 mt-7 max-md:p-5">
        <DashboardCard className="md:col-span-7 bg-violet-500 text-white rounded border cursor-pointer transition-all ease" />
        <CountCard
          title="Tasks"
          count={data?.data?.task?.count ?? "-"}
          className="md:col-span-4 bg-emerald-400 text-white rounded border border-emerald-400 hover:text-emerald-400 hover:bg-transparent cursor-pointer transition-all ease"
        />
        {/* TASKS CHART */}
        <div className="col-span-3 ">
          <p className="text-lg">Task Info:</p>
          <Doughnut data={taskChartData} />
        </div>
      </div>
    </div>
  );
}
