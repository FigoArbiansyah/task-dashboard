import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
        <main className="min-h-screen grid md:grid-cols-12 gap-5">
          <aside className="max-md:hidden md:col-span-1 md:px-3 md:py-8 p-5 bg-[#16191C] text-zinc-200">
            <Sidebar />
          </aside>
          <section className="md:col-span-11 md:px-3 md:py-8">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
