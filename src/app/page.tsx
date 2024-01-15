import CountCard from "@/components/CountCard";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
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
        <CountCard className="md:col-span-4 bg-emerald-400 text-white rounded border border-emerald-400 hover:text-emerald-400 hover:bg-transparent cursor-pointer transition-all ease" />
      </div>
    </div>
  );
}
