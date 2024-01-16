import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
// import Sidebar from "@/components/Sidebar";
import Screen from "./screen";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Task Dashboard",
  description: "A simple website, created with Next JS and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="min-h-screen md:grid md:grid-cols-12 gap-5">
          <Screen>{children}</Screen>
        </main>
      </body>
    </html>
  );
}
