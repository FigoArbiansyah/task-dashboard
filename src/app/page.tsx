import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header
        title="Dashboard"
        subTitle="on development!"
        className="max-md:p-5"
      />
    </div>
  );
}
